import  jwt  from "jsonwebtoken";

const generarJWT = (id_user) => {
    return new Promise((resolve, reject)=>{
        const payload = {id_user};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })
}

const comprobarJWT = ( token = '' ) => {

    try {
        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        console.log('true')
        return [ true, uid ];

    } catch (error) {
        console.log('false')
        return [ false, null ];
        
    }

}


export  {
    generarJWT,
    comprobarJWT
}