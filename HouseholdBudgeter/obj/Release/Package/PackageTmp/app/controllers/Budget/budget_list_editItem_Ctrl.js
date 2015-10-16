(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_editItem_Ctrl', ['budgetItem', '$stateParams', 'budgetItemSvc', '$state', 
            function (budgetItem, $stateParams, budgetItemSvc, $state) {

                this.budgetItem = budgetItem;

                var self = this;



                this.model = {
                };

                this.getBudgetItem = function (id) {
                    budgetItemSvc.getBudgetItem(id).then(function (data) {
                        self.item = data;
                    });
                }

                this.error = "";

                this.editBudgetItem = function (budgetItem) {     
                    if (typeof (budgetItem.Category) == "string")
                        budgetItem.Category = { Id: 0, Name: budgetItem.Category };
                    if (budgetItem.Category == undefined) {
                        budgetItem.Category = { Id: 0, Name: "" };
                    }
                    budgetItem.CategoryId = budgetItem.Category.Id;
                    budgetItemSvc.editBudgetItem(budgetItem).then(function (data) {
                        switch (data) {
                            case "itemNameError":
                                self.error = "itemNameError";
                                break;
                            case "limitAmountError":
                                self.error = "limitAmountError";
                                break;
                            case "frequencyError":
                                self.error = "frequencyError";
                                break;
                            case "categoryError":
                                self.error = "categoryError";
                                break;
                            default:
                                $state.go('budget.list', null, { reload: true });
                        }
                    })
                }
        }]);
})();