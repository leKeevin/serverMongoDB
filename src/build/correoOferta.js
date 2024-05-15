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
    let textos = "";
    for (let i = 0; i < formulario.texto.length; i++) {
        textos += `<p> ${formulario.texto[i]} <a href="${process.env.URL_OFERTA}${formulario.productos[i]}"> Aprovechar Oferta </a></p>`;
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
    server.send(message, function (err, message) {
        console.log("error=", err);
        message = null;
    });
};
