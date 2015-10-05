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

            f.createBudgetItem = function (thing) {
                return $http.post('/api/budgetitems/createbudgetitem', thing).then(function (response) {
                    return response.data;
                });
            }

            f.deleteBudgetItem = function (id) {
                return $http.post('/api/budgetitems/deletebudgetitem?id=' + id).then(function (response) {
                    return response.data;
                });
            }

            return f;

        }])
})();