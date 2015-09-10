(function () {
    angular.module('HouseholdBudgeter')
        .controller('householdJoinCtrl', ['household', '$state', function (household, $state) {

            var self = this;

            this.name = "";

            this.email = "";

            this.code = "";

            this.createHousehold = function (name) {
                householdSvc.createHousehold(name).then(function (data) {
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