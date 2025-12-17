## Marketplace API

Node/Express API for a Marketplace e-commerce service backed by MongoDB and Stripe.

- **Frontend**: https://github.com/bishal2059/marketplace-fe

### Prerequisites
- Node.js 18+
- MongoDB connection string (Atlas or self-hosted)
- Stripe secret key
- Mail provider credentials for sending verification email

### Quick Start
1) Install dependencies: `npm install`
2) Create `.env` in the project root:
```
PORT=8000
MONGO_URL=<your MongoDB URI>
ACCESS_TOKEN_SECRET=<run: require('crypto').randomBytes(64).toString('hex')>
REFRESH_TOKEN_SECRET=<run: require('crypto').randomBytes(64).toString('hex')>
HOST_ID=<mailer email address>
HOST_PASS=<mailer password or app password>
STRIPE_SECRET_KEY=<your stripe secret key>
```
3) Development server (nodemon): `npm run watch`
4) Production server: `npm start`

### API Testing
Use Postman with the collection below:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24921455-c56e89c4-853c-42b3-9a0c-be3fc22fa142?action=collection%2Ffork&collection-url=entityId%3D24921455-c56e89c4-853c-42b3-9a0c-be3fc22fa142%26entityType%3Dcollection%26workspaceId%3D974a369b-248f-4d75-8791-1eb1f8dde207)
