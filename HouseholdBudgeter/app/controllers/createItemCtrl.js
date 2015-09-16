(function () {
    angular.module('HouseholdBudgeter')
        .controller('createItemCtrl', ['categories', 'budgetItemSvc', '$state', function (categories, budgetItemSvc, $state) {

            console.log('in controller');

            var self = this;

            var categories = categories;

            self.name = "";

            self.amount = "";

            self.frequency = "";

            self.category = "";

        }]);
})();