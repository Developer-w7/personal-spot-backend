

const ProfileModel = require("../../models/PersonalSpot/profile.js");


// user send otp
exports.saveProfile = async (req, res) => {
        try {

    const { name,phoneNumber,email,aboutYou,education,address,skills, experience } = req.body;
    const userId = req.userId;
    if (!email) {
        res.status(400).json({ error: "Missing Form Details" });
        return;
    }

    const today = new Date();
    const timestamp = today.getTime();
    // Generate a number based on the timestamp and a random factor
    const randomNumberWithDateInfluence = timestamp + Math.floor(Math.random() * 10000); 
    

           // Create user in our database
   const profile = await ProfileModel.create({
        userId: userId,
        name,
        phoneNumber:parseInt(phoneNumber),
        email: email.toLowerCase(),
        aboutYou,
        education,
        address,
        skills,
        experience,
        date: new Date(),
        index: randomNumberWithDateInfluence

  });
  res.status(201).json(profile);
      
    } catch (error) {
        res.status(400).json({ status: "Invalid Details", error })

    }
};


exports.updateProfile = async (req, res) => {
    try {
    const profileId = req.params.id;
    const userId = req.userId;
    const updatedUserData = req.body; // Expects the full user object

      const profileUpdatedData = await ProfileModel.updateOne(
        { _id: profileId, userId: userId }, // Ensure the user can only update their own profile
        { $set: updatedUserData }
       );

    res.status(200).json({
        message: `User ${userId} fully updated`,
        data: profileUpdatedData
    });
    }
    catch (error) {
        res.status(400).json({ status: "Invalid Details", error })

    }
}
