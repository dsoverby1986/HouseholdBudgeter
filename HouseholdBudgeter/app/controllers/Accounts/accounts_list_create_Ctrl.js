(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_create_Ctrl', ['accountSvc', '$state', function (accountSvc, $state) {
            console.log('in controller');
            var self = this;

            this.name = "";

            this.balance = "";

            this.display = {};

            this.createAccount = function (name, balance) {
                accountSvc.createAccount(name, balance).then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();