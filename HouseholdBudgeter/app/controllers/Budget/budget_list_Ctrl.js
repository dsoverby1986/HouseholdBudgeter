(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_Ctrl', ['household', 'categories', 'budgetItems', 'budgetItemSvc', '$state', function (household, categories, budgetItems, budgetItemSvc, $state) {

            var self = this;

            this.household = household;

            this.display = budgetItems;
            
            this.categories = categories;

            this.getBudgetItems = function () {
                budgetItemSvc.getBudgetItems().then(function (data) {
                    self.display = data;
                });
            }

            this.goToEdit = function () {
                $state.go('budget.list.editItem', ({ id: item.Id }), { reload: false });
            }

            this.deleteBudgetItem = function (id) {
                budgetItemSvc.deleteBudgetItem(id).then(function (data) {
                    self.display = data;
                    $state.go('budget.list', null, { reload: true });
                })
            }

        }]);
})();