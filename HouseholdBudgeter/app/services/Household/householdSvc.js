(function () {
    angular.module('HouseholdBudgeter')
        .factory('householdSvc', ['$http', function ($http) {
            var f = {};

        f.getHousehold = function () {
            return $http.post('/api/account/household').then(function (response) {
                return response.data;
            });
        }

        f.createHousehold = function (name) {
            return $http.post('/api/account/createhousehold', name).then(function (response) {
                return response.data;
            });
        }

        f.joinHousehold = function (inviteEmail, code) {
            return $http.post('/api/account/joinhousehold', inviteEmail, code).then(function (response) {
                return response.data;
            });
        }

        f.leaveHousehold = function () {
            return $http.post('/api/account/leavehousehold').then(function (response) {
                return response.data;
            });
        }

        f.getHouseholdUsers = function () {
            return $http.post('/api/account/gethouseholdusers').then(function (response) {
                return response.data;
            });
        }

        f.sendInvite = function (inviteEmail) {
            return $http.post('/api/account/sendinvite', {Email: inviteEmail}).then(function (response) {
                return response.data;
            });
        }

        return f;

    }])
})();