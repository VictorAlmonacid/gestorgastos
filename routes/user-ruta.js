import { Router } from "express";
import { registerUser, usuariosGet } from "../controllers/user.js";

const router = Router();

router.post('/',registerUser);

router.get('/', usuariosGet);

export {
    router
};
