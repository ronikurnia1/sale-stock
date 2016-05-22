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
var router = require('../../routers/shoppingcart')(ShoppingCart);
app.registerRouter('/api', router);



beforeEach(function (done) {
    mockgoose.reset();
    // create and insert dummy shopping cart
    ShoppingCart.create({
        "customerName": "Ellen Nurlina",
        "items": [
            {
                "code": "23-099",
                "name": "Produk X",
                "quantity": 2,
                "unitPrice": 150000,
                "_id": "57413ea41836dd1289f34581"
            },
            {
                "code": "43-259",
                "name": "Produk M",
                "quantity": 3,
                "unitPrice": 750000,
                "_id": "57413ea41836dd1289f34582"
            }
        ],
        "discount": {
            "amount": 500000,
            "coupon": "232434"
        }
    }, function (err) {
        if (err) {
            console.log('Error creating shopping cart in beforeEach: ' + error);
            throw (err);
        }
        done();
    });
});


describe('Functional API test --> GET http://localhost:8080/api/shoppingcart', function () {
    it('should return code 200', function (done) {
        request(app).get('/api/shoppingcart')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should get respond with json', function (done) {
        request(app).get('/api/shoppingcart')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return shopping cart with customerName = Ellen Nurlina', function (done) {
        request(app).get('/api/shoppingcart')
            .expect(function (res) { res.body = { customerName: res.body[0].customerName } })
            .expect(200, { customerName: 'Ellen Nurlina' })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});


describe('Functional API test --> POST http://localhost:8080/api/shoppingcart', function () {
    var dataToPost = {
        "customerName": "Dyana Wedari",
        "items": [
            {
                "code": "55-309",
                "name": "Produk H",
                "quantity": 1,
                "unitPrice": 150000
            },
            {
                "code": "83-200",
                "name": "Produk E",
                "quantity": 5,
                "unitPrice": 120000
            }
        ],
        "discount": {
            "amount": 500000,
            "coupon": "5809-0932"
        }
    };

    it('should return code 200', function (done) {
        request(app).post('/api/shoppingcart')
            .set('Accept', 'application/json')
            .send(dataToPost)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should get respond with json', function (done) {
        request(app).post('/api/shoppingcart')
            .set('Accept', 'application/json')
            .send(dataToPost)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return shopping cart with customerName = Dyana Wedari', function (done) {
        request(app).post('/api/shoppingcart')
            .send(dataToPost)
            .expect(function (res) { res.body = { customerName: res.body.customerName } })
            .expect(200, { customerName: 'Dyana Wedari' })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});
