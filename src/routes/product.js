const { Router } = require('express');
const passport = require('passport');
const ProductControllers = require('../controllers/products')
require('../passport')

const router = Router()

// create product
router.post('/create',passport.authenticate('jwt', { session: false }),(req,res) => ProductControllers.Create(req,res)) 
// get products
router.get('/get',passport.authenticate('jwt', { session: false }), (req,res) => ProductControllers.Get(req,res))
// edit products
router.put('/edit/:_id', passport.authenticate('jwt', { session: false }),(req,res) => ProductControllers.Edit(req,res))
// disable product
router.put('/disable/:_id',passport.authenticate('jwt', { session: false }),(req,res) => ProductControllers.Disable(req,res))
// delete product
router.delete('/delete/:_id', passport.authenticate('jwt', {session:false}),(req,res) => ProductControllers.Delete(req,res))
module.exports = router