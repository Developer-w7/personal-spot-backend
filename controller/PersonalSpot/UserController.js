const ProfileModel = require("../../models/PersonalSpot/profile");




exports.getProfile = async (req, res) => {
        try {

// Fetch user profile based on email from request body
// console.log("req.body",req.body);

const cookies = req.cookies;
const userId = req.cookies.user_id;
console.log("cookies",cookies);
    const profile = await ProfileModel.find({ userId: userId }).exec();
    // if (!profile) {
    //     return res.status(404).json({ status: "Profile Not Found" });
    // }
   
    return res.status(200).json(profile);
  
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ status: "Server Error", error })
        }
};
