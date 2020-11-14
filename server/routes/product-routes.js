const ProductController = require('../controller/Product_Controller')
const router = require('express').Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', ProductController.showData)
router.post('/', authorization, ProductController.create)
router.put('/:id', authorization, ProductController.edit)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router
