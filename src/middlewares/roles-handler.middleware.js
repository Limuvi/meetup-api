const ForbiddenError = require('../models/errors/forbidden.error');
const { roleService } = require('../services');

const checkRole = (roleName) => async (req, res, next) => {
  try {
    const { roleId } = req.user;
    const role = await roleService.findByName(roleName);

    if (role.id !== roleId) {
      throw new ForbiddenError();
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkRole;
