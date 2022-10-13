const express = require('express')
const app = express()
const routes = require("./routes/index")
const session = require("express-session")
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookies: {
    secure: false,
    sameSite: true
  }
}))

app.use("/", routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})