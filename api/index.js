const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  console.log(req);
  res.send()
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})