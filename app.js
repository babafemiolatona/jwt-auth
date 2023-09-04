require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth.js');

const User = require("./model/user");

const app = express();

app.use(express.json());

module.exports = app;

app.post("/register", async (req, res) => {
    try {
        // Get user input
        const {first_name, last_name, email, password} = req.body;
        
        // Validate user input
        if (!(first_name && last_name && email && password)) {
            res.status(400).send("All input is required")
        }

        // Checks if user exists in the database
        const oldUser = await User.findOne({ email: email.toLowerCase() });

        if (oldUser) {
            res.status(409).send("User already exists. Please Login.");
        }

        // Encrypt user password
        encryptPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptPassword
        });

        // Create token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        // Save token
        user.token = token;

        // Return new user
        res.status(201).json(user);
    } catch(err) {
        console.log(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required")
        }

        // Checks if user exists in the database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign (
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );

        // Save user token
        user.token = token;
        return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

app.get("/protected", auth, (req, res) => {
    // res.status(200).send("Welcome");
    res.json({ message: 'This is a protected route.', user: req.user });
});

module.exports = app