let cartCount = 0;
let cart = document.getElementById("cart-count");
let popup = document.getElementById("popup");

let navLinks = document.querySelectorAll("nav a");
let cartButton = document.getElementById("cart-btn");
let mainContent = document.getElementById("main-content");

let cartPage = document.getElementById("cart-page");
let detailPage = document.getElementById("detail-page");
let cartItems = document.getElementById("cart-items");
let emptyMsg = document.getElementById("empty-msg");

let totalPrice = 0;
let total = document.getElementById("total-price");
let buttons = document.querySelectorAll(".flower-card button");
let footer = document.querySelector("footer");
let totalItems = document.getElementById("total-items");
let shopBtn = document.getElementById("shop-btn");

shopBtn.addEventListener("click", function () {
    cartPage.style.display = "none";
    mainContent.style.display = "block";
    detailPage.style.display = "none";
    footer.style.display = "block";

    document.getElementById("shop").scrollIntoView({
        behavior: "smooth"
    });
});

function updateItemsCount() {
    let totalQty = 0;

    let allQty = cartItems.querySelectorAll(".qty");

    allQty.forEach(function (q) {
        totalQty += parseInt(q.textContent);
    });

    totalItems.textContent = "Items: " + totalQty;
}

function saveCart() {
    localStorage.setItem("cart-Data", cartItems.innerHTML);
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cartCount", cartCount);
}

function checkCartEmpty() {
    let shopBtn = document.getElementById("shop-btn");

    let items = cartItems.querySelectorAll(".cart-item");

    if (items.length === 0) {
        emptyMsg.style.display = "block";
        shopBtn.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
        shopBtn.style.display = "none";
    }
}

function loadCart() {
    let savedData = localStorage.getItem("cart-Data");

    cartItems.innerHTML = savedData ? savedData : "";
    let savedCount = localStorage.getItem("cartCount");
    cartCount = savedCount ? parseInt(savedCount) : cartItems.children.length;
    cart.textContent = cartCount;
    updateItemsCount();
    totalPrice = 0;

    let allCartItems = cartItems.querySelectorAll(".cart-item");

    allCartItems.forEach(function (item) {

        let priceElement = item.querySelector(".price");
        let qtyElement = item.querySelector(".qty");

        if (!priceElement || !qtyElement) return;

        let price = parseInt(priceElement.textContent.replace("₹", ""));
        let qty = parseInt(qtyElement.textContent);

        totalPrice += price * qty;
    });

    total.textContent = "Total: ₹" + totalPrice;

    checkCartEmpty();


    let allRemoveBtns = document.querySelectorAll(".remove-btn");
    allRemoveBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let li = btn.parentElement.parentElement;
            let priceElement = li.querySelector(".price");

            if (!priceElement) return;

            let priceText = priceElement.textContent;
            let numericPrice = parseInt(priceText.replace("₹", ""));

            li.remove();
            cartCount--;
            cart.textContent = cartCount;
            let currentQty = parseInt(li.querySelector(".qty").textContent);
            totalPrice -= numericPrice * currentQty;;
            total.textContent = "Total: ₹" + totalPrice;

            saveCart();
            checkCartEmpty();
            updateItemsCount();
        });
    });
    let allItems = cartItems.querySelectorAll("li");

    cartItems.addEventListener("click", function (e) {

        let li = e.target.closest("li");
        if (!li) return;

        if (
            e.target.classList.contains("plus") ||
            e.target.classList.contains("minus") ||
            e.target.classList.contains("remove-btn")
        ) {
            return;
        }

        let name = li.querySelector("h4").textContent;
        let price = li.querySelector(".price").textContent;
        let image = li.querySelector("img").src;
        let rating = li.querySelector(".rating").textContent;

        selectedItem = { name, price, image, rating };

        detailName.textContent = name;
        detailPrice.textContent = price;
        detailImg.src = image;
        document.getElementById("detail-old-price").textContent = "";

        mainContent.style.display = "none";
        cartPage.style.display = "none";
        detailPage.style.display = "block";
        footer.style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    allItems.forEach(function (li) {

        let priceElement = li.querySelector(".price");

        if (!priceElement) return;

        let priceText = priceElement.textContent;
        let numericPrice = parseInt(priceText.replace("₹", ""));

        let qty = li.querySelector(".qty");
        let plus = li.querySelector(".plus");
        let minus = li.querySelector(".minus");

        // PLUS BUTTON
        plus.addEventListener("click", function () {
            let currentQty = parseInt(qty.textContent);
            currentQty++;
            qty.textContent = currentQty;

            totalPrice += numericPrice;
            total.textContent = "Total: ₹" + totalPrice;
            updateItemsCount();
            saveCart();

        });

        // MINUS BUTTON
        minus.addEventListener("click", function () {
            let currentQty = parseInt(qty.textContent);

            if (currentQty > 1) {
                currentQty--;
                qty.textContent = currentQty;
                totalPrice -= numericPrice;
            } else {
                totalPrice -= numericPrice;

                li.remove();
                cartCount--;
                cart.textContent = cartCount;
            }

            total.textContent = "Total: ₹" + totalPrice;

            checkCartEmpty();
            updateItemsCount();
            saveCart();
        });

    });
}



cartButton.addEventListener("click", function (e) {
    e.preventDefault();
    mainContent.style.display = "none";
    cartPage.style.display = "flex";
    detailPage.style.display = "none";

    footer.style.display = "none";
    checkCartEmpty();
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (link.id !== "cart-btn") {
            mainContent.style.display = "block";
            cartPage.style.display = "none";
            detailPage.style.display = "none";
            footer.style.display = "block";
        }
    })
})

