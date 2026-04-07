# 🚀 Guia de Setup Completo - JK Store

Um guia passo a passo para configurar e colocar seu e-commerce no ar!

## 📋 Pré-requisitos

Tenha instalado:
- **Node.js** (v14+): https://nodejs.org
- **Git** (opcional): https://git-scm.com
- **VS Code**: https://code.visualstudio.com

## ✅ Passo 1: Preparar o Ambiente

### 1.1 Abra o Terminal

- Windows: Pressione `Win + R`, digite `cmd` e enter
- Mac: Cmd + Space, digite "terminal"
- Linux: Ctrl + Alt + T

### 1.2 Navegue para a pasta do projeto

```bash
cd caminho/para/JK-ARTIGOS
```

### 1.3 Instale as dependências

```bash
npm install
```

Aguarde o download de todos os pacotes (pode levar alguns minutos).

## 🔐 Passo 2: Configurar as Credenciais

### 2.1 Criar arquivo .env

Crie um arquivo chamado `.env` na raiz do projeto e adicione (mude `seu-`` para seus dados):

```env
# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=seu-sid-twilio
TWILIO_AUTH_TOKEN=seu-token-twilio
TWILIO_WHATSAPP_NUMBER=+5511999999999

# Dados da Empresa
COMPANY_WHATSAPP=(19)97108-0410
COMPANY_EMAIL=seu-email@empresa.com.br
COMPANY_NAME=JK Store

# Servidor
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2.2 Senha de Aplicativo Gmail (IMPORTANTE!)

**Não use sua senha normal do Gmail!**

1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione: 
   - App: **Mail**
   - Device: **Windows (ou seu SO)**
3. Clique em **Gerar**
4. Copia a senha de 16 caracteres
5. Cole em `SMTP_PASS` no arquivo `.env`

### 2.3 Configurar Twilio (para WhatsApp)

**Opção 1: Sem automação (teste manual)**
- Deixe os campos de Twilio em branco por enquanto
- Depois de testar, você pode configurar

**Opção 2: Com automação (recomendado)**
1. Crie conta em: https://www.twilio.com
2. Vá para Console > WhatsApp Sandbox
3. Siga as instruções para conectar seu WhatsApp
4. Copie `Account SID` e `Auth Token` para `.env`
5. Use seu número do WhatsApp como `TWILIO_WHATSAPP_NUMBER`

## 🏃 Passo 3: Rodar Localmente

### 3.1 Inicie o servidor

```bash
npm run dev
```

Você verá algo como:
```
🚀 JK Store Backend rodando em http://localhost:5000
📖 Bíblias Sagradas - E-commerce com WhatsApp & Email
```

### 3.2 Abra no navegador

Acesse: **http://localhost:5000**

Pronto! Seu site está rodando localmente!

## 🛒 Passo 4: Testar a Funcionalidade

1. **Adicione produtos ao carrinho** - Clique nos botões `+`
2. **Abra o carrinho** - Clique em 🛒
3. **Vá ao checkout** - Clique em "Finalizar Pedido"
4. **Preencha o formulário:**
   - Nome: `Seu Nome`
   - Email: `seu-email@gmail.com` (use o mesmo do SMTP_USER)
   - WhatsApp: `(19) 97108-0410`
5. **Escolha as opções:**
   - Entrega: Retirada ou Entrega
   - Notificação: WhatsApp, Email ou Ambos
6. **Clique em "Confirmar Pedido"**

### ✅ Resultado esperado:

- Email enviado para o cliente
- WhatsApp send (se configurado)
- Email enviado para empresa
- QR Code gerado automaticamente
- Tela de sucesso exibida

## 🌐 Passo 5: Deploy no Vercel

### 5.1 Criar conta Vercel

1. Acesse: https://vercel.com
2. Clique em **Sign Up**
3. Faça login com **GitHub** (recomendado)

### 5.2 Fazer upload do projeto

**Opção A: Usando Git**

```bash
# Inicialize git (se ainda não tiver)
git init

# Adicione todos os arquivos
git add .

# Faça commit
git commit -m "Projeto JK Store inicial"

# Crie um repositório no GitHub
# Depois execute:
git remote add origin https://github.com/seu-usuario/jk-store.git
git branch -M main
git push -u origin main
```

Depois, no Vercel:
1. Clique em **Add New Project**
2. Selecione seu repositório no GitHub
3. Clique em **Import**

**Opção B: Upload direto no Vercel**

1. Acesse: https://vercel.com
2. Clique em **Upload Project**
3. Arraste a pasta do projeto ou clique para selecionar

### 5.3 Configurar Variáveis de Ambiente

1. No painel do Vercel, vá para **Settings**
2. Clique em **Environment Variables**
3. Adicione a mesma configuração do seu `.env`:

```
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
TWILIO_ACCOUNT_SID=seu-sid
TWILIO_AUTH_TOKEN=seu-token
COMPANY_WHATSAPP=(19)97108-0410
COMPANY_EMAIL=seu-email@empresa.com.br
```

### 5.4 Deploy

Clique em **Deploy** e aguarde (2-3 minutos).

Seu site estará em: `https://seu-projeto.vercel.app`

## 📱 Passo 6: Compartilhar no Instagram

Copie o link do Vercel:
```
https://seu-projeto.vercel.app
```

E compartilhe em:
- ✅ Bio do Instagram
- ✅ Stories
- ✅ Posts descrição
- ✅ WhatsApp Status
- ✅ Grupos do WhatsApp

## 🆘 Resolução de Problemas

### ❌ Erro: "Cannot find module"

```bash
# Solução:
npm install
```

### ❌ Erro: "Port 5000 already in use"

O servidor já está rodando. Feche outras janelas do terminal ou use outra porta:

```bash
PORT=3000 npm run dev
```

### ❌ Email não está sendo enviado

1. Verifique se `SMTP_USER` e `SMTP_PASS` estão corretos
2. Certifique-se de ter gerado uma **Senha de Aplicativo** no Gmail
3. Ative a opção de "Apps menos seguros" em: https://myaccount.google.com/u/0/security

### ❌ WhatsApp não está funcionando

Se deixou em branco:
1. As mensagens serão logadas no console, mas não enviadas
2. Configure Twilio para automação completa

### ❌ Produtos não aparecem

Verifique se o arquivo `server/routes/products.js` existe e está correto.

## 📚 Próximas Funcionalidades

Você pode adicionar:

- [ ] Sistema de Pagamento (Stripe, MercadoPago)
- [ ] Banco de Dados (MongoDB)
- [ ] Autenticação de Usuário
- [ ] Rastreamento de Pedidos
- [ ] Dashboard de Admin
- [ ] Desconto/Cupom
- [ ] Análise de Vendas

## 🎯 Customizações Populares

### Trocar cores

Abra `public/styles.css` e procure por `:root`:

```css
:root {
  --gold: #C9A84C;          /* Cor principal */
  --dark: #0D0D0D;          /* Fundo */
  --text: #F0EDE8;          /* Texto */
}
```

### Adicionar novo produto

Edite `server/routes/products.js` e adicione:

```javascript
{
  id: 9,
  name: 'Nome do Produto',
  category: 'categoria',
  price: 99.99,
  image: '📕',
  description: 'Descrição',
  badge: 'Novo'
}
```

### Mudar número do WhatsApp

1. `.env`: Mude `COMPANY_WHATSAPP`
2. `public/index.html`: Procure por `wa.me` e atualize o número

## 📞 Suporte

Qualquer dúvida:
- WhatsApp: (19) 97108-0410
- Email: seu-email@gmail.com

---

**Parabéns! Seu e-commerce está no ar! 🎉**
