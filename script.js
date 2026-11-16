// --- СИСТЕМА НАВИГАЦИИ (SPA) ---
function showScreen(screenName) {
    // Скрываем все контейнеры
    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
    // Показываем нужный
    document.getElementById('screen-' + screenName).classList.remove('hidden');
    // Если открываем корзину - обновляем её
    if (screenName === 'cart') renderCart();
}

// --- ЛОГИКА ТОВАРА ---
function showProduct(title, price, img, spec1, spec2) {
    document.getElementById('prod-title').textContent = title;
    document.getElementById('prod-price').textContent = price.toLocaleString() + ' ₽';
    document.getElementById('prod-img').src = img;
    document.getElementById('prod-spec1').textContent = spec1;
    document.getElementById('prod-spec2').textContent = spec2;

    // Привязываем кнопку "Добавить в корзину"
    const btn = document.getElementById('prod-add-btn');
    // Удаляем старый обработчик (если был) и вешаем новый
    btn.onclick = function() { addToCart(title, price, img); };
    
    showScreen('product');
}

// --- ЛОГИКА КОРЗИНЫ ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cart-count-header').textContent = cart.length;
}

function addToCart(title, price, img) {
    cart.push({ title, price, img });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Товар "${title}" добавлен в корзину!`);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalCount = document.getElementById('total-count');
    const totalPrice = document.getElementById('total-price');
    const finalPrice = document.getElementById('final-price');

    container.innerHTML = ''; // Очищаем старый вывод

    if (cart.length === 0) {
        container.innerHTML = '<p style="font-size: 18px; color: #888;">Ваша корзина пуста.</p>';
        totalCount.textContent = 0;
        totalPrice.textContent = '0 ₽';
        finalPrice.textContent = '0 ₽';
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
    totalCount.textContent = cart.length;
    totalPrice.textContent = sum.toLocaleString() + ' ₽';
    finalPrice.textContent = sum.toLocaleString() + ' ₽';
}

function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    alert('Заказ оформлен! Спасибо за покупку.');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showScreen('home');
}

// --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    showScreen('home'); // По умолчанию открываем главную
});
