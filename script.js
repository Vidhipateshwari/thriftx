// Product Data
const products = [
    {
        id: 1,
        name: 'Vintage Denim Jacket',
        category: 'Clothing',
        brand: 'FabIndia',
        size: 'M',
        condition: 'Like New',
        gender: 'Unisex',
        price: 3500,
        rating: '4.8',
        description: 'Lightly worn denim jacket with classic fit and minimal wear',
        images: ['https://via.placeholder.com/420x280?text=Denim+Jacket'],
        emoji: '🧥',
        location: 'Mumbai'
    },
    {
        id: 2,
        name: 'Silk Blouse',
        category: 'Clothing',
        brand: 'Bungalow',
        size: 'S',
        condition: 'Pre-owned',
        gender: 'Women',
        price: 2300,
        rating: '4.6',
        description: 'Soft silk blouse with elegant drape and minimal signs of use',
        images: ['https://via.placeholder.com/420x280?text=Silk+Blouse'],
        emoji: '👚',
        location: 'Delhi'
    },
    {
        id: 3,
        name: 'Classic Leather Boots',
        category: 'Clothing',
        brand: 'Heritage',
        size: 'L',
        condition: 'Like New',
        gender: 'Men',
        price: 5000,
        rating: '4.9',
        description: 'Durable leather boots with rugged sole, almost new condition',
        images: ['https://via.placeholder.com/420x280?text=Leather+Boots'],
        emoji: '👢',
        location: 'Bangalore'
    },
    {
        id: 4,
        name: 'Streetwear Hoodie',
        category: 'Clothing',
        brand: 'Urban',
        size: 'XL',
        condition: 'Pre-owned',
        gender: 'Unisex',
        price: 2000,
        rating: '4.4',
        description: 'Cozy hoodie with temperature-regulating fabric and minor marks',
        images: ['https://via.placeholder.com/420x280?text=Hoodie'],
        emoji: '🧥',
        location: 'Chennai'
    },
    {
        id: 5,
        name: 'Formal Black Dress',
        category: 'Clothing',
        brand: 'Elegance',
        size: 'M',
        condition: 'Well Loved',
        gender: 'Women',
        price: 1600,
        rating: '4.7',
        description: 'Timeless formal dress with minor wear but great shape',
        images: ['https://via.placeholder.com/420x280?text=Black+Dress'],
        emoji: '👗',
        location: 'Kolkata'
    },
    {
        id: 6,
        name: 'Outdoor Trekking Shirt',
        category: 'Clothing',
        brand: 'Adventure',
        size: 'L',
        condition: 'Like New',
        gender: 'Men',
        price: 1800,
        rating: '4.5',
        description: 'Breathable hiking shirt ready for new adventures',
        images: ['https://via.placeholder.com/420x280?text=Trekking+Shirt'],
        emoji: '🥾',
        location: 'Hyderabad'
    },
    {
        id: 7,
        name: 'Eco Cotton Tee',
        category: 'Clothing',
        brand: 'Basic',
        size: 'M',
        condition: 'New',
        gender: 'Unisex',
        price: 1100,
        rating: '4.2',
        description: 'Soft organic cotton tee with low impact design',
        images: ['https://via.placeholder.com/420x280?text=Cotton+Tee'],
        emoji: '👕',
        location: 'Mumbai'
    },
    {
        id: 8,
        name: 'Vintage Silk Scarf',
        category: 'Clothing',
        brand: 'Heritage',
        size: 'One Size',
        condition: 'Like New',
        gender: 'Women',
        price: 1200,
        rating: '4.4',
        description: 'Elegant scarf with minimal wear, perfect for gifting',
        images: ['https://via.placeholder.com/420x280?text=Silk+Scarf'],
        emoji: '🧣',
        location: 'Delhi'
    },
    {
        id: 9,
        name: 'Work Denim Jeans',
        category: 'Clothing',
        brand: 'FarmCraft',
        size: 'L',
        condition: 'Pre-owned',
        gender: 'Unisex',
        price: 2900,
        rating: '4.3',
        description: 'Sturdy jeans with authentic worn-in feel',
        images: ['https://via.placeholder.com/420x280?text=Denim+Jeans'],
        emoji: '👖',
        location: 'Bangalore'
    },
    {
        id: 10,
        name: 'Handmade Knit Sweater',
        category: 'Clothing',
        brand: 'Crafted',
        size: 'S',
        condition: 'Pre-owned',
        gender: 'Women',
        price: 3200,
        rating: '4.5',
        description: 'Warm knit sweater with cozy texture and sustainable story',
        images: ['https://via.placeholder.com/420x280?text=Knit+Sweater'],
        emoji: '🧶',
        location: 'Chennai'
    },
    {
        id: 11,
        name: 'Classic Polo Shirt',
        category: 'Clothing',
        brand: 'Premium',
        size: 'M',
        condition: 'Pre-owned',
        gender: 'Men',
        price: 1200,
        rating: '4.5',
        description: 'Casual fit polo shirt in good condition',
        images: ['https://via.placeholder.com/420x280?text=Polo+Shirt'],
        emoji: '👕',
        location: 'Kolkata'
    },
    {
        id: 12,
        name: 'Retro Skirt',
        category: 'Clothing',
        brand: 'Vintage',
        size: 'M',
        condition: 'Well Loved',
        gender: 'Women',
        price: 1500,
        rating: '4.6',
        description: 'Unique print skirt with character',
        images: ['https://via.placeholder.com/420x280?text=Retro+Skirt'],
        emoji: '👗',
        location: 'Hyderabad'
    }
];



