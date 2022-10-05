const { decodeToken, generateToken } = require('../helpers');
const { userService } = require('../services');

async function tokenHandler(req, res, next) {
  try {
    if (req.cookies) {
      const { access_token: accessToken, refresh_token: refreshToken } = req.cookies;
      if (!accessToken && refreshToken) {
        const decoded = decodeToken(refreshToken);

        if (decoded) {
          const { id } = decoded;

          const user = await userService.findById(id);

          if (user.refreshToken === refreshToken) {
            const newAccessToken = generateToken({ id }, '1m');
            const newRefreshToken = generateToken({ id }, '30d');

            await userService.updateRefreshTokenById(id, newRefreshToken);

            res.cookie('access_token', newAccessToken, { maxAge: 1000 * 60 * 1 });
            res.cookie('refresh_token', newRefreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });
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
