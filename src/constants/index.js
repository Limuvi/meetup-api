require('dotenv').config();

const {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET,
  HASH_SECRET,
  COOKIE_SECRET,
} = process.env;

const ROLES = {
  ROLE_ORGANIZER: 'organizer',
  ROLE_USER: 'user',
};

const ACCESS_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * 1;
const ACCESS_TOKEN_JWT_EXPIRES_IN = '1m';
const REFRESH_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;
const REFRESH_TOKEN_JWT_EXPIRES_IN = '30d';

module.exports = {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET,
  HASH_SECRET,
  COOKIE_SECRET,
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  ACCESS_TOKEN_JWT_EXPIRES_IN,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_JWT_EXPIRES_IN,
  ...ROLES,
};
