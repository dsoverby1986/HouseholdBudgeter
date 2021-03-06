﻿'use strict';
angular.module('HouseholdBudgeter').controller('home_Ctrl', ['authSvc', '$state', '$http', function (authSvc, $state, $http) {

    var self = this;

    self.values = [];

    self.getValues = function () {
        $http.get('/api/values').then(function (response) {
            self.values = response.data;
        });
    }

    self.getValue = function () {
        $http.get('/api/values/5').then(function (response) {
            self.value = response.data;
        });
    }

}])