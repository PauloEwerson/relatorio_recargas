const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

// ....

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ....

app.use('/operadores', routes.operadoresRoute);
app.use('/upload', routes.uploadRoute);
app.use('/relatorio', routes.relatorioRoute);
app.use('/analytics', routes.analyticsRoute);

module.exports = app;
