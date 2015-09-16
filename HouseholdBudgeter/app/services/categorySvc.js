(function () {
    angular.module('HouseholdBudgeter')
        .factory('categorySvc', ['$http', function ($http) {
            var f = {};

            f.getCategories = function () {
                return $http.post('/api/categories/getcategories').then(function (response) {
                    return response.data;
                });
            }

            f.getCategory = function (id) {
                return $http.post('/api/category/getcategory', { id: id }).then(function (response) {
                    return response.data;
                });
            }

            f.createCategory = function (name, balance) {
                return $http.post('/api/categories/createcategory', { Name: name, Balance: balance }).then(function (response) {
                    return response.data;
                });
            }

            f.editCategory = function (name, balance, isArchived) {
                return $http.post('/api/categories/editcategory', { Name: name, Balance: balance, IsArchived: isArchived }).then(function (response) {
                    return response.data;
                });
            }

            f.deleteCategory = function (id) {
                return $http.post('/api/categories/deletecategory', { Id: id }).then(function (response) {
                    return response.data;
                });
            }

            return f;

        }])
})();