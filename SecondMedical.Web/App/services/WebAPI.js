"use strict";

soccerApp.factory('WebAPI', function ($http, $q) {
    return {
        getHomeVM:      function () {
            var defered = $q.defer();

            $http({
                method: "GET",
                url: "api/HomeVM/"
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (status) {
                defered.reject(status);
            })

            return defered.promise;
        },

        addTeam:        function (Name) {
            var defered = $q.defer();
            var Team = { Name: Name }

            $http.post("api/Teams/", Team)
                .success(function (data) {
                    defered.resolve(data);
                }).error(function (status) {
                    defered.reject(status);
                })

            return defered.promise;
        },

        updateTeam:     function (Team) {
            var defered = $q.defer();
            console.log(Team);
            $http({
                method: "PUT",
                url: "api/Teams/" + Team.Id,
                data: Team
            }).success(function(data){
                defered.resolve(data);
            }).error(function (status) {
                defered.reject(status);
            })

            return defered.promise;
        },

        removeTeam:     function (Team) {
            var defered = $q.defer();

            $http({
                method: "DELETE",
                url: "api/Teams/" + Team.Id
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (status) {
                defered.reject(status);
            })

            return defered.promise;
        },

        scheduleGame:   function (game) {
            var defered = $q.defer();
            console.log(game);
            $http({
                method: "POST",
                url: "api/Games/",
                data: game
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (status) {
                defered.reject(status);
            })

            return defered.promise;
        },

        cancelGame:     function (gameId) {
            var defered = $q.defer();

            $http({
                method: "DELETE",
                url: "api/Games/" + gameId
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (status) {
                defered.reject(status);
            })

            return defered.promise;
        },

        updateGame:     function (game) {
            var defered = $q.defer();
            console.log(game);
            $http({
                method: "PUT",
                url: "api/Games/" + game.Id,
                data: game
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (status) {
                defered.resolve(status);
            })

            return defered.promise;
        }

    }
})