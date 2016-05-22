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

describe('Removing item(s) from shopping cart', function () {
    // Test case: remove items(s) from shopping cart
    // Output: shopping cart should reflect the changes correctly

    // Mongoose schema and model
    var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
    var shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

    var createShoppingCart = require('../../app/domain-services/createShoppingCart')(shoppingCart);
    var removeShoppingCartItem = require('../../app/domain-services/removeShoppingCartItem');

    describe('when some item(s) removed from shopping cart', function () {
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
                    "name": "Produk M",
                    "quantity": 6,
                    "unitPrice": 40000
                }
            ],
            "discount": {}
        };

        // removed items
        var items = [{ "code": "23-026" }, { "code": "23-028" }];
        // given existing shoppingCart
        var existingShoppingCart = createShoppingCart(existingData);
        existingShoppingCart.save(function (err, car) {

        });

        // remove some items
        existingShoppingCart = removeShoppingCartItem(existingShoppingCart, items);

        it('should have correct number of item(s)', function () {
            expect(existingShoppingCart.items.length).to.equal(2);
        });
        it('should calculate correct total amount', function () {
            expect(existingShoppingCart.totalAmount).to.equal(3040000);
        });
        it('should calculate correct total amount after discount', function () {
            expect(existingShoppingCart.totalAmountAfterDiscount).to.equal(3040000);
        });
    });
});
