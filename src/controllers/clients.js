const jwt = require('jsonwebtoken')
const bcrypt = require('../helpers/bcrypt')
const Client = require('../models/client')

// validations
const Validations = require('./validations/validations')


class ClientControllers {

    signToken(id) {
        return jwt.sign({
            iss: 'test',
            sub: id
        }, 'test', { expiresIn: '1h' })
    }
    async Register(req, res) {
        const { password, name, surname, email } = req.body
        if (Validations.notNull({ password, name, surname, email })) {
            res.status(400).json({ error: true, message: 'Complete todos los campos.' })
        } else {
            const data = await Client.findOne({ email })
            if (data) res.status(400).json({ error: true, message: 'Este usuario ya existe.' })
            else {
                const client = new Client({ name, surname, password, email })
                client.password = await bcrypt.EncryptPassword(password);
                client.save();
                res.status(201).json({ error: false, message: 'Usuario creado con exito' })
            }
        }
    }
    async Login(req, res) {
        if (req.isAuthenticated()) {
            const { id } = req.user
            let token = this.signToken(id)
            res.cookie('access_token', token, { httpOnly: true, sameSite: true })
            res.status(200).json({ error: false })
        }
    }
    getUser(req, res) {
        if (req.user) {
            const { _id, name, surname, email, address } = req.user
            res.status(200).json({ _id, name, surname, email, address, 'isAuth': true })
        } else res.status(204).end()

    }
    Logout(req, res) {
        res.clearCookie('access_token');
        res.status(200).json({
            user: { name: '', surname: '', email: '' },
            error: false
        });
    }

}


module.exports = new ClientControllers()