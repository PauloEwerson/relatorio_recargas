require('dotenv').config();
const app = require('./api');

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
