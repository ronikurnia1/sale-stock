# Sale-stock: Technical Assesment
### About
This project is a technical assesment for candidate 

### Author
Roni Kurniawan | roni.kurniawan@outlook.com | May 22, 2016
### Case Study
Product Shopping cart supporting: add, remove item to cart, support for discount coupon and total purchase amount

### Technology & Development Tools
Using Nodejs, MongoDB and Visual Studio Code.
Development approach using DDD and TDD.

### REST API Routing
<table>
<thead>
<td><h5>Route</h5></td><td><h5>HTTP Verb</h5></td><td><h5>Description</h5></td>
</thead>
<tbody>
<tr>
<td>/api/shoppingcart</td><td>GET</td><td>Get all the shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart</td><td>POST</td><td>Create a shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart/:id</td><td>GET</td><td>Get a single shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart/:id</td><td>PUT</td><td>Update existing shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart/:id</td><td>DELETE</td><td>Delete existing shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart/:id/additem</td><td>POST</td><td>Add shopping cart item into existing shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart/:id/removeitem</td><td>DELETE</td><td>Remove shopping cart item from existing shopping cart.</td>
</tr>
<tr>
<td>/api/shoppingcart/:id/updatediscount</td><td>PUT</td><td>Update shopping cart discount.</td>
</tr>
</tbody>
</table>

### Application Modeling
This application only use one domain model: Shopping cart. Since this is a simple application, I do not use any kind of dependency injection framework. Instead I inject the model (Shopping cart) into each router via its contructor so I can still do both unit testing and functional API testing wothout hit the real database (MongoDB).

The solution

### Quality Assesment (Unit test and Functional API test)
All the 
### Deployment to cloud infrastructure



