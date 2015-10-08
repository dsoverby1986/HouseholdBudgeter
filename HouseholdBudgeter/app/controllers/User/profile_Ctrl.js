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

        this.changePassword = function () {
            console.log(self.model);
            return confirmModalSvc.open("Are you sure you want to change your password?",
                function () {
                    return profileSvc.changePassword(self.model)
                }, function () {
                    $state.go('profile', null, { reload: false });
                }, "md"/*, function () {
                    $state.go('accounts.list', null, { reload: true });
                }*/
            );
        }

        this.obliterateUserAccount = function () {
            console.log(self.id);
            return confirmModalSvc.open("Are you sure you want to totally and/or completely obliterate your account?",
                function () {
                    return profileSvc.obliterateUserAccount(self.id);
                    console.log(self.id);
                    console.log(self.user);
                }, function () {
                    authSvc.logout();
                    $state.go('login', null, { reload: false });
                }, "md"
            );
        }

    }]);
})();