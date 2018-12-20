"use strict"; {
    angular.module('app')
        .controller('GameController', function($http, $timeout, GameService, $interval){
            const $ctrl = this;
            let score = 0;
            const category = GameService.category || '37i9dQZF1DX4SBhb3fqCJd';
            let index = 0;
            var intervalID = {};
            $ctrl.countDown = 30;
            $ctrl.numSong = 1;

            startTimer();

            function startTimer(){
                intervalID.id = $interval(function(){
                    $ctrl.countDown--;
                    if($ctrl.countDown === 0){
                        $timeout(() => {
                            $ctrl.showAnswer = false;
                            ++index;
                            if(index === $ctrl.tracks.length) {
                                window.location = "#!/score";
                            } else {
                                $ctrl.selectedTrack = $ctrl.tracks[index].track;
                                $interval.cancel(intervalID.id);
                                $ctrl.numSong++;
                                $ctrl.countDown = 30;
                                startTimer();
                            }
                        }, 2000);
                    }
                },1000,30);
            }

            $http.post('/access-token').then(function(response){
                $ctrl.tokenResponse = response.data;
                $ctrl.myToken = $ctrl.tokenResponse.access_token;
                console.log($ctrl.myToken);

                $http({
                    method: 'GET',
                    url: `https://api.spotify.com/v1/playlists/${category}/tracks?fields=items(track(name%2Cpreview_url%2Calbum(artists(name))))`,
                    headers: {
                        'Authorization': `Bearer ${$ctrl.myToken}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response){
                    $ctrl.tracks = shuffleArray(response.data.items.filter(item => item.track.preview_url)).slice(0, 5);
                    $ctrl.selectedTrack = $ctrl.tracks[index].track;
                    console.log($ctrl.tracks);
                }).catch(function(err){
                    console.log(err);
                });
                
            }).catch(function(err){
                console.log(err)
            });

           
            $ctrl.submit = function(){
                $ctrl.showAnswer = true
           
                if($ctrl.songTitle.toLowerCase()===$ctrl.selectedTrack.name.toLowerCase() ) {
                    score+=5;
                    console.log(score);
                    GameService.score = score;
                }
                
                $timeout(() => {
                    $ctrl.showAnswer = false;
                    ++index;
                    
                    if(index === $ctrl.tracks.length) {
                        window.location = "#!/score";
                        console.log('Game Over');
                    } else {
                        $ctrl.selectedTrack = $ctrl.tracks[index].track;
                        $interval.cancel(intervalID.id);
                        $ctrl.countDown = 30;
                        $ctrl.numSong++;
                        startTimer();
                        
                        
                    }
                    $ctrl.songTitle='';
                }, 2000)  
            }
        });

        function shuffleArray (list) {
            // make a copy of original array
            const listCopy = [...list];
            const resultArray = [];
            while(listCopy.length) {
                // while the array has length get a random index
                const randomIndex = Math.floor(Math.random() * listCopy.length);
                // push the item in the new array and remove from the old one
                resultArray.push(...listCopy.splice(randomIndex, 1));
            }
            // return new array
            return resultArray;
        }
};