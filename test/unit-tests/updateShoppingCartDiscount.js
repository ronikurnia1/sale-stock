var expect = require("chai").expect;
var updateShoppingCartDiscount = require('../../app/domain-services/updateShoppingCartDiscount');
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

describe('Update shopping cart discount', function () {
    // Test case: update shopping cart discount
    // Output: total amount after discount should be calculated correctly

    // Mongoose schema and model
    var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
    var shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
    var createShoppingCart = require('../../app/domain-services/createShoppingCart')(shoppingCart);

    describe('when discount get updated', function () {
        // given shopping cart
        var data = {
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
                }
            ],
            "discount": {}
        };
        // prepare existing shoppingCart
        var existingShoppingCart = createShoppingCart(data);
        var discount = { "coupon": "356080", "amount": 250000 };
        existingShoppingCart = updateShoppingCartDiscount(existingShoppingCart, discount);

        it('total amount should remain the same', function () {
            expect(existingShoppingCart.totalAmount).to.equal(3250000);
        });
        it('total amount after discount should recalculate correctlly', function () {
            expect(existingShoppingCart.totalAmountAfterDiscount).to.equal(3000000);
        });
    });
});