const express = require(`express`);
const router = express.Router();
const Schemas = require(`../helper/userSchema`);
const validate = require(`../helper/requestValidation`);
const { isUserAuthenticate } = require(`../helper/authenticate`);
//message controller
const messageController = require(`../controller/message.controller`);

router.post(
  "/add-message",
  validate.Validate(Schemas.addMessageSchema),
  isUserAuthenticate,
  messageController.addMessage
);
router.post(
  "/get-messages",
  validate.Validate(Schemas.getMessageSchema),
  isUserAuthenticate,
  messageController.getMessages
);

module.exports = router;
