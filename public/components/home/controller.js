{
    angular.module('app')
        .controller('HomeController', function(GameService){
            const $ctrl = this;
            
            $ctrl.submit = function(){
                
               
                };

            $ctrl.setCategory = function(id){
                GameService.category = id;
                GameService.name = $ctrl.playerName;
                window.location = "#!/game";
                
                  
            }
            $ctrl.difficulty = ['Hard', 'Easy'];  
          
        
    });
};