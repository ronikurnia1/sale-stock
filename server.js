// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var createShoppingCart = require('./app/domain_services/createShoppingCart');
var updateShoppingCart = require('./app/domain_services/updateShoppingCart');
var Shoppingcart = require('./app/models/shoppingCart');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

var mongodbUri = 'mongodb://online-store-user:katakunci@ds011863.mlab.com:11863/online-store';
mongoose.connect(mongodbUri);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to our api!' });
});

// routes end with /shoppingcart 
router.route('/shoppingcart')
    // create a shoppingcart (accessed at POST http://localhost:8080/api/shoppingcart)
    .post(function (req, res) {
        var cart = createShoppingCart(req.body);
        if (cart) {
            cart.save(function (err) {
                if (err)
                    res.send(err);
                res.json(cart);
            });
        } else {
            res.json({ error: 'invalid shoppingcart!' });
        }
    })
    // get all shoppingcart (accessed at GET http://localhost:8080/api/shoppingcart)
    .get(function (req, res) {
        Shoppingcart.find(function (err, carts) {
            if (err)
                res.send(err);
            res.json(carts);
        });
    });


// routes end with /shoppingcart/:id
router.route('/shoppingcart/:id')
    // get shoppingCart with specific id (accessed at GET http://localhost:8080/api/shoppingcart/:id)
    .get(function (req, res) {
        Shoppingcart.findById(req.params.id, function (err, cart) {
            if (err)
                res.send(err);
            res.json(cart);
        });
    })
    // update the shoppingCart with this id (accessed at PUT http://localhost:8080/api/shoppingcart/:id)
    .put(function (req, res) {
        // use our shoppingcart model to find the Shoppingcart we want
        Shoppingcart.findById(req.params.id, function (err, cart) {
            if (err)
                res.send(err);
            // update the shoppingCart info
            var newCart = updateShoppingCart(req.body, cart);
            if (newCart) {
                // save the shoppingCart
                newCart.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json(newCart);
                });
            }
            else {
                res.json({ error: 'Invalid shoppingCart data!' });
            }
        });
    });


// REGISTER OUR ROUTES 
// all of our routes will be prefixed with /api
app.use('/api', router);

// start the server
app.listen(port);
console.log('Server linten on port ' + port);