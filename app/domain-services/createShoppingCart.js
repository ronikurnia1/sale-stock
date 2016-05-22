// call the packages we need
var addShoppingCartItem = require('./addShoppingCartItem');
var updateShoppingCartDiscount = require('./updateShoppingCartDiscount');

module.exports = function (shoppingCart) {

    // create shopping cart
    var createShoppingCart = function (data) {
        if (!data) {
            // empty data
            return null;
        }
        if (!data.customerName || data.customerName === '') {
            // no customer name
            return null;
        }
        if (!data.items || data.items.length === 0) {
            // must have at least one item
            return null;
        }
        // create new shopping cart
        var cart = new shoppingCart();
        cart.customerName = data.customerName;
        // update discount
        if (data.discount) {
            cart = updateShoppingCartDiscount(cart, data.discount);
        }
        // add shopping cart items
        cart = addShoppingCartItem(cart, data.items);
        return cart;
    }
    return createShoppingCart;
}
