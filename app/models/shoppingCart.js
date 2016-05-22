var mongoose = require('mongoose');
var shoppingCartSchema = require('./shoppingCartSchema');

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
