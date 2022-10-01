/* eslint-disable no-console */
const app = require('express')();
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
