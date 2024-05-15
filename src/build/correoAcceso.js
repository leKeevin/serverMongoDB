"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var email = require("emailjs/email");
module.exports = (formulario) => {
    var token = jsonwebtoken_1.default.sign(formulario, process.env.TOKEN_SECRET || 'tokentest');
    var server = email.server.connect({
        user: process.env.user,
        password: process.env.Correo_Pass,
        host: process.env.host,
        tls: true
    });
    var message = {
        from: "equipWed@hotmail.com",
        to: "<" + formulario.correo + ">",
        bbc: "",
        subject: "Restablece tu contraseña de Carniceria Don Toño",
        attachment: [
            {
                data: `
      <p>Sentimos saber que has olvidado tu contraseña. ¡Estamos aquí para ayudarte!<br>
      Parece que has olvidado tu contraseña de Carniceria Don Toño. No te preocupes, ¡te ayudamos a recuperarla!<br>
      Para restablecer tu contraseña, <a href="${process.env.URlRestablecer}${token}" style="font-family:corbel, arial, sans-serif; font-size:10pt; font-weight: bold;">Haz clip aqui</a></p>
      <br>
      <a style="color: red; font-family:corbel, arial, sans-serif; font-size:10pt; font-weight: bold;">Si no has solicitado este restablecimiento:<br>
      *Ignora este correo electrónico.<br>
      *Cambia tu contraseña por precaución.<a><br>
      <br>
      <p>Atentamente,<br>
      El equipo de Carniceria Don Toño</p>
      `,
                alternative: true,
            },
        ],
    };
    server.send(message, function (err, message) {
        console.log("error=", err);
        message = null;
    });
};
