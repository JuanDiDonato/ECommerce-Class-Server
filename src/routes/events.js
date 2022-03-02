const { Router } = require('express');
const passport = require('passport');
const EventControllers = require('../controllers/events')
require('../passport')

const router = Router()

// get events
router.get('/get',passport.authenticate('jwt', { session: false }),(req,res) => EventControllers.Get(req,res)) 
// create event
router.post('/create',passport.authenticate('jwt', { session: false }),(req,res) => EventControllers.Create(req,res)) 
// edit event
router.put('/edit/:_id',passport.authenticate('jwt', { session: false }),(req,res) => EventControllers.Edit(req,res)) 
// delete event
router.delete('/delete/:_id',passport.authenticate('jwt', { session: false }),(req,res) => EventControllers.Delete(req,res)) 
module.exports = router