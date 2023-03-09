const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbScehma = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    unique:true
  },
  description: String,
  deadline: Date
});

const Tasks = new mongoose.model("Tasks", dbScehma);

module.exports = Tasks;
