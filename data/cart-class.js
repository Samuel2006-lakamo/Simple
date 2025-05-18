class Cart {
    cartItem;
    localStorageKey;
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    loadFromStorage() {
        this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));
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
    }

    removeFromCart(productId) {
        let newCart = [];
        this.cartItem.forEach(cartItem => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
            this.cartItem = newCart;
            this.saveToStorage();
        });
    }

    saveToStorage() {
        localStorage.setItem(
            this.localStorageKey,
            JSON.stringify(this.cartItem)
        );
    }

    addToCart(productId, quantity) {
        let matchingItem;
        this.cartItem.forEach(cartItem => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += quantity || 1;
        } else {
            this.cartItem.push({
                productId,
                quantity: quantity,
                deliveryId: "1"
            });
        }
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItem.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
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
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItem.forEach(cartItem => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryId = deliveryOptionId;

        this.saveToStorage();
    }
}
const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");
console.log(cart);
console.log(businessCart);
console.log(cart instanceof Cart);

// function Cart(localStorageKey) {
//     const cart = {
//         cartItem: undefined;
//
//
//     return cart;
// }
//
