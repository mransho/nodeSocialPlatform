import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    const decodedToken = jwt

    console.log("token", token)
    next()
}

export default verifyToken;

