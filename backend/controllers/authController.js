import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";

//register
export const register = async (req, res) => {
    //request 
    const {username, email, password, role} = req.body;
    
    //role
    if (role !== 'learner' && role !== 'tutor') {
        return res.status(400).json({ success: false, message: 'Invalid role has been selected.'});
    }

    //existing user check
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.json({success: false, message: 'User already exists. Please select a different email.'});
    }

    //password encryption
    const hashedPassword = await bcrypt.hash(password,10);

    //create new user
    const newUser = new User({username, email, password: hashedPassword, role});
    await newUser.save();

    //sign token
    const token = jwt.sign({_id: newUser._id, role: newUser.role}, JWT_SECRET, {expiresIn: '1h'});
};

//login
export const login = async (req,res) => {
    //request
    const {email, password} = req.body;

    //email search
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({ errorMes: 'User Not Found' });
    }

    //password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ errorMes: 'Invalid Credentials' });
    }

    //sign token
    const token = jwt.sign({_id: user._id, role: user.role, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
};