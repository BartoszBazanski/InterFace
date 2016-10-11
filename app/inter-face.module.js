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

        promiseUsers.then(function(responce) {
            ctrl.users = responce;
            console.log(ctrl.users);
        });

        ctrl.selected = null;
        ctrl.selectUser = function(index) {
            ctrl.selected = ctrl.users[index];
            promisePosts(ctrl.selected.id).then(function(response) {
                ctrl.posts = response;
                ctrl.posts.forEach(function(post) {
                    post.showComments = false;
                    promiseComments(post.id).then(function(response){
                        post.comments = response;
                    });
                })
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
                }).then(function(responce) {
                    var comments = responce.data;
                    comments = comments.filter(function(comment) {
                        return comment.postId === postId;
                    });
                    return comments;
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
