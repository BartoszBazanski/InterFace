(function() {
    'use strict'

    angular.module('InterFaceApp')
        .controller('InterFaceCtrl', InterFaceCtrl);

    InterFaceCtrl.$inject = ['InterFaceService']
    function InterFaceCtrl(InterFaceService) {
        var ctrl = this;
        var promiseUsers = InterFaceService.getUsers();

        promiseUsers.then(function(response) {
            ctrl.users = response;
            ctrl.loggedUser = ctrl.users[0];
        });

        ctrl.showUserDetails = false;
        ctrl.selected = null;
        ctrl.selectUser = function(index) {
            ctrl.selected = ctrl.users[index];
            ctrl.users.forEach(function(user) {
                user.isSelected = false;
            });
            ctrl.users[index].isSelected = true;
        };
    };
})();