// Cart Array
let cart = [];
let wishlist = [];
let userLocation = '';
let capturedImages = []; // For camera captured images

// API
const API_BASE_URL = 'http://localhost:5000/api';

// User Management
let currentUser = null;
let users = [];
let messages = [];

// Load data from API (fallback localStorage)
async function loadData() {
    try {
        const usersRes = await fetch(`${API_BASE_URL}/users`);
        const messagesRes = await fetch(`${API_BASE_URL}/messages?userId=${currentUser ? currentUser.id : 0}`);

        const usersData = await usersRes.json();
        const messagesData = await messagesRes.json();

        users = usersData.users || [];
        messages = messagesData.messages || [];
    } catch (err) {
        const savedUsers = localStorage.getItem('thriftx_users');
        if (savedUsers) users = JSON.parse(savedUsers);

        const savedMessages = localStorage.getItem('thriftx_messages');
        if (savedMessages) messages = JSON.parse(savedMessages);
    }

    const savedCurrentUser = localStorage.getItem('thriftx_currentUser');
    if (savedCurrentUser) {
        currentUser = JSON.parse(savedCurrentUser);
        updateUserUI();
    }
}

async function syncMessages() {
    if (!currentUser) return;
    try {
        const messagesRes = await fetch(`${API_BASE_URL}/messages?userId=${currentUser.id}`);
        const messagesData = await messagesRes.json();
        messages = messagesData.messages || [];
    } catch (err) {
        console.warn('Could not sync messages with server:', err);
    }
}

async function syncUsers() {
    try {
        const usersRes = await fetch(`${API_BASE_URL}/users`);
        const usersData = await usersRes.json();
        users = usersData.users || [];
    } catch (err) {
        console.warn('Could not sync users with server:', err);
    }
}

// Save data to localStorage
function saveUsers() {
    localStorage.setItem('thriftx_users', JSON.stringify(users));
}

function saveMessages() {
    localStorage.setItem('thriftx_messages', JSON.stringify(messages));
}

