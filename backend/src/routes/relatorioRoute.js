const { Router } = require('express');
const controller = require('../Flow/controllers/relatorio');

const relatorioRoute = Router();

relatorioRoute.get('/', controller.getDataReport);

module.exports = relatorioRoute;