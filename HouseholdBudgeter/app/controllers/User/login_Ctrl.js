'use strict';
angular.module('HouseholdBudgeter').controller('login_Ctrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.username = '';
    self.password = '';

    self.error = null;

    self.submit = function () {
        authSvc.login(self.username, self.password).then(function (success) {
            if (success.householdId == "" || success.householdId == null)
                $state.go('household.join');
            $state.go('dashboard');
        }, function (error) {
            console.log(error);
            self.error = error.error_description;
        });
    }
}])