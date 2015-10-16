(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_Ctrl', ['household', 'accounts', 'householdSvc', 'categorySvc', 'accountSvc', '$state', '$scope', function (household, accounts, householdSvc, categorySvc, accountSvc, $state, $scope) {

            var self = this;

            this.accounts = accounts;

            this.household = household;

            this.accCount = "";

            this.getCountForActiveAccounts = function () {
                accountSvc.getCountForActiveAccounts().then(function (data) {
                    self.accCount = data;
                })
            }

            self.getCountForActiveAccounts();

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