function saveCurrentUser() {
    localStorage.setItem('thriftx_currentUser', JSON.stringify(currentUser));
}

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('productModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeCartBtn = document.querySelector('.close-cart');
const closeModalBtns = document.querySelectorAll('.close-btn');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const brandFilter = document.getElementById('brandFilter');
const sizeFilter = document.getElementById('sizeFilter');
const conditionFilter = document.getElementById('conditionFilter');
const genderFilter = document.getElementById('genderFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
        userLocation = savedLocation;
        document.getElementById('locationSelect').value = userLocation;
        document.getElementById('locationFilter').value = userLocation;
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function saveUserLocation() {
    localStorage.setItem('userLocation', userLocation);
}


// Initialize the app
function init() {
    loadCart();
    displayProducts(applyFiltersForDisplay());
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Cart button
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Overlay
    overlay.addEventListener('click', closeAll);
    
    // Modal close buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            productModal.classList.remove('active');
            checkoutModal.classList.remove('active');
            document.getElementById('cameraModal').classList.remove('active');
            overlay.classList.remove('active');
            closeCamera();
        });
    });
    
    // Continue shopping button
    document.getElementById('continueShopping').addEventListener('click', () => {
        toggleCart();
    });
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        openCheckout();
    });
    
    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', completeCheckout);

    // Sell form
    document.getElementById('sellForm').addEventListener('submit', handleSellForm);
    
    // Authentication
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    document.getElementById('registerBtn').addEventListener('click', showRegisterModal);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('closeLogin').addEventListener('click', hideAuthModals);
    document.getElementById('closeRegister').addEventListener('click', hideAuthModals);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('showRegister').addEventListener('click', () => {
        hideAuthModals();
        showRegisterModal();
    });
    document.getElementById('showLogin').addEventListener('click', () => {
        hideAuthModals();
        showLoginModal();
    });
    
    // Messages
    document.getElementById('messagesBtn').addEventListener('click', showMessagesModal);
    document.getElementById('closeMessages').addEventListener('click', () => {
        document.getElementById('messagesModal').classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Contact
    document.getElementById('closeContact').addEventListener('click', () => {
        document.getElementById('contactModal').classList.remove('active');
        overlay.classList.remove('active');
    });
    document.getElementById('contactForm').addEventListener('submit', sendContactMessage);
    
    // Message sending
    document.getElementById('messageForm').addEventListener('submit', sendMessage);
    
    // Image upload buttons
    document.getElementById('uploadBtn').addEventListener('click', () => {
        document.getElementById('sellImage').click();
    });
    
    document.getElementById('cameraBtn').addEventListener('click', openCamera);
    
    // Camera modal
    document.getElementById('closeCamera').addEventListener('click', closeCamera);
    document.getElementById('captureBtn').addEventListener('click', capturePhoto);
    document.getElementById('doneBtn').addEventListener('click', doneCapturing);
    
    // File input change
    document.getElementById('sellImage').addEventListener('change', handleFileUpload);
    
    // Filters and search
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    locationFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    sizeFilter.addEventListener('change', applyFilters);
    conditionFilter.addEventListener('change', applyFilters);
    genderFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    // Wishlist
    document.getElementById('wishlistBtn').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Wishlist feature is active. Add items by clicking ♥ on products.');
    });
    
    // Location selector
    document.getElementById('locationSelect').addEventListener('change', (e) => {
        userLocation = e.target.value;
        saveUserLocation();
        document.getElementById('locationFilter').value = userLocation;
        applyFilters();
    });    
    // Quantity controls in modal
    document.getElementById('increaseQty').addEventListener('click', () => {
        const input = document.getElementById('quantityInput');
        input.value = Math.min(10, parseInt(input.value) + 1);
    });
    
    document.getElementById('decreaseQty').addEventListener('click', () => {
        const input = document.getElementById('quantityInput');
        input.value = Math.max(1, parseInt(input.value) - 1);
    });
}

// Display products
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-card-inner">
            <div class="product-card-face product-card-front">
                <div class="product-image"><img src="${product.images[0]}" alt="${product.name}"></div>
                <div class="product-info">
                    <div class="product-category">${product.category} • ${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">★ ${product.rating}</div>
                    <div class="product-footer">
                        <span class="product-price">₹${Math.round(product.price)}</span>
                        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id});">Add</button>
                        <button class="favorite-btn ${wishlist.includes(product.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${product.id});">♥</button>
                    </div>
                </div>
            </div>
            <div class="product-card-face product-card-back">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Size:</strong> ${product.size}</p>
                <p><strong>Condition:</strong> ${product.condition}</p>
                <p><strong>Gender:</strong> ${product.gender}</p>
                <p><em>Smart suggestion:</em> ${getPriceSuggestion(product)}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    return card;
}

