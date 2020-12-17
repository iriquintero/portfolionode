var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('admin/portfolio',{
        layout:'admin/layout',
        usuario:req.session.name
    });
});

module.exports= router;