﻿(function () {
    angular.module('HouseholdBudgeter')
        .factory('transactionSvc', ['$http', function ($http) {
            var f = {};

            f.getTransByCategory = function (accountId, catId) {
                return $http.post('/api/transactions/transbycategory', accountId, catId).then(function (response) {
                    return response.data;
                });
            }

            f.getTransactions = function (accountId) {
                return $http.post('/api/transactions/gettransactions', accountId).then(function (response) {
                    return response.data;
                })
            }

            f.getTransaction = function (id) {
                return $http.post('/api/transactions/gettransaction', id).then(function (response) {
                    return response.data;
                });
            }

            f.editTransaction = function (trans) {
                return $http.post('/api/transactions/edittransaction', trans).then(function (response) {
                    return response.data;
                });
            }

            f.createTransaction = function (trans) {
                return $http.post('/api/transactions/createtransaction', trans).then(function (response) {
                    return response.data;
                });
            }

            f.deleteTransaction = function (transId) {
                return $http.post('/api/transactions/deletetransaction', transId).then(function (response) {
                    return response.data;
                });
            }

            f.recentTransactions = function () {
                return $http.post('/api/transactions/recenttransactions').then(function (response) {
                    {
                        return response.data;
                    }
                })
            }

            return f;

        }])
})();