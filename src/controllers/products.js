// model 
const Product = require('../models/products');
const ModelControllers = require('./model/modelController');
const Validations = require('./validations/validations');

class ProductControllers extends ModelControllers {
    constructor(){
        super();
        this.model = Product;
    }
    // agrego el metodo disable paara podes deshabilitar productos cuando no haya stock
    async Disable(req, res) {
        const { _id } = req.params
        if (await Validations.Exists(Product, _id)) {
            await Product.findByIdAndUpdate({ _id }, { disable: true })
            res.status(204).end()
        } else {
            res.status(404).json({ error: true, message: 'Ocurrio un error inesperado.' })
        }
    }
}

module.exports = new ProductControllers()