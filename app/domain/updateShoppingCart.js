// call the packages we need
var Shoppingcart = require('../models/shoppingCart');
var CalculateShoppingCartAmount = require('./calculateShoppingCartAmount');

var updateShoppingCart = function (data, cart) {
    if (!data) {
        // empty
        return cart;
    }
    if (!data.customerName) {
        // no customer name
        return cart;
    }
    if (!data.items || data.items.length === 0) {
        // must have at least one item
        return cart;
    }
    cart.customerName = data.customerName;
    if (data.discount) {
        cart.discount.coupon = data.discount.coupon;
        cart.discount.amount = data.discount.amount;
    }
    cart.items = [];
    data.items.forEach(itm => {
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