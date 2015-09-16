(function () {
    angular.module('HouseholdBudgeter')
        .controller('accountDetailsCtrl', ['accountSvc', '$stateParams', 'account', '$state', function (accountSvc, $stateParams, account, $state) {
            console.log("accountDetailsCtrl - in there");
            var self = this;

            this.account = account;

            this.id = $stateParams.id;

            this.getAccount = function (id) {
                accountSvc.getAccount(id).then(function (data) {
                    return self.account = data;
                })
            }

            console.log(account)

        }]);
})();