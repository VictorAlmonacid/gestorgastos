import { request } from 'express';
import jwt from 'jsonwebtoken';

const validarJWT = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token')?.split(' ')[1];;

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try{

        const {id_user} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid= id_user;
        
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}


export {
    validarJWT
}