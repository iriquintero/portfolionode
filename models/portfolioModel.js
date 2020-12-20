var pool = require('./bd');

//obtener datos de la tabla portfolio

async function getPortfolio(){
    var query = "select * from portfolio order by id desc";
    var rows = await pool.query(query);
    return rows;
};

//insertar novedades

async function insertarPortfolio(obj){
    try{
        var query = "insert into portfolio set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    };
};

//selecionar tabla a modificar
async function getPortfolioById(id){
    var query = "select * from portfolio where id = ?";
    var rows = await pool.query(query,[id]);
    return rows[0];
};

//actualizar modificación 
async function editarPortfolioById(obj,id){
    try{
        var query = "update portfolio set ? where id = ?";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    }catch(error){
        throw error;
    }
}; 

//eliminar proyecto
async function eliminarPortfolioById(id){
    var query = "delete from portfolio where id = ?";
    var rows = await pool.query(query,[id]);
    return rows;
};



module.exports = {getPortfolio, insertarPortfolio, getPortfolioById,editarPortfolioById, eliminarPortfolioById};