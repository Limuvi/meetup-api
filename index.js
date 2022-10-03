/* eslint-disable no-console */
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const { initDB } = require('./src/db');
const router = require('./src/routes');
const { errorHandler } = require('./src/middlewares');

const PORT = 7000;
const app = express();
const swaggerFile = JSON.parse(fs.readFileSync('./openapi.json'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}.`);
  initDB();
});
