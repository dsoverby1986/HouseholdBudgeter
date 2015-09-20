(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_Ctrl', ['categories', 'accounts', '$state', function (categories, accounts, $state) {

            var self = this;

            this.accounts = accounts;

            this.categories = categories;

            console.log(accounts)

        }]);
})();