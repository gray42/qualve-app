import jwt from "jsonwebtoken";

//authenticate token
export const authenticateToken = (req, res, next) => {
    const token = req.headers.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json("User is not authenticated.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json("Token is invalid.");
        }
        req.user = user;
        next();
    });
}