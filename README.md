### **This repository have ready and use backend(Basic) apis for any shopping website**

## Apis Divided In 4 Parts
> * Users
> * Products
> * Orders
> * Reviews

## How To Use
> * Install Node, Postman and MongoDB (**Skip if you already have**)
> * Fork/Download repository
> * Download dependencies (**Use "npm install" in clone directory**)
> * Change config setting (**Location:- backend/config/config.env**)
> * Run **"npm start"** to start server
> * Excute routes in postman

## API Routes
> Users
> * #### Create New User - http://localhost:4000/api/v1/register - POST
>   * Fields as raw json {"name": "String", "email": "string", "password": "string", "role": "user"} - **("role is either user or admin")**
> * #### Login User - http://localhost:4000/api/v1/login - POST
>   * Fields as raw json {"email": "string", "password": "string"}
> * #### Logout User - http://localhost:4000/api/v1/logout - GET
>   * No Field
> * #### Forgot Password Request - http://localhost:4000/api/v1/password/forgot -POST
>   * Fields as raw json {"email": "string"}
> * #### Reset Password - http://localhost:4000/api/v1/password/reset/jasd7asdhd36d66sd8s8dasd8d8sa7d86da8 - PUT - **(Url received on mail after Forgot Password Request)**
>   * Fields as raw json {"password": "string", "confirmPassword": "string"}
> * #### Get User Profile - http://localhost:4000/api/v1/me - GET
>   * No Field
> * #### Update Password - http://localhost:4000/api/v1/password/update - PUT
>   * Fields as raw json {"oldPassword": "srting", "password": "srting"}
> * #### Update Profile - http://localhost:4000/api/v1/me/update - PUT
>   * Fields as raw json {"email": "srting", "name": "srting"}
> * #### Get All Users Details - http://localhost:4000/api/v1/admin/users - GET - ADMIN ONLY
>   * No Field
> * #### Get Single User Details - http://localhost:4000/api/v1/admin/user/:id - GET - ADMIN ONLY - **(:id is mongoose user id)**
>   * No Field
> * #### Update Single User Details - http://localhost:4000/api/v1/admin/user/:id - PUT - ADMIN ONLY - **(:id is mongoose user id)**
>   * Fields as raw json {"email": "string", "name": "string", "role": "user"} - **("role is either user or admin")**
> * #### Delete Single User - http://localhost:4000/api/v1/admin/user/:id - DEL - ADMIN ONLY - **(:id is mongoose user id)**
>   * No Field


> Products
> * #### Create New Product - http://localhost:4000/api/v1/admin/product/new - POST - ADMIN ONLY
>   * Fields as raw json {"name": "string", "price": "20.0", "description": "string", "ratings": "4.5", "images": [{"public_id": "string", "url": "string"}], "category": "string", "seller": "string", "stock": number, "numOfReviews": number, "reviews": []}
> * #### Get All Products Details - http://localhost:4000/api/v1/products - GET
>   * No Field
> * #### Get single Product Details - http://localhost:4000/api/v1/product/:id - GET - **(:id is mongoose product id)**
>   * No Field
> * #### Get Products With Keyword Search - http://localhost:4000/api/v1/products?keyword=nameOfProduct - GET - (EX:- keyword=apple)
>   * No Field
> * #### Get Products With Keyword and Category Search - http://localhost:4000/api/v1/products?keyword=nameOfProduct&category=productCategory - GET - (EX:- keyword=apple&category=Laptops)
>   * No Field
> * #### Get Products With Keyword and Price Search - http://localhost:4000/api/v1/products?keyword=nameOfProduct&price[gte]=1&price[lte]=200 - GET
>   * No Field
> * #### Get Products With Pagination - http://localhost:4000/api/v1/products?page=2 - GET
>   * No Field
> * #### Update Product Details - http://localhost:4000/api/v1/admin/product/:id - PUT - ADMIN ONLY - **(:id is mongoose product id)**
>   * Any fields can be update available in "Create New Product" route - **(EX:-{"stock": 100})**
> * #### Delete Products - http://localhost:4000/api/v1/product/:id - DEL - ADMIN ONLY - **(:id is mongoose product id)** 
>   * No Field


> Orders
> * #### Create New Order - http://localhost:4000/api/v1/order/new - POST
>   * Fields as raw json {"itemsPrice": number, "taxPrice": number, "shippingPrice": number, "totalPrice":number, "orderItems": [{"product": "productId:string", "name": "string", "price":number, "image": "string", "quantity": number}], "shippingInfo":{"address": "string", "city": "string", "phoneNo": number, "postalCode": number, "country": "string"}, "paymentInfo":{"id": "string", "status": "string"}}
> * #### Get Single Order Details - http://localhost:4000/api/v1/order/:id - GET - **(:id is mongoose order id)**
>   * No Field
> * #### Get All Logged In User Orders Details - http://localhost:4000/api/v1/orders/me - GET
>   * No Field
> * #### Get All Orders Details - http://localhost:4000/api/v1/admin/orders - GET - ADMIN ONLY
>   * No Field
> * #### Update Orders Status - http://localhost:4000/api/v1/admin/order/:id - PUT - ADMIN ONLY - **(:id is mongoose order id)**
>   * Fields as raw json {"status": "string"} - **("status options Delivered, processing and shipping, ")**
> * #### Delete Orders - http://localhost:4000/api/v1/admin/order/:id - DEL - ADMIN ONLY - **(:id is mongoose order id)**
>   * No Field


> Reviews
> * #### Create/Update Product Review - http://localhost:4000/api/v1/review - PUT
>   * Fields as raw json {"rating": number, "comment": "string", "productId": "string"}
> * #### Get All Reviews Of Product - http://localhost:4000/api/v1/reviews?id=:id - GET - **(:id is mongoose product id)**
>   * No Field
> * #### Delete Specific Review Of Product - http://localhost:4000/api/v1/reviews?productId=:prodId&id=:id - DEL - **(:prodId is mongoose product id, :id is mongoose review id)**
>   * No Field
