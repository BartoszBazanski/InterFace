(function() {
    'use strict'

    angular.module('InterFaceApp')
        .controller('UserCtrl', UserCtrl);

        UserCtrl.$inject = ['posts', 'user', 'albums', 'photos'];
        function UserCtrl(posts, user, albums, photos) {
            var ctrl = this;
            ctrl.posts = posts;
            ctrl.selected = user;
            ctrl.albums = albums;
            ctrl.photos = [];
            ctrl.albums.forEach(function(album) {
                album.photos.forEach(function(photo) {
                    ctrl.photos.push(photo);
                });
            });
            console.log(ctrl.photos);

            ctrl.toggleComments = function(post) {
                post.showComments = !post.showComments;
            };
        }
})();
