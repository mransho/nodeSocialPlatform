import express from "express";
import userController from "../Controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js"
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);



router.get("/", verifyToken, (req, res) => {
    console.log("AAAAAAAAAAAAAAAA");
    res.json({ message: "Access granted ✅" });
});

export default router;
