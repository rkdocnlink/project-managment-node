import { Router } from "express";
import {
  getUserById,
} from "../../controllers/public/randomuser.controllers.js";

const router = Router();

router.route("/").post(getUserById);

export default router;

