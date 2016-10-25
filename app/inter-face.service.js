(function() {
    'use strict'

    angular.module('InterFaceApp')
        .service('InterFaceService', InterFaceService)
        .constant('APIurl', 'http://jsonplaceholder.typicode.com');

    InterFaceService.$inject = ['APIurl', '$http']
    function InterFaceService(APIurl, $http) {
        var service = this;
        service.getUserPosts = function(userId) {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/posts/',
                params: { userId: userId }
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };
        service.getComments = function(postId) {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/comments',
                params: { postId: postId }
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };
        service.getAlbums = function(userId) {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/albums',
                params: {userId: userId}
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };
        service.getPhotosFromAlbums = function(albumId) {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/photos',
                params: {albumId: albumId}
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };
        service.getUsers = function() {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/users'
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };
        service.getPhotos = function() {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/photos'
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };
        service.getUserById = function(userId) {
            var promise = $http({
                method: 'GET',
                url: APIurl + '/users/' + userId
            }).then(function(response) {
                return response.data;
            });
            return promise;
        };

        return service;
    };
})();
