(function () {
    angular.module('HouseholdBudgeter')
        .controller('household_join_Ctrl', ['householdSvc', '$state', function (householdSvc, $state) {

            var self = this;

            this.name = "";

            this.email = "";

            this.code = "";

            this.$state = $state;

            this.createHousehold = function () {
                householdSvc.createHousehold(self.name).then(function (data) {
                    debugger;
                    $state.go($state.current, null, { reload: true });
                    $state.go('household.details');
                });
            }

            this.joinHouse = function (email, code) {
                householdSvc.joinHousehold(email, code).then(function (data) {
                    $state.go('household.details', null, { reload: true });
                });
            }

        }]);
})();