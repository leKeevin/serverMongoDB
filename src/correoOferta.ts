import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

var email = require("emailjs/email");

module.exports = (formulario: any) =>{
  var token = jwt.sign(formulario, process.env.TOKEN_SECRET || 'tokentest')
var server = email.server.connect({
  user: process.env.user, 
  password:process.env.Correo_Pass,
   host: process.env.host,  
  tls: true 
});

let textos="";

for(let i=0; i<formulario.texto.length; i++)
  {
    textos += `<p> ${formulario.texto[i]} <a href="${process.env.URL_OFERTA}${formulario.productos[i]}"> Aprovechar Oferta </a></p>`
  }

var message = {
  from: "equipWed@hotmail.com",
  to: "<" + formulario.correo + ">",
  bbc: "",
  subject: "Aprovecha las ofertas de Carniceria Don Toño",
  attachment: [
    {
      data: `
      <p>Hemos creado las siguientes ofertas para ti </p>
      ${textos}
      `,
      alternative: true,
    },
  ],
};


server.send(message, function (err:any, message:any) {
  console.log("error=",err);
  message=null;
});
}