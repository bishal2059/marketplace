# marketplace
This is an API build using Node,Express and MongoDB

To use follow the following step:
1) Run (npm install) in the terminal of the project folder
2) Make an .env file with following components:
PORT = 8000;
MONGO_URL = //any mongodb url: use mongo atlas
ACCESS_TOKEN_SECRET = //run is command in the node repl and paste the code: require('crypto').randomBytes(64).tostring('hex')
REFRESH_TOKEN_SECRET = //run is command in the node repl and paste the code: require('crypto').randomBytes(64).tostring('hex')
HOST_ID = use any mail service provider email // E.g: gmail id
HOST_PASS = //For gmail create a app password and use that.
