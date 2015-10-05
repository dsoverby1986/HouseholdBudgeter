'use strict';
angular.module('HouseholdBudgeter').controller('navCtrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.auth = authSvc.authentication;

    self.logout = function () {
        authSvc.logout();
        $state.go('login');
    }

}])