// call the packages we need
var Shoppingcart = require('../models/shoppingCart');

var calculateShoppingCartAmount = function (shoppingCart) {
    shoppingCart.totalAmount = 0;
    shoppingCart.items.forEach(itm => {
        shoppingCart.totalAmount += (itm.quantity * itm.unitPrice);
    });
    if (shoppingCart.discount || shoppingCart.discount.amount > 0) {
        shoppingCart.totalAmountAfterDiscount = shoppingCart.totalAmount - shoppingCart.discount.amount;
    }
    return shoppingCart;
}
module.exports = calculateShoppingCartAmount;