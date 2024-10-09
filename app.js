let cart = [];
let total = 0;

function addToCart(productName, price) {
    const product = { name: productName, price: price };
    cart.push(product);
    total += price;
    document.getElementById('cart-total').innerText = total.toFixed(2);
    renderCart();
    saveCartToLocalStorage(); // Guardar carrito en localStorage
}

function removeFromCart(index) {
    total -= cart[index].price; // Resta el precio del total
    cart.splice(index, 1); // Elimina el ítem del carrito
    document.getElementById('cart-total').innerText = total.toFixed(2); // Actualiza el total
    saveCartToLocalStorage(); // Guarda el carrito actualizado en localStorage
    renderCart(); // Renderiza el carrito
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar el contenido actual del carrito
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(listItem);
    });
}

function openModal(coffeeName, coffeeDescription) {
    document.getElementById('modal-coffee-title').textContent = coffeeName;
    document.getElementById('modal-coffee-description').textContent = coffeeDescription;
    document.getElementById('coffeeModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('coffeeModal').style.display = 'none';
}

function setupCoffeeImages() {
    const coffeeCards = document.querySelectorAll('.product-card');
    coffeeCards.forEach(card => {
        const image = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        const description = getCoffeeDescription(title);
        image.addEventListener('click', () => openModal(title, description));
    });
}

function getCoffeeDescription(coffeeName) {
    const descriptions = {
        'Café Americano': 'Un café negro fuerte, hecho con agua caliente y café molido.',
        'Café Latte': 'Un espresso con leche vaporizada, suave y cremoso.',
        'Capuchino': 'Una mezcla equilibrada de espresso, leche vaporizada y espuma de leche.',
        'Café con Leche': 'Café negro mezclado con leche caliente al gusto.',
        'Espresso': 'Café fuerte y concentrado, servido en una pequeña porción.'
    };
    return descriptions[coffeeName] || 'Descripción no disponible.';
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = savedCart;
    total = parseFloat(localStorage.getItem('total')) || 0;
    document.getElementById('cart-total').innerText = total.toFixed(2);
    renderCart();
}

function toggleCart() {
    const cartModal = document.getElementById('cart');
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = 'block';
    }
}

// Cargar el carrito al iniciar
window.onload = () => {
    setupCoffeeImages();
    loadCartFromLocalStorage(); // Cargar carrito al iniciar
};

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Para abrir los modales, necesitarás funciones específicas:
function openCart() {
    document.getElementById('cart').style.display = "block";
}

function openCoffeeModal() {
    document.getElementById('coffeeModal').style.display = "block";
}

function redirectToLogin() {
    window.location.href = "login.html"; // Cambia a la URL de tu página de login
}

function shareContent() {
    const url = window.location.href; // URL de la página actual
    const text = "¡Mira este increíble café!"; // Texto a compartir

    // Ejemplo de compartir en Facebook
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank');

    // También puedes agregar opciones para otras redes sociales aquí
}
