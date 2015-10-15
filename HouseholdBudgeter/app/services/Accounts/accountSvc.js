(function () {
    angular.module('HouseholdBudgeter')
        .factory('accountSvc', ['$http', function ($http) {
            var f = {};

        f.getAccounts = function () {
            return $http.post('/api/accounts/getaccounts').then(function (response) {
                return response.data;
            });
        }

        f.accountDetails = function (id) {
            return $http.post('/api/accounts/accountdetails', id).then(function (response) {
                return response.data;
            });
        }

        f.getAccount = function (id) {
            return $http.post('/api/accounts/getaccount', id).then(function (response) {
                return response.data;
            });
        }

        f.createAccount = function (name, balance) {
            return $http.post('/api/accounts/createaccount', { Name: name, Balance: balance }).then(function (response) {
                return response.data;
            });
        }

        f.editAccount = function (account) {
            return $http.post('/api/accounts/editaccount', account).then(function (response) {
                return response.data;
            });
        }

        f.archiveAccount = function (id) {
            return $http.post('/api/accounts/archiveaccount', id).then(function (response) {
                return response.data;
            });
        }

        return f;

    }])
})();