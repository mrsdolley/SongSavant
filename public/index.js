"use strict";
{
    angular.module('app',['ngRoute'])
        .config( function($routeProvider){
            $routeProvider
                .when('/',{
                    template: '<home></home>'
                })
                .when('/game',{
                    template: '<game></game>'
                })
                .when('/score',{
                    template: '<score></score>'
                })
                .otherwise({
                    template: '<h1>404 PAGE DOES NOT EXIST</h1>'
                })
        });
}

