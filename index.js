/* eslint-disable no-console */
const express = require('express');
const router = require('./src/routes');
require('dotenv').config();

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
