(function() {
    'use strict'

    angular.module('InterFaceApp')
        .controller('InterFaceCtrl', InterFaceCtrl);

    InterFaceCtrl.$inject = ['InterFaceService', '$rootScope']
    function InterFaceCtrl(InterFaceService, $rootScope) {
        var ctrl = this;
        var promiseUsers = InterFaceService.getUsers();
        promiseUsers.then(function(response) {
            ctrl.users = response;
            ctrl.loggedUser = ctrl.users[0];
            ctrl.editUser = {
                username: ctrl.loggedUser.username,
                address: {
                    street: ctrl.loggedUser.address.street,
                    suite: ctrl.loggedUser.address.suite,
                    city: ctrl.loggedUser.address.city,
                    zipcode: ctrl.loggedUser.address.zipcode
                }
            };
        });
        ctrl.updateUser = function(userDetails, newUserDetails) {
            userDetails.username = newUserDetails.username;
            userDetails.address.street = newUserDetails.address.street;
            userDetails.address.suite = newUserDetails.address.suite;
            userDetails.address.city = newUserDetails.address.city;
            userDetails.address.zipcode = newUserDetails.address.zipcode;
        }

        ctrl.showUserDetails = false;
        ctrl.selected = null;
        ctrl.selectUser = function(index) {
            ctrl.selected = ctrl.users[index];
            ctrl.users.forEach(function(user) {
                user.isSelected = false;
            });
            ctrl.users[index].isSelected = true;
        };
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if(toState.resolve) {
                ctrl.loading = true;
            }
        })
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if(toState.resolve) {
                ctrl.loading = false;
            }
        })
    };
})();
