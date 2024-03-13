const User = require(`./user.model`);

module.exports = {
  getAllUserData: async (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await User.find(
          { active: true, _id: { $nin: [user_id] } },
          {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            password: 0,
            active: 0,
            role: 0,
          }
        );

        return resolve(result);
      } catch (error) {
        console.log("getAllUserData service error  : ", error);
        return reject(false);
      }
    });
  },
  addUpdateUserData: async (username, email, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await User.updateOne(
          { username, email },
          { ...data },
          { upsert: true }
        );
        return resolve(
          await User.findOne(
            { username, email },
            {
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
            }
          )
        );
      } catch (error) {
        console.log("addUserData service error  : ", error);
        return reject(false);
      }
    });
  },
  findbyUserEmail: async (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await User.find({ email }, { createdAt: 0, updatedAt: 0, __v: 0 })
        );
      } catch (error) {
        console.log("findbyUserEmail service error  : ", error);
        return reject(false);
      }
    });
  },
  checkEmail: async (email, active = true) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await User.countDocuments({ email, active }));
      } catch (error) {
        console.log("checkEmail service error  : ", error);
        return reject(false);
      }
    });
  },
  countUserCounts: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await User.countDocuments({}));
      } catch (error) {
        console.log("countUserCounts service error  : ", error);
        return reject(false);
      }
    });
  },
  getUserDataById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await User.find(
          { _id: id },
          {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          }
        );

        return resolve(result);
      } catch (error) {
        console.log("getAllUserData service error  : ", error);
        return reject(false);
      }
    });
  },
};
