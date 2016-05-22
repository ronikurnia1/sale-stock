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

describe('Create Shopping cart', function () {
    // Test case: create shoppingCart with valid data
    // Output: should return valid shopping cart (at least has customerName)

    // Mongoose schema and model
    var shoppingCartSchema = require('../../app/models/shoppingCartSchema');
    var shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
    var createShoppingCart = require('../../app/domain-services/createShoppingCart')(shoppingCart);


    describe('when valid data inputted', function () {
        it('should save shopping cart with correct values into DB', function (done) {
            // given valid input
            // valid input: 
            // - has customerName
            // - has at least one item
            var validInput = {
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
            };
            // create shoppingCart
            var createdShoppingCart = createShoppingCart(validInput);

            // save shopping cart into DB
            createdShoppingCart.save(function (err, cart) {
                if (err) done(err);
                // expect no error
                expect(err).to.be.null;

                cart.save(function (err, cart) {
                    if (err) done(err);
                    // check some values of created shoppingCart are correct
                    expect(cart).to.have.property('_id');
                    expect(cart.items.length).to.equal(2);
                    expect(cart).to.have.property('customerName').to.equal('Ellen Nurlina');
                    expect(cart.discount.amount).to.equal(500000);
                    expect(cart.totalAmount).to.equal(2550000);
                    expect(cart.totalAmountAfterDiscount).to.equal(2050000);
                    done();
                });
            });
        });
    });


    // Test case: create shoppingCart with invalid data
    // Output: should return null
    describe('when invalid data inputted', function () {
        it('should return null and not to save into DB', function () {
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