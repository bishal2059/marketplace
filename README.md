# marketplace

This is an API build using Node,Express and MongoDB

To use follow the following step:

1. Run (npm install) in the terminal of the project folder
2. Make an .env file with following components:

PORT = 8000;

MONGO_URL = //any mongodb url: use mongo atlas

ACCESS_TOKEN_SECRET = //run is command in the node repl and paste the code: require('crypto').randomBytes(64).tostring('hex')

REFRESH_TOKEN_SECRET = //run is command in the node repl and paste the code: require('crypto').randomBytes(64).tostring('hex')

HOST_ID = use any mail service provider email // E.g: gmail id

HOST_PASS = //For gmail create a app password and use that.

Use Postman to try this API
To view my postman collection. click here: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24921455-c56e89c4-853c-42b3-9a0c-be3fc22fa142?action=collection%2Ffork&collection-url=entityId%3D24921455-c56e89c4-853c-42b3-9a0c-be3fc22fa142%26entityType%3Dcollection%26workspaceId%3D974a369b-248f-4d75-8791-1eb1f8dde207)
