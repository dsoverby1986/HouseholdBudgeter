(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_edit_Ctrl', ['account', '$stateParams', 'accountSvc', '$state', function (account, $stateParams, accountSvc, $state) {

            this.account = account;

            var self = this;

            this.$state = $state;

            this.editAccount = function () {
                debugger;
                console.log(account);
                accountSvc.editAccount(account).then(function (data) {
                    $state.go('accounts.list', null, { reload: true });
                });
            }

        }]);
})();