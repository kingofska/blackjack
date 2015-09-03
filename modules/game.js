var dealer = require('./dealer'),
    Player = require('./../schemas/player').Player,
    deck = require('./deck');



var Game = function(){
    return {

        resetGame: function(){
          dealer.resetDealer();
            return this.startGame();
        },
        startGame: function(){

            return new Promise(function(resolve, reject){
                deck.startNew();
                var playerName = "Player" + Math.floor( Math.random() * 500 );

                var player = new Player({
                    name: playerName
                });

                var playerCards = [ deck.getCard(), deck.getCard() ];
                var playerState = deck.checkCards(playerCards);

                player.total = playerState.total;
                player.cards = playerCards;

                Player.findOne({name : "dealer"}, function(err, dealer){
                    if(err || dealer == null){
                        dealer = new Player();
                        dealer.name = "dealer";
                        dealer.cards = [ deck.getCard() ];
                        dealer.save();
                    }



                    var dealerState = deck.checkCards(dealer.cards);

                    player.save(function (err, player) {
                        if (err) return console.error(err);
                    });

                    var result = {
                        playerData: {
                            name: playerName,
                            cards: playerCards,
                            state: playerState.state,
                            total: playerState.total
                        },
                        dealerData:{
                            cards: dealer.cards,
                            state: dealerState
                        }

                    };

                    resolve ( result );

                });
            });

        },

        hit: function(playerName){
            return new Promise(function(resolve, reject){
                Player.findOne({name: playerName}).then(function(player){

                    var currentCards, newCard, playerState;
                    currentCards = player.cards;

                    newCard = deck.getCard();
                    currentCards.push(newCard);

                    playerState = deck.checkCards(currentCards);

                    player.total = playerState.total;
                    player.cards = currentCards;
                    player.save(function (err, player) {
                        if (err) return console.error(err);
                    });

                    var response = {

                        playerData: {
                            name: playerName,
                            cards: currentCards,
                            state: playerState.state,
                            total: playerState.total
                        }

                    };

                    if(playerState.state === "BLACKJACK"){
                        response.winner = "PLAYER";

                    }

                    resolve(response);
                })
            })


        },
        stand: function(playerName, reply){
            var playerTotal;

            Player.findOne({name: 'dealer'}).then(function(dealerData){
                Player.findOne({name: playerName}).then(function(player) {
                    playerTotal = player.total;
                    var dealerCards = dealerData.cards;

                    do {

                        var newCard = deck.getCard();
                        dealerCards.push(newCard);
                        var dealerState = deck.checkCards(dealerCards);
                    } while (dealerState.total <= 21 && dealerState.total <= playerTotal);

                    var winner = dealer.checkWinner(dealerCards, playerTotal);
                    dealer.resetDealer();

                    reply({
                        dealerData:{
                            state: dealerState,
                            cards: dealerCards
                        },
                        winner: winner
                    });
                });
            });

        }
    }
};

module.exports = Game;