(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_create_Ctrl', ['accountSvc', '$state', '$scope', function (accountSvc, $state, $scope) {
            
            var self = this;

            this.name = "";

            this.balance = "";

            this.display = {};

            this.error = "";

            this.createAccount = function (name, balance) {
                accountSvc.createAccount(name, balance).then(function (data) {
                    console.log(data);
                    if (data == "nameError") {
                        self.error = "nameError";
                    }
                    else if (data == "balanceError") {
                        self.error = "balanceError";
                    }
                    else {
                        $scope.$root.$broadcast('transaction-updated');
                        $state.go('accounts.list.details', { id: data }, { reload: true });
                    }
                });
            }

        }]);
})();