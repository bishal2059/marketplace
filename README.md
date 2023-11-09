Node-API for a test e-commerce website Marketplace

## Marketplace API

It was build using Node,Express and MongoDB

## To setup the API in local machine follow as below:

#### 1. Run `npm install` in the root of the project folder

### 2. Make an .env file in the root of the project with following components:

```
PORT= 8000
MONGO_URL= //any mongodb url: use mongo atlas
ACCESS_TOKEN_SECRET= // use this: require('crypto').randomBytes(64).tostring('hex') in node repl to generate the random string
REFRESH_TOKEN_SECRET= // use this: require('crypto').randomBytes(64).tostring('hex') in node repl to generate the random string
HOST_ID= use any mail service provider email // E.g: gmail id
HOST_PASS= //For gmail create a app password and use that.
STRIPE_SECRET_KEY= //Use Stripe secret key for payment.
```

### 3. For Development purposes:

#### Run `npm run watch` in the root of the project

### 4. For Deployment purposes:

#### Run `npm start` in the root of the project

### Use Postman to try this API

#### To view my postman collection. click here:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24921455-c56e89c4-853c-42b3-9a0c-be3fc22fa142?action=collection%2Ffork&collection-url=entityId%3D24921455-c56e89c4-853c-42b3-9a0c-be3fc22fa142%26entityType%3Dcollection%26workspaceId%3D974a369b-248f-4d75-8791-1eb1f8dde207)
