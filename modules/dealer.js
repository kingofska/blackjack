var deck = require('./deck'),
    Player = require('./../schemas/player').Player;

var Dealer = (function(){

    return {

        checkWinner: function(dealerCards, playerTotal){
            var dealerScore = deck.checkCards(dealerCards);

            if(playerTotal > dealerScore.total || dealerScore.state === "BUSTED" ){
                return "PLAYER";
            }else{
                return "DEALER";
            }
        },
        resetCards: function(playerName){
            Player.findOne({name: playerName}).then(function(player){
                player.total = 0;
                player.cards = [];
                player.save();
            });
        },
        resetDealer: function(){
            Player.remove({name: 'dealer'}).exec();

        }
    }
})();

module.exports = Dealer;