// Open product modal
function openProductModal(product) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = product.images[0] || '';
    modalImage.alt = product.name;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = `${product.description} (Condition: ${product.condition} | Size: ${product.size} | Brand: ${product.brand})`;
    document.getElementById('modalRating').textContent = `★ ${product.rating} Rating`;
    document.getElementById('modalPrice').textContent = `₹${Math.round(product.price)}`;
    document.getElementById('quantityInput').value = 1;

    document.getElementById('addToCartBtn').onclick = () => {
        addToCart(product);
    };

    productModal.classList.add('active');
    overlay.classList.add('active');
}

// Add to cart
function addToCart(productOrId) {
    const product = (typeof productOrId === 'number') ? products.find(p => p.id === productOrId) : productOrId;
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantityInput')?.value || 1);
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCart();
    updateCartUI();
    showSuccessMessage(`${product.name} added to cart!`);
    productModal.classList.remove('active');
    overlay.classList.remove('active');
}

function toggleFavorite(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    saveWishlist();
    displayProducts(applyFiltersForDisplay());
    showSuccessMessage(index === -1 ? 'Added to wishlist' : 'Removed from wishlist');
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    renderCartItems();
    updateCartSummary();
    updateWishlistUI();
}

function updateWishlistUI() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${Math.round(item.price)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showSuccessMessage('Item removed from cart');
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (Math.round(item.price) * item.quantity), 0);
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('tax').textContent = `₹${tax}`;
    document.getElementById('total').textContent = `₹${total}`;
    document.getElementById('checkoutTotal').textContent = `₹${total}`;
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Open checkout modal
function openCheckout() {
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
    cartSidebar.classList.remove('active');
}

// Complete checkout
function completeCheckout(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    
    // Simulate successful checkout
    showSuccessMessage(`Order placed successfully! Confirmation sent to ${email}`);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    
    // Reset form and close modal
    document.getElementById('checkoutForm').reset();
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
}

async function handleSellForm(event) {
    event.preventDefault();

    if (capturedImages.length === 0) {
        alert('Please upload or take at least one image.');
        return;
    }

    if (capturedImages.length > 6) {
        alert('You can upload up to 6 images only.');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('sellName').value,
        category: 'Clothing',
        brand: document.getElementById('sellBrand').value,
        size: document.getElementById('sellSize').value,
        condition: document.getElementById('sellCondition').value,
        gender: document.getElementById('sellGender').value,
        price: Number(document.getElementById('sellPrice').value),
        rating: '4.5',
        description: document.getElementById('sellDesc').value,
        images: capturedImages,
        emoji: '👕', // default emoji
        location: userLocation || 'Mumbai'
    };

    products.unshift(newProduct);
    displayProducts(applyFiltersForDisplay());

    showSuccessMessage('Your listing is now live on thriftx!');
    document.getElementById('sellForm').reset();
    capturedImages = [];
    updateImagePreview();
}

// Apply filters
function applyFiltersForDisplay() {
    let filtered = [...products];
    
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }

    const category = categoryFilter.value;
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }

    const location = locationFilter.value;
    if (location) {
        filtered = filtered.filter(product => product.location === location);
    }

    const brand = brandFilter.value;
    if (brand) {
        filtered = filtered.filter(product => product.brand === brand);
    }

    const size = sizeFilter.value;
    if (size) {
        filtered = filtered.filter(product => product.size === size);
    }

    const condition = conditionFilter.value;
    if (condition) {
        filtered = filtered.filter(product => product.condition === condition);
    }

    const gender = genderFilter.value;
    if (gender) {
        filtered = filtered.filter(product => product.gender === gender);
    }

    const priceRange = priceFilter.value;
    if (priceRange) {
        filtered = filtered.filter(product => {
            if (priceRange === '0-50') return product.price <= 50;
            if (priceRange === '50-100') return product.price > 50 && product.price <= 100;
            if (priceRange === '100-500') return product.price > 100 && product.price <= 500;
            if (priceRange === '500+') return product.price > 500;
            return true;
        });
    }

    const sortBy = sortFilter.value;
    if (sortBy) {
        if (sortBy === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
        else if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
}

function applyFilters() {
    displayProducts(applyFiltersForDisplay());
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('hide');
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Close all modals and sidebar
function closeAll() {
    productModal.classList.remove('active');
    checkoutModal.classList.remove('active');
    document.getElementById('cameraModal').classList.remove('active');
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    closeCamera(); // Stop camera if open
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Camera functions
let stream = null;

async function openCamera() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');
    
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } // Use back camera if available
        });
        video.srcObject = stream;
        modal.classList.add('active');
        overlay.classList.add('active');
    } catch (err) {
        alert('Camera access denied or not available. Please use upload from gallery instead.');
        console.error('Camera error:', err);
    }
}

function closeCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    document.getElementById('cameraModal').classList.remove('active');
    overlay.classList.remove('active');
    document.getElementById('cameraVideo').srcObject = null;
}

function capturePhoto() {
    if (capturedImages.length >= 6) {
        alert('You can capture up to 6 images only.');
        return;
    }
    
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    capturedImages.push(imageDataUrl);
    
    updateCapturedImagesPreview();
}

function updateCapturedImagesPreview() {
    const container = document.getElementById('capturedImages');
    container.innerHTML = '';
    
    capturedImages.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.onclick = () => removeCapturedImage(index);
        container.appendChild(imgElement);
    });
}

function removeCapturedImage(index) {
    capturedImages.splice(index, 1);
    updateCapturedImagesPreview();
}

function doneCapturing() {
    updateImagePreview();
    closeCamera();
}

function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length > 6) {
        alert('You can upload up to 6 images only.');
        return;
    }
    
    capturedImages = []; // Reset
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            capturedImages.push(e.target.result);
            if (capturedImages.length === files.length) {
                updateImagePreview();
            }
        };
        reader.readAsDataURL(file);
    });
}

function updateImagePreview() {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    
    capturedImages.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        preview.appendChild(imgElement);
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);

// Initialize the app
function init() {
    loadData();
    loadCart();
    displayProducts(applyFiltersForDisplay());
    setupEventListeners();
}

// Authentication Functions
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    overlay.classList.add('active');
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
    overlay.classList.add('active');
}

function hideAuthModals() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('registerModal').classList.remove('active');
    overlay.classList.remove('active');
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        let data;
        try {
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                data = await res.json();
                currentUser = data.user;
            } else {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Invalid credentials');
            }
        } catch (apiErr) {
            // Fallback to localStorage users when API is unavailable
            const localUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (!localUser || localUser.password !== password) {
                throw new Error('Invalid email/password (offline mode)');
            }
            currentUser = { ...localUser, password: undefined };
        }

        saveCurrentUser();
        await syncUsers();
        await syncMessages();
        updateUserUI();
        hideAuthModals();
        showSuccessMessage(`Welcome back, ${currentUser.name}!`);
    } catch (err) {
        alert(err.message);
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const userType = document.getElementById('userType').value;

    try {
        let registeredUser;
        try {
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password, userType })
            });

            if (res.ok) {
                const data = await res.json();
                registeredUser = data.user;
            } else {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Registration failed');
            }
        } catch (apiErr) {
            const existingLocalUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingLocalUser) {
                throw new Error('Email already registered (offline mode)');
            }
            registeredUser = { id: Date.now(), name, email, phone, password, userType };
            users.push(registeredUser);
            saveUsers();
        }

        currentUser = { ...registeredUser, password: undefined };
        saveCurrentUser();
        await syncUsers();
        updateUserUI();
        hideAuthModals();
        showSuccessMessage(`Welcome to thriftx, ${name}!`);
    } catch (err) {
        alert(err.message);
    }
}

function updateUserUI() {
    const userSection = document.getElementById('userSection');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        userSection.style.display = 'none';
        userProfile.style.display = 'flex';
        userName.textContent = currentUser.name;
        updateMessageCount();
    } else {
        userSection.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('thriftx_currentUser');
    updateUserUI();
    showSuccessMessage('Logged out successfully');
}

// Messaging Functions
function showMessagesModal() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    loadConversations();
    document.getElementById('messagesModal').classList.add('active');
    overlay.classList.add('active');
}

