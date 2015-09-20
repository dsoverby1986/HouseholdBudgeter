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
                category: {
                    Id: "",
                    Name: ""
                }
            };

            this.getCategories = function () {
                categorySvc.getCategories().then(function (data) {
                    self.categories = data;
                })
            }

            this.createItem = function () {
                console.log("inside createItemCtrl");
                console.log(self.model);
                budgetItemSvc.createBudgetItem(self.model).then(function (data) {
                    self.display = data;
                })
            }

        }]);
})();