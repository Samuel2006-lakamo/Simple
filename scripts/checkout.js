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
loadProducts(() => {
  renderOrderSummary();
    renderPaymentSummary();
})