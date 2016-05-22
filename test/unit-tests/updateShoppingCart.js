var expect = require("chai").expect;
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

beforeEach(function (done) {
    mockgoose.reset();
    done();
});

describe('Update shopping cart', function () {
    // Test case: update existing shopping cart with new value
    // Output: shopping cart get updated with new value correctly

    // Mongoose schema and model
    var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
    var shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

    var createShoppingCart = require('../../app/domain-services/createShoppingCart')(shoppingCart);
    var updateShoppingCart = require('../../app/domain-services/updateShoppingCart')(shoppingCart);

    describe('when shopping cart get updated', function () {
        // given existing shopping cart
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
                    "name": "Produk D",
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
        // given existing shoppingCart
        var existingShoppingCart = createShoppingCart(existingData);
        // update with new value
        existingShoppingCart = updateShoppingCart(newData, existingShoppingCart);

        it('should have correct number of item(s)', function () {
            expect(existingShoppingCart.items.length).to.equal(2);
        });
        it('should calculate correct total amount', function () {
            expect(existingShoppingCart.totalAmount).to.equal(1107000);
        });
        it('should calculate correct total amount after discount', function () {
            expect(existingShoppingCart.totalAmountAfterDiscount).to.equal(1057000);
        });
    });
});
