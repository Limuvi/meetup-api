/* eslint-disable no-console */
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { initDB } = require('./src/db');
const { meetupRouter, authRouter } = require('./src/routes');
const { errorHandler } = require('./src/middlewares');
const { jwtStrategy } = require('./src/auth');

const PORT = 7000;
const { JWT_SECRET } = process.env;
const app = express();
const swaggerFile = JSON.parse(fs.readFileSync('./openapi.json'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));

passport.use(jwtStrategy);
app.use(passport.initialize());
meetupRouter('/meetups', app, passport);
authRouter('/auth', app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}.`);
  initDB();
});
