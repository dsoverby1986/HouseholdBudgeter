(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_createItem_Ctrl', ['categorySvc', 'categories', 'budgetItemSvc', '$state', function (categorySvc, categories, budgetItemSvc, $state) {

            var self = this;

            this.$state = $state;

            this.display = {};

            this.categories = categories;

            this.model = {
                name: "",
                amount: "",
                frequency: "",
                Category: {
                    Id: 0,
                    Name: ""
                }
            };

            this.getCategories = function () {
                categorySvc.getCategories().then(function (data) {
                    self.categories = data;
                })
            }

            this.createItem = function (item) {

                if (typeof(item.Category) == "string") 
                    item.Category = { Id: 0, Name: item.Category };

                item.CategoryId = item.Category.Id;

                budgetItemSvc.createBudgetItem(item).then(function (data) {
                    $state.go('budget.list', null, { reload: true })
                })
            }

        }]);
})();