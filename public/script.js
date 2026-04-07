// Configurações da API
const API_URL = 'http://localhost:5000/api';

// Usar produtos com imagens se disponível, senão produtos padrão
const products = typeof productsWithImages !== 'undefined' ? productsWithImages : [
  {
    id: 1,
    name: 'Bíblia Preta Clássica',
    category: 'kjf',
    price: 89.90,
    emoji: '📕',
    description: 'KJF - Encadernação em couro',
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'Bíblia NVI Estudo',
    category: 'nvi',
    price: 125.00,
    emoji: '📗',
    description: 'NVI - Com notas explicativas',
    badge: 'Bestseller'
  },
  {
    id: 3,
    name: 'Bíblia Feminina Rosa',
    category: 'feminina',
    price: 95.50,
    emoji: '💗',
    description: 'Design exclusivo para mulheres',
    badge: 'Novo'
  },
  {
    id: 4,
    name: 'Bíblia ARA Clássica',
    category: 'ara',
    price: 79.90,
    emoji: '📔',
    description: 'ARA - Edição tradicional',
    badge: ''
  },
  {
    id: 5,
    name: 'Bíblia Letra Gigante',
    category: 'gigante',
    price: 145.00,
    emoji: '📙',
    description: 'Letra grande - Fácil leitura',
    badge: 'Premium'
  },
  {
    id: 6,
    name: 'Bíblia KJF Dourada',
    category: 'kjf',
    price: 110.00,
    emoji: '✨',
    description: 'KJF - Borda dourada especial',
    badge: 'Premium'
  },
  {
    id: 7,
    name: 'Bíblia NVI Compacta',
    category: 'nvi',
    price: 85.00,
    emoji: '📕',
    description: 'NVI - Formato portátil',
    badge: ''
  },
  {
    id: 8,
    name: 'Bíblia Feminina Lilás',
    category: 'feminina',
    price: 98.50,
    emoji: '💜',
    description: 'Design elegante em lilás',
    badge: 'Novo'
  }
];

// Estado da galeria de imagens
let currentImageIndex = 0;
let currentProductGallery = null;

// Estado do carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let currentNotification = 'whatsapp';
let currentDelivery = 0;
let deliveryPrice = 0;

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
  renderProducts(products);
  updateCartCount();
  renderCart();
  setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
  document.addEventListener('click', function(e) {
    // Fechar cart ao clicar fora
    if (e.target.id === 'cartOverlay') {
      closeCart();
    }
    // Fechar checkout ao clicar fora
    if (e.target.id === 'checkoutModal') {
      closeCheckout();
    }
    // Fechar galeria ao clicar fora
    if (e.target.id === 'galleryOverlay') {
      closeGallery(e);
    }
  });

  // Navegação por teclado na galeria
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('galleryOverlay').classList.contains('open')) return;

    if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'Escape') {
      closeGallery();
    }
  });
}

