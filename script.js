// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
    
    // Also handle collection cards and product cards that might need reveal
    const collectionCards = document.querySelectorAll('.collection-card:not(.reveal)');
    const productCards = document.querySelectorAll('.product-card:not(.reveal)');
    
    [...collectionCards, ...productCards].forEach(card => {
        const windowHeight = window.innerHeight;
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 200;
        
        // Cards already have their own fade-in animation, but we can enhance visibility
        if (cardTop < windowHeight - cardVisible && !card.classList.contains('visible')) {
            card.classList.add('visible');
        }
    });
}

// Use Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    // Initial check for elements already in view
    reveal();
});

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Cart functionality
let cartCount = 0;
let currentQuantity = 1;

function addToCart(productName, price) {
    cartCount++;
    const cartCounter = document.getElementById('cartCounter');
    cartCounter.textContent = cartCount;
    
    // Trigger bounce animation
    cartCounter.classList.remove('updated');
    // Force reflow to restart animation
    void cartCounter.offsetWidth;
    cartCounter.classList.add('updated');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        cartCounter.classList.remove('updated');
    }, 500);
    
    // Show notification
    showNotification(`${productName} added to cart!`);
}

function addToCartFromModal() {
    const title = document.getElementById('modalTitle').textContent;
    const price = document.getElementById('modalPrice').textContent;
    const qty = currentQuantity;
    
    cartCount += qty;
    const cartCounter = document.getElementById('cartCounter');
    cartCounter.textContent = cartCount;
    
    // Trigger bounce animation
    cartCounter.classList.remove('updated');
    // Force reflow to restart animation
    void cartCounter.offsetWidth;
    cartCounter.classList.add('updated');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        cartCounter.classList.remove('updated');
    }, 500);
    
    closeModal();
    showNotification(`${qty}x ${title} added to cart!`);
}

function showNotification(message) {
    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Quick View Modal
function openQuickView(title, price, productId) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('quickViewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('quickViewModal').classList.remove('active');
    document.body.style.overflow = '';
    currentQuantity = 1;
    document.getElementById('quantityValue').textContent = '1';
}

// Quantity controls
function incrementQuantity() {
    currentQuantity++;
    document.getElementById('quantityValue').textContent = currentQuantity;
}

function decrementQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantityValue').textContent = currentQuantity;
    }
}

// Size selection
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Thumbnail gallery
document.querySelectorAll('.modal-thumbnail').forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
        document.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Size Guide Modal
function openSizeGuide(e) {
    e.preventDefault();
    document.getElementById('sizeGuideModal').classList.add('active');
}

function closeSizeGuide() {
    document.getElementById('sizeGuideModal').classList.remove('active');
}

// Close modals on outside click
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Newsletter form
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Hide form and show success message
    this.style.display = 'none';
    document.getElementById('newsletterSuccess').classList.add('active');
    
    // Reset after 5 seconds
    setTimeout(() => {
        this.style.display = 'block';
        document.getElementById('newsletterSuccess').classList.remove('active');
        this.reset();
    }, 5000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
