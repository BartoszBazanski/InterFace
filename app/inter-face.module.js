(function() {
    'use strict'
    angular.module('InterFaceApp', ['ngMaterial']);

    angular.module('InterFaceApp')
        .controller('interFaceCtrl', InterFaceCtrl)
        .service('interFaceService', InterFaceService)
        .constant('APIurl', 'http://jsonplaceholder.typicode.com');

    InterFaceCtrl.$inject = ['interFaceService']
    function InterFaceCtrl(interFaceService) {
        var ctrl = this;
        var promise = interFaceService.getUsers();
        promise.then(function(responce) {
            ctrl.users = responce;
        });
    };
    InterFaceService.$inject = ['APIurl', '$http']
    function InterFaceService(APIurl, $http) {
        var interFaceSrv = {
            getPosts: function() {
                var promise = $http({
                    method: 'GET',
                    url: APIurl + '/posts'
                }).then(function(response) {
                    return response.data;
                });
                return promise;
            },
            getUsers: function() {
                var promise = $http({
                    method: 'GET',
                    url: APIurl + '/users'
                }).then(function(response) {
                    return response.data;
                });
                return promise;
            }
        };

        return interFaceSrv;
    };
})();
