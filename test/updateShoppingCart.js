var expect = require("chai").expect;
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var mockgoose = require('mockgoose');

var createShoppingCart = require('../app/domain_services/createShoppingCart');
var calculateShoppingCartAmount = require('../app/domain_services/calculateShoppingCartAmount');
var updateShoppingCart = require('../app/domain_services/updateShoppingCart');

// use mockgoose to mock mongoose
// so that test will not hit real mongodb
before(function (done) {
    mockgoose(mongoose).then(function () {
        mongoose.connect('mongodb://online-store-user:katakunci@ds011863.mlab.com:11863/online-store', function (err) {
            done(err);
        });
    });
});


describe('Update ShoppingCart', function () {
    // Test case: update existing shoppingCart with new value
    // Output: shoppingCart get updated with new value correctly
    describe('when shoppingCart get updated', function () {
        it('expect shoppingCart values are updated correctly', function () {
            // given existing shoppingCart
            var existingData = {
                "customerName": "Lenny Kartika",
                "items": [
                    {
                        "code": "23-023",
                        "name": "Produk A",
                        "quantity": 8,
                        "unitPrice": 350000
                    },
                    {
                        "code": "23-026",
                        "name": "Produk B",
                        "quantity": 3,
                        "unitPrice": 150000
                    },
                    {
                        "code": "23-028",
                        "name": "Produk C",
                        "quantity": 1,
                        "unitPrice": 657000
                    },
                    {
                        "code": "23-055",
                        "name": "Produk C",
                        "quantity": 6,
                        "unitPrice": 40000
                    }
                ],
                "discount": {}
            };


            // given new shoppingCart value
            var newData = {
                "customerName": "Lenny Kartika",
                "items": [
                    {
                        "code": "23-026",
                        "name": "Produk B",
                        "quantity": 3,
                        "unitPrice": 150000
                    },
                    {
                        "code": "23-028",
                        "name": "Produk C",
                        "quantity": 1,
                        "unitPrice": 657000
                    }
                ],
                "discount": { "coupon": "6237-0232", "amount": 50000 }
            };
            // prepare existing shoppingCart
            var existingShoppingCart = createShoppingCart(existingData);

            // update with new value
            existingShoppingCart = updateShoppingCart(newData, existingShoppingCart);
            // calculate shoppingCart
            existingShoppingCart = calculateShoppingCartAmount(existingShoppingCart);

            // check the all changes are correct
            expect(existingShoppingCart.totalAmount).to.equal(1107000);
            expect(existingShoppingCart.totalAmountAfterDiscount).to.equal(1057000);
            expect(existingShoppingCart.items.length).to.equal(2);
        });
    });
});
