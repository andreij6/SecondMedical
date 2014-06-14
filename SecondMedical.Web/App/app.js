'use strict';

var soccerApp = angular.module('soccerApp', ['ngRoute']);

soccerApp.config(
    function ($routeProvider)
    {
        $routeProvider
            .when('/',
            {
                templateUrl: 'App/Views/Home.html',
                controller: 'HomeCtrl'
            }
        ).when('/Schedule',
            {
                templateUrl: 'App/Views/Schedule.html',
                controller: 'HomeCtrl'
            }
        ).otherwise({ redirectTo: '/'})
    })

