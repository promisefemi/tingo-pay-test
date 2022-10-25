const mongoose = require("mongoose");

const Transaction = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  type: String,
});

module.exports = mongoose.model("transactions", Transaction);
