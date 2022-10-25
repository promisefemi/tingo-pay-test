const express = require("express");

const app = express();
app.use(express.json());
const users = require("./routes/user");
const auth = require("./routes/auth");
const { default: mongoose } = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://localhost:27017/tingo",{},()=>{
    console.log("Database Connected")
})


app.use("/user", users);
app.use("/auth", auth);

app.listen(port, () => {
  console.log("Application is running port " + port);
});
