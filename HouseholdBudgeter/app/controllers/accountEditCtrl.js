(function () {
    angular.module('HouseholdBudgeter')
        .controller('accountEditCtrl', ['account','$stateParams','accountSvc', '$state', function (account, $stateParams, accountSvc, $state) {

            console.log('in accountEditCtrl');
            console.log(account);

            var self = this;

            this.currentName = account.Name;

            this.currentBalance = account.Balance;

            this.id = account.Id;

            this.name = "";

            this.balance = "";

   /*        this.getAccount = function (id) {
                accountSvc.getAccount(id).then(function (data) {
                    self.display = data;
                });
            }*/

            this.editAccount = function (name, balance, id) {
                accountSvc.editAccount(name, balance, id).then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();