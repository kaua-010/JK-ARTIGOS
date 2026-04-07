const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Importar rotas
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');

// Rotas da API
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Saúde da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'JK Store API está funcionando' });
});

// Servir index.html para todas as rotas não-API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 JK Store Backend rodando em http://localhost:${PORT}`);
  console.log(`📖 Bíblias Sagradas - E-commerce com WhatsApp & Email`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
