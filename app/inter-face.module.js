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

        var promiseUsers = interFaceService.getUsers();
        var promisePosts = interFaceService.getPosts;
        var promiseComments = interFaceService.getComments;
        var promiseAlbums = interFaceService.getAlbums;
        var promisePhotos = interFaceService.getPhotosFromAlbums;

        promiseUsers.then(function(response) {
            ctrl.users = response;
        });
        ctrl.selected = null;
        ctrl.selectUser = function(index) {
            ctrl.selected = ctrl.users[index];
            ctrl.users.forEach(function(user) {
                user.isSelected = false;
            });
            ctrl.users[index].isSelected = true;
            promiseAlbums(ctrl.selected.id).then(function(response) {
                ctrl.albums = response;
                ctrl.albums.forEach(function(album) {
                    promisePhotos(album.id).then(function(response) {
                        album.photos = response;
                    });
                });
            });
            promisePosts(ctrl.selected.id).then(function(response) {
                ctrl.posts = response;
                ctrl.posts.forEach(function(post) {
                    post.showComments = false;
                    promiseComments(post.id).then(function(response){
                        post.comments = response;
                    });
                });
            });
        };
        ctrl.toggleComments = function(post) {
            post.showComments = !post.showComments;
        };
    };
    InterFaceService.$inject = ['APIurl', '$http']
    function InterFaceService(APIurl, $http) {
        var interFaceSrv = {
            getPosts: function(userId) {
                var promise = $http({
                    method: 'GET',
                    url: APIurl + '/posts'
                }).then(function(response) {
                    var posts = response.data;
                    posts = posts.filter(function(post) {
                        return post.userId === userId;
                    });
                    return posts;
                });
                return promise;
            },
            getComments: function(postId) {
                var promise = $http({
                    method: 'GET',
                    url: APIurl + '/comments'
                }).then(function(response) {
                    var comments = response.data;
                    comments = comments.filter(function(comment) {
                        return comment.postId === postId;
                    });
                    return comments;
                });
                return promise;
            },
            getAlbums: function(userId) {
                var promise = $http({
                    method: 'GET',
                    url: APIurl + '/albums'
                }).then(function(response) {
                    var albums = response.data;
                    albums = albums.filter(function(album) {
                        return album.userId === userId;
                    });
                    return albums;
                });
                return promise;
            },
            getPhotosFromAlbums: function(albumId) {
                var promise = $http({
                    method: 'GET',
                    url: APIurl + '/photos'
                }).then(function(response) {
                    var photos = response.data;
                    photos = photos.filter(function(photo) {
                        return photo.albumId === albumId;
                    });
                    return photos;
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
