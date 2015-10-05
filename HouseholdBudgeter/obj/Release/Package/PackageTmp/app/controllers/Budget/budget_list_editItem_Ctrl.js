(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_editItem_Ctrl', ['budgetItem', '$stateParams', 'budgetItemSvc', '$state', 
            function (budgetItem, $stateParams, budgetItemSvc, $state) {
                console.log('in budget edit controller');
                console.log(budgetItem);

                this.budgetItem = budgetItem;

                var self = this;



                this.model = {
                };

                this.getBudgetItem = function (id) {
                    budgetItemSvc.getBudgetItem(id).then(function (data) {
                        self.item = data;
                    });
                }

           


                //data binding not correct. coming up with inappropriate values when saving edited budget item. figue something out guy
                this.editBudgetItem = function (budgetItem) {     
                    if (typeof (budgetItem.Category) == "string")
                        budgetItem.Category = { Id: 0, Name: budgetItem.Category };
                    budgetItem.CategoryId = budgetItem.Category.Id;
                    budgetItemSvc.editBudgetItem(budgetItem).then(function (data) {
                        self.item = data;
                    })
                }

        }]);
})();