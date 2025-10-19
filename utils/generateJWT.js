import jwt from 'jsonwebtoken';

const generateJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
  return token;
};

export default generateJWT;

