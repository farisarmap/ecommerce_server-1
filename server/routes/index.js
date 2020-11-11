const user_routes = require('./user-routes')
const product_routes = require('./product-routes')
const router = require('express').Router()

router.use('/', user_routes)
router.use('/product', product_routes)

module.exports = router