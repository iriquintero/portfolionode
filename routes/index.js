var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var portfolioModel = require('../models/portfolioModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var portfolio = await portfolioModel.getPortfolio();
  res.render('index',{
    portfolio
  });
});

router.post('/', async (req, res, next)=>{
  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje = req.body.mensaje;
  var obj={
    to:'iriangel.quintero@gmail.com',
    subject:'contacto desde la web',
    html: nombre +"se contacto a través de la página web y dejo el siguiente mensaje"+mensaje+" y su email en el caso que necesite escribirle"+email
  }
  var transport = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS
    }
  })
  var info = await transport.sendMail(obj);
    res.render('index',{
      mensaje:'mensaje enviado'
    });
});
module.exports = router;
