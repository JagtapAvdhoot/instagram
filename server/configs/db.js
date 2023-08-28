const { connect } = require("mongoose");

const ConnectDatabase = async () => {
  try {
    await connect(process.env.MONGODB_CONNECTION_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error.message);
    console.log("database connection failure");
    process.exit(0);
  }
};

module.exports = ConnectDatabase;
