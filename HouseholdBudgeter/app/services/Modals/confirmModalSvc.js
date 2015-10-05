(function () {
    angular.module('HouseholdBudgeter').factory('confirmModalSvc', ['$modal', '$q', function ($modal, $q) {

        var f = {};

        f.open = function (message, onConfirm, onConfirmSuccess, size, onDeny) {
            $modal.open({
                animation: true,
                template:  '<div class="modal-body">' +
                                '{{confirm.message}}' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<button class="btn btn-danger" type="button" ng-click="confirm.yes()">Yes</button>' +
                                '<button class="btn btn-success" type="button"ng-click="confirm.no()">Nope</button>' +
                            '</div>',
                controller: ['$modalInstance', function ($modalInstance) {

                    var self = this;

                    this.message = message;

                    this.yes = function () {
                        return $q.when(onConfirm()).then($modalInstance.close).then(onConfirmSuccess);
                    }

                    this.no = function () {
                        //$modalInstance.close().then();
                         return $q.when($modalInstance.close()).then(onDeny);
                    }
                }],
                controllerAs: 'confirm',
                size: size || 'sm'
            });
        }
        
        return f;
    }])
})();