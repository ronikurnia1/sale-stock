// call the packages we need
var Shoppingcart = require('../models/shoppingCart');
var CalculateShoppingCartAmount = require('./calculateShoppingCartAmount');
var createShoppingCart = require('./createShoppingCart');


var updateShoppingCart = function (data, cart) {
    var newCart = createShoppingCart(data);
    if (newCart === null) return null;
    // update the values
    cart.customerName = newCart.customerName;
    if (newCart.discount && newCart.discount.coupon) {
        cart.discount.coupon = newCart.discount.coupon;
    }
    if (newCart.discount && newCart.discount.amount) {
        cart.discount.amount = newCart.discount.amount;
    }
    // update items
    cart.items = [];
    newCart.items.forEach(itm => {
        cart.items.push({
            code: itm.code, name: itm.name, quantity: itm.quantity,
            unitPrice: itm.unitPrice, total: itm.unitPrice * itm.quantity
        });
    });
    //calculate the amount
    cart = CalculateShoppingCartAmount(cart);
    return cart;
}

module.exports = updateShoppingCart