(function () {
    angular.module('HouseholdBudgeter')
        .controller('budget_list_createItem_Ctrl', ['categorySvc', 'categories', 'budgetItemSvc', '$state', function (categorySvc, categories, budgetItemSvc, $state) {

            console.log('in controller');

            var self = this;

            this.display = {};

            this.categories = categories;

            console.log(categories);

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

                console.log("inside createItemCtrl");
                console.log(item);

                if (typeof(item.Category) == "string") 
                    item.Category = { Id: 0, Name: item.Category };

                item.CategoryId = item.Category.Id;

                budgetItemSvc.createBudgetItem(item).then(function (data) {
                    self.display = data;
                })
            }

        }]);
})();