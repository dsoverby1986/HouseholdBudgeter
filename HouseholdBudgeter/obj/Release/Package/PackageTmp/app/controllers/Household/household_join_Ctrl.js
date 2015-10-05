(function () {
    angular.module('HouseholdBudgeter')
        .controller('household_join_Ctrl', ['householdSvc', '$state', function (householdSvc, $state) {

            var self = this;

            this.name = "";

            this.email = "";

            this.code = "";

            this.createHousehold = function () {
                console.log("household_join_Ctrl.createHousehold()")
                console.log(self.name);
                debugger;
                householdSvc.createHousehold(self.name).then(function (data) {
                    $state.go('household.details');
                });
            }

            this.joinHouse = function (email, code) {
                householdSvc.joinHousehold(email, code).then(function (data) {
                    $state.go('household.details');
                });
            }

        }]);
})();