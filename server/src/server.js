const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const router = require("./routes");
const notFound = require("./handlers/notFoundHandler");
const errorHandler = require("./handlers/errorHandler");

const app = express();

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json({ extended: true, limit: "50MB" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  const compression = require("compression");
  app.use(compression());
}


app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).send("hello nigger nig nig");
});
// 404 handler
app.use(notFound);
// error handler
app.use(errorHandler);

module.exports = app;
