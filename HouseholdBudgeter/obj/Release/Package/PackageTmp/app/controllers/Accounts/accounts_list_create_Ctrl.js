(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_create_Ctrl', ['accountSvc', '$state', '$scope', function (accountSvc, $state, $scope) {
            console.log('in controller');
            var self = this;

            this.name = "";

            this.balance = "";

            this.display = {};

            this.createAccount = function (name, balance) {
                accountSvc.createAccount(name, balance).then(function (data) {
                    $scope.$root.$broadcast('transaction-updated');
                    $state.go('accounts.list.details', { id: data }, { reload: true });
                });
            }

        }]);
})();