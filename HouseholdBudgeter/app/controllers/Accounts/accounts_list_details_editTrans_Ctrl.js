(function () {
    angular.module('HouseholdBudgeter').
        controller('accounts_list_details_editTrans_Ctrl', ['trans', 'transactionSvc', '$state', '$stateParams', 'confirmModalSvc',
            function (trans, transactionSvc, $state, $stateParams, confirmModalSvc) {

                var self = this;
                this.trans = trans;
                console.log(trans);
                this.id = $stateParams.id;
                console.log(this.id);
                this.transaction = {};

                this.display = {};

                this.getTrans = function () {
                    transactionSvc.getTransaction(self.id).then(function (data) {
                        self.transaction = data;
                    })
                }

                this.editTrans = function () {
                    transactionSvc.editTransaction(trans).then(function(){
                        $state.go('accounts.list.details').then(function(){
                            $state.go($state.current, null, { reload: true });
                        })
                    })
                }

            }]);
})();