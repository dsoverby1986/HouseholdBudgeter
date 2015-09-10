(function () {
    angular.module('HouseholdBudgeter')
        .controller('accountsListCtrl', ['accounts', '$state', function (accounts, $state) {

            var self = this;

            this.accounts = accounts;

            console.log(accounts)

        }]);
})();