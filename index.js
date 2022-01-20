var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var path = require('path');
const {
    Console
} = require('console');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

load('banco')
    .into(app);

app.listen(3000, () => console.log('Servidor rodando'));

app.set('view engine', 'ejs');

//APP's USE

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//APP's GET



app.get('/', function (req, res) {
    if (req.session.loggedin) {
        res.render('index.ejs');
    } else {
        res.render('index.ejs');
    }
    res.end();
});

app.get('/chat', function (req, res) {
    res.render('chat');
});

app.get('/cad', function (req, res) {
    res.render('cadastro');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/buscaruser', function (req, res) {
    id = req.params.id;
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.buscarUser(id, function (err, sucess) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/perfil', );
        }
    });
});

app.get('/perfil', function (req, res) {
    if (req.session.loggedin) {
        email = req.session.email
        var conexao = app.banco.conexao();
        
        conexao.query('SELECT * FROM user WHERE email = ?', email, function (error, results, fields) {
                res.render('perfil.ejs', {
                    'info': results
                });

        });
    } else {
        res.render('login.ejs');
    }
});
app.get('/feed', function (req, res) {
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.buscarGeral(function (erro, sucesso) {
        if (erro) {
            console.log(erro);
        } else {
            console.log(sucesso);
            res.render('feed.ejs', {
                'info': sucesso
            });
        }
    });
});
app.get('/editperf', function (req, res) {
    var email = req.session.email;
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.buscaEditar(email, function (erro, sucesso) {
        if (erro) {
            console.log(erro);
        } else {
            res.render('editprofile.ejs', {
                'email': sucesso
            });
        }
    });
});
//APP's POST

app.post('/cadauser', function (req, res) {
    var dados = req.body;
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);

    usuarioBanco.salvar(dados, function (erro, sucesso) {
        if (erro) {
            console.log(erro)
        } else {
            console.log(sucesso);
        }
    });
    res.render('index.ejs', {
        'info': dados
    });

});

app.post('/auth', function (req, res) {
    var conexao = app.banco.conexao();
    var email = req.body.email;
    var senha = req.body.senha;
    if (email && senha) {
        conexao.query('SELECT * FROM user WHERE email = ? AND senha = ?', [email, senha], function (error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                req.session.id = results.id;
                res.redirect('/buscaruser');
            } else {
                res.send('Incorrect email and/or senha!');
            }
            res.end();
        });
    } else {
        res.send('Please enter email and senha!');
        res.end();
    }
});

app.post('/buscar', function (req, res) {
    var info = req.body;
    if (info.freeBusca == "") {
        res.redirect('/buscar');
    }

    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.buscar(info, function (erro, sucesso) {
        if (erro) {
            console.log(erro);
        } else {
            res.render('feed.ejs', {
                'info': sucesso
            });
        }
    });
});
app.post('/formeditar', function (req, res) {
    var dados = req.body;
    var conexao = app.banco.conexao();
    var usuarioBanco = new app.banco.usuarioBanco(conexao);
    usuarioBanco.editar(dados, function (erro, sucesso) {
      if (erro) {
        console.log(erro);
      } else {
        res.redirect('/perfil');
      }
  
    });
  
  });


//CHAT