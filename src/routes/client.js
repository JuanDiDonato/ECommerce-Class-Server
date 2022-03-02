const { Router } = require('express');
const passport = require('passport');
const ClientControllers = require('../controllers/clients')
require('../passport')

const router = Router()

router.post('/register', (req,res) => ClientControllers.Register(req, res))
router.post('/login', passport.authenticate('local', { session: false }), (req,res) => ClientControllers.Login(req, res))

module.exports = router


