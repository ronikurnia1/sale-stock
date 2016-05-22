var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingCartSchema = new Schema({
    customerName: String,
    totalAmount: Number,
    totalAmountAfterDiscount: Number,
    discount: { coupon: String, amount: Number },
    items: [{
        code: String,
        name: String,
        quantity: Number,
        unitPrice: Number
    }]
});

module.exports = shoppingCartSchema;
