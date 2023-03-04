const { Router } = require('express');
const controller = require('../Flow/controllers/operadores');
const isValidOperator = require('../middleware/validateOperator');


const categoryRoute = Router();

categoryRoute.post('/',
isValidOperator.validateOperator,
controller.addOperator
);

categoryRoute.get('/',
controller.getAllOperators
);

categoryRoute.get('/:id',
controller.getSingleOperator
);

categoryRoute.put('/:id',
controller.updateOperator
);

categoryRoute.delete('/:id',
controller.deleteOperator
);

module.exports = categoryRoute;