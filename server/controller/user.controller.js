const { userService } = require(`../services/index`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");
const JWTSecretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  addNewUser: async (req, res) => {
    try {
      const request_body = req?.body;

      const checkEmail = await userService.checkEmail(request_body.email);
      if (checkEmail)
        return res.json({
          status: false,
          message: `A user with this email already exists. Please try using a different email to sign up or log in using the existing account.`,
        });
      // set encoder password
      request_body.password = await bcrypt.hash(request_body.password, 10);
      const result = await userService.addUpdateUserData(
        request_body.username,
        request_body.email,
        request_body
      );

      return res.json({
        status: true,
        message: `User has been successfully added.`,
        data: result,
      });
    } catch (error) {
      console.log(`addNewUser error: `, error);
      return res.json({
        status: false,
        message: `There seems to be an issue with adding the new user. Please try again.`,

        error: error,
      });
    }
  },
  signInUser: async (req, res) => {
    try {
      const request_body = req?.body;
      const findbyUserEmail = await userService.findbyUserEmail(
        request_body.email
      );

      if (!findbyUserEmail?.length)
        return res.json({
          status: false,
          message: `There is no account associated with this user name or email address. Please try again.`,
        });
      if (findbyUserEmail?.length && !findbyUserEmail[0].active)
        return res.json({
          status: false,
          message: `Your account has been blocked by the main user. Please contact the main user for further assistance.`,
        });

      const isPasswordValid = await bcrypt.compare(
        request_body.password,
        findbyUserEmail[0].password
      );
      if (!isPasswordValid)
        return res.json({
          status: false,
          message: `Please provide a valid password.`,
        });

      const token = jwt.sign(findbyUserEmail[0].toJSON(), JWTSecretKey, {
        expiresIn: 86400,
      });
      return res.json({
        status: true,
        message: `The user has successfully logged in.`,
        data: findbyUserEmail[0],
        token: token,
      });
    } catch (error) {
      console.log(`signInUser error: `, error);
      return res.json({
        status: false,
        message: `There seems to be an issue with signing in as an user. Please try again.`,

        error: error,
      });
    }
  },
  getAllUserData: async (req, res) => {
    try {
      const user_id = req.body._id;
      const getAllUserData = await userService.getAllUserData(user_id);
      return res.json({
        status: true,
        message: `All user data loaded successfully.`,
        data: getAllUserData,
      });
    } catch (error) {
      console.log(`getAllUserData error: `, error);
      return res.json({
        status: false,
        message: `Issue retrieving all the user data. Please try again.`,

        error: error,
      });
    }
  },
  getUserId: async (req, res) => {
    try {
      const id = req?.params?.id;
      const findbyUserId = await userService.getUserDataById(id);
      if (!findbyUserId?.length)
        return res.json({
          status: false,
          message: `The user data with the given ID not found. Confirm the ID and retry.`,
        });
      return res.json({
        status: true,
        message: `The user data loaded successfully.`,
        data: findbyUserId[0],
      });
    } catch (error) {
      console.log(`getUserId error: `, error);
      return res.json({
        status: false,
        message: `Issue retrieving the user user ID. Please try again.`,

        error: error,
      });
    }
  },
};
