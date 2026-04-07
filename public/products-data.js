// Produtos com múltiplas imagens
// Cada produto pode ter várias fotos de diferentes ângulos

const productsWithImages = [
  {
    id: 1,
    name: 'Bíblia Preta Clássica',
    category: 'kjf',
    price: 89.90,
    description: 'KJF - Encadernação em couro Premium',
    badge: 'Popular',
    images: [
      { url: '/images/bibles/biblia-preta-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-preta-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-preta-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-preta-4.jpg', alt: 'Detalhe capa' }
    ],
    emoji: '📕'
  },
  {
    id: 2,
    name: 'Bíblia NVI Estudo',
    category: 'nvi',
    price: 125.00,
    description: 'NVI - Com notas explicativas detalhadas',
    badge: 'Bestseller',
    images: [
      { url: '/images/bibles/biblia-nvi-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-nvi-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-nvi-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-nvi-4.jpg', alt: 'Páginas internas' }
    ],
    emoji: '📗'
  },
  {
    id: 3,
    name: 'Bíblia Feminina Rosa',
    category: 'feminina',
    price: 95.50,
    description: 'Design exclusivo para mulheres - Rosa premium',
    badge: 'Novo',
    images: [
      { url: '/images/bibles/biblia-rosa-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-rosa-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-rosa-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-rosa-4.jpg', alt: 'Detalhe' }
    ],
    emoji: '💗'
  },
  {
    id: 4,
    name: 'Bíblia ARA Clássica',
    category: 'ara',
    price: 79.90,
    description: 'ARA - Edição tradicional com índices',
    badge: '',
    images: [
      { url: '/images/bibles/biblia-ara-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-ara-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-ara-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-ara-4.jpg', alt: 'Detalhe capa' }
    ],
    emoji: '📔'
  },
  {
    id: 5,
    name: 'Bíblia Letra Gigante',
    category: 'gigante',
    price: 145.00,
    description: 'Letra grande - Fácil leitura para todas as idades',
    badge: 'Premium',
    images: [
      { url: '/images/bibles/biblia-gigante-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-gigante-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-gigante-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-gigante-4.jpg', alt: 'Letras grandes' }
    ],
    emoji: '📙'
  },
  {
    id: 6,
    name: 'Bíblia KJF Dourada',
    category: 'kjf',
    price: 110.00,
    description: 'KJF - Borda dourada com acabamento especial',
    badge: 'Premium',
    images: [
      { url: '/images/bibles/biblia-dourada-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-dourada-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-dourada-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-dourada-4.jpg', alt: 'Detalhe ouro' }
    ],
    emoji: '✨'
  },
  {
    id: 7,
    name: 'Bíblia NVI Compacta',
    category: 'nvi',
    price: 85.00,
    description: 'NVI - Formato portátil e leve',
    badge: '',
    images: [
      { url: '/images/bibles/biblia-compacta-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-compacta-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-compacta-3.jpg', alt: 'Comparação tamanho' },
      { url: '/images/bibles/biblia-compacta-4.jpg', alt: 'Aberta' }
    ],
    emoji: '📕'
  },
  {
    id: 8,
    name: 'Bíblia Feminina Lilás',
    category: 'feminina',
    price: 98.50,
    description: 'Design elegante em lilás com detalhos em dourado',
    badge: 'Novo',
    images: [
      { url: '/images/bibles/biblia-lilas-1.jpg', alt: 'Frente' },
      { url: '/images/bibles/biblia-lilas-2.jpg', alt: 'Lateral' },
      { url: '/images/bibles/biblia-lilas-3.jpg', alt: 'Aberta' },
      { url: '/images/bibles/biblia-lilas-4.jpg', alt: 'Detalhe' }
    ],
    emoji: '💜'
  }
];
