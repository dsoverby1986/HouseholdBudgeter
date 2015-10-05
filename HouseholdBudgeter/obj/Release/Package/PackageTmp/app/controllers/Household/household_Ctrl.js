(function () {
    angular.module('HouseholdBudgeter')
        .controller('household_Ctrl', ['householdSvc', '$state', 'confirmModalSvc', function (householdSvc, $state, confirmModalSvc) {

            var self = this;

            this.leaveHousehold = function () {
                console.log('Leaving household')
                return confirmModalSvc.open("Are you sure you want to leave this household? You will no longer have access to any accounts!", function () {
                    return householdSvc.leaveHousehold()},
                    function(){
                        $state.go('household.join')
                    });
            }

            this.sendInvite = function (inviteEmail) {
                console.log(inviteEmail)
                return confirmModalSvc.open("Do you want to invite this user?", function () {
                    return householdSvc.sendInvite(inviteEmail).then(function (data) {
                        console.log('invite sent');
                    });
                })
            }
        }])
})();
/*    angular.module('HouseholdBudgeter')
        .controller('accountCtrl', ['accountSvc', '$state', function (accountSvc, $state) {

            var self = this;

            self.display = {};

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

            this.createAccount = function () {
                accountSvc.createAccount().then(function (data) {
                    self.display = data;
                });
            }

            this.editAccount = function () {
                accountSvc.editAccount().then(function (data) {
                    self.display = data;
                });
            }

            this.archiveAccount = function () {
                accountSvc.archiveAccount().then(function (data) {
                    self.display = data;
                });
            }

            this.getAccount();
        }])


    angular.module('HouseholdBudgeter')
        .controller('transactionCtrl', ['transactionSvc', '$state', function (transactionSvc, $state) {

            var self = this;

            self.display = {};

            this.getTransByCategory = function () {
                transactionSvc.getTransByCategory().then(function (data) {
                    self.display = data;
                });
            }

            this.getTransaction = function () {
                transactionSvc.getTransaction().then(function (data) {
                    self.display = data;
                });
            }

            this.editTransaction = function () {
                transactionSvc.editTransaction().then(function (data) {
                    self.display = data;
                });
            }

            this.createTransaction = function () {
                transactionSvc.createTransaction().then(function (data) {
                    self.display = data;
                });
            }

            this.deleteTransaction = function () {
                transactionSvc.deleteTransaction().then(function (data) {
                    self.display = data;
                });
            }

            this.getTransaction();

        }])

    angular.module('HouseholdBudgeter')
        .controller('budgetItemCtrl', ['budgetItemSvc', '$state', function (budgetItemSvc, $state) {

            var self = this;

            self.display = {};



        }])



*/