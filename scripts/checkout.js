import { renderOrderSummary } from "./checkout/ordersummary.js";

import { renderPaymentSummary } from "./checkout/paymentsummary.js";
// import "../data/cart-class.js";
// import "../data/backend-pratice.js";
import { loadProducts, loadProductFetch } from "../data/products.js";

async function loadPage() {
  try {
    await loadProductFetch();
  } catch (err) {
    console.error('Error:', err);
    
  }
  renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*Promise.all([
  
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
*/