function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    conversationsList.innerHTML = '<h3>Conversations</h3>';
    
    // Get unique conversations for current user
    const userMessages = messages.filter(m => 
        m.senderId === currentUser.id || m.receiverId === currentUser.id
    );
    
    const conversations = {};
    
    userMessages.forEach(msg => {
        const otherUserId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
        const otherUser = users.find(u => u.id === otherUserId);
        
        if (!conversations[otherUserId]) {
            conversations[otherUserId] = {
                user: otherUser,
                lastMessage: msg,
                unread: msg.receiverId === currentUser.id && !msg.read ? 1 : 0
            };
        } else {
            if (msg.timestamp > conversations[otherUserId].lastMessage.timestamp) {
                conversations[otherUserId].lastMessage = msg;
            }
            if (msg.receiverId === currentUser.id && !msg.read) {
                conversations[otherUserId].unread++;
            }
        }
    });
    
    Object.values(conversations).forEach(conv => {
        const convItem = document.createElement('div');
        convItem.className = 'conversation-item';
        convItem.onclick = () => openChat(conv.user.id);
        
        convItem.innerHTML = `
            <div class="conv-name">${conv.user.name}</div>
            <div class="conv-last-msg">${conv.lastMessage.message.substring(0, 30)}...</div>
            ${conv.unread > 0 ? `<div class="unread-count">${conv.unread}</div>` : ''}
        `;
        
        conversationsList.appendChild(convItem);
    });
    
    if (Object.keys(conversations).length === 0) {
        conversationsList.innerHTML += '<p>No conversations yet</p>';
    }
}

function openChat(otherUserId) {
    const otherUser = users.find(u => u.id === otherUserId);
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    
    // Mark messages as read
    messages.forEach(msg => {
        if (msg.senderId === otherUserId && msg.receiverId === currentUser.id) {
            msg.read = true;
        }
    });
    saveMessages();
    updateMessageCount();
    
    // Load chat messages
    const conversation = messages.filter(m => 
        (m.senderId === currentUser.id && m.receiverId === otherUserId) ||
        (m.senderId === otherUserId && m.receiverId === currentUser.id)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    chatMessages.innerHTML = '';
    conversation.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`;
        msgDiv.innerHTML = `
            <div class="message-sender">${msg.senderId === currentUser.id ? 'You' : otherUser.name}</div>
            <div>${msg.message}</div>
            <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(msgDiv);
    });
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.style.display = 'flex';
    
    // Set up send message
    document.getElementById('sendMessageBtn').onclick = () => sendMessage(otherUserId);
    document.getElementById('messageInput').onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage(otherUserId);
    };
}

async function sendMessage(receiverId) {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    try {
        const res = await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId: currentUser.id, receiverId, message })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not send message');

        messages.push(data.message);
        saveMessages();
        
        const chatMessages = document.getElementById('chatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message sent';
        msgDiv.innerHTML = `
            <div class="message-sender">You</div>
            <div>${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        messageInput.value = '';
        await updateMessageCount();
    } catch (err) {
        alert(err.message);
    }
}

function updateMessageCount() {
    if (!currentUser) return;
    
    const unreadCount = messages.filter(m => 
        m.receiverId === currentUser.id && !m.read
    ).length;
    
    document.getElementById('messageCount').textContent = unreadCount;
}

// Contact Seller Functions
function contactSeller(productId) {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // For demo, assume seller is a registered user (we'll use a mock seller)
    const seller = users.find(u => u.userType === 'seller' || u.userType === 'both') || {
        id: 999,
        name: 'Demo Seller',
        email: 'seller@thriftx.com'
    };
    
    document.getElementById('contactProductName').textContent = product.name;
    document.getElementById('contactSellerName').textContent = seller.name;
    document.getElementById('contactProductPrice').textContent = product.price;
    
    document.getElementById('contactModal').classList.add('active');
    overlay.classList.add('active');
    
    document.getElementById('contactForm').onsubmit = (e) => {
        e.preventDefault();
        sendContactMessage(seller.id, product);
    };
}

async function sendContactMessage(sellerId, product) {
    const messageText = document.getElementById('contactMessage').value;
    const message = `Regarding: ${product.name}\nPrice: ₹${product.price}\n\n${messageText}`;

    try {
        const res = await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId: currentUser.id, receiverId: sellerId, message })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not send message');

        messages.push(data.message);
        saveMessages();

        document.getElementById('contactModal').classList.remove('active');
        overlay.classList.remove('active');
        showSuccessMessage('Message sent to seller!');
        updateMessageCount();
    } catch (err) {
        alert(err.message);
    }
}
