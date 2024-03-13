const { messageService } = require(`../services/index`);

module.exports = {
  getMessages: async (req, res, next) => {
    try {
      const { from, to } = req.body;

      const messages = await messageService.getMessagesData(from, to);
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      return res.json({
        status: true,
        message: `User message data loaded successfully.`,
        data: projectedMessages,
      });
    } catch (ex) {
      return res.json({
        status: false,
        message: `Issue retrieving the user messages. Please try again.`,
        error: error,
      });
    }
  },
  addMessage: async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await messageService.addMessageData(from, to, message);
      if (data) {
        return res.json({
          status: true,
          message: `Message added successfully.`,
        });
      } else {
        return res.json({
          status: true,
          message: `Failed to add message to the database`,
        });
      }
    } catch (ex) {
      return res.json({
        status: false,
        message: `Issue retrieving the user messages send. Please try again.`,
        error: error,
      });
    }
  },
};
