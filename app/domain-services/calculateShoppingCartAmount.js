
// calculate the amount of shopping cart
var calculateShoppingCartAmount = function (shoppingCart) {
    shoppingCart.totalAmount = 0;
    // calculate totalAmount
    shoppingCart.items.forEach(itm => {
        shoppingCart.totalAmount += (itm.quantity * itm.unitPrice);
    });
    // calculate discount
    if (shoppingCart.discount && shoppingCart.discount.amount && shoppingCart.discount.amount > 0) {
        shoppingCart.totalAmountAfterDiscount = shoppingCart.totalAmount - shoppingCart.discount.amount;
    } else {
        shoppingCart.totalAmountAfterDiscount = shoppingCart.totalAmount;
    }
    return shoppingCart;
}

module.exports = calculateShoppingCartAmount;