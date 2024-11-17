document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "PC", price: 125.99, image: "photos/product1.jpg" },
        { id: 2, name: "Keyboard", price: 29.99, image: "photos/keyboard.png" },
        { id: 3, name: "Monitor", price: 50.99, image: "photos/monitor.png" },
        { id: 4, name: "PC 2", price: 170, image: "photos/product1.jpg" },
        { id: 5, name: "Headset", price: 21.57, image: "photos/headset.png" },
        { id: 6, name: "mouse", price: 15.45, image: "photos/mouse.png" },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productGrid = document.getElementById('product-grid');
    const filterInput = document.getElementById('product-filter');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');


    function renderProducts(filteredProducts = products) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            const productHTML = `
                <article class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </article>
            `;
            productGrid.innerHTML += productHTML;
        });


        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                addToCart(productId);
            });
        });
    }


    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} has been added to the cart.`);
        }
    }


    function renderCart() {
        if (!cartItems) return;
        cartItems.innerHTML = '';
        cart.forEach((product, index) => {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                </div>
            `;
            cartItems.innerHTML += cartItemHTML;
        });


        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productIndex = parseInt(button.dataset.index);
                removeFromCart(productIndex);
            });
        });

        updateCartTotal();
    }


    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }


    function updateCartTotal() {
        if (!cartTotal) return;
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }


    function filterProducts(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }


    if (productGrid) renderProducts();
    if (cartItems) renderCart();
    if (filterInput) {
        filterInput.addEventListener('input', filterProducts);
    }
});
