import Router from "express"
import { LoginController } from "../../controllers/login.controller.js";
import { SignupController } from "../../controllers/signup.controller.js";

const router=Router();

router.post("/login",LoginController.login);
router.post("/signup",SignupController.signUp)
router.post("/google",SignupController.signUpWithGoogle)
router.get("/google/callback", SignupController.googleCallback);
router.post("/signup/apple",SignupController.signUpWithApple)

export default router