import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import dotenv from "dotenv"; // just imported and configured b/c of errors with dotenv
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

//register
export const register = async (req, res) => {
	//request
	const { username, email, password, role, age } = req.body;

	//role
	if (role !== "learner" && role !== "tutor") {
		return res
			.status(400)
			.json({ success: false, message: "Invalid role has been selected." });
	}

	//existing user check
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({
			success: false,
			message: "User already exists. Please select a different email.",
		});
	}

	// email must be school email
	/* if (!email.endsWith("@school.org")) {
		return res.status(400).json({ message: "Must use school email address!" });
	} */

	//password encryption
	const hashedPassword = await bcrypt.hash(password, 10);

	//create new user
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
		role,
		age,
	});
	await newUser.save();

	//sign token
	const token = jwt.sign(
		{ _id: newUser._id, role: newUser.role, username: newUser.username },
		process.env.JWT_SECRET
	);

	//cookie
	res.cookie("access_token", token, {
		httpOnly: true,
		expires: new Date(Date.now() + 2 * 3600000),
	});

	const port = process.env.PORT;
	const verificationLink = `http://localhost:${port}/api/auth/verify/${token}`; // backend verification link to verifyToken function

	resend.emails.send({
		from: "onboarding@resend.dev", // from resend
		to: email, // to inputed email
		subject: "Verify your email",
		html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`, // link
	});

	res.status(200).send("User created and verification email sent!");
};

export const verifyToken = async (req, res) => {
	try {
		const URL = process.env.CLIENT_URL;
		const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET); // verify token with secret key (decodes)
		const user = await User.findById(decoded._id); // find user using decoded token storing user's _id

		if (!user) return res.status(404).json({ error: "User not found" });

		user.verified = true; // set verification status to true
		await user.save(); // save
		console.log("Redirecting to:", `${URL}/verified-success`);
		res.redirect(`${URL}/verified-success`); // redirect to verified success page on frontend
	} catch (err) {
		return res.status(400).json({ error: "Invalid or expired token" });
	}
};

//login
export const login = async (req, res) => {
	//request
	const { email, password } = req.body;

	//email search
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ error: "User Not Found" });
	}

	//password match
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({ error: "Invalid Credentials" });
	}

	//sign token
	const token = jwt.sign(
		{
			_id: user._id,
			role: user.role,
			email: user.email,
			username: user.username,
		},
		process.env.JWT_SECRET
	);

	//cookie
	res.cookie("access_token", token, {
		httpOnly: true,
		expires: new Date(Date.now() + 2 * 3600000),
	});
	res.status(200).json({ message: "User logged in!", token: token });
};

export const logout = async (req, res) => {
	res.clearCookie("access_token", {
		httpOnly: true,
		secure: true,
		sameSite: "None",
	});
	return res.status(200).json({ message: "User logged out!" });
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
