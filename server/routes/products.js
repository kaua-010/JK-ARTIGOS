const express = require('express');
const router = express.Router();

// Dados de produtos (em produção seria do banco de dados)
const products = [
  {
    id: 1,
    name: 'Bíblia Preta Clássica',
    category: 'kjf',
    price: 89.90,
    image: '📕',
    description: 'KJF - Encadernação em couro',
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'Bíblia NVI Estudo',
    category: 'nvi',
    price: 125.00,
    image: '📗',
    description: 'NVI - Com notas explicativas',
    badge: 'Bestseller'
  },
  {
    id: 3,
    name: 'Bíblia Feminina Rosa',
    category: 'feminina',
    price: 95.50,
    image: '💗',
    description: 'Design exclusivo para mulheres',
    badge: 'Novo'
  },
  {
    id: 4,
    name: 'Bíblia ARA Clássica',
    category: 'ara',
    price: 79.90,
    image: '📔',
    description: 'ARA - Edição tradicional',
    badge: ''
  },
  {
    id: 5,
    name: 'Bíblia Letra Gigante',
    category: 'gigante',
    price: 145.00,
    image: '📙',
    description: 'Letra grande - Fácil leitura',
    badge: 'Premium'
  },
  {
    id: 6,
    name: 'Bíblia KJF Dourada',
    category: 'kjf',
    price: 110.00,
    image: '✨',
    description: 'KJF - Borda dourada especial',
    badge: 'Premium'
  },
  {
    id: 7,
    name: 'Bíblia NVI Compacta',
    category: 'nvi',
    price: 85.00,
    image: '📕',
    description: 'NVI - Formato portátil',
    badge: ''
  },
  {
    id: 8,
    name: 'Bíblia Feminina Lilás',
    category: 'feminina',
    price: 98.50,
    image: '💜',
    description: 'Design elegante em lilás',
    badge: 'Novo'
  }
];

// GET /api/products - Listar todos os produtos
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      products: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Obter produto por ID
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/categoria/:category - Filtrar por categoria
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const filtered = products.filter(p => p.category === category);
    
    res.json({
      success: true,
      products: filtered,
      count: filtered.length,
      category
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
