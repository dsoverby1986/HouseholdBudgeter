(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_Ctrl', ['$stateParams', 'confirmModalSvc', 'budgetItemSvc', '$state', function ($stateParams, confirmModalSvc, budgetItemSvc, $state) {

            console.log('in controller');

            var self = this;

            this.id = $stateParams.id;

            this.deleteBudgetItem = function(id) {
                return confirmModalSvc.open("Are you sure you want to delete this budgetItem?", function () {
                    return budgetItemSvc.deleteBudgetItem(id)
                });
            }

        }]);
})();