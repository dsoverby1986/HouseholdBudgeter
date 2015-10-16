(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_edit_Ctrl', ['account', '$stateParams', 'accountSvc', '$state', function (account, $stateParams, accountSvc, $state) {

            this.account = account;

            var self = this;

            this.$state = $state;

            this.error = "";

            this.editAccount = function () {
                accountSvc.editAccount(account).then(function (data) {
                    if (data == "nameError") {
                        self.error = "nameError";
                    }
                    else if (data == "balanceError") {
                        self.error = "balanceError";
                    }
                    else {
                        $state.go('accounts.list', null, { reload: true });
                    }
                });
            }

        }]);
})();