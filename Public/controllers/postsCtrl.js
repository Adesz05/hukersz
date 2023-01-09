app.controller('postsCtrl', function($scope, $rootScope, DB) {
    $scope.users = [];
    $scope.emocitons = [];
    $scope.posts = [];
    $scope.kommentPostID = 0;
    $scope.newComment = {};

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

    $scope.kommentSelectPost = function(postID, hely) {
        $scope.kommentPost = {
            ID: postID,
            listID: hely
        };
        
    }

    $scope.komment = function() {
        if ($scope.newComment.text.length > 0){
            let data = {
                userID: $rootScope.loggedUser.ID,
                postID: $scope.kommentPost.ID,
                date: moment(new Date()).format('YYYY-MM-DD H:mm'),
                comment: $scope.newComment.text
            };
            DB.insert("comments", data).then(function(res) {
                if (res.data.affectedRows == 0) {
                    alert('Váratlan hiba történt az adatbázis művelet során!');
                } else {
                    DB.select('commentdetails', 'postID', $scope.kommentPost.ID).then(function(res) {
                        if (res.data.affectedRows == 0) {
                            alert('Váratlan hiba történt az adatbázis művelet során!');
                        } else {
                            $scope.posts[$scope.kommentPost.listID].comments = res.data;
                        }
                    })
                }
            });
        }
    }
  
    
});
