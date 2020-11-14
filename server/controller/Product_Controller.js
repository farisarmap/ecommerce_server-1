const {Product} = require('../models/index')

class ProductController {
    static async showData(req, res, next){
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        }
        catch(err) {
            next(err)
        }
    }

    static async create(req,res, next){
        const UserId = req.loggedInUser.id
        const {name, image_url, price, stock} = req.body
        try{
            const createProduct = await Product.create({
                name, image_url, price, stock
            })
            res.status(201).json(createProduct)
        }
        catch(err) {
            next(err)
        }
    }
    static async edit(req, res, next){
        const id = req.params.id
        const {name, image_url, price, stock} = req.body
        try {
            const edit = await Product.update({
                name, image_url, price, stock
            }, {
                where: {
                    id: id
                }, returning: true
            })
            res.status(200).json(edit)
        }
        catch(err) {
            next(err)
        }
    }
    static async delete(req,res,next){
        const id = req.params.id
        try {
            const deleteData = await Product.destroy({
                where: {
                    id: id
                }, returning: true
            })
            res.status(200).json({
                msg: "Item has been deleted"
            })
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = ProductController
