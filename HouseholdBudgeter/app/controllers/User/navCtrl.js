'use strict';
angular.module('HouseholdBudgeter').controller('navCtrl', ['householdSvc', 'authSvc', '$state', function (householdSvc, authSvc, $state) {

    var self = this;

    //this.goodToGo = "";

    /*this.goodToGoStatus = function () {
        householdSvc.goodToGoStatus().then(function (data) {
            debugger;
            self.goodToGo = data;
        })
    }*/
    
    //self.goodToGoStatus();

    self.auth = authSvc.authentication;

    self.logout = function () {
        authSvc.logout();
        $state.go('login');
    }

}])