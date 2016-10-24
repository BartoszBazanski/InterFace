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
                    comments: ['posts', 'InterFaceService', function(posts, InterFaceService) {
                        posts.forEach(function(post) {
                            return InterFaceService.getComments(post.id).then(function(response) {
                                post.comments = response;
                            })
                        })
                    }],
                    albums: ['user', 'InterFaceService', function(user, InterFaceService) {
                        return InterFaceService.getAlbums(user.id);
                    }],
                    photos: ['albums', 'InterFaceService', function(albums, InterFaceService) {
                        albums.forEach(function(album) {
                            return InterFaceService.getPhotosFromAlbums(album.id).then(function(response) {
                                album.photos = response;
                            })
                        })
                    }]
                }
            });
    }
})();