// Renderizar produtos
function renderProducts(productsToRender) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  if (productsToRender.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Nenhum produto encontrado</p>';
    return;
  }

  productsToRender.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Determinar se tem imagens reais ou usar emoji
    const hasImages = product.images && product.images.length > 0;
    const displayImage = hasImages ? `<img src="${product.images[0].url}" alt="${product.name}" onerror="this.parentElement.innerHTML='${product.emoji}'" />` : product.emoji;
    
    // Se tiver imagens, adicionar badge de galeria
    const galleryBadge = hasImages ? '<div style="position: absolute; bottom: 8px; right: 8px; background: rgba(201,168,76,0.8); color: var(--dark); padding: 4px 8px; border-radius: 20px; font-size: 0.7rem; font-weight: 700;">🖼️ ' + product.images.length + '</div>' : '';
    
    card.innerHTML = `
      <div class="product-img" ${hasImages ? `onclick="openGallery(${product.id})"` : ''} style="${hasImages ? 'cursor: pointer;' : ''}">
        ${displayImage}
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        ${galleryBadge}
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.description}</div>
        <div class="product-footer">
          <div class="product-price">R$ ${product.price.toFixed(2)}</div>
          <button class="add-btn" onclick="addToCart(${product.id})">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filtrar produtos
function filterProducts(category, button) {
  currentFilter = category;
  
  // Atualizar botão ativo
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  // Filtrar produtos
  if (category === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Adicionar ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      quantity: 1
    });
  }

  // Salvar no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
  showToast(`${product.name} adicionado ao carrinho!`);

  // Animar botão
  const btn = event.target;
  btn.classList.add('added');
  setTimeout(() => btn.classList.remove('added'), 300);
}

// Atualizar contador no header
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
  
  // Habilitar/desabilitar botão de checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.disabled = count === 0;
}

// Renderizar itens do carrinho
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <p>Seu carrinho está vazio</p>
      </div>
    `;
    document.getElementById('subtotal').textContent = 'R$ 0,00';
    return;
  }

  cartItems.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
    `;
    cartItems.appendChild(itemElement);
  });

  document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
}

// Aumentar quantidade
function increaseQty(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
}

// Diminuir quantidade
function decreaseQty(productId) {
  const item = cart.find(i => i.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
}

// Remover do carrinho
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
  showToast('Produto removido do carrinho');
}

// Abrir carrinho
function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartPanel').classList.add('open');
}

// Fechar carrinho
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartPanel').classList.remove('open');
}

// Abrir checkout
function openCheckout() {
  if (cart.length === 0) {
    showToast('Adicione produtos ao carrinho');
    return;
  }
  
  closeCart();
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('checkoutForm').classList.add('open');
  updateCheckoutSummary();
}

// Fechar checkout
function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.getElementById('checkoutForm').classList.remove('open');
}

// Selecionar opção de entrega
function selectDelivery(element, price) {
  document.querySelectorAll('.delivery-opt').forEach(opt => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');
  deliveryPrice = price;
  updateCheckoutSummary();
}

// Selecionar tipo de notificação
function selectNotification(element, type) {
  document.querySelectorAll('.notif-opt').forEach(opt => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');
  currentNotification = type;
}

// Atualizar resumo do checkout
function updateCheckoutSummary() {
  const summaryItems = document.getElementById('summaryItems');
  summaryItems.innerHTML = '';

  let subtotal = 0;
  cart.forEach(item => {
    const itemPrice = item.price * item.quantity;
    subtotal += itemPrice;
    
    const itemElement = document.createElement('div');
    itemElement.className = 'order-summary-item';
    itemElement.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>R$ ${itemPrice.toFixed(2)}</span>
    `;
    summaryItems.appendChild(itemElement);
  });

  document.getElementById('shippingPrice').textContent = `R$ ${deliveryPrice.toFixed(2)}`;
  const total = subtotal + deliveryPrice;
  document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;
}

