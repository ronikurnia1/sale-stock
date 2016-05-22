var express = require('express');

module.exports = function (shoppingCart) {
    // get an instance of the express Router
    var router = express.Router();
    var createShoppingCart = require('../app/domain-services/createShoppingCart')(shoppingCart);

    // routes end with /shoppingcart 
    router.route('/shoppingcart')
        // create a shopping cart (accessed at POST http://localhost:8080/api/shoppingcart)
        .post(function (req, res) {
            var cart = createShoppingCart(req.body);
            if (cart) {
                cart.save(function (err, cart) {
                    if (err) {
                        console.log('error', err);
                        res.send(err);
                    } else {
                        //console.log('response', cart);
                        res.json(cart);
                    }
                });
            } else {
                res.json({ error: 'Invalid shopping cart data!' });
            }
        })
        // get all shopping cart (accessed at GET http://localhost:8080/api/shoppingcart)
        .get(function (req, res) {
            shoppingCart.find(function (err, carts) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    //console.log('response', carts);
                    res.json(carts);
                }
            });
        });

    return router;
}
