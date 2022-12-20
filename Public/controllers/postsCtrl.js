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
            post.date = moment(post.date).format('YYYY-MM-DD H:mm')
            DB.select('commentdetails', 'postID', post.ID).then(function(res){
                post.comments = res.data;
                post.comments.forEach(comment => {
                    comment.date = moment(comment.date).format('YYYY-MM-DD H:mm')
                });
            });
        }); 
    });

  
    
});
