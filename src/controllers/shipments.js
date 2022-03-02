// models
const Shipment = require('../models/shipments');
const ModelControllers = require('./model/modelController');

const shipmentControllers = new ModelControllers(Shipment);

module.exports = shipmentControllers