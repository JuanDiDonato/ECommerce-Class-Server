const { Router } = require('express');
const passport = require('passport');
const ShipmentControllers = require('../controllers/shipments')
require('../passport')

const router = Router()

// get events
router.get('/get',passport.authenticate('jwt', { session: false }),(req,res) => ShipmentControllers.Get(req,res)) 
// create event
router.post('/create',passport.authenticate('jwt', { session: false }),(req,res) => ShipmentControllers.Create(req,res)) 
// edit event
router.put('/edit/:_id',passport.authenticate('jwt', { session: false }),(req,res) => ShipmentControllers.Edit(req,res)) 
// delete event
router.delete('/delete/:_id',passport.authenticate('jwt', { session: false }),(req,res) => ShipmentControllers.Delete(req,res)) 
module.exports = router