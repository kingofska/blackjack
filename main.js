var Player = require('./schemas/player').Player,
    Game = require('./modules/game'),
    server = require('./server');

var game = new Game();

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/player',
    handler: function (request, reply) {

      game.startGame()
      .then(function(response){
          reply(response);
      });

    }
});

server.route({
    method: 'GET',
    path: '/reset',
    handler: function (request, reply) {

        game.resetGame()
            .then(function(response){
                reply(response);
            });

    }
});


server.route({
    method: 'GET',
    path: '/player/{name}/hit',
    handler: function (request, reply) {
        var playerName = request.params.name;

        game.hit(playerName)
        .then(function(response){
            reply(response);
        });

    }
});

server.route({
    method: 'GET',
    path: '/player/{name}/stand',
    handler: function (request, reply) {
        var playerName = request.params.name;

        game.stand(playerName, reply);
    }
});

