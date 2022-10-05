const { decodeToken, generateToken } = require('../helpers');
const { userService } = require('../services');
const {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  ACCESS_TOKEN_JWT_EXPIRES_IN,
  REFRESH_TOKEN_JWT_EXPIRES_IN,
} = require('../constants');

async function tokenHandler(req, res, next) {
  try {
    if (req.cookies) {
      const { access_token: accessToken, refresh_token: refreshToken } = req.cookies;
      if (!accessToken && refreshToken) {
        const decoded = decodeToken(refreshToken);

        if (decoded) {
          const { id } = decoded;

          const user = await userService.findById(id);

          if (user && user.refreshToken === refreshToken) {
            const newAccessToken = generateToken({ id }, ACCESS_TOKEN_JWT_EXPIRES_IN);
            const newRefreshToken = generateToken({ id }, REFRESH_TOKEN_JWT_EXPIRES_IN);

            await userService.updateRefreshTokenById(id, newRefreshToken);

            res.cookie('access_token', newAccessToken, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE });
            res.cookie('refresh_token', newRefreshToken, { maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE });
            req.cookies.access_token = newAccessToken;
          }
        }
      }
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = tokenHandler;
