import express from "express";
import userController from "../Controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js"
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/", verifyToken, () => {
    console.log("AAAAAAAAAAAAAAAA")
});

export default router;
