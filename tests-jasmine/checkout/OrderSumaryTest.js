import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suit: renderOrderSummary", () => {
    it("display the cart", () => {
        document.querySelector(".js-test-container").innerHTML = `<div class="js-order-summary"></div>`;
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e4363'8ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryId: "1"
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryId: "2"
                }
            ]);
        });
        loadFromStorage();
        renderOrderSummary();
    });
});
