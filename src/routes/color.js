const { Router } = require('express');
const passport = require('passport');
const ColorControllers = require('../controllers/colors')
require('../passport')

const router = Router()

// get colors
router.get('/get/:product_id',passport.authenticate('jwt', { session: false }),(req,res) => ColorControllers.Get(req,res)) 
// create color
router.post('/create',passport.authenticate('jwt', { session: false }),(req,res) => ColorControllers.Create(req,res)) 
// edit colors
router.put('/edit/:_id',passport.authenticate('jwt', { session: false }),(req,res) => ColorControllers.Edit(req,res)) 
// delete color and waits
router.delete('/delete/:_id',passport.authenticate('jwt', { session: false }),(req,res) => ColorControllers.Delete(req,res)) 
module.exports = router