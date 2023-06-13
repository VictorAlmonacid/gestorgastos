import { validarCampos } from "../middlewares/validar.js";
import { cambioContrasena, existeCorreo, loginUser } from "../controllers/autenticacion.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/autenticacion.js";

const router = Router();

    router.post('/login', [
        check('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
        check('user_password').notEmpty().withMessage('La contraseña es requerida'),
        validarCampos
    ], loginUser);

    router.get('/recuperar',existeCorreo);

    router.get('/cambio-contrasena',[
        check('new_password').notEmpty().withMessage('Escriba la nueva contraseña'),
        check('repeat_password').notEmpty().withMessage('Repita la contraseña'),
        validarCampos
    ],validarJWT, cambioContrasena);

export { router };