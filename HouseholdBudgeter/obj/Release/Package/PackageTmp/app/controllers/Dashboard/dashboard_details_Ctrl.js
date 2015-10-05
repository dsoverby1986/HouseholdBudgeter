(function () {
    angular.module('HouseholdBudgeter')
        .controller('dashboard_details_Ctrl', ['$state', '$http', function ($state, $http) {

            var self = this;

            self.values = [];

            self.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    "stacked": false,
                    //margin: {
                    //    top: 20,
                    //    right: 20,
                    //    bottom: 60,
                    //    left: 55
                    //},
                    //x: function (d) { return d.label; },
                    //y: function (d) { return d.value; },
                    //showValues: true,
                    //valueFormat: function (d) {
                    //    return d3.format(',.4f')(d);
                    //},
                    //transitionDuration: 500,
                    //xAxis: {
                    //    axisLabel: 'X Axis'
                    //},
                    //yAxis: {
                    //    axisLabel: 'Y Axis',
                    //    axisLabelDistance: 30
                    //}
                }
            };

            self.getValues = function () {
                $http.get('/api/Values/GetValues').then(function (response) {
                    self.values = response.data;
                });
            }
            self.getValues();

        }]);
})();