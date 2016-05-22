var expect = require("chai").expect;
var addShoppingCartItem = require('../../app/domain-services/addShoppingCartItem');
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


describe('Adding item(s) into shopping cart', function () {
    // Test case: add item(s) into shopping cart
    // Output: shopping cart should reflect the correct values

    // Mongoose schema and model
    var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
    var shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
    var createShoppingCart = require('../../app/domain-services/createShoppingCart')(shoppingCart);

    describe('when item(s) added into shopping cart', function () {
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

        var addedItems = [
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
        ]
        existingShoppingCart = addShoppingCartItem(existingShoppingCart, addedItems);
        it('should reflect the correct number of item(s)', function () {
            expect(existingShoppingCart.items.length).to.equal(4);
        });
        it('should update the total amount', function () {
            expect(existingShoppingCart.totalAmount).to.equal(4147000);
        });
    });
});