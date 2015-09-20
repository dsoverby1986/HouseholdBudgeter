(function () {
    angular.module('HouseholdBudgeter')
        .controller('accounts_list_details_createTrans_Ctrl', ['$stateParams', 'transactionSvc', 'categories', 'categorySvc', '$state',
            function ($stateParams, transactionSvc, categories, categorySvc, $state) {

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
                    isIncome: ""
                }

                this.getCategories = function () {
                    categorySvc.getCategories().then(function (data) {
                        self.categories = data;
                        console.log(data);
                    })
                }

                this.createTrans = function () {
                    console.log(self.transaction);
                    transactionSvc.createTransaction(self.transaction).then(function (data) {
                        self.display = data;
                        console.log(data);
                    })
                }
        }]);
})();