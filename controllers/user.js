import { Response } from "express";
import bcrypt from "bcrypt";

const registerUser = async (req, res = response) => {
    
    res.json({
        msg:"Hola soy muy malo programando"
    });

}

export{
    registerUser
};