﻿(function () {
    angular.module('HouseholdBudgeter').
        controller('accounts_list_details_editTrans_Ctrl', ['trans', 'transactionSvc', '$state', '$stateParams', 'confirmModalSvc', '$scope',
            function (trans, transactionSvc, $state, $stateParams, confirmModalSvc,$scope) {

                var self = this;

                this.trans = trans;

                this.id = $stateParams.id;

                this.transaction = {};

                this.IncomeStatus = false;

                this.display = {};

                this.getTrans = function () {
                    transactionSvc.getTransaction(self.id).then(function (data) {
                        self.transaction = data;
                        self.IncomeStatus = data.IsIncome;
                    })
                }

                this.error = "";

                this.editTrans = function () {
                    if (trans.Category == undefined) {
                        trans.CategoryId = 0;
                    }
                    else
                    {
                        trans.CategoryId = trans.Category.Id;
                    }
                    transactionSvc.editTransaction(trans).then(function (data) {
                        switch (data) {
                            case "descriptionError":
                                self.error = "descriptionError";
                                break;
                            case "amountError":
                                self.error = "amountError";
                                break;
                            case "categoryError":
                                self.error = "categoryError";
                                break;
                            default:
                                $scope.$root.$broadcast('transaction-updated');
                                $state.go('accounts.list.details', null, { reload: true });
                        }
                    })
                }
            }]);
})();