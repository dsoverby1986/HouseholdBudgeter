(function () {
    angular.module('HouseholdBudgeter')
        .controller('accountCtrl', ['accountSvc', '$state', '$stateParams', function (accountSvc, $state, $stateParams) {

            var self = this;

            self.display = {};

            self.name = "";

            self.balance = "";

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

            this.archiveAccount = function () {
                accountSvc.archiveAccount().then(function (data) {
                    self.display = data;
                });
            }
    }])
})();