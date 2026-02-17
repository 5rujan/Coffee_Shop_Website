// Cart Logic
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-price');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartTable = document.querySelector('.cart__table');
const checkoutBtn = document.getElementById('checkout-btn');

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    if (cartItemsContainer) {
        loadCart();
    }
    updateCartIcon();
});

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    alert(`${name} added to cart!`);
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="cart__product">
                <img src="${item.image}" alt="${item.name}" class="cart__img">
                <span>${item.name}</span>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="cart__quantity">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><i class="ri-delete-bin-line cart__remove" onclick="removeFromCart('${item.id}')"></i></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = `$${total.toFixed(2)}`;
    cartTable.style.display = 'table';
    checkoutBtn.style.display = 'inline-flex';
    emptyCartMsg.style.display = 'none';
}

function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartIcon();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartIcon();
}

function showEmptyCart() {
    cartTable.style.display = 'none';
    checkoutBtn.style.display = 'none';
    emptyCartMsg.style.display = 'block';
    
    // Also hide the total
    if(document.querySelector('.cart__total')) {
         document.querySelector('.cart__total').style.display = 'none';
    }
}

function updateCartIcon() {
    // This function would update a badge in the header if we had one
    // For now, it just ensures the logic is ready
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    // You could update a DOM element here with totalItems
}
