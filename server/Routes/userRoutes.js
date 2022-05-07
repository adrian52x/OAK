import Router from "express";
const router = Router();

import User from "../Model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Get all users
router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({total_users: users.length, users : users}) 
    } catch (error) {
        res.status(400).json({ message: "something wrong" })
    }
});

// Register
router.post("/api/register", async (req, res) => {
    // Our register logic starts here
   try {
        // Get user input
        const { first_name, last_name, email, plateNumber, password } = req.body;

        // Validate user input
        if (!(first_name && last_name && email && plateNumber && password )) {
            return res.status(400).send("All input are required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("Email already in use");
        } 

        //Encrypt user password
        const encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(), // sanitize
            plateNumber: plateNumber,
            password: encryptedUserPassword,
        });

        // return new user
        return res.status(201).json(user);
    } catch (err) {
            console.log(err);
        }
});


// Login
router.post("/api/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "5h"});

            // create cookie
            res.cookie('jwt-OAK', token, {
                httpOnly: true,
                maxAge: 5 * 60 * 60 * 1000 // 5 hours
            })
    
            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (error) {
        return res.status(400).json({ message: "something wrong" })
        }    
});

// Logout
router.post("/api/logout", async (req, res) => {
    res.cookie('jwt-OAK', '', {maxAge: 0}) 

    return res.status(200).send("Success: Logged out");
});


// Current user by token
router.get("/api/user", async (req, res) => {
    try {
        const cookie = req.cookies['jwt-OAK']
        console.log(cookie);

        const credentials = jwt.verify(cookie, process.env.SECRET_KEY)

        const user = await User.findOne({ _id: credentials.user_id })

        // pass data without password
        const {password, ...data} = await user.toJSON()

        

        return res.status(200).json(data);

    } catch (error) {
        return res.status(401).send({ message: 'unauthenticated' })
    }

    
});


router.patch("/api/user/:email", async (req, res) => {
    try {
        const email = req.params.email
       
        const user = await User.findOne({ email })

        Object.assign(user, req.body)
        user.save();
        
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Not found " })
    }
        

}); 








export default router;