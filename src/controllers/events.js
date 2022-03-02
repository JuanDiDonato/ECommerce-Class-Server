// models
const Event = require('../models/events');
const ModelControllers = require('./model/modelController')

const EventControllers = new ModelControllers(Event)

module.exports = EventControllers