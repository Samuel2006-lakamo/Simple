import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suit: add to cart", () => {
    it("adds an existing product to the cart", () => {});
    it("add a new product", () => {
        spyOn(localStorage, "setItem");
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        
    });
});
