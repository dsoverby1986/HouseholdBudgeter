(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_Ctrl', ['accountSvc', '$state', '$stateParams', function (accountSvc, $state, $stateParams) {

            var self = this;

            this.display = {};

            this.name = "";

            this.balance = "";

            this.id = $stateParams.id;

            this.getAccounts = function () {
                accountSvc.getAccounts().then(function (data) {
                    self.display = data;
                });
            }

            this.getAccount = function () {
                accountSvc.getAccount().then(function (data) {
                    self.display = data;
                });
            }

            this.createAccount = function (name, balance) {
                accountSvc.createAccount(name, balance).then(function (data) {
                    self.display = data;
                });
            }

            this.editAccount = function () {
                accountSvc.editAccount().then(function (data) {
                    self.display = data;
                });
            }

            this.archiveAccount = function (id) {
                console.log(id);
                accountSvc.archiveAccount(id).then(function (data) {
                    self.display = data;
                    console.log(data);
                });
            }
    }])
})();