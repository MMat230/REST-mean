/**
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 */

//Base do Setup da Aplicação:

/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express = require('express'); //chamando o pacote express
var app = express(); //definção da nossa aplicação através do express
var bodyParser = require('body-parser');  //chamando o pacote body-parser

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8000;

//Rotas da nossa API:
//==============================================================
/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router = express.Router();

/* Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão */
router.use(function (req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api) */
router.get('/', function (req, res) {
    res.json({ message: 'YEAH! Seja Bem-Vindo a nossa API' });
});

/* TODO - Definir futuras rotas aqui!!! */
// Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All & POST)
router.route('/usuarios')

    /* 1) Método: Criar Usuario (acessar em: POST http://localhost:8080/api/usuarios */
    .post(function (req, res) {
        var usuario = new Usuario();

        //aqui setamos os campos do usuario (que virá do request)
        usuario.nome = req.body.nome;
        usuario.login = req.body.login;
        usuario.senha = req.body.senha;

        usuario.save(function (error) {
            if (error)
                res.send(error);

            res.json({ message: 'Usuário criado!' });
        });
    });




/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);

//Configuração Base da Aplicação:
//====================================================================================

var mongoose = require('mongoose');
mongodb://MMat230:@ds145659.mlab.com:45659/node-api
var Usuario = require('./app/models/usuario');

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);