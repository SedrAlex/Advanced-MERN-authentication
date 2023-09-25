const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
     {
        name:{
            type: String,
            required:[true, "Please add a name"]
        },
         email:{
            type: String,
            required:[true, "Please add an email"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email",
              ],
        },
        password:{
            type: String,
            required:[true, "Please add a password"]
        },
        photo:{
            type: String,
            required:[true, "Please add a photo"],
            default:"https://static.wikia.nocookie.net/heroes-and-villain/images/c/c6/Profile_-_Remy_%28Ratatouille%29.jpg/revision/latest?cb=20200220121148"
        },
        phone:{
            type: String,
            default:"+963"
        },
         bio:{
            type: String,
            default:"bio"
        },
        role:{
            type: String,
            required:[true],
            default:"visitor"
            // Another types of roles: visitor, supervisor, and admin (suspended)
        },
        isVerified:{
            type: Boolean ,
            default: false
            // Another types of roles: subscriber, author, and admin (suspended)
        },
        userAgent:{
            type: Array,
            required:true,
            default:[]
            // the agent is the device that the user sign in from laptop, or mobile, or browsers
        },
    },
    {
        timestamps:true,
        minimize: false
     }
);
// Encrypt password before saving to DB
  userSchema.pre("save", async function (next) {
     if(!this.isModified("password")) {
        return next();
     }
// Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;
   next();
});

const User  = mongoose.model("User" , userSchema);
 module.exports = User