let form = document.querySelector("#contact form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent successfully 🌸");
});

loadCart();

let clearBtn = document.getElementById("clear-cart");
let checkoutBtn = document.getElementById("checkout");

clearBtn.addEventListener("click", function () {
    cartItems.innerHTML = "";
    totalPrice = 0;
    cartCount = 0;
    total.textContent = "Total: ₹0";
    cart.textContent = "0";
    checkCartEmpty();
    localStorage.removeItem("cart-Data");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("cartCount");
    updateItemsCount();
});

checkoutBtn.addEventListener("click", function () {
    if (cartItems.children.length === 0) {
        alert("Cart is empty 😢");
    } else {
        alert("Order placed successfully 🎉🌸")
    }
})


let cards = document.querySelectorAll(".flower-card");
let detailImg = document.getElementById("detail-img");
let detailName = document.getElementById("detail-name");
let detailPrice = document.getElementById("detail-price");

let selectedItem = {};

cards.forEach(function (card) {
    card.addEventListener("click", function () {

        let name = card.querySelector("h3").textContent;
        let price = card.querySelector("p").textContent;
        let image = card.querySelector("img").src;
        let oldPriceElement = card.querySelector(".old-price");
        let oldPrice = oldPriceElement ? oldPriceElement.textContent : "";
        let rating = card.querySelector(".rating").textContent;
        selectedItem = { name, price, image, rating };

        detailName.textContent = name;
        document.getElementById("detail-price").textContent = price;
        document.getElementById("detail-old-price").textContent = oldPrice;
        detailImg.src = image;

        mainContent.style.display = "none";
        cartPage.style.display = "none";
        detailPage.style.display = "block";
        footer.style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

document.getElementById("detail-add").addEventListener("click", function () {
    let itemName = selectedItem.name;
    let price = selectedItem.price;
    let numericPrice = parseInt(price.replace("₹", ""));
    let image = selectedItem.image;
    let rating = selectedItem.rating;

    let existingItem = Array.from(cartItems.children).find(function (item) {
        let title = item.querySelector(".cart-item h4");
        return title && title.textContent === itemName;
    });

    if (existingItem) {
        let qty = existingItem.querySelector(".qty");
        let currentQty = parseInt(qty.textContent);

        currentQty++;
        qty.textContent = currentQty;

        totalPrice += numericPrice;
        total.textContent = "Total: ₹" + totalPrice;
        updateItemsCount();
        saveCart();
        return;
    }

    let li = document.createElement("li");


    li.innerHTML = `
<div class="cart-item">

  <div class="cart-item-top">
    <img src="${image}">

    <div class="cart-info">
      <h4>${itemName}</h4>
      <p class="price">${price}</p>
      <p class="rating">${rating}</p>
    </div>
  </div>

  <div class="cart-bottom-row">
    <div class="cart-qty">
      <button class="minus">-</button>
      <span class="qty">1</span>
      <button class="plus">+</button>
    </div>

    <button class="remove-btn">Remove</button>
  </div>

</div>
`;

    cartItems.appendChild(li);

    let qty = li.querySelector(".qty");
    let plus = li.querySelector(".plus");
    let minus = li.querySelector(".minus");

    plus.addEventListener("click", function () {
        let currentQty = parseInt(qty.textContent);
        currentQty++;
        qty.textContent = currentQty;

        totalPrice += numericPrice;
        total.textContent = "Total: ₹" + totalPrice;
        updateItemsCount();
        saveCart();
    });

    minus.addEventListener("click", function () {
        let currentQty = parseInt(qty.textContent);

        if (currentQty > 1) {
            currentQty--;
            qty.textContent = currentQty;

            totalPrice -= numericPrice;
        }
        else {
            totalPrice -= numericPrice;

            li.remove();
            cartCount--;
            cart.textContent = cartCount;
        }

        total.textContent = "Total: ₹" + totalPrice;

        checkCartEmpty();
        updateItemsCount();
        saveCart();
    });

    let removeBtn = li.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function () {
        let qty = li.querySelector(".qty");
        let currentOty = parseInt(qty.textContent);

        li.remove();
        cartCount--;
        cart.textContent = cartCount;

        totalPrice -= (numericPrice * currentOty);
        total.textContent = "Total: ₹" + totalPrice;

        checkCartEmpty();
        updateItemsCount();
        saveCart();
    });

    cartCount++;
    cart.textContent = cartCount;
    emptyMsg.style.display = "none";
    checkCartEmpty();

    totalPrice += numericPrice;
    total.textContent = "Total: ₹" + totalPrice;

    saveCart();
    updateItemsCount();
    alert("Added to cart 🌸");
});




function goBack() {
    detailPage.style.display = "none";
    mainContent.style.display = "block";
    footer.style.display = "block";
}