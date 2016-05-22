var expect = require("chai").expect;
var calculateShoppingCartAmount = require('../../app/domain-services/calculateShoppingCartAmount');
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

// Test case: caluculate shopping cart amount
// Output: all calulations should correct
describe('Calculate shopping cart amount', function () {

    // Mongoose schema and model
    var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
    var shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
    
    var createShoppingCart = require('../../app/domain-services/createShoppingCart')(shoppingCart);
    describe('when shopping cart have many items with no discount', function () {
        // given shoppingCart with many items
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
                },
                {
                    "code": "23-028",
                    "name": "Produk C",
                    "quantity": 1,
                    "unitPrice": 657000
                },
                {
                    "code": "23-055",
                    "name": "Produk G",
                    "quantity": 6,
                    "unitPrice": 40000
                }
            ],
            "discount": {}
        };
        // create shoppingCart
        var createdShoppingCart = createShoppingCart(data);
        createdShoppingCart = calculateShoppingCartAmount(createdShoppingCart);

        it('should calculate the correct total amount', function () {
            expect(createdShoppingCart.totalAmount).to.equal(4147000);
        });
        it('should have total amount after discount equal to total amount', function () {
            expect(createdShoppingCart.totalAmountAfterDiscount).to.equal(createdShoppingCart.totalAmount);
        });
    });


    // Test case: caluculate total amount after discount
    // Output: Total amount after discount should equal total amount minus discount amount
    describe('when shopping cart has a discount', function () {
        // given shoppingCart with discount
        var shoppingCartWithDiscount = {
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
            "discount": { "coupon": "28730-334", "amount": 147000 }
        };
        // create shoppingCart
        var createdShoppingCart = createShoppingCart(shoppingCartWithDiscount);
        createdShoppingCart = calculateShoppingCartAmount(createdShoppingCart);

        it('should calculate correct total amount after discount', function () {
            expect(createdShoppingCart.totalAmountAfterDiscount).to.equal(4000000);
        });
        it('total amount after discount < total amount', function () {
            expect(createdShoppingCart.totalAmountAfterDiscount < createdShoppingCart.totalAmount).to.be.true;
        });
    });
});