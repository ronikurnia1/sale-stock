var express = require('express');

module.exports = function (shoppingCart) {
    // get an instance of the express Router
    var router = express.Router();
    var updateShoppingCart = require('../app/domain-services/updateShoppingCart')(shoppingCart);

    // routes end with /shoppingcart/:id
    router.route('/shoppingcart/:id')
        // get shopping cart with specific id (accessed at GET http://localhost:8080/api/shoppingcart/:id)
        .get(function (req, res) {
            //console.log('request id', req.params.id)
            shoppingCart.findById(req.params.id, function (err, cart) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    if (cart) {
                        //console.log('response', cart);
                        res.json(cart);
                    } else {
                        console.log('shopping cart not found!', req.params.id);
                        res.status(200).send('shopping cart not found!');
                    }
                }
            });
        })
        // update the shopping cart with this id (accessed at PUT http://localhost:8080/api/shoppingcart/:id)
        .put(function (req, res) {
            // use our shoppingcart model to find the Shoppingcart we want
            shoppingCart.findById(req.params.id, function (err, cart) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    if (cart) {
                        // update the shoppingCart info
                        var newCart = updateShoppingCart(req.body, cart);
                        if (newCart) {
                            // save the shoppingCart
                            newCart.save(function (err) {
                                if (err) {
                                    console.log('error', err);
                                    res.send(err);
                                } else {
                                    res.json(newCart);
                                }
                            });
                        }
                        else {
                            var msg = 'Invalid shopping cart data!';
                            console.log('error', msg);
                            res.json({ error: msg });
                        }
                    } else {
                        // not found
                        console.log('shopping cart not found!', req.params.id);
                        res.status(404).send('shopping cart not found!');
                    }
                }
            });
        })
        // delete the shopping cart with this id (accessed at DELETE http://localhost:8080/api/shoppingcart/:id)
        .delete(function (req, res) {
            shoppingCart.remove({ _id: req.params.id }, function (err, cart) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                } else {
                    var msg = 'Shopping cart successfully deleted!';
                    //console.log(msg);
                    res.json({ message: msg });
                }
            });
        });

    return router;
}
