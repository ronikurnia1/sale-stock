var expect = require("chai").expect;
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var mockgoose = require('mockgoose');

var createShoppingCart = require('../app/domain_services/createShoppingCart');

// use mockgoose to mock mongoose
// so that test will not hit real mongodb
before(function (done) {
    mockgoose(mongoose).then(function () {
        mongoose.connect('mongodb://online-store-user:katakunci@ds011863.mlab.com:11863/online-store', function (err) {
            done(err);
        });
    });
});


describe('Create ShoppingCart', function () {
    // Test case: create shoppingCart with valid data
    // Output: should return valid shoppingCart (at least has customerName)
    describe('when input with valid data', function () {
        it('should return valid (non-empty) shoppingCart', function () {
            // given valid input
            // valid input: 
            // - has customerName
            // - has at least one item
            var validInput = {
                "customerName": "Lenny Kartika",
                "items": [
                    {
                        "code": "23-023",
                        "name": "Produk A",
                        "quantity": 8,
                        "unitPrice": 350000
                    }
                ],
                "discount": {
                    "amount": 100000,
                    "coupon": "232434"
                }
            };
            // create shoppingCart
            var createdShoppingCart = createShoppingCart(validInput);
            // save shoppingCart
            createdShoppingCart.save(function (err) {
                if (err)
                    console.log('error', err);
                    
                // check some creterias of created shoppingCart are valid
                expect(createdShoppingCart).to.not.be.null;
                expect(createdShoppingCart.items.length > 0).to.be.true;
                expect(createdShoppingCart).to.have.property('customerName').with.length(13);
            });
        });
    });


    // Test case: create shoppingCart with invalid data
    // Output: should return null
    describe('when input with invalid data', function () {
        it('should return null', function () {
            // given invalid input: no customerName given
            var invalidInput = {
                "items": [
                    {
                        "code": "23-023",
                        "name": "Produk A",
                        "quantity": 8,
                        "unitPrice": 350000
                    }
                ],
                "discount": {
                    "amount": 100000,
                    "coupon": "232434"
                }
            };
            // create shoppingCart
            var createdShoppingCart = createShoppingCart(invalidInput);
            
            // check shoppingCart should null
            expect(createdShoppingCart).to.equal(null);
        });
    });
});