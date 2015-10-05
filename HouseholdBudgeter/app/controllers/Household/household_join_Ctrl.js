(function () {
    angular.module('HouseholdBudgeter')
        .controller('household_join_Ctrl', ['householdSvc', '$state', function (householdSvc, $state) {

            var self = this;

            this.name = "";

            this.email = "";

            this.code = "";

            this.createHousehold = function () {
                debugger;
                householdSvc.createHousehold(self.name).then(function (data) {
                    $state.go('household.details');
                });
            }

            this.joinHouse = function (email, code) {
                debugger;
                householdSvc.joinHousehold(email, code).then(function (data) {
                    $state.go('household.details');
                });
            }

        }]);
})();