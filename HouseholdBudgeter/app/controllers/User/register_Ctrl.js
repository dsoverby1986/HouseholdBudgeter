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
            FirstName: self.firstName,
            LastName: self.lastName,
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
            debugger;
            console.log(self.registration);
            authSvc.saveRegistration(self.registration).then(function (data) {
                debugger;
                authSvc.login(data.data.Email, data.data.Password).then(function (success) {
                    $state.go('household.join');
                });
        });
    }

}])