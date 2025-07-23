import jwt from "jsonwebtoken";

//authenticate token
export const authenticateToken = (req, res, next) => {
	const token =
		req.cookies?.access_token || req.headers["authorization"]?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json("Token is invalid.");
		}
		req.user = user;
		next();
	});
};

// verify admin
export const verifyAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied" });
	}
};
