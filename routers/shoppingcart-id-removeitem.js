var express = require('express');
var removeShoppingCartItem = require('../app/domain-services/removeShoppingCartItem');


module.exports = function (shoppingCart) {
    // get an instance of the express Router
    var router = express.Router();

    // routes end with /shoppingcart/:id/removeitem 
    router.route('/shoppingcart/:id/removeitem')
        // remove item from shopping cart (accessed at DELETE http://localhost:8080/api/shoppingcart/:id/removeitem)
        // data format (json): [{"code": "343-434"},{"code": "3443-4"}]
        .delete(function (req, res) {
            // Get shoppingCart data
            var cartId = req.params.id || '';
            shoppingCart.findOne({ '_id': cartId }, function (err, cart) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    if (cart) {
                        // remove shoping cart item
                        cart = removeShoppingCartItem(cart, req.body);
                        // check shoping cart item number
                        if (cart.items.length === 0) {
                            // delete shoping cart (shoping cart must have at least 1 item)
                            cart.remove(function (err) {
                                if (err) {
                                    console.log('error', err);
                                    res.send(err);
                                } else {
                                    console.log('delete shoping cart');
                                    res.json({ message: 'shoping cart deleted!' });
                                }
                            });
                        } else {
                            cart.save(function (err, cart) {
                                if (err) {
                                    console.log('cannot save shoping cart!', err);
                                    res.send(err);
                                } else {
                                    res.json(cart);
                                }
                            });
                        }
                    } else {
                        console.log('shopping cart not found!', data.shoppingCartId);
                        res.status(404).send('shopping cart not found!');
                    }
                }
            });
        });
        
    return router;
}
