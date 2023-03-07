const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();
const uri = "mongodb://127.0.0.1:27017/loginDb";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with the DB");
  })
  .catch((err) => {
    console.log(err);
  });

const dbScehma = new mongoose.Schema({
  name: String,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const Users = new mongoose.model("Users", dbScehma);

module.exports = Users;
