
const express = require('express')
const app = express()
const port = 3000

app.get('/lol', (req, res) => {
  res.send({a: "a", b: "b"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("test");