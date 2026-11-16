document.addEventListener('DOMContentLoaded', () => {
    window.showScreen = function(screenName) {
        const screens = document.querySelectorAll('.container');
        screens.forEach(screen => screen.classList.add('hidden'));
        const targetScreen = document.getElementById('screen-' + screenName);
        if (targetScreen) targetScreen.classList.remove('hidden');
        if (screenName === 'cart') renderCart();
    };

    window.showProduct = function(title, price, img, spec1, spec2) {
        document.getElementById('prod-title').textContent = title;
        document.getElementById('prod-price').textContent = price.toLocaleString() + ' ₽';
        document.getElementById('prod-img').src = img;
        document.getElementById('prod-spec1').textContent = spec1;
        document.getElementById('prod-spec2').textContent = spec2;
        const btn = document.getElementById('prod-add-btn');
        btn.onclick = function() { addToCart(title, price, img); };
        showScreen('product');
    };

    let cart = [];
    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) cart = JSON.parse(storedCart);
    } catch (e) { cart = []; }

    function updateCartCount() {
        const counter = document.getElementById('cart-count-header');
        if (counter) counter.textContent = cart.length;
    }

    window.addToCart = function(title, price, img) {
        cart.push({ title, price, img });
        try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
        updateCartCount();
        alert(`Товар "${title}" добавлен в корзину!`);
    };

    function renderCart() {
        const container = document.getElementById('cart-items');
        const totalCountEl = document.getElementById('total-count');
        const totalPriceEl = document.getElementById('total-price');
        const finalPriceEl = document.getElementById('final-price');
        if (!container) return;
        container.innerHTML = '';
        if (cart.length === 0) {
            container.innerHTML = '<p style="font-size: 18px; color: #888;">Ваша корзина пуста.</p>';
            if (totalCountEl) totalCountEl.textContent = 0;
            if (totalPriceEl) totalPriceEl.textContent = '0 ₽';
            if (finalPriceEl) finalPriceEl.textContent = '0 ₽';
            return;
        }
        let sum = 0;
        cart.forEach((item) => {
            sum += item.price;
            container.innerHTML += `
                <div class="card" style="flex-direction: row; align-items: center; padding: 15px;">
                    <img src="${item.img}" alt="${item.title}" style="width: 100px; height: 100px; margin-bottom: 0; margin-right: 20px;">
                    <div style="flex: 1;">
                        <h3 style="margin-bottom: 5px;">${item.title}</h3>
                        <div class="price" style="margin-bottom: 0;">${item.price.toLocaleString()} ₽</div>
                    </div>
                </div>
            `;
        });
        if (totalCountEl) totalCountEl.textContent = cart.length;
        if (totalPriceEl) totalPriceEl.textContent = sum.toLocaleString() + ' ₽';
        if (finalPriceEl) finalPriceEl.textContent = sum.toLocaleString() + ' ₽';
    }

    window.checkout = function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        alert('Заказ оформлен! Спасибо за покупку.');
        cart = [];
        try { localStorage.removeItem('cart'); } catch (e) {}
        updateCartCount();
        showScreen('home');
    };

    updateCartCount();
    showScreen('home');
});
