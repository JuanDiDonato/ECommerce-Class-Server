// models
const Color = require('../models/colors');
const Product = require('../models/products');
const ModelControllers = require('./model/modelController');

const Validations = require('./validations/validations');

class ColorControllers extends ModelControllers {
    constructor(){
        super()
        this.model = Color
    }
    // reescribo el metodo get, para que solo cree colores para productos que existen.
    async Get(req, res) {
        const { product_id } = req.params // id product
        if (await Validations.Exists(Product, product_id)) {
            const colors = await Color.find({ product: product_id })
            res.status(200).json(colors)
        } else {
            res.status(404).json({ error: true, message: 'Ocurrio un error inesperado.' })
        }
    }
}

module.exports = new ColorControllers()

