const JWTSecretKey = process.env.JWT_SECRET_KEY;
const jwt = require(`jsonwebtoken`);
const isset = require(`isset`);
const { userService } = require(`../services/index`);

// =================================== Check User authentication  ===================================
module.exports.isUserAuthenticate = (req, res, next) => {
  let token = req.headers.authorization;
  jwt.verify(token, JWTSecretKey, async (err, result) => {
    if (err)
      return res.json({
        status: false,
        message: `Invalid token or expired!`,
        isAuth: false,
      });
    if (result && isset(result._id)) {
      const getUserData = await userService.getUserDataById(result._id);
      if (!getUserData?.length)
        return res.json({
          status: false,
          message: `Invalid token or expired!`,
          isAuth: false,
        });

      if (getUserData[0].role !== "user")
        return res.json({
          status: false,
          message: `Access to the target resource has been denied`,
          isAuth: false,
        });
      req.body._id = getUserData[0]._id;
      return next();
    }
    return res.json({
      status: false,
      message: `Invalid token or expired!`,
      isAuth: false,
    });
  });
};
