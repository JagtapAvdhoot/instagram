require("dotenv").config();

const ConnectDatabase = require("./src/configs/db");
const app = require("./src/server");

ConnectDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () =>
   console.log(`server is running on port : ${port}`)
);