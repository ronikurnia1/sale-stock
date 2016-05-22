# Sale-stock: Technical Assesment
### About
This project is my technical assesment given by Sale Stock as the fisrt step of recruitment process.
Here I am requested to create a REST API with domain driven approach using any REST API framework at any kind programming language.
I used to develop using .NET but now I decided to use NODEJS even this is some thing new for me developing with NODEJS. But I do really like the new thing. 

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
This application only use one domain model: Shopping cart. Since this is a simple application, I do not use any kind of dependency injection framework. Instead I still inject the model (Shopping cart) into each router via its contructor so I can still do the unit testing and functional API testing as well wothout hit the real database (MongoDB).

The folder structure of the source code is as follow:

|-- app
|    |-- domain-services       <-- contains all the domain logic/business logic
|    |-- models                <-- contains domain model of the application
|
|-- routers                    <-- contains all routing of REST API
|-- test
|    |-- functional-API-tests  <-- contains all functional API tests
|    |-- unit-test             <-- contains all unit testing   


### Quality Assesment (Unit test and Functional API test)
This project has 2 kind of tests: unit test and functional API tests
To run unit-test only:          npm run-script unit-test
To run functional API test:     npm run-script api-test
To run both testing:            npm test or npm run-script test

### Deployment to cloud infrastructure
If you have a docker machine you can easily build and deploy this appplication into docker image by execute the following script:
docker build -t API-Test . 

This project also has been deploy into a cloud server. You can access it here: 


