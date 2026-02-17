import Router from "express"
import { LoginController } from "../../controllers/login.controller.js";

const router=Router();

router.get("/login",LoginController.login);

export default router