(function () {
    angular.module('HouseholdBudgeter').controller('profile_Ctrl', ['user', '$state', '$http', function (user, $state, $http) {
        var self = this;
        this.user = user;
    }]);
})();