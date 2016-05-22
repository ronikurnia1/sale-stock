var express = require('express');
var updateShoppingCartDiscount = require('../app/domain-services/updateShoppingCartDiscount');


module.exports = function (shoppingCart) {
    // get an instance of the express Router
    var router = express.Router();

    // routes end with /shoppingcart/:id/updatediscount
    router.route('/shoppingcart/:id/updatediscount')
        // update shopping cart coupon (accessed at PUT http://localhost:8080/api/shoppingcart/:id/updatediscount)
        // data format (json): {"coupon": "23343545", "amount": 540000} 
        .put(function (req, res) {
            // Get shoppingCart data
            var cartId = req.params.id || '';
            shoppingCart.findOne({ '_id': cartId }, function (err, cart) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    if (cart) {
                        // update shoping cart discount
                        cart = updateShoppingCartDiscount(cart, req.body);
                        // save into DB
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

