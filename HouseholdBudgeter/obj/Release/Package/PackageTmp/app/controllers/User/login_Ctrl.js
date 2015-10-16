'use strict';
angular.module('HouseholdBudgeter').controller('login_Ctrl', ['householdSvc', 'authSvc', '$state', function (householdSvc, authSvc, $state) {
    var self = this;

    self.username = '';
    self.password = '';

    self.error = null;

    this.user = {};

    self.submit = function () {
        authSvc.login(self.username, self.password).then(function (success) {
            if (success.householdId == "" || success.householdId == null) {
                $state.go('household.join');
            }
            else
            {
                $state.go('dashboard');
            }
        }, function (error) {
            self.error = error.error_description;
        });
    }

    this.getUser = function () {
        householdSvc.getUser().then(function (data) {
            self.user = data;
        });
    }
}])