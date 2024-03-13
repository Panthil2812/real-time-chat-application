const Message = require(`./message.model`);

module.exports = {
  getMessagesData: async (from, to) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Message.find(
          {
            users: {
              $all: [from, to],
            },
          },
          {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          }
        ).sort({ updatedAt: 1 });

        return resolve(result);
      } catch (error) {
        console.log("getMessages service error  : ", error);
        return reject(false);
      }
    });
  },
  addMessageData: async (from, to, message) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
          })
        );
      } catch (error) {
        console.log("addMessageData service error  : ", error);
        return reject(false);
      }
    });
  },
};
