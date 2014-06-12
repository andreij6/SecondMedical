"use strict";

soccerApp.controller('IndexCtrl', function ($scope, WebAPI, Warehouse) {
    $scope.CurrentTeam = {};

    jQuery('.datetimepicker').datetimepicker();
    
    $scope.ModalTitle = "Title";

    $scope.ModalBody        = function (showMe) {
        switch (showMe) {
            case "showTeamCrud":
                $scope.showTeamCrud = true;
                $scope.showGameCrud = false;
                $scope.newTeamEditor = false;
                $scope.newGameEditor = false;
                break;
            case "showGameCrud":
                $scope.showTeamCrud = false;
                $scope.showGameCrud = true;
                $scope.newTeamEditor = false;
                $scope.newGameEditor = false;
                break;
            case "newTeamEditor":
                $scope.showTeamCrud = false;
                $scope.showGameCrud = false;
                $scope.newTeamEditor = true;
                $scope.newGameEditor = false;
                break;
            case "newGameEditor":
                $scope.showTeamCrud = false;
                $scope.showGameCrud = false;
                $scope.newTeamEditor = false;
                $scope.newGameEditor = true;
                break;
            default:
                break;

        }
    };

    $scope.GetHomeVM        = function () {
        WebAPI.getHomeVM().then(
            function (data) {
                console.log(data);
                Warehouse.Games = data.Games;
                Warehouse.Teams = data.Teams;

                $scope.Teams = Warehouse.Teams;
                $scope.Games = Warehouse.Games;
            },
            function (status) {
                console.log(status);
            }
        );
    };

    $scope.GameCrudUI       = function (game) {
        $scope.ModalBody("showGameCrud");
        $scope.ModalTitle = game.TeamOne.Name + " vs " + game.TeamTwo.Name;
        $scope.Game = game;
        console.log($scope.Game);
    };

    $scope.TeamCrudUI       = function (team) {
        $scope.ModalBody("showTeamCrud");
        $scope.ModalTitle = team.Name;
        $scope.CurrentTeam = team;
    };

    $scope.AddTeamUI        = function () {
        $scope.ModalBody("newTeamEditor");
        $scope.ModalTitle = "New Team";
    };

    $scope.AddTeam          = function (name) {
        WebAPI.addTeam(name).then(
                function (data) {
                    var newTeam = {};
                    newTeam.Name = $scope.name;
                    newTeam.Id = data;
                    Warehouse.Teams.push(newTeam);
                },
                function (status) {
                    console.log(status);
                }
            );
    };

    $scope.UpdateTeam       = function (team) {
        WebAPI.updateTeam(team).then(
            function (data) {
                for(var x in Warehouse.Teams)
                {
                    if (Warehouse.Teams[x].Id === team.Id) {
                        Warehouse.Teams.splice(x, 1, team);
                        break;
                    }
                }
            },
            function (status) { console.log(status); });
    };

    $scope.RemoveTeam       = function (team) {
        var id = team.Id;

        WebAPI.removeTeam(team).then(
            function (data) {
                //Remove Games for Team
                for (var i = 0; i < Warehouse.Games.length; i++) {
                    if (Warehouse.Games[i].TeamOneId == id || Warehouse.Games[i].TeamTwoId == id) {
                        Warehouse.Games.splice(i, 1);
                    }
                }

                //Remove Team from Warehouse
                for(var x in Warehouse.Teams)
                {
                    if(Warehouse.Teams[x].Id === id)
                    {
                        Warehouse.Teams.splice(x, 1);
                        break;
                    }
                }

                
            },
            function (status) { console.log(status); })
    };

    $scope.ScheduleGameUI   = function () {
        $scope.ModalBody("newGameEditor");
        $scope.ModalTitle = "New Game";
    };

    $scope.ScheduleGame     = function (game) {
        var newGame = {};
        newGame.TeamOneId = game.TeamOne.Id;
        newGame.TeamTwoId = game.TeamTwo.Id;
        newGame.Date = game.Date;

        WebAPI.scheduleGame(newGame).then(
            function (data) {
                game.Id = data;
                Warehouse.Games.push(game);
                $scope.game = {};
            },
            function (status) { console.log(status); })
    };

    $scope.CancelGame       = function (game) {

        WebAPI.cancelGame(game.Id).then(
            function (data) {
                for(var x in Warehouse.Games)
                {
                    if(Warehouse.Games[x].Id == game.Id)
                    {
                        Warehouse.Games.splice(x, 1);
                        break;
                    }
                }
            },
            function (status) { console.log(status); })
    };

    $scope.UpdateGame       = function (game) {
        game.Date = game.Date.toLocaleString("en-US");

        WebAPI.updateGame(game).then(
            function (data) {
                for(var x in Warehouse.Games)
                {
                    if (Warehouse.Games[x].Id == game.Id) {
                        Warehouse.Games.splice(x, 1, game);
                    }
                }
            },
            function (status) { console.log(status); })
    };

    $scope.OppValidation    = function () {
        if ($scope.game.TeamOne !== $scope.game.TeamTwo) {
            $scope.valid = true;
        } else {
            $scope.valid = false;
        }
    };

    $scope.valid            = false;

    $scope.GetHomeVM();
})