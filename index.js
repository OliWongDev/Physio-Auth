import express from 'express'
import auth from "./routes/auth.js"
import post from "./routes/posts.js"

const app = express()

app.use(express.json())

app.use("/auth", auth)
app.use("/posts", post)

app.get("/", (req, res) => {
  res.send("Hi I am working!")
})

app.listen(5000, () => {
  console.log("Now running on port 5000")
})