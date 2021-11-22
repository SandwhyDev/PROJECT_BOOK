const express = require("express")
const cors = require("cors")
const publisher = require("./routes/publisher_route")
const authors = require("./routes/authors_route")
const books = require("./routes/book_route")


require("dotenv").config()

const app = express()
const {PORT} = process.env

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))


//route
app.use("/api", publisher)
app.use("/api", authors)
app.use("/api", books)

app.listen(PORT,()=>{
    console.log(`listened to port ${PORT}`);
})