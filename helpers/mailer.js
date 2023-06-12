import nodemailer from 'nodemailer';

const enviarMail = async(correo, asunto, contenido)=>{

  try {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,

        // secure: false, // true for 465, false for other ports
        auth: {
          user: 'eduardottito2002@gmail.com', // generated ethereal user
          pass: 'odoaobfgctyngfgm', // generated ethereal password
        }, tls: {
          rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'eduardottito2002@gmail.com', // sender address,
      to: correo,
      subject: asunto,
      html: contenido

    })
    return ;
  } catch (error) {
    console.log(error)
    return json({
        msg: "Contactese con el admin"
    })
  }
}

export  {
    enviarMail
};