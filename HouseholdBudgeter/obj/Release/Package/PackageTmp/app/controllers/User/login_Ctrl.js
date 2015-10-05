'use strict';
angular.module('HouseholdBudgeter').controller('login_Ctrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.username = '';
    self.password = '';

    self.errors = null;

    self.submit = function () {
        authSvc.login(self.username, self.password).then(function (success) {
            console.log(success);
            debugger;
            if (success.householdId == "" || success.householdId == null)
                $state.go('household.join');
            console.log("Goto dashboard");
            $state.go('dashboard');
        }, function (error) {
            self.errors = error.data;
        });
    }
}])