// Enviar pedido
async function submitOrder() {
  const name = document.getElementById('clientName').value.trim();
  const email = document.getElementById('clientEmail').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const address = document.getElementById('clientAddress').value.trim();

  // Validação
  if (!name || !email || !phone) {
    showToast('Preencha os campos obrigatórios');
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Email inválido');
    return;
  }

  // Calcular total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryPrice;

  // Preparar dados do pedido
  const orderData = {
    customer: {
      name,
      email,
      phone,
      address
    },
    items: cart,
    subtotal,
    delivery: deliveryPrice,
    total,
    notification: currentNotification,
    timestamp: new Date().toISOString()
  };

  try {
    // Desabilitar botão
    const submitBtn = document.querySelector('.place-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processando...';

    // Enviar para o backend
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const result = await response.json();

    // Gerar número do pedido
    const orderNumber = String(result.orderId || Math.floor(Math.random() * 100000)).padStart(5, '0');
    document.getElementById('orderNumber').textContent = orderNumber;

    // Fechar checkout
    closeCheckout();

    // Mostrar tela de sucesso
    document.getElementById('successModal').classList.add('open');

    // Limpar carrinho
    setTimeout(() => {
      cart = [];
      localStorage.removeItem('cart');
      updateCartCount();
      renderCart();
    }, 2000);

  } catch (error) {
    console.error('Erro ao enviar pedido:', error);
    showToast('Erro ao processar pedido. Tente novamente.');
    
    // Reabilitar botão
    const submitBtn = document.querySelector('.place-order-btn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirmar Pedido';
  }
}

// Fechar tela de sucesso
function closeSuccess() {
  document.getElementById('successModal').classList.remove('open');
  
  // Voltar ao topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Resetar formulário
  document.getElementById('clientName').value = '';
  document.getElementById('clientEmail').value = '';
  document.getElementById('clientPhone').value = '';
  document.getElementById('clientAddress').value = '';
  document.querySelector('.place-order-btn').textContent = 'Confirmar Pedido';
  document.querySelector('.place-order-btn').disabled = false;
}

// Notificação toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ── GALERIA DE IMAGENS ──

// Abrir galeria de imagens
function openGallery(productId) {
  const product = products.find(p => p.id === productId);
  
  if (!product || !product.images || product.images.length === 0) {
    showToast('Nenhuma imagem disponível');
    return;
  }

  currentProductGallery = product;
  currentImageIndex = 0;
  
  const galleryOverlay = document.getElementById('galleryOverlay');
  galleryOverlay.classList.add('open');

  // Atualizar informações
  document.getElementById('galleryProductName').textContent = product.name;
  
  // Renderizar thumbnails
  const thumbnailsContainer = document.getElementById('galleryThumbnails');
  thumbnailsContainer.innerHTML = '';
  
  product.images.forEach((image, index) => {
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumbnail' + (index === 0 ? ' active' : '');
    thumb.innerHTML = `<img src="${image.url}" alt="${image.alt}" onerror="this.parentElement.style.background='var(--dark3)'; this.style.display='none';" />`;
    thumb.onclick = () => selectImage(index);
    thumbnailsContainer.appendChild(thumb);
  });

  // Mostrar primeira imagem
  updateGalleryImage();
}

// Fechar galeria
function closeGallery(event) {
  // Se clicar no overlay, fechar
  if (event && event.target !== event.currentTarget) {
    return;
  }

  const galleryOverlay = document.getElementById('galleryOverlay');
  galleryOverlay.classList.remove('open');
  currentProductGallery = null;
  currentImageIndex = 0;
}

// Próxima imagem
function nextImage() {
  if (!currentProductGallery) return;
  currentImageIndex = (currentImageIndex + 1) % currentProductGallery.images.length;
  updateGalleryImage();
}

// Imagem anterior
function prevImage() {
  if (!currentProductGallery) return;
  currentImageIndex = (currentImageIndex - 1 + currentProductGallery.images.length) % currentProductGallery.images.length;
  updateGalleryImage();
}

// Selecionar imagem por índice
function selectImage(index) {
  if (!currentProductGallery) return;
  currentImageIndex = index;
  updateGalleryImage();
}

// Atualizar imagem e contador
function updateGalleryImage() {
  if (!currentProductGallery) return;

  const image = currentProductGallery.images[currentImageIndex];
  const mainImg = document.getElementById('galleryMainImage');
  mainImg.src = image.url;
  mainImg.alt = image.alt;

  // Atualizar contador
  document.getElementById('galleryImageCounter').textContent = 
    `Imagem ${currentImageIndex + 1} de ${currentProductGallery.images.length}`;

  // Atualizar thumbnails ativas
  document.querySelectorAll('.gallery-thumbnail').forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentImageIndex);
  });
}

// Carregar produtos do backend (opcional)
async function loadProductsFromServer() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (response.ok) {
      const data = await response.json();
      if (data.products && data.products.length > 0) {
        // Substituir produtos locais pelos do servidor
        renderProducts(data.products);
      }
    }
  } catch (error) {
    console.log('Usando produtos locais', error);
  }
}
