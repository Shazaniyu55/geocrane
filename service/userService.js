const User = require("../model/userModel");

const userService = {
  
    async createUser(data) {
        const user = new User(data);
        return await user.save();
      },

      async getUserByEmail(email) {
        return await User.findOne({ email });
      },

       async getUserByPhone(phone) {
        return await User.findOne({ phone });
      },

      async checkOtpExists(otp) {
        const user = await User.findOne({ otp });
        return !!user;
      },


      async getUserByOtp(otp) {
          return await User.findOne({ otp });
       },

         async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
  },

    async getUserById(id) {
    return await User.findById(id).select("+password");
  },



      
}



module.exports = userService;