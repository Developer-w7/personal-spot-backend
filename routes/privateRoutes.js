
const express = require("express");
const { authRole } = require("./utils");
const { ROLE, users } = require('../constants/roles');
const ServiceController = require("../controller/ServiceCompany/ServiceController");
const UserController = require("../controller/PersonalSpot/UserController");
const privateRouter = new express.Router();
const ProfileController = require("../controller/PersonalSpot/ProfileController");

// Admin Routes
privateRouter.post('/admin_home', authRole(ROLE.ADMIN), (req,res,next)=>{
    res.status(200).send("Admin Route")
});

// Sub Admin Routes

privateRouter.post('/add_job', ServiceController.saveJob);

// Auditor

// Author

// Controller

//user Routes

privateRouter.get('/user/profile', UserController.getProfile);
privateRouter.post('/add_profile', ProfileController.saveProfile);
privateRouter.post('/update_profile/:id', ProfileController.updateProfile);

// Previlaged User Routes
privateRouter.post('/secured_api', authRole(ROLE.BASIC), (req,res,next)=>{
    res.status(200).json({"status":"Private Route"})
});





module.exports = privateRouter;