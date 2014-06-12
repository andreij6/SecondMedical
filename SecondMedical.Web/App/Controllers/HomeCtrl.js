"use strict";

soccerApp.controller('HomeCtrl', function ($scope, Warehouse) {
    $scope.schedule = [];

    $scope.FormatSchedule = function () {

        for(var x in Warehouse.Games)
        {
            var event = {};

            event.title = Warehouse.Games[x].TeamOne.Name + " vs " + Warehouse.Games[x].TeamTwo.Name;
            event.start = (Warehouse.Games[x].Date);

            $scope.schedule.push(event);
        }

        $scope.Calendar();

    };

    $scope.Calendar = function () {

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
            },
            defaultDate: Date.now,
            editable: true,
            events: $scope.schedule
        });

    };

});