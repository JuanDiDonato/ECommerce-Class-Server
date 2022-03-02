// model
const Validations = require('../validations/validations')

class ModelControllers {
    constructor(model) {
        this.model = model
    }
    async Get(req, res) {
        const data = await this.model.find()
        res.status(200).json(data)
    }
    async Create(req, res) {
        const body = req.body;
        const data = Validations.notNull(body)
        const files = req.files
        if (data) res.status(400).json({ error: true, message: 'Complete todos los campos.' });
        else {
            if (files.length > 0) {
                let filesNames = Validations.Photos(files)
                body['photos'] = filesNames

            }
            const newData = new this.model(body);
            newData.save();
            res.status(201).json({ error: false, message: `${this.model.modelName} creado con exito` });
        }

    }
    async Edit(req, res) {
        const body = req.body;
        const { _id } = req.params
        const files = req.files
        const data = Validations.notNull(body)
        if (data) res.status(400).json({ error: true, message: 'Complete todos los campos.' });
        else {
            if (await Validations.Exists(this.model, _id)) {
                if (files.length > 0) {
                    let filesNames = Validations.Photos(files)
                    body['photos'] = filesNames
                }
                await this.model.findByIdAndUpdate({ _id }, body)
                res.status(204).end()
            } else {
                res.status(404).json({ error: true, message: 'Ocurrio un error inesperado.' })
            }
        }
    }
    async Delete(req, res) {
        const { _id } = req.params
        if (await Validations.Exists(this.model, _id)) {
            await this.model.findByIdAndDelete({ _id })
            res.status(204).end()
        } else {
            res.status(404).json({ error: true, message: 'Ocurrio un error inesperado.' })
        }
    }
}
module.exports = ModelControllers