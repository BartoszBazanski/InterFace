(function() {
    'use strict'

    angular.module('InterFaceApp')
        .config(Routing);

    Routing.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Routing($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './partials/home-tmpl.html'
            })
            .state('user', {
                url: '/user/{userId}',
                templateUrl: './partials/user-tmpl.html',
                controller: 'UserCtrl as ctrl',
                resolve: {
                    user: ['$stateParams', 'InterFaceService', function($stateParams, InterFaceService) {
                        return InterFaceService.getUserById($stateParams.userId);
                    }],
                    posts: ['user', 'InterFaceService', function(user, InterFaceService) {
                        return InterFaceService.getUserPosts(user.id);
                    }],
                    comments: ['posts', 'InterFaceService', '$q', function(posts, InterFaceService, $q) {
                        var promises = [];
                        var promise;
                        posts.forEach(function(post) {
                            promise = InterFaceService.getComments(post.id);
                            promise.then(function(response) {
                                post.comments = response;
                            });
                            promises.push(promise);
                        });
                        return $q.all(promises);
                    }],
                    albums: ['user', 'InterFaceService', function(user, InterFaceService) {
                        return InterFaceService.getAlbums(user.id);
                    }],
                    photos: ['albums', 'InterFaceService', '$q', function(albums, InterFaceService, $q) {
                        var promises = [];
                        var promise;
                        albums.forEach(function(album) {
                            promise = InterFaceService.getPhotosFromAlbums(album.id);
                            promise.then(function(response) {
                                album.photos = response;
                            });
                            promises.push(promise);
                        });
                        return $q.all(promises);
                    }]
                }
            });
    }
})();
