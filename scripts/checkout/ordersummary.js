import {
    cart,
    addToCart,
    removeFromCart,
    calculateCartQuantity,
    updateDeliveryOption,
    updateQuantity
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayJs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
    deliveryOptions,
    getDeliveryOption
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";
export function renderOrderSummary() {
    let cartSummaryHTML = "";
    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        let matchingItem = getProduct(productId);

        let deliveryOptionId = cartItem.deliveryId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayJs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM D ");
        cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
<div class="delivery-date">
Delivery date: ${dateString}
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
Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${
            cartItem.quantity
        }</span>
</span>
<span class="update-quantity-link link-primary js-update-link" data-product-id="${
            matchingItem.id
        }">
Update
</span>
<input class="quantity-input js-input-${matchingItem.id}" type="number">
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
${deliveryOptionHTML(matchingItem, cartItem)}


</div>
</div>
</div>
</div>
</div>`;
    });
    function deliveryOptionHTML(matchingItem, cartItem) {
        let html = "";
        deliveryOptions.forEach(deliveryOption => {
            const today = dayJs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
            const dateString = deliveryDate.format("dddd, MMMM D ");
            const priceString =
                deliveryOption.priceCents === 0
                    ? "Free - Shipping"
                    : `$${formatCurrency(
                          deliveryOption.priceCents
                      )} - Shipping`;
            const isChecked = deliveryOption.id === cartItem.deliveryId;
            html += `<div class="delivery-option js-delivery-option" data-product-id="${
                matchingItem.id
            }"
        data-delivery-option-id="${deliveryOption.id}">
<input type="radio"
${isChecked ? "Checked" : ""}
class="delivery-option-input"
name="delivery-option-${matchingItem.id}">
<div>
<div class="delivery-option-date">
${dateString}
</div>
<div class="delivery-option-price">
${priceString}
</div>
</div>
</div>
    `;
        });
        return html;
    }
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
            document.querySelector(
                `.js-quantity-label-${productId}`
            ).innerHTML = updateQuantity(productId, newQuantity);

            updateQuantity(productId, newQuantity);

            updateCartQuantity();
            renderPaymentSummary();
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
            renderPaymentSummary();
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
    document.querySelectorAll(".js-delivery-option").forEach(element => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
renderOrderSummary();
