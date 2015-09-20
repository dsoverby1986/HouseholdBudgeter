(function () {
    angular.module('HouseholdBudgeter')
        .controller('account_list_details_Ctrl', ['confirmModalSvc', 'transactionSvc', 'accountSvc', '$stateParams', 'account', '$state',
            function (confirmModalSvc, transactionSvc, accountSvc, $stateParams, account, $state) {

                console.log("accountDetailsCtrl - in there");
                var self = this;

                this.transId = $stateParams.transId;

                this.account = account;

                this.id = $stateParams.id;

                this.getAccount = function (id) {
                    accountSvc.getAccount(id).then(function (data) {
                        return self.account = data;
                    })
                }

                console.log(account)

                this.deleteTrans = function (transId) {
                    console.log('Deleting Transaction')
                    //console.log(transId);
                    return confirmModalSvc.open("Are you sure you want to delete this transaction?", function () {
                        console.log("Inside function calling to the transactionSvc");
                        console.log(transId);
                        //console.log(transId);
                        return transactionSvc.deleteTransaction(transId);
                    });
                };

        }]);
})();