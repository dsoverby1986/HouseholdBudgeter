(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_Ctrl', ['categories', 'budgetItems', 'budgetItemSvc', '$state', function (categories, budgetItems, budgetItemSvc, $state) {

            console.log('in controller');

            var self = this;

            this.display = budgetItems;
            console.log(budgetItems);
            this.categories = categories;

            console.log(categories);

            this.getBudgetItems = function () {
                budgetItemSvc.getBudgetItems().then(function (data) {
                    self.display = data;
                });
            }

            this.deleteBudgetItem = function (id) {
                budgetItemSvc.deleteBudgetItem(id).then(function (data) {
                    self.display = data;
                    $state.go('budget.list', null, { reload: true });
                })
            }

        }]);
})();