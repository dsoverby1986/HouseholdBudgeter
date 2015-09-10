﻿(function () {
    angular.module('HouseholdBudgeter')
        .controller('householdDetailsCtrl', ['household', '$state', function (household, $state) {

            var self = this;

            this.display = household;

            console.log(household)

            this.inviteEmail = "";

            this.getHouseholdUsers = function () {
                householdSvc.getHouseholdUsers().then(function (data) {
                    self.display = data;
                });
            }

        }]);
})();