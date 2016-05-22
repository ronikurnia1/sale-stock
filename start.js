var server = require('./server');
var port = process.env.PORT || 8080;
var ShoppingCart = require('./app/models/ShoppingCart');

var shoppingCartRouter = require('./routers/shoppingcart')(ShoppingCart);
var shoppingCartIdRouter = require('./routers/shoppingcart-id')(ShoppingCart);
var shoppingCartIdAddItemRouter = require('./routers/shoppingcart-id-additem')(ShoppingCart);
var shoppingCartIdRemoveItemRouter = require('./routers/shoppingcart-id-removeitem')(ShoppingCart);
var shoppingCartIdUpdateDiscountRouter = require('./routers/shoppingcart-id-updatediscount')(ShoppingCart);

server.registerRouter('/api', shoppingCartRouter);
server.registerRouter('/api', shoppingCartIdRouter);
server.registerRouter('/api', shoppingCartIdAddItemRouter);
server.registerRouter('/api', shoppingCartIdRemoveItemRouter);
server.registerRouter('/api', shoppingCartIdUpdateDiscountRouter);

// start the server
server.listen(port);
console.log('Server linten on port ' + port);

