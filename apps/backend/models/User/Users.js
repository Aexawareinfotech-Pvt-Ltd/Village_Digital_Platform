import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { type : String, required : true, trim: true},
    phone : { type : String, required : true, unique: true, trim: true },
    email : { type : String, required : true, unique: true, trim: true, lowercase: true},
    passwordHash : { type : String, required : true  },
    role : {type : String, required : true, enum : ["User","Admin"], default : "User" },
    isVerified : { type : Boolean, default : false },
    resetPasswordToken: { type : String },
    resetPasswordExpire: { type: Date },
    createdAt : { type : Date, default : Date.now  }
});

export default mongoose.model("User", userSchema);