'use strict';
angular.module('HouseholdBudgeter').
    controller('register_Ctrl', ['authSvc', '$state', function (authSvc, $state) {
        var self = this;

        self.username = '';
        self.password = '';

        this.firstName = "",
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";

        this.registration = {
            Email: self.email,
            Password: self.password,
            ConfirmPassword: self.confirmPassword
        };

        this.user = {
            FirstName: self.firstName,
            LastName: self.lastName,
            DisplayName: ""
        };

        self.errors = null;

        this.register = function () {
            console.log("register_Ctrl");
            console.log(self.registration);
            debugger;
            authSvc.saveRegistration(self.registration).then(function (data) {
                $state.go('household.join');
        });
    }

}])