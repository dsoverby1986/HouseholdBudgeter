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
            return $http.post('/api/Account/CreateHousehold', { Name: name }).then(function (response) {
                return response.data;
            });
        }

        f.joinHousehold = function (inviteEmail, code) {
            return $http.post('/api/account/joinhousehold', { InvitedEmail: inviteEmail, Code: code }).then(function (response) {
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
            return $http.post('/api/account/sendinvite', { Email: inviteEmail }).then(function (response) {
                console.log(response.data);
                return response.data;
            });
        }

        f.getUser = function () {
            return $http.post('/api/account/getuser').then(function (response) {
                return response.data;
            })
        }

        /*f.goodToGoStatus = function () {
            return $http.post('/api/account/goodtogostatus').then(function (response) {
                return response.data;
            })
        }*/

        return f;

    }])
})();