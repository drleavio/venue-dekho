import Router from "express"
import { LoginController } from "../../controllers/login.controller.js";
import { SignupController } from "../../controllers/signup.controller.js";

const router=Router();

router.post("/login",LoginController.login);
router.post("/signup",SignupController.signUp)
router.post("/signup/google",SignupController.signUpWithGoogle)
router.post("/signup/apple",SignupController.signUpWithApple)

export default router