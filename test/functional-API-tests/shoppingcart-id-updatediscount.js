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
var router = require('../../routers/shoppingcart-id-updatediscount')(ShoppingCart);
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
            },
            {
                "code": "62-609",
                "name": "Produk W",
                "quantity": 2,
                "unitPrice": 550000
            }
        ]
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


describe('Functional API test --> PUT http://localhost:8080/api/shoppingcart/' + shoppingCartId + '/updatediscount', function () {
    var discount = { "coupon": "AVF-74590", "amount": 100000 };
    it('should return code 200', function (done) {
        request(app).put('/api/shoppingcart/' + shoppingCartId + '/updatediscount')
            .set('Accept', 'application/json')
            .send(discount)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('shopping cart should have discount with coupon = AVF-74590', function (done) {
        request(app).put('/api/shoppingcart/' + shoppingCartId + '/updatediscount')
            .set('Accept', 'application/json')
            .send(discount)
            .expect(function (res) { res.body = { coupon: res.body.discount.coupon } })
            .expect(200, { coupon: 'AVF-74590' })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('shopping cart should have total amount = 3650000 and discount = 100000', function (done) {
        request(app).put('/api/shoppingcart/' + shoppingCartId + '/updatediscount')
            .send(discount)
            .expect(function (res) { res.body = { totalAmount: res.body.totalAmount, discount: res.body.discount.amount } })
            .expect(200, { totalAmount: 3650000, discount: 100000 })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});


