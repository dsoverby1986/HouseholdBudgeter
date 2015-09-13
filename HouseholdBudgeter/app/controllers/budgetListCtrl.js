(function () {
    angular.module('HouseholdBudgeter')
        .controller('budgetListCtrl', ['budgetItemSvc', '$state', function (budgetItemSvc, $state) {

            console.log('in controller');

            var self = this;

            this.getBudgetItems = function () {
                budgetItemSvc.getBudgetItems().then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();