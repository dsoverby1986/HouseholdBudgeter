﻿(function () {
    angular.module('HouseholdBudgeter')
    .controller('newCategoryCtrl', ['categorySvc', '$state', function (categorySvc, state) {

        var self = this;

        self.name = "";

        this.createCategory = function (name, balance) {
            categorySvc.createCategory(name).then(function (data) {
                self.display = data;
            });
        }
    }])
})();