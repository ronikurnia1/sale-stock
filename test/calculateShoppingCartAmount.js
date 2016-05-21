var expect = require("chai").expect;
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var mockgoose = require('mockgoose');

var createShoppingCart = require('../app/domain_services/createShoppingCart');
var calculateShoppingCartAmount = require('../app/domain_services/calculateShoppingCartAmount');

// use mockgoose to mock mongoose
// so that test will not hit real mongodb
before(function (done) {
    mockgoose(mongoose).then(function () {
        mongoose.connect('mongodb://online-store-user:katakunci@ds011863.mlab.com:11863/online-store', function (err) {
            done(err);
        });
    });
});


describe('Calculate ShoppingCart Amount', function () {
    // Test case: caluculate shoppingCart total amount
    // Output: Total amount should equal to the sum of (unitPrice * quantity) of all items
    describe('when shoppingCart have many items', function () {
        it('expect the total amount equal to the sum of (unitPrice * quantity)', function () {
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
                        "name": "Produk C",
                        "quantity": 6,
                        "unitPrice": 40000
                    }
                ],
                "discount": {}
            };
            // create shoppingCart
            var createdShoppingCart = createShoppingCart(data);
            // calculate shoppingCart
            createdShoppingCart = calculateShoppingCartAmount(createdShoppingCart);
            
            // check totalAmount, and totalAmountAfterDiscount
            expect(createdShoppingCart.totalAmount).to.equal(4147000);
            expect(createdShoppingCart.totalAmountAfterDiscount).to.equal(4147000);
        });
    });


    // Test case: caluculate total amount after discount
    // Output: Total amount after discount should equal total amount minus discount amount
    describe('when shoppingCart has a discount', function () {
        it('expect the total amount after discount equal to total amount minus discount amount', function () {

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
                "discount": {"coupon": "28730-334", "amount": 147000}
            };
            // create shoppingCart
            var createdShoppingCart = createShoppingCart(shoppingCartWithDiscount);
            // calculate shoppingCart
            createdShoppingCart = calculateShoppingCartAmount(createdShoppingCart);
            
            // check totalAmount, and totalAmountAfterDiscount
            expect(createdShoppingCart.totalAmount).to.equal(4147000);
            expect(createdShoppingCart.totalAmountAfterDiscount).to.equal(4000000);            
        });
    });
});