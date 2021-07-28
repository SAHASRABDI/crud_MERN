const express = require("express"); //
const cors = require("cors"); //
const mongoose = require("mongoose"); //help connection with mongoDB

require("dotenv").config(); //get our environment variable

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; //databuse uri which we will get from mongoDb dashboard
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}); //connection

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo db connection established");
});
//As the connection is opened it will console log
//--------------------------------------------------

const userRouter = require("./routes/users.js");
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
