var express = require('express');
var router = express.Router();
var portfolioModel = require('../../models/portfolioModel');

//obtener pag portfolio
router.get('/', async function(req,res,next){
    var portfolio = await portfolioModel.getPortfolio();
    res.render('admin/portfolio',{
        layout:'admin/layout',
        usuario:req.session.name,
        portfolio
    });
});

//llamar a la pagina donde se creará el nuevo proyecto
router.get('/nuevo', (req,res,next)=>{
    res.render('admin/nuevo',{
        layout:'admin/layout'
    });
});

// agregar nuevo proyecto
router.post('/nuevo', async (req,res,next)=>{
    try{
       var obj = {
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo,
            web:req.body.web,
            github:req.body.github
        } 
        if(req.files && req.files.imagen != "" && req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "" && req.body.web != "" && req.body.github != ""){
            imagen = req.files.imagen.name;
            await req.files.imagen.mv('public/images/portfolio/' + imagen)
            obj.imagen = imagen;
        }console.log(obj);
        await portfolioModel.insertarPortfolio(obj);
        res.redirect('/admin/portfolio');
    }catch(error){
        console.log(error);
        res.render('admin/nuevo',{
            layout:'admin/layout',
            error:true,
            mensaje:'no se guardó el proyecto'
        });
    };
});

//editar proyecto
//obtener el proyecto para editar
router.get('/editar/:id',async (req,res,next)=>{
    var id =req.params.id;
    var portfolio = await portfolioModel.getPortfolioById(id);
    res.render('admin/editar',{
        layout:'admin/layout',
        portfolio
    });
});

//guardar actualizaciones del proyecto

router.post('/editar', async (req,res,next)=>{
    try{
        var obj={
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo,
            web:req.body.web,
            github:req.body.github
        }
        if(req.files && req.files.imagen !== ""){
            imagen = req.files.imagen.name;
            await req.files.imagen.mv('public/images/portfolio/'+imagen);
            obj.imagen = imagen;
        }
        await portfolioModel.editarPortfolioById(obj,req.body.id);
        res.redirect('/admin/portfolio');
    }catch(error){
        console.log(error);
        res.render('admin/editar',{
            layout:'admin/layout',
            error:true,
            mensaje:'No se modifico el proyecto'
        });
    };
});

//eliminar proyecto
router.get('/eliminar/:id', async (req,res,next)=>{
    var id = req.params.id;
    await portfolioModel.eliminarPortfolioById(id);
    res.redirect('/admin/portfolio');
});

module.exports = router;