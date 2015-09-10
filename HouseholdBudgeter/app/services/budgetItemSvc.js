(function () {
    angular.module('HouseholdBudgeter')
        .factory('budgetItemSvc', ['$http', function ($http) {
            var f = {};

            f.getBudgetItems = function () {
                return $http.post('/api/budgetitems/budgetitems').then(function (response) {
                    return response.data;
                });
            }

            f.getBudgetItem = function (id) {
                return $http.post('/api/budgetitems/budgetitem', id).then(function (response) {
                    return response.data;
                });
            }

            f.editBudgetItem = function (budgetItem) {
                return $http.post('/api/budgetitems/editbudgetitem', budgetItem).then(function (response) {
                    return response.data;
                });
            }

            f.createBudgetItem = function (budgetItem) {
                return $http.post('/api/budgetitems/createbudgetitem', budgetItem).then(function (response) {
                    return response.data;
                });
            }

            f.deleteBudgetItem = function (id) {
                return $http.post('/api/budgetitems/deletebudgetitem', id).then(function (response) {
                    return response.data;
                });
            }

            return f;

        }])
})();