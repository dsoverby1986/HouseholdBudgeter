(function () {
    angular.module('HouseholdBudgeter')
        .controller('household_details_Ctrl', ['household', '$state', function (household, $state) {

            var self = this;

            this.display = household;

            this.inviteEmail = "";

            this.getHouseholdUsers = function () {
                householdSvc.getHouseholdUsers().then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();