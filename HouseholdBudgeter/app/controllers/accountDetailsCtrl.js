(function () {
    angular.module('HouseholdBudgeter')
        .controller('accountDetailsCtrl', ['id', 'transactions', '$state', function (id, transactions, $state) {

            var self = this;

            this.transactions = transactions;

            console.log(transactions)

        }]);
})();