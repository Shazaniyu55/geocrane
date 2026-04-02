const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
  
  
    profilePic: {
      type: String,
     
    },
   
    fullName: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
   
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    joined_date: {
      type: Date,
      default: Date.now,
    },
    
    online: {
      type: Boolean,
      default: false,
    },
    
    

    userType: {
      type: String,
      
    },
    
    
 




    
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
