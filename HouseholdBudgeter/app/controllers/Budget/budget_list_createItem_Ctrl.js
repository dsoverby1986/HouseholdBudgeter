(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_createItem_Ctrl', ['categorySvc', 'categories', 'budgetItemSvc', '$state', function (categorySvc, categories, budgetItemSvc, $state) {

            var self = this;

            this.$state = $state;

            this.display = {};

            this.categories = categories;

            this.model = {
                Name: "",
                Amount: "",
                Frequency: "",
                Category: {
                    Id: 0,
                    Name: ""
                },
                IsIncome: false
            };

            this.getCategories = function () {
                categorySvc.getCategories().then(function (data) {
                    self.categories = data;
                })
            }

            this.error = "";

            this.createItem = function (model) {

                if (typeof(model.Category) == "string") 
                    model.Category = { Id: 0, Name: model.Category };

                if (model.Category == undefined)
                    model.Category = { Id: 0, Name: "" };

                model.CategoryId = model.Category.Id;
                budgetItemSvc.createBudgetItem(model).then(function (data) {
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