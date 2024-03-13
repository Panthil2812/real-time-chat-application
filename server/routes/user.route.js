const express = require(`express`);
const router = express.Router();
const Schemas = require(`../helper/userSchema`);
const validate = require(`../helper/requestValidation`);
const { isUserAuthenticate } = require(`../helper/authenticate`);

//User Auth
const userController = require(`../controller/user.controller`);

router.post(
  `/user-sign-in`,
  validate.Validate(Schemas.signInuserSchemas),
  userController.signInUser
);
router.post(
  `/add-new-user`,
  validate.Validate(Schemas.userSchemas),
  userController.addNewUser
);
router.get(`/get-user/:id`, isUserAuthenticate, userController.getUserId);
router.get(`/get-all-user`, isUserAuthenticate, userController.getAllUserData);

module.exports = router;
