require("dotenv").config();

const { Server } = require("ws");

const ConnectDatabase = require("./server/configs/db");
const app = require("./server/server");

ConnectDatabase();

const port = process.env.PORT || 3000;

const s = app.listen(port, () =>
   console.log(`server is running on port : ${port}`)
);