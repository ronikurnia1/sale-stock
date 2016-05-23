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
```
|-- app
|    |-- domain-services       <-- contains all the domain logic/business logic
|    |-- models                <-- contains domain model of the application
|
|-- routers                    <-- contains all routing of REST API
|-- test
|    |-- functional-API-tests  <-- contains all functional API tests
|    |-- unit-test             <-- contains all unit testing   
```

### Quality Assesment (Unit test and Functional API test)
This project has 2 kind of tests: unit test and functional API tests

| **Type of test** | **Command** |
|--------------|---------|
| Unit test    | npm run-script unit-test |
| Functional API test | npm run-script api-test |
| Both test    | npm test |



### Deployment to cloud infrastructure
If you have a docker machine you can easily build and deploy and run this appplication within docker machine by execute the following script:
**docker build -t API-Test .**  please note the period (.) after space at the end.

### Example of API Requests

#### Get all the shopping cart

```
GET /api/shoppingcart/ HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 6ec14204-15f7-5ba9-ece7-e7d308a6e525
```
#### Create a shopping cart
```
POST /api/shoppingcart/ HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: bb60598d-da72-1fb5-de4e-2794350115f8

{
    "customerName": "Dyana Wedari",
    "items": [
        {
            "code": "55-309",
            "name": "Produk H",
            "quantity": 1,
            "unitPrice": 150000
        },
        {
            "code": "83-200",
            "name": "Produk E",
            "quantity": 5,
            "unitPrice": 120000
        }
    ],
    "discount": {
        "amount": 500000,
        "coupon": "5809-0932"
    }
}
```
#### Get a single shopping cart.
```
GET /api/shoppingcart/5741da6bbaebdd7912adb142 HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 2a6bf07a-4b0b-8e56-0e19-ecd827fa9d30
```
#### Update existing shopping cart.
```
PUT /api/shoppingcart/5741da6bbaebdd7912adb142 HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: c4411d80-4d90-b1b7-de1f-e46add90f4ab

{
    "customerName": "Dyana Wedari",
    "items": [
        {
            "code": "55-309",
            "name": "Produk H",
            "quantity": 1,
            "unitPrice": 150000
        },
        {
            "code": "83-200",
            "name": "Produk E",
            "quantity": 5,
            "unitPrice": 120000
        }
    ],
    "discount": {
        "amount": 500000,
        "coupon": "5809-0932"
    }
}
```
#### Delete existing shopping cart.
```
DELETE /api/shoppingcart/5741da6bbaebdd7912adb142 HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 22d860a6-30b4-55af-02b5-96e11d48f9eb

{
    "customerName": "Dyana Wedari",
    "items": [
        {
            "code": "55-309",
            "name": "Produk H",
            "quantity": 1,
            "unitPrice": 150000
        },
        {
            "code": "83-200",
            "name": "Produk E",
            "quantity": 5,
            "unitPrice": 120000
        }
    ],
    "discount": {
        "amount": 500000,
        "coupon": "5809-0932"
    }
}
```
#### Add shopping cart item into existing shopping cart.
```
POST /api/shoppingcart/574247a35afc0ff07cff53e6/additem HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 9a0c050c-9f77-00b1-7f79-b12f24c627a3

[
      {
        "code": "54-569",
        "name": "Produk HD",
        "quantity": 1,
        "unitPrice": 150000,
        "_id": "574247a35afc0ff07cff53e7"
      },
      {
        "code": "20-238",
        "name": "Produk ELS",
        "quantity": 5,
        "unitPrice": 120000,
        "_id": "574247a35afc0ff07cff53e8"
      }
    ]
```
#### Remove shopping cart item from existing shopping cart.
```
DELETE /api/shoppingcart/574247a35afc0ff07cff53e6/removeitem HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: cd77df8d-e478-0587-3828-a4bef0c80a10

[{"code": "20-238"}]
```

#### Update shopping cart discount.
```
PUT /api/shoppingcart/574247a35afc0ff07cff53e6/updatediscount HTTP/1.1
Host: localhost:8080
Authorization: Basic Og==
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: f28bd00d-79ea-540a-5c56-5046ddb34a43

{"coupon": "784-854", "amount": 250000}
```
