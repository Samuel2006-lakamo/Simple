const cart = {
    cartItem: undefined,
    loadFromStorage: function () {
        this.cartItem = JSON.parse(localStorage.getItem("cart-oop"));
        if (!this.cartItem) {
            this.cartItem = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryId: "1"
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryId: "2"
                }
            ];
        }
    },
    saveToStorage: function () {
        localStorage.setItem("cart-oop", JSON.stringify(this.cartItem));
    },
    addToCart: function (productId, quantity) {
        let matchingItem;
        this.cartItem.forEach(cartItem => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItem.push({
                productId,
                quantity: quantity,
                deliveryId: "1"
            });
        }
        this.saveToStorage();
    },
    removeFromCart: function (productId) {
        let newCart = [];
        this.cartItem.forEach(cartItem => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
            this.cartItem = newCart;
            this.saveToStorage();
        });
    },
    calculateCartQuantity: function () {
        let cartQuantity = 0;

        this.cartItem.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    },
    updateQuantity: function (productId, newQuantity) {
        let matchingItem;
        this.cartItem.forEach(cartItem => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity = newQuantity;
        }
        this.saveToStorage();
        return matchingItem.quantity;
    },
    updateDeliveryOption: function (productId, deliveryOptionId) {
        let matchingItem;
        this.cartItem.forEach(cartItem => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryId = deliveryOptionId;

        this.saveToStorage();
    }
};
cart.loadFromStorage();
console.log(cart);