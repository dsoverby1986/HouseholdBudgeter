(function () {
    angular.module('HouseholdBudgeter').controller('profile_Ctrl', ['authSvc', 'confirmModalSvc', 'profileSvc', 'user', '$state', '$http', function (authSvc, confirmModalSvc, profileSvc, user, $state, $http) {
        var self = this;
        this.user = user;
        console.log(self.user);
        this.id = user.Id;
        console.log(self.id);
        this.$state = $state;

        this.model = {
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: ""
        };

        this.inHouse = false;

        if (self.user.HouseholdId != "" || self.user.HouseholdId != null) {
            self.inHouse = true;
        }

        this.error = "";

        this.changePassword = function () {
            return confirmModalSvc.open("Are you sure you want to change your password?",
                function () {
                    return profileSvc.changePassword(self.model)
                }, function (data) {
                    /*switch (data) {
                        case "oldPasswordError":
                            self.error = "oldPasswordError";
                            break;
                        case "newPasswordError":
                            self.error = "newPasswordError";
                            break;
                        case "confirmPasswordError":
                            self.error = "confirmPasswordError";
                            break;
                        default:*/
                            $state.go('profile', null, { reload: false });
                    /*}*/
                    
                }, "md"/*, function () {
                    $state.go('accounts.list', null, { reload: true });
                }*/
            );
        }

        this.obliterateUserAccount = function () {
            return confirmModalSvc.open("Are you sure you want to totally and/or completely obliterate your account?",
                function () {
                    return profileSvc.obliterateUserAccount(self.id);
                }, function () {
                    authSvc.logout();
                    $state.go('login', null, { reload: false });
                }, "md"
            );
        }

    }]);
})();