var express = require('express');
var router = express.Router();
const loginModel= require('./../../models/loginModel');

router.get('/',function(req,res,next){
    res.render('admin/login',{
        layout:'admin/layout'
    });
});

router.post('/',async(req,res,next)=>{
    try{
        var usuario= req.body.usuario;
        var contraseña=req.body.contraseña;

        var data = await loginModel.getUserByUsuarioyContraseña(usuario,contraseña);

        if(data != undefined){
            req.session.id_usuario = data.id;
            req.session.name = data.usuario;
            res.redirect('/admin/portfolio');
        }else{
            res.render('admin/login',{
                layout:'admin/layout',
                error:true
            });
        }
    }catch(error){
        console.log(error);
    }
});

module.exports= router;