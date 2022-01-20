var mysql = require('mysql');

function criarConexao() {

    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cadastro',
        insecureAuth: 'true',
        multipleStatements: 'true'
    });
}

module.exports = function(){
    return criarConexao;
}
