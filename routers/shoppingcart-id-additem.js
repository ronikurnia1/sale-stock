var express = require('express');
var addShoppingCartItem = require('../app/domain-services/addShoppingCartItem');

module.exports = function (shoppingCart) {
    // get an instance of the express Router
    var router = express.Router();

    // routes end with /shoppingcart/:id/additem 
    router.route('/shoppingcart/:id/additem')
        // add item(s) into specific shopping cart (accessed at POST http://localhost:8080/api/shoppingcart/:id/additem)
        // data format (json): [{"code": "3438-043", "name": "Produk D", "quantity": 3, "unitPrice": 1500000}]
        .post(function (req, res) {
            // Get shopping cart data
            var cartId = req.params.id || '';
            shoppingCart.findOne({ '_id': cartId }, function (err, cart) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    if (cart) {
                        // add shoping cart item
                        cart = addShoppingCartItem(cart, req.body);
                        // save the shopping cart
                        cart.save(function (err) {
                            if (err) {
                                console.log('cannot save shoping cart!', err);
                                res.send(err);
                            } else {
                                res.json(cart);
                            }
                        });
                    } else {
                        console.log('shopping cart not found!', data.shoppingCartId);
                        res.status(404).send('shopping cart not found!');
                    }
                }
            });
        });

    return router;
}
