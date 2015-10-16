(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_details_createTrans_Ctrl', ['$stateParams', 'transactionSvc', 'categories', 'categorySvc', '$state','$scope',
            function ($stateParams, transactionSvc, categories, categorySvc, $state,$scope) {

                var self = this;

                this.display = {};

                this.categories = categories;

                this.transaction = {
                    description: "",
                    amount: "",
                    reconciled: "",
                    category: {
                        Name: ""
                    },
                    accountId: $stateParams.id,
                    isIncome: false
                }

                this.getCategories = function () {
                    categorySvc.getCategories().then(function (data) {
                        self.categories = data;
                    })
                }

                this.error = "";

                this.createTrans = function () {
                    if (self.transaction.category.Id == undefined)
                    {
                        self.transaction.CategoryId = 0;
                    }
                    else
                    {
                        self.transaction.CategoryId = self.transaction.category.Id;
                    }
                    transactionSvc.createTransaction(self.transaction).then(function (data) {
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