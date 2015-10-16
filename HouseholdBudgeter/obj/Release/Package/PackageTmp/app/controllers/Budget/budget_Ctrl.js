(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_Ctrl', ['$scope', '$stateParams', 'confirmModalSvc', 'budgetItemSvc', '$state', function ($scope, $stateParams, confirmModalSvc, budgetItemSvc, $state) {

            var self = this;

            this.id = $stateParams.id;

            this.deleteBudgetItem = function(id) {
                return confirmModalSvc.open("Are you sure you want to delete this budgetItem?", function () {
                    return budgetItemSvc.deleteBudgetItem(id);}, function () {
                        $state.go('budget.list', null, { reload: true });},  "md"
                )};
        }]);
})();