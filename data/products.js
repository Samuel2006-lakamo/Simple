import { formatCurrency } from "../scripts/utils/money.js";
class Products {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }

    getRatingUrl() {
        return `images/ratings/rating-${this.rating.stars * 10}.png`;
    }
    getPrice() {
        return `$${formatCurrency(this.priceCents)}`;
    }
    extraInfoHTML() {
        return ``;
    }
}

class Clothing extends Products {
    sizeChartLink;
    constructor(productDetails) {
        super(productDetails);
        this.sizeChartLink = productDetails.sizeChartLink;
    }
    extraInfoHTML() {
        return `<a href="${this.sizeChartLink}" target="_blank">size cart</a>`;
    }
}

class Appliances extends Products {
    instructionLinks;
    warrantyLinks;
    constructor(productDetails) {
        super(productDetails);
        this.instructionLinks = productDetails.instructionLinks;
        this.warrantyLinks = productDetails.warrantyLinks;
    }
    extraInfoHTML() {
        return `<a href="${this.instructionLinks}" target="_blank">Instruction</a></br><a href="${this.warrantyLinks}" target="_blank">Warranty</a>`;
    }
}
export let products = [];
export function loadProducts(fun) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        products = JSON.parse(xhr.response).map(productDetails => {
            if (productDetails.type === "clothing") {
                return new Clothing(productDetails);
            }
            if (productDetails.type === "appliances") {
                return new Appliances(productDetails);
            }
            return new Products(productDetails);
        });
        fun();
        
        console.log(products);
    });
    xhr.open("GET", "https://supersimplebackend.dev/products");
    xhr.send();
}



export function getProduct(productId) {
            let matchingItem;

            products.forEach(product => {
                if (product.id === productId) {
                    matchingItem = product;
                    console.log(matchingItem);
                }
            });
            return matchingItem;
        }
