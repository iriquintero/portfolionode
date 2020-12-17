var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsuarioyContraseña(usuario,contraseña){
    try{
        var query = "select * from login where usuario = ? and contraseña = ? limit 1";
        var rows = await pool.query(query, [usuario, md5(contraseña)]);
        return rows[0];
    }catch(error){
        throw error;
    }
}

module.exports={getUserByUsuarioyContraseña}