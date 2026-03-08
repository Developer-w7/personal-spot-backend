const Mongoose = require('mongoose');


const BookSchema = Mongoose.Schema(
    {
      BookName: { type: String, default: "" },
      BookAuthor: { type: String, default: "" },
      BookPublishedDate: { type: String, default: "" },
      BookGenre: { type: String, default: "" },
      // studentId: { type: Mongoose.Schema.ObjectId,ref:StudentModel, required:true, index:true },
      BookDescription: { type: String, default: "" },
      BookImg: { type: String, default: "" },
      

    },{ timestamps: true, collection: "Book" })
    let BookModel = Mongoose.model("Books", BookSchema);


    // BookModel.getXPerson = (where) => {
    //     return BookModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
    //   };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= BookModel;