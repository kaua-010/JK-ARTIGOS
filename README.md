# JK Store - E-commerce de Bíblias Sagradas

Um site profissional de e-commerce para venda de Bíblias com integração completa de WhatsApp e Email.

## 🎯 Recursos Principais

- ✅ **Carrinho de Compras** - Adicione e gerencie produtos
- ✅ **Checkout Avançado** - Formulário completo com múltiplas opções
- ✅ **Notificações** - WhatsApp, Email ou ambos
- ✅ **QR Code Dinâmico** - Código QR gerado para cada pedido
- ✅ **Link de Pagamento** - Link único de pagamento por pedido
- ✅ **Automação** - Pedidos enviados automaticamente para WhatsApp e Email
- ✅ **Design Responsivo** - Mobile-first, funciona em todos os dispositivos
- ✅ **API REST** - Backend pronto para integração

## 📋 Requisitos

- Node.js v14+ 
- npm ou yarn
- Conta Gmail (para envio de emails)
- Conta Twilio (para WhatsApp via API - opcional)

## 🚀 Instalação

### 1. Clonar ou extrair o projeto

```bash
cd jk-artigos
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Email (Gmail)
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app-do-gmail

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=seu-sid
TWILIO_AUTH_TOKEN=seu-token
TWILIO_WHATSAPP_NUMBER=+55119999999

# Empresa
COMPANY_WHATSAPP=(19) 97108-0410
COMPANY_EMAIL=seu-email@empresa.com

# Servidor
PORT=5000
NODE_ENV=development
```

## 🔧 Configuração de Email (Gmail)

1. Acesse: https://myaccount.google.com/apppasswords
2. Gere uma **Senha de Aplicativo**
3. Copie a senha gerada e cole em `SMTP_PASS` no `.env`

## 📱 Configuração de WhatsApp (Twilio)

1. Crie uma conta em: https://www.twilio.com
2. Configure WhatsApp Sandbox
3. Copie suas credenciais para o `.env`:
   - Account SID
   - Auth Token
   - WhatsApp Number

## 🏃 Como Rodar

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

### Modo Produção

```bash
npm start
```

A aplicação estará disponível em: **http://localhost:5000**

## 📂 Estrutura do Projeto

```
jk-artigos/
├── public/                          # Frontend (HTML, CSS, JS)
│   ├── index.html                  # Página principal
│   ├── styles.css                  # Estilos
│   └── script.js                   # Lógica do frontend
├── server/                          # Backend (Node.js)
│   ├── server.js                   # Arquivo principal
│   ├── routes/
│   │   ├── orders.js               # Rotas de pedidos
│   │   └── products.js             # Rotas de produtos
│   ├── models/                     # Modelos de dados
│   └── config/                     # Configurações
├── .env.example                    # Variáveis de ambiente (exemplo)
├── .gitignore                      # Arquivo Git ignore
├── package.json                    # Dependências
└── README.md                       # Este arquivo
```

## 🔌 Endpoints da API

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Obter produto por ID
- `GET /api/products/category/:category` - Filtrar por categoria

### Pedidos
- `POST /api/orders` - Criar novo pedido
- `GET /api/orders/:id` - Obter pedido por ID
- `GET /api/orders` - Listar todos os pedidos

### Health
- `GET /api/health` - Verificar status da API

## 📊 Exemplo de Requisição de Pedido

```javascript
POST /api/orders
Content-Type: application/json

{
  "customer": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(19) 97108-0410",
    "address": "Rua das Flores, 123"
  },
  "items": [
    {
      "id": 1,
      "name": "Bíblia Preta Clássica",
      "price": 89.90,
      "quantity": 2
    }
  ],
  "subtotal": 179.80,
  "delivery": 15.00,
  "total": 194.80,
  "notification": "both"
}
```

## 🚀 Deployment (Vercel)

### 1. Fazer login no Vercel
```bash
npm install -g vercel
vercel login
```

### 2. Deploiar
```bash
vercel
```

### 3. Configurar variáveis de ambiente no Vercel
- Acesse o dashboard do Vercel
- Vá para Settings > Environment Variables
- Cole todas as variáveis do seu `.env`

## 🌐 Link do Instagram

Depois que estiver no Vercel, compartilhe o link diretamente no Instagram Stories, Bio ou Posts:
```
https://seu-projeto.vercel.app
```

## 🎨 Customizar Produtos

Edite `server/routes/products.js` para adicionar/remover produtos:

```javascript
{
  id: 9,
  name: 'Nova Bíblia',
  category: 'kjf',
  price: 99.99,
  image: '📕',
  description: 'Descrição do produto',
  badge: 'Novo'
}
```

## 📞 Suporte

- WhatsApp: (19) 97108-0410
- Email: contato@jkstore.com.br

## 📄 Licença

Todos os direitos reservados © 2024 JK Store

---

**Made with ❤️ for JK Store**
