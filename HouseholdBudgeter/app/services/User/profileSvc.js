(function () {
    angular.module('HouseholdBudgeter')
        .factory('profileSvc', ['$http', function ($http) {
            var f = {};

            f.changePassword = function (model) {
                return $http.post('/api/account/changepassword', model).then(function (response) {
                    return response.data;
                })
            }

            f.obliterateUserAccount = function (id) {
                return $http.post('/api/account/obliterateuseraccount', { Id: id }).then(function (response) {
                    return response.data;
                })
            }

            return f;

        }])
})();