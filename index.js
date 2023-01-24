import express from 'express'
import auth from "./routes/auth.js"

const app = express()

app.use("/auth", auth)

app.get("/", (req, res) => {
  res.send("Hi I am working!")
})

app.listen(5000, () => {
  console.log("Now running on port 5000")
})