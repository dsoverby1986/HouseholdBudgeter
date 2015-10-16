(function () {
    angular.module('HouseholdBudgeter').factory('accessDeniedModalSvc', ['$modal', '$q', function ($modal, $q) {

        var f = {};

        f.open = function () {
            $modal.open({
                animation: true,
                template: '<div class="modal-body">' +
                                'Currently, you do not have access to this page. You must belong to a household before you are allowed access to this portion of the site. Join or create a household to receive access.' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<button class="btn btn-danger" type="button" ng-click="accessDenied.join()">Join/Create Household</button>' +
                                '<button class="btn btn-success" type="button"ng-click="accessDenied.close()">Close</button>' +
                            '</div>',
                controller: ['$modalInstance', '$state',  function ($modalInstance, $state) {

                    var self = this;

                    this.$state = $state;

                    this.yes = function () {
                        $state.go('household.join',null, {reload: true});
                    }

                    this.no = function () {
                        //$modalInstance.close().then();
                        return $q.when($modalInstance.close());
                    }
                }],
                controllerAs: 'accessDenied',
                size: size || 'md'
            });
        }

        return f;
    }])
})();