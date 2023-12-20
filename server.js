const http = require("http");
require("dotenv").config();

const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

//import dari mondule lain
const { mongoConnect } = require("./services/mongo");

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

startServer();
