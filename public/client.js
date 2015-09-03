(function() {
    'use strict';


    var blackJackApp = angular.module('blackJack', []);

    blackJackApp.controller('GameCtrl', function($scope, $http) {

        $http.get('/player')
        .success(function(json) {
            $scope.playerName=  json.playerData.name;
            $scope.playerData = json.playerData;
            $scope.dealerData = json.dealerData;
        });

        $scope.hit = function(){
            $http.get('/player/' + $scope.playerName + '/hit')
            .success(function(json) {
                $scope.playerData = json.playerData;

            });
        };

        $scope.stand = function(){
            $http.get('/player/' + $scope.playerName + '/stand')
            .success(function(json) {
                $scope.dealerData = json.dealerData;
                $scope.winner = json.winner;
            });
        };

        $scope.reset = function(){
            $http.get('/reset')
                .success(function(json) {
                    $scope.playerName=  json.playerData.name;
                    $scope.playerData = json.playerData;
                    $scope.dealerData = json.dealerData;
                });
        };

    });

})();

