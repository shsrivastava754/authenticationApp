const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

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