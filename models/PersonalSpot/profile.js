
const Mongoose = require('mongoose');

const ProfileSchema = Mongoose.Schema(
    {
     
      
      index: {type: Number,  index: true, unique: true},
      userId: { type: String},
      name: { type: String, default: null },
      phoneNumber: { type: Number, required: [true, "Phone required."], index: true, unique: true },
      email: { type: String, required: true, index: true, unique: true },
      education: { type: String },
      aboutYou: { type: String },
      address: { type: String },
      skills: { type: String },
      experience: { type: String },
      date: { type: Date },
    },{ timestamps: true, collection: "user_profile" })
let ProfileModel = Mongoose.model("user_profiles", ProfileSchema);
ProfileModel.createIndexes();
module.exports= ProfileModel;