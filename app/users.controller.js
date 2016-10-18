(function() {
    'use strict'

    angular.module('InterFaceApp')
        .controller('UserCtrl', UserCtrl);

        UserCtrl.$inject = ['posts', 'user', 'albums'];
        function UserCtrl(posts, user, albums) {
            var ctrl = this;
            ctrl.posts = posts;
            ctrl.selected = user;
            ctrl.albums = albums;
            
            ctrl.toggleComments = function(post) {
                post.showComments = !post.showComments;
            };
        }
})();
