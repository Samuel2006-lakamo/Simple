import {
    cart,
    addToCart,
    removeFromCart,
    calculateCartQuantity,
    updateQuantity
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let cartSummaryHTML = "";
cart.forEach(cartItem => {
    const productId = cartItem.productId;
    let matchingItem;

    products.forEach(product => {
        if (product.id === productId) {
            matchingItem = product;
        }
    });

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
<div class="delivery-date">
Delivery date: Tuesday, June 21
</div>
<div class="cart-item-details-grid">
<img class="product-image"
src="${matchingItem.image}">

    <div class="cart-item-details">
<div class="${matchingItem.name}">
Black and Gray Athletic Cotton Socks - 6 Pairs
</div>
<div class="product-price">
$${formatCurrency(matchingItem.priceCents)}
</div>
<div class="product-quantity">
<span>
Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
</span>
<span class="update-quantity-link link-primary js-update-link" data-product-id="${
        matchingItem.id
    }">
Update
</span>
<input class="quantity-input js-input-${matchingItem.id}">
<span class="save-quantity-link link-primary js-save" data-product-id="${
        matchingItem.id
    }">Save</span>
<span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
        matchingItem.id
    }">
Delete
</span>
</div>
</div>

<div class="delivery-options">
<div class="delivery-options-title">
Choose a delivery option:
</div>
<div class="delivery-option">
<input type="radio" checked
class="delivery-option-input"
name="delivery-option-${matchingItem.id}">
<div>
<div class="delivery-option-date">
Tuesday, June 21
</div>
<div class="delivery-option-price">
FREE Shipping
</div>
</div>
</div>
<div class="delivery-option">
<input type="radio"
class="delivery-option-input"
name="delivery-option-${matchingItem.id}">
<div>
<div class="delivery-option-date">
Wednesday, June 15
</div>
<div class="delivery-option-price">
$4.99 - Shipping
</div>
</div>
</div>
<div class="delivery-option">
<input type="radio"
class="delivery-option-input"
name="delivery-option-${matchingItem.id}">
<div>
<div class="delivery-option-date">
Monday, June 13
</div>
<div class="delivery-option-price">
$9.99 - Shipping
</div>
</div>
</div>
</div>
</div>
</div>`;
});
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
document.querySelectorAll(".js-update-link").forEach(link => {
    link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        console.log(productId);
        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.classList.add("is-editing-quantity");
    });
});
document.querySelectorAll(".save-quantity-link").forEach(link => {
    link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.classList.remove("is-editing-quantity");
        let newQuantity = document.querySelector(
            `.js-input-${productId}`
        ).value;
        newQuantity = Number(newQuantity);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
            updateQuantity(productId, newQuantity);

        updateQuantity(productId, newQuantity);

        updateCartQuantity();
    });
});
document.querySelectorAll(".js-delete-link").forEach(link => {
    link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.remove();
        updateCartQuantity();
        // document.querySelector(
        //         ".js-checkout-items"
        //     ).innerText = `${showCheckout()} items`;
    });
});

function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(
        ".js-checkout-items"
    ).innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();

// document.querySelector(
//     ".js-checkout-items"
// ).innerText = `${showCheckout()} items`;
