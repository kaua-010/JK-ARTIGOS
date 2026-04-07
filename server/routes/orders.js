const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Armazenar pedidos em memória (em produção seria no banco de dados)
const orders = [];

// Configurar transportador de email (Gmail)
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'seu-email@gmail.com',
    pass: process.env.SMTP_PASS || 'sua-senha-app'
  }
});

// Função para gerar QR Code
async function generateQRCode(data) {
  try {
    const qrCodeUrl = await QRCode.toDataURL(data);
    return qrCodeUrl;
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    return null;
  }
}

// Função para enviar email
async function sendEmail(to, subject, htmlContent) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'seu-email@gmail.com',
      to: to,
      subject: subject,
      html: htmlContent
    };

    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
}

// Função para enviar mensagem via WhatsApp (usando Twilio ou API similar)
async function sendWhatsAppMessage(phoneNumber, message, qrCodeUrl = null) {
  try {
    // Exemplo usando curl ou axios para chamar a API do WhatsApp Business
    // Aqui está um exemplo simplificado
    
    // Se usar Twilio
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

      // Formatar número (garantir +55 no início)
      let toNumber = phoneNumber.replace(/\D/g, '');
      if (!toNumber.startsWith('55')) {
        toNumber = '55' + toNumber;
      }
      toNumber = '+' + toNumber;

      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      
      const data = new URLSearchParams({
        From: fromNumber,
        To: toNumber,
        Body: message
      });

      await axios.post(url, data, {
        auth: {
          username: accountSid,
          password: authToken
        }
      });

      console.log('Mensagem WhatsApp enviada para:', toNumber);
      return true;
    }

    // Se usar nova API do WhatsApp (Meta/Facebook)
    if (process.env.WHATSAPP_API_KEY) {
      // Implementar integração com WhatsApp Cloud API (Meta)
      console.log('WhatsApp API não configurada. Configure TWILIO_ACCOUNT_SID ou WHATSAPP_API_KEY');
    }

    console.log('WhatsApp não configurado. Mensagem não foi enviada.');
    return false;

  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error.message);
    return false;
  }
}

