// call the packages we need
var CalculateShoppingCartAmount = require('./calculateShoppingCartAmount');

// update shopping cart coupon
// items format: {"coupon": "3438-043", "amount": 1500000}

var updateShoppingCartDiscount = function (cart, discount) {
    if (discount && discount.coupon && discount.coupon !== '' && discount.amount && discount.amount > 0) {
        cart.discount = { "coupon": discount.coupon, "amount": discount.amount };
        // recalculate the amount
        cart = CalculateShoppingCartAmount(cart);
    }
    return cart;
}

module.exports = updateShoppingCartDiscount;