const http = require("http");
const { connectToDB } = require("./services/mongo");

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const startServer = async function () {
  try {
    await connectToDB();
  } catch (err) {
    console.error(`Database connection failed ${err}`);
  }
  server.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`);
  });
};

startServer();
