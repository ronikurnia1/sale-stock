var request = require('supertest');
var expect = require("chai").expect;
var express = require('express');
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var mockgoose = require('mockgoose');

// use mockgoose to mock mongoose
// so that test will not hit real mongodb
before(function (done) {
    mockgoose(mongoose).then(function () {
        mongoose.connect('mongodb://online-store-user:katakunci@ds011863.mlab.com:11863/online-store', function (err) {
            done(err);
        });
    });
});

// Mongoose schema and model
var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
var ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

var app = require('../../server');
var router = require('../../routers/shoppingcart-id')(ShoppingCart);
var createShoppingCart = require('../../app/domain-services/createShoppingCart')(ShoppingCart);
app.registerRouter('/api', router);

var shoppingCartId = '57420a552f89881b4640b5a3';

beforeEach(function (done) {
    mockgoose.reset();
    // create dummy shopping cart
    var cartData = {
        "customerName": "Ellen Nurlina",
        "items": [
            {
                "code": "23-099",
                "name": "Produk X",
                "quantity": 2,
                "unitPrice": 150000
            },
            {
                "code": "43-259",
                "name": "Produk M",
                "quantity": 3,
                "unitPrice": 750000
            }
        ],
        "discount": {
            "amount": 100000,
            "coupon": "232434"
        }
    };

    var cart = createShoppingCart(cartData);
    cart.save(function (err, cart) {
        if (err) {
            console.log('Error creating shopping cart in beforeEach: ' + error);
            throw (err);
        }
        // update id so we can retrieve
        shoppingCartId = cart._id;
        done()
    });
});


describe('Functional API test --> GET http://localhost:8080/api/shoppingcart/' + shoppingCartId, function () {
    it('should return code 200', function (done) {
        request(app).get('/api/shoppingcart/' + shoppingCartId)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should get respond with json', function (done) {
        request(app).get('/api/shoppingcart/' + shoppingCartId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return shopping cart with customerName = Dyana Wedari', function (done) {
        request(app).get('/api/shoppingcart/' + shoppingCartId)
            .expect(function (res) { res.body = { customerName: res.body.customerName } })
            .expect(200, { customerName: 'Ellen Nurlina' })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return shopping cart with total amount = 2550000 and discount = 100000', function (done) {
        request(app).get('/api/shoppingcart/' + shoppingCartId)
            .expect(function (res) { res.body = { totalAmount: res.body.totalAmount, discount: res.body.discount.amount } })
            .expect(200, { totalAmount: 2550000, discount: 100000 })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});


describe('Functional API test --> PUT http://localhost:8080/api/shoppingcart/' + shoppingCartId, function () {
    var dataToPost = {
        "customerName": "Ellen Nurlina",
        "items": [
            {
                "code": "55-309",
                "name": "Produk H",
                "quantity": 2,
                "unitPrice": 150000
            }
        ],
        "discount": {
            "amount": 25000,
            "coupon": "5809-0932"
        }
    };

    it('should return code 200', function (done) {
        request(app).put('/api/shoppingcart/' + shoppingCartId)
            .set('Accept', 'application/json')
            .send(dataToPost)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return shopping cart with discount 25000 (before 100000)', function (done) {
        request(app).put('/api/shoppingcart/' + shoppingCartId)
            .send(dataToPost)
            .expect(function (res) { res.body = { disc: res.body.discount.amount } })
            .expect(200, { disc: 25000 })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return shopping cart with only 1 item (before 2 item)', function (done) {
        request(app).put('/api/shoppingcart/' + shoppingCartId)
            .send(dataToPost)
            .expect(function (res) { res.body = { item: res.body.items.length } })
            .expect(200, { item: 1 })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});


describe('Functional API test --> DELETE http://localhost:8080/api/shoppingcart/' + shoppingCartId, function () {
    it('should return code 200', function (done) {
        request(app).delete('/api/shoppingcart/' + shoppingCartId)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return message: Shopping cart successfully deleted!', function (done) {
        request(app).delete('/api/shoppingcart/' + shoppingCartId)
            .expect(function (res) { res.body = { msg: res.body.message } })
            .expect(200, { msg: 'Shopping cart successfully deleted!' })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});
