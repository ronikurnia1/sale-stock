// call the packages we need
var CalculateShoppingCartAmount = require('./calculateShoppingCartAmount');

// add item into shopping cart
// items format: [{"code": "3438-043", "name": "Produk D", "quantity": 3, "unitPrice": 1500000}]}

var addShoppingCartItem = function (cart, items) {
    if (!items || items.length === 0) {
        // must have at least one item to add
        // otherwise return existing cart
        return cart;
    }
    // add item into shopping cart
    items.forEach(itm => {
        // add only valid item
        if (itm.code !== '' && itm.name !== '' && itm.quantity > 0 && itm.unitPrice > 0)
            cart.items.push(itm);
    });
    // recalculate the amount
    cart = CalculateShoppingCartAmount(cart);
    return cart;
}

module.exports = addShoppingCartItem;