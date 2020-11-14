const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 3000
const routes = require('./routes/index')
const error_handler = require('./middleware/error_handler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)
app.use(error_handler)

app.listen(port, () => {
	console.log(`running on port: ${port}`)
}) 

module.exports = app