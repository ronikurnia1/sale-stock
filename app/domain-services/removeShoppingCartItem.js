// call the packages we need
var calculateShoppingCartAmount = require('./calculateShoppingCartAmount');

// remove item from shopping cart
// items format: [{"code": "454-954"}, {"code": "34-434"}]}

var removeShoppingCartItem = function (cart, items) {
    if (!items || items.length === 0) {
        // must have at least one item to remove
        return cart;
    }
    // remove item from shopping cart
    var remainingItem = cart.items.filter(itm => items.every(remItm => remItm.code !== itm.code));
    cart.items = remainingItem;    
    // recalculate the amount
    cart = calculateShoppingCartAmount(cart);
    return cart;
}

module.exports = removeShoppingCartItem;