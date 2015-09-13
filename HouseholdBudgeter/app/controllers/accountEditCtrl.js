(function () {
    angular.module('HouseholdBudgeter')
        .controller('createEditCtrl', ['accountSvc', '$state', function (accountSvc, $state) {

            console.log('in controller');

            var self = this;

            this.editAccount = function () {
                accountSvc.editAccount().then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();