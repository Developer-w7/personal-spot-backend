const Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

const JobSchema = Mongoose.Schema(
    {
      index: {type: Number,  index: true, unique: true},
      title: { type: String, default: null },
      employee_id: { type: String, unique: true },
      location: { type: String },
      date: { type: Date },
      country: { type: Object, required:false},
      description: { type: String }
    },{ timestamps: true, collection: "job" })
let JobModel = Mongoose.model("jobs", JobSchema);
module.exports= JobModel;