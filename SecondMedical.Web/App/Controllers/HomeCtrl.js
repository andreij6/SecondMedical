"use strict";

soccerApp.controller('HomeCtrl', function ($scope, Warehouse) {
    $scope.Selection = { Name: "All" };

    $scope.FormatSchedule   = function (overload) {
        $scope.schedule = [];

        if(!overload){
            for (var x in Warehouse.Games) {
                var event = {};

                event.title = Warehouse.Games[x].TeamOne.Name + " vs " + Warehouse.Games[x].TeamTwo.Name;
                event.start = Warehouse.Games[x].Date;

                $scope.schedule.push(event);
            }
        } else {
            var myGames = [];

            for (var x in Warehouse.Games) {
                if (Warehouse.Games[x].TeamOneId == $scope.Selection.Id || Warehouse.Games[x].TeamTwoId == $scope.Selection.Id) {
                    var myGame = {};

                    myGame = Warehouse.Games[x];

                    myGames.push(myGame);
                }
            }

            for(var x in myGames)
            {
                var event = {};

                event.title = myGames[x].TeamOne.Name + " vs " + myGames[x].TeamTwo.Name;
                event.start = myGames[x].Date;

                $scope.schedule.push(event);

            }


        }
        

        $scope.Calendar();

    };

    $scope.Calendar         = function () {
        $("#calendar").html("");
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: Date.now,
            editable: true,
            events: $scope.schedule
        });

    };

    $scope.setOptions = function () {
        $scope.Options = [];
        $scope.Options.push({ Name: "All" });

        for (var x in Warehouse.Teams) {
            $scope.Options.push(Warehouse.Teams[x]);
        }
    };

    $scope.showTeamSchedule = function () {
        if ($scope.Selection.Name == "All") {
            $("#calendar").html("");
            $scope.FormatSchedule();
        } else {
            for (var x in Warehouse.Teams) {
                if(Warehouse.Teams[x].Id == $scope.Selection.Id)
                {
                    $scope.thisSchedule = Warehouse.Teams[x];
                }
            }
            $scope.FormatSchedule($scope.thisSchedule);
        }
    }

});