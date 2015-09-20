'use strict';
angular.module('HouseholdBudgeter').controller('login_Ctrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.username = '';
    self.password = '';

    self.errors = null;

    self.submit = function () {
        authSvc.login(self.username, self.password).then(function (success) {
            $state.go('dashboard.details');
        }, function (error) {
            self.errors = error.data;
        });
    }

}])