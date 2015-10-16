(function () {
    angular.module('HouseholdBudgeter')
        .controller('dashboard_details_Ctrl', ['household', 'accountSvc', 'householdSvc', 'transactionSvc', 'budgetItemSvc', '$state', '$http',
            function (household, accountSvc, householdSvc, transactionSvc, budgetItemSvc, $state, $http) {

                var self = this;

                this.$state = $state;

                this.household = household;

                this.user = {};
                this.getUser = function () {
                    householdSvc.getUser().then(function (data) {
                        self.user = data;
                    });
                }
                self.getUser();

                this.accounts = {};
                this.getAccounts = function () {
                    accountSvc.getAccounts().then(function (data) {
                        self.accounts = data;
                    });
                }
                self.getAccounts();

                this.transactions = {};
                this.recentTrans = function () {
                    transactionSvc.recentTransactions().then(function (data) {
                        self.transactions = data;
                        console.log(self.transactions);
                    })
                }
                self.recentTrans();

                this.options = {
                    chart: {
                        type: 'multiBarChart',
                        height: 500,
                        transitionDuration: 500,
                    }
                };

                this.values = [];
                self.getValues = function () {
                    $http.get('/api/charting/month').then(function (response) {
                        console.log(response);
                        self.values = response.data;
                    });
                }
                self.getValues();

                this.valuesMonthly = [];
                self.getValuesMonthly = function () {
                    $http.get('/api/charting/monthly').then(function (response) {
                        self.valuesMonthly = response.data;
                    });
                }
                self.getValuesMonthly();

        }]);
})();