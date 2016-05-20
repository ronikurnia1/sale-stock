// call the packages we need
var Shoppingcart = require('../models/shoppingCart');
var CalculateShoppingCartAmount = require('./calculateShoppingCartAmount');

var createShoppingCart = function (data) {
    if (!data) {
        // empty
        return null;
    }
    if (!data.customerName) {
        // no customer name
        return null;
    }
    if (!data.items || data.items.length === 0) {
        // must have at least one item
        return null;
    }
    var shoppingCart = new Shoppingcart();
    shoppingCart.customerName = data.customerName;
    if (data.discount) {
        shoppingCart.discount.coupon = data.discount.coupon;
        shoppingCart.discount.amount = data.discount.amount;
    }
    data.items.forEach(itm => {
        shoppingCart.items.push({
            code: itm.code, name: itm.name, quantity: itm.quantity,
            unitPrice: itm.unitPrice, total: itm.unitPrice * itm.quantity
        });
    });
    //calculate the amount
    shoppingCart = CalculateShoppingCartAmount(shoppingCart);
    return shoppingCart;    
}

module.exports = createShoppingCart