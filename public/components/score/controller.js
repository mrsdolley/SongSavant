{
    angular.module('app')
        .controller('ScoreController', function(GameService){
            const $ctrl = this;
            
            $ctrl.playerName = GameService.name;

    
            $ctrl.playerScore = GameService.score;

        
    });
};