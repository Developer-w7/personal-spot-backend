
const JobModel = require("../../models/ServiceCompany/jobs.js");

// user send otp
exports.saveJob = async (req, res) => {
        try {

    const { title,employee_id,location,date,country,description } = req.body;

    if (!employee_id) {
        res.status(400).json({ error: "Missing Form Details" })
    }

           // Create user in our database
   const job = await JobModel.create({
    title: title,
    employee_id: employee_id, // sanitize
    location: location,
    date: date,
    country:country,
    description:description

  });
  res.status(201).json(job);
      
    } catch (error) {
        res.status(400).json({ status: "Invalid Details", error })
    }
};

