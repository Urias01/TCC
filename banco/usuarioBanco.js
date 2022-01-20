function usuarioBanco(conexao) {
    this._conexao = conexao;
}

usuarioBanco.prototype.salvar = function (dados, callback) {
    this._conexao.query('insert into user set ?', dados, callback);
}

usuarioBanco.prototype.buscarGeral = function(callback){
	this._conexao.query('select * from user WHERE tipoCadastro = "Freelancer"', callback);
}

usuarioBanco.prototype.buscarNome = function(info,callback){
    var parametro = info.nomeBusca;
    this._conexao.query('SELECT * FROM user WHERE nome = ?',parametro,callback);
  }
usuarioBanco.prototype.buscar = function(info, callback){
  var parametro = info.freeBusca;
	this._conexao.query('select * from user WHERE prof = ?', parametro,callback);
}

usuarioBanco.prototype.buscaEditar = function(id, callback){
  this._conexao.query('SELECT * FROM user WHERE id = ?', id, callback);
}

usuarioBanco.prototype.editar = function(dados, callback){
  this._conexao.query('UPDATE user SET ? WHERE id = ?', [dados,dados.id], callback);
}

usuarioBanco.prototype.buscarUser = function(id, callback){
  this._conexao.query('SELECT * FROM user WHERE id = id', id, callback);
}

usuarioBanco.prototype.buscaEditar = function(id, callback){
  this._conexao.query('SELECT * FROM user WHERE email = ?', email, callback);
}
usuarioBanco.prototype.editar = function(dados, callback){
  this._conexao.query('UPDATE user SET ? WHERE id = ?', [dados,dados.id], callback);
}
module.exports = function () {
    return usuarioBanco;
};
