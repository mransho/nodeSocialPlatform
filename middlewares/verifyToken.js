import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["Authorization"] || req.headers["authorization"]
        if (!authHeader) {
            console.log("verifyToken error");
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("decodedToken", decodedToken)
        next()
    } catch (err) {
        console.error("verifyToken error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default verifyToken;

