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
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
      address: String,
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

UserSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", UserSchema);
module.exports = User;
