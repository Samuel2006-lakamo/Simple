import { renderOrderSummary } from "./checkout/ordersummary.js";

import { renderPaymentSummary } from "./checkout/paymentsummary.js";
// import "../data/cart-class.js";
// import "../data/backend-pratice.js";
import { loadProducts } from "../data/products.js";

/*new Promise( resolve => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
loadProducts(() => {
    
});*/
Promise.all([
    new Promise(resolve => {
        loadProducts(() => {
            resolve("value1");
        });
    }),
    new Promise(resolve => {
        return setTimeout(() => {
            console.log("hello");
            resolve();
        }, 5000);
    })
]).then(values => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  })
}).then(() => {
  
})*/
/*loadProducts(() => {
  
})*/
