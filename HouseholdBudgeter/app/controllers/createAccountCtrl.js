(function () {
    angular.module('HouseholdBudgeter')
        .controller('createAccountCtrl', ['accountSvc', '$state', function (accountSvc, $state) {
            console.log('in controller');
            var self = this;

            self.name = "";

            self.balance = "";

            self.display = {};

            this.createAccount = function (name, balance) {
                accountSvc.createAccount(name, balance).then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();