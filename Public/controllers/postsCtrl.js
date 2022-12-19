app.controller('postsCtrl', function($scope, $rootScope, DB) {
    $scope.users = [];
    $scope.emocitons = [];
    $scope.posts = [];

    DB.selectAll('users').then(function(res) {
        $scope.users = res.data;
    });

    DB.selectAll('emotions').then(function(res) {
        $scope.emoticons = res.data;
    });

    DB.selectAll('postdetails').then(function(res) {
        $scope.posts=res.data;
        $scope.posts.forEach(post => {
            DB.select('commentdetails', 'postID', post.ID).then(function(res){
                post.comments = res.data;
            });
        }); 
    });

    DB.selectAll('emotions').then(function(res) {
        $scope.posts = res.data;
        $scope.posts.forEach(item => {
            DB.select('comments', 'userID', item.ID).then(function(res) {
                item.comments = res.data;
            });
        });
    });
    
});
