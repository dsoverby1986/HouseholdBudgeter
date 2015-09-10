(function () {
    angular.module('HouseholdBudgeter')
    .factory('AccountSvc', ['$http', function ($http) {
        var f = {};

        f.getAccconts = function () {
            return $http.post('/api/accounts/getaccounts').then(function (response) {
                return response.data;
            });
        }

        f.getAccount = function (id) {
            return $http.post('/api/accounts/getaccount', { id: id }).then(function (response) {
                return response.data;
            });
        }

        f.createAccount = function (name, balance) {
            return $http.post('/api/accounts/createaccount', { Name: name, Balance: balance }).then(function (response) {
                return response.data;
            });
        }

        f.editAccount = function (name, balance, isArchived) {
            return $http.post('/api/accounts/editaccount', { Name: name, Balance: balance, IsArchived: isArchived }).then(function (response) {
                return response.data;
            });
        }

        f.archiveAccount = function (id) {
            return $http.post('/api/accounts/archiveaccount', { Id: id }).then(function (response) {
                return response.data;
            });
        }

        return f;

    }])
})();