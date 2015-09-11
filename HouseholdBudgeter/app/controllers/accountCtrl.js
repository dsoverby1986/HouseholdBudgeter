(function () {
    angular.module('HouseholdBudgeter')
        .controller('accountCtrl', ['accountSvc', '$state', function (accountSvc, $state) {

            var self = this;

            self.display = {};

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

            this.createAccount = function () {
                accountSvc.createAccount().then(function (data) {
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