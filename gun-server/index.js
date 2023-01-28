// in the index.js file

const express = require('express')
const app = express()
const port = 5050
const Gun = require('gun')

app.use(Gun.serve)

const server = app.listen(port, () => {
  console.log(`Gun server running on port ${port}🔥`)
})

Gun({ web: server })
