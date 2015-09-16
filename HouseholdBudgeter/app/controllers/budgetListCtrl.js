(function () {
    angular.module('HouseholdBudgeter')
        .controller('budgetListCtrl', ['budgetItems', 'budgetItemSvc', '$state', function (budgetItems, budgetItemSvc, $state) {

            console.log('in controller');

            var self = this;

            var display = budgetItems;

            this.getBudgetItems = function () {
                budgetItemSvc.getBudgetItems().then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();