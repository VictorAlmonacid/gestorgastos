import { validarCampos } from "../middlewares/validar.js";
import { existeCorreo, loginUser, tokenValido } from "../controllers/autenticacion.js";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

    router.post('/login', [
        check('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
        check('user_password').notEmpty().withMessage('La contraseña es requerida'),
        validarCampos
    ], loginUser);

    router.get('/recuperar',existeCorreo);

    router.get('/token', tokenValido
        //VALIDA TOKEN
    );

    router.put([
        //CAMBIA CONTRASEÑA
    ]);

export { router };