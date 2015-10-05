(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_Ctrl', ['confirmModalSvc', '$scope', 'accountSvc', '$state', '$stateParams', function (confirmModalSvc, $scope, accountSvc, $state, $stateParams) {

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

            this.deleteTrans = function (transId) {
                return confirmModalSvc.open("Are you sure you want to delete this transaction?", function () {
                    return transactionSvc.deleteTransaction(transId)
                }, function () {
                    $scope.$root.$broadcast('transaction-updated');
                    $state.go('accounts.list.details', null, { reload: true });
                }
                );
            };

            this.archiveAccount = function (id) {
                return confirmModalSvc.open("If you archive this account you and all members of your household will no longer have access to this account " + 
                    "or any transactions belonging to this account. Are you sure you want to archive this account?", function () {
                        return accountSvc.archiveAccount(id)
                    }, function () {
                        $scope.$root.$broadcast('transaction-updated');
                        $state.go('accounts.list', null, { reload: true });
                    }, "md"
                );
            }
    }])
})();