// POST /api/orders - Criar novo pedido
router.post('/', async (req, res) => {
  try {
    const { customer, items, subtotal, delivery, total, notification, timestamp } = req.body;

    // Validação básica
    if (!customer || !customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({
        error: 'Dados do cliente incompletos'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: 'Carrinho vazio'
      });
    }

    // Criar pedido
    const orderId = Math.floor(Math.random() * 100000);
    const order = {
      id: orderId,
      uuid: uuidv4(),
      customer,
      items,
      subtotal,
      delivery,
      total,
      notification,
      status: 'pending',
      createdAt: new Date(),
      qrCodeUrl: null,
      paymentLink: null
    };

    // Gerar QR Code
    const paymentData = {
      orderId: order.id,
      amount: order.total,
      timestamp: order.createdAt
    };

    const qrCodeUrl = await generateQRCode(JSON.stringify(paymentData));
    order.qrCodeUrl = qrCodeUrl;

    // Gerar link de pagamento (exemplo com Stripe ou similar)
    const paymentLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/${order.uuid}`;
    order.paymentLink = paymentLink;

    // Preparar resumo do pedido
    const itemsSummary = items.map(item => 
      `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // Conteúdo do email em HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #C9A84C, #E8C97A); padding: 40px; text-align: center; border-radius: 10px;">
        <div style="background: white; padding: 30px; border-radius: 8px;">
          <h1 style="color: #C9A84C; font-size: 28px;">Pedido Confirmado! ✨</h1>
          <p style="color: #666; font-size: 16px;">Obrigado pela sua compra, ${customer.name}!</p>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: left;">
            <h3 style="color: #C9A84C;">Número do Pedido: #${String(orderId).padStart(5, '0')}</h3>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Status:</strong> Aguardando pagamento</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: left;">
            <h3 style="color: #333;">Itens do Pedido:</h3>
            <p style="white-space: pre-line; color: #666;">${itemsSummary}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
            <p><strong style="color: #333;">Subtotal:</strong> R$ ${subtotal.toFixed(2)}</p>
            <p><strong style="color: #333;">Frete:</strong> R$ ${delivery.toFixed(2)}</p>
            <h3 style="color: #C9A84C;">Total: R$ ${total.toFixed(2)}</h3>
          </div>

          ${qrCodeUrl ? `
            <div style="margin: 20px 0;">
              <p style="color: #666; font-size: 14px;">Escaneie o código QR abaixo para pagar:</p>
              <img src="${qrCodeUrl}" style="width: 200px; height: 200px;" alt="QR Code">
            </div>
          ` : ''}

          <div style="margin: 20px 0; padding: 20px; background: #E8F5E9; border-radius: 8px;">
            <p style="color: #2E7D32; font-size: 14px;">
              <strong>Próximas etapas:</strong><br>
              1. Escaneie o QR Code ou acesse: <a href="${paymentLink}" style="color: #C9A84C;">${paymentLink}</a><br>
              2. Complete o pagamento<br>
              3. Você receberá uma confirmação por email
            </p>
          </div>

          <div style="margin: 20px 0; padding: 15px; background: #FFF3E0; border-radius: 8px;">
            <p style="color: #E65100; font-size: 13px;">
              💬 <strong>Dúvidas? Entre em contato pelo WhatsApp:</strong><br>
              <a href="https://wa.me/5519971080410" style="color: #C9A84C;">Falar com JK Store</a>
            </p>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            © 2024 JK Store - Bíblias Sagradas Exclusivas
          </p>
        </div>
      </div>
    `;

    // Mensagem WhatsApp
    const whatsappMessage = `Olá ${customer.name}! 👋\n\nSeu pedido #${String(orderId).padStart(5, '0')} foi confirmado! ✨\n\nTotal: R$ ${total.toFixed(2)}\n\nEscaneie o QR Code que será enviado em breve para fazer o pagamento.\n\n📲 Qualquer dúvida, estou por aqui!\n\nJK Store 📖`;

    // Salvar pedido
    orders.push(order);

    // Enviar notificações baseado na preferência do cliente
    const sendToClient = async () => {
      if (notification === 'email' || notification === 'both') {
        await sendEmail(customer.email, 'Seu Pedido foi Confirmado!', emailHtml);
      }

      if (notification === 'whatsapp' || notification === 'both') {
        await sendWhatsAppMessage(customer.phone, whatsappMessage, qrCodeUrl);
      }
    };

    // Enviar para empresa
    const sendToCompany = async () => {
      const companyEmail = process.env.COMPANY_EMAIL || 'contato@jkstore.com.br';
      const companyPhone = process.env.COMPANY_WHATSAPP || '(19) 97108-0410';

      const companyEmailHtml = `
        <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
          <h2 style="color: #C9A84C;">🎉 NOVO PEDIDO RECEBIDO!</h2>
          <p><strong>Pedido #${String(orderId).padStart(5, '0')}</strong></p>
          
          <h3>Cliente:</h3>
          <p>
            <strong>Nome:</strong> ${customer.name}<br>
            <strong>Email:</strong> ${customer.email}<br>
            <strong>WhatsApp:</strong> ${customer.phone}<br>
            <strong>Endereço:</strong> ${customer.address || 'Não informado'}
          </p>

          <h3>Itens:</h3>
          <p style="white-space: pre-line;">${itemsSummary}</p>

          <h3>Valores:</h3>
          <p>
            <strong>Subtotal:</strong> R$ ${subtotal.toFixed(2)}<br>
            <strong>Frete:</strong> R$ ${delivery.toFixed(2)}<br>
            <strong>TOTAL:</strong> R$ ${total.toFixed(2)}
          </p>

          <p><strong>Forma de Notificação:</strong> ${notification === 'whatsapp' ? 'WhatsApp' : notification === 'email' ? 'Email' : 'WhatsApp + Email'}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      `;

      await sendEmail(companyEmail, `Novo Pedido #${String(orderId).padStart(5, '0')}`, companyEmailHtml);

      const companyWhatsappMessage = `📞 NOVO PEDIDO!\n\nPedido: #${String(orderId).padStart(5, '0')}\nCliente: ${customer.name}\nWhatsApp: ${customer.phone}\nTotal: R$ ${total.toFixed(2)}\n\nEntre em contato para confirmar a entrega!`;
      await sendWhatsAppMessage(companyPhone, companyWhatsappMessage);
    };

    // Executar envios em paralelo
    await Promise.all([
      sendToClient(),
      sendToCompany()
    ]);

    // Responder com sucesso
    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso!',
      orderId: order.id,
      uuid: order.uuid,
      paymentLink: order.paymentLink,
      qrCodeUrl: order.qrCodeUrl,
      total: order.total
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({
      error: 'Erro ao processar pedido: ' + error.message
    });
  }
});

// GET /api/orders/:id - Obter pedido por ID
router.get('/:id', (req, res) => {
  try {
    const order = orders.find(o => o.id === parseInt(req.params.id) || o.uuid === req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders - Listar todos os pedidos (apenas para admin)
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      orders: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
