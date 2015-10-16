(function () {
    angular.module('HouseholdBudgeter')
        .controller('account_list_details_Ctrl', ['confirmModalSvc', 'transactionSvc', 'accountSvc', '$stateParams', 'account', '$state', '$scope',
            function (confirmModalSvc, transactionSvc, accountSvc, $stateParams, account, $state, $scope) {

                var self = this;

                this.transId = $stateParams.transId;

                this.account = account;

                this.id = $stateParams.id;

                this.getAccount = function (id) {
                    accountSvc.getAccount(id).then(function (data) {
                        return self.account = data;
                    })
                }

                this.deleteTrans = function (transId) {
                    return confirmModalSvc.open("Are you sure you want to delete this transaction?", function () {
                        return transactionSvc.deleteTransaction(transId)}, function () {
                            $scope.$root.$broadcast('transaction-updated');
                            $state.go('accounts.list.details', null, { reload: true });
                        }, "md"
                    );
                };

               /* this.deleteTrans = function (transId) {
                    return confirmModalSvc.open("Are you sure you want to delete this transaction?", function () {
                        return transactionSvc.deleteTransaction(transId), function () {
                            $scope.$root.$broadcast('transaction-updated');
                            $state.go('accounts.list.details', null, { reload: true });
                        }
                    });
                };*/

        }]);
})();