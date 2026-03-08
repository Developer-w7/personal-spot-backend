const express = require("express");
const authRouter = new express.Router();

// Auth
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const controllers = require("../controller/UserController");
const AuthController = require("../controller/AuthController");
const BookController = require("../controller/BookController");

const UserModel = require("../models/user");


var faker = require('faker');

// Registration Process

authRouter.post("/register", async (req, res) => {

     try {
      // const { name, email, password } = req.body;
       const { name, email, password, role, roles } = {name:faker.name.findName(),email:faker.internet.email(),password:"123",role: req.body.role,roles: req.body.roles};
  

       console.log(name)
      // Validate user input
      if (!(email && password && name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await UserModel.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      // Encrypt user password
      encryptedUserPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await UserModel.create({
        name: name,
        email: email.toLowerCase(), // sanitize
        password: encryptedUserPassword,
        role: role,
        roles
      });
  
      // Create token
      const accessToken = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );

      user.accessToken = accessToken;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });


  authRouter.post("/user/sendotp",AuthController.userOtpSend);
  authRouter.post("/user/login_with_otp",AuthController.userLoginWithOtp);




  // Login Generating JWT

  authRouter.post("/user/login", async (req, res) => {
    // Validate User Here // Then generate JWT Token // Using Username & Password get user id from db
  try{
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
        // Validate if user exist in our database
        const foundUser = await UserModel.findOne({ email });
        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
  
          const accessToken = jwt.sign(
            { userId: foundUser._id, email },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "30s",
            }
          );

          const refreshToken = jwt.sign(
                          { userId: foundUser._id, email },
                          process.env.REFRESH_TOKEN_SECRET,
                          { expiresIn: '1d' }
                      );

                      foundUser.refreshToken = refreshToken;
          const result = await foundUser.save();
          console.log(result);
      
          res.set({'X-AuthToken':accessToken})
          res.cookie('jwt_refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
          
          //Extra cookie for JWT token
          res.cookie('jwt-access-token', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
          res.cookie('user_id', foundUser._id, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
          res.cookie('user_email', foundUser.email, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
          return res.status(200).json({'user':foundUser,accessToken,'role':foundUser.role});
  
        }else{
          return res.status(400).send("Invalid Credentials");
        }
  }catch(e){
    return res.status(400).send("Login Failed");
  }
  });

  authRouter.get("/logout", async (req, res) => {
    // On client, also delete the accessToken
    try {
    const cookies = req.cookies;
    if (!cookies?.jwt_refresh_token) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt_refresh_token;

    // Is refreshToken in db?
    const foundUser = await UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt_refresh_token', { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(204).send("Logout Failed");
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();


    res.clearCookie('jwt_refresh_token', { httpOnly: true, secure: true, sameSite: 'None' });
    res.clearCookie('jwt-access-token', { httpOnly: true, secure: true, sameSite: 'None' });
    res.clearCookie('user_id', { httpOnly: true, secure: true, sameSite: 'None' });
    res.clearCookie('user_email', { httpOnly: true, secure: true, sameSite: 'None' });

    return res.status(204).send("Logout Successful");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Logout Failed");
    }

   });
module.exports = authRouter;