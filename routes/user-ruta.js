import { Router } from "express";
import { eliminarUsuario, registerUser, usuariosGet, usuariosPut, usuariosGetPorId } from "../controllers/user.js";
import { validarCampos } from "../middlewares/validar.js";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/autenticacion.js";

const router = Router();

router.post('/',[
  check('user_nom').notEmpty().withMessage('El nombre de usuario es requerido'),
  check('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
  check('user_password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validarCampos
],registerUser);

router.get('/', usuariosGet);

router.get('/:id', usuariosGetPorId);

router.put('/:id',[
  check('user_nom').notEmpty().withMessage('El nombre de usuario es requerido'),
  check('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
  validarCampos
],validarJWT ,usuariosPut);

router.delete("/:id", validarJWT, eliminarUsuario);

router.use(validarJWT);

export {
  router
};
