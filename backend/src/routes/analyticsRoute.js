const { Router } = require('express');
const controller = require('../Flow/controllers/analytics');


const analyticsRoute = Router();

analyticsRoute.get('/meta',
controller.getMeta
);

analyticsRoute.put('/meta',
controller.updateMeta
);

module.exports = analyticsRoute;