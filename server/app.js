const express = require("express");


const cors = require("cors")
const connectDB = require("./config/db");


const app = express();



// const book = require('../server/routes/api/book')
const notes = require("./routes/api/notes")
//below 2 lines for reading the data which we are getting from request
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.use(book)
app.use(notes)

//connect to DB
connectDB();

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
