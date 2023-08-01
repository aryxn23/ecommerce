import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

const secret = "veryDifficultToGuess";

// Registring in
export const register = async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ fName, lName, email, password: passwordHash });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logging in 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            jwt.sign({ email, id: user._id }, secret, {}, (err, token) => {
                if (err) throw err;
                console.log("token: " + token);
                res.cookie("token", token).json("ok");

            });
        } else {
            return res.status(400).json({ msg: "Invalid credentials. " });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Verifying
export const verify = (req, res) => {
  // console.log("Triggered");
    const { token } = req.cookies;
    console.log("Verify token: " + token);    try {
        const { token } = req.cookies;
        const decodedToken = jwt.verify(token, secret);
        res.json(decodedToken);
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

// Logging Out
export const logout = (req, res) => {
    res.cookie("token", "").json("Ok");
};
