(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_Ctrl', ['householdSvc', 'categorySvc', 'accountSvc', '$state', '$scope', function (householdSvc, categorySvc, accountSvc, $state, $scope) {

            var self = this;

            var refresh = function () {
                accountSvc.getAccounts().then(function (accts) {
                    self.accounts = accts;
                });
                categorySvc.getCategories().then(function (cats) {
                    self.categories = cats;
                });
                householdSvc.getHousehold().then(function (household) {
                    self.household = household;
                });
            };
            
            refresh();

            $scope.$on('transaction-updated', function () {
                refresh();
            });
        }]);
})();