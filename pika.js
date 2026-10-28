// Food Item Data
const foodItems = [
    { id: 1, name: "Burger", category: "Snacks",
      price: 120, image: "burger.jpg" },

    { id: 2, name: "Pizza", category: "Snacks",
      price: 200, image: "pizza.jpg" },

    { id: 3, name: "Meals", category: "Meals",
      price: 100, image: "meals.jpg" }
];

let cart = [];

// Display Food Items
function displayFood(items) {
    const container =
        document.getElementById("foodContainer");

    container.innerHTML = items.map(item => `
        <div class="food-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.category}</p>
            <p>Price: ₹${item.price}</p>
            <button onclick="addToCart(${item.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// Search Food Items
document.getElementById("searchInput")
    .addEventListener("input", function () {
        const keyword = this.value.toLowerCase();

        const results = foodItems.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );

        displayFood(results);
    });

// Filter Food by Category
function filterByCategory(category) {
    const results = category === "All"
        ? foodItems
        : foodItems.filter(item =>
            item.category === category
        );

    displayFood(results);
}

// Add Items to Cart
function addToCart(id) {
    const food = foodItems.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    updateCart();
}

// Update Quantity
function changeQuantity(id, amount) {
    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    updateCart();
}

// Remove Items from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Calculate Total Amount and Display Cart
function updateCart() {
    document.getElementById("cartItems").innerHTML =
        cart.map(item => `
            <p>${item.name} × ${item.quantity}
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
            — ₹${item.price * item.quantity}</p>
        `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("totalAmount").textContent =
        "Total: ₹" + total;
}

// Submit Order
function submitOrder() {
    if (cart.length === 0) {
        alert("Please add food items to your cart.");
        return;
    }

    alert("Your order has been submitted successfully!");
    cart = [];
    updateCart();
}

// Initial Display
displayFood(foodItems);