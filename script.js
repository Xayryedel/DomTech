let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const counts = document.querySelectorAll('.cart-icon');
    counts.forEach(el => {
        el.textContent = `Корзина (${cart.length})`;
    });
}

function addToCart(title, price, img) {
    cart.push({ title, price, img });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Товар "${title}" добавлен в корзину!`);
}

document.addEventListener('DOMContentLoaded', updateCartCount);