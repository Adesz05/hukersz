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

    getPosts();

    function getPosts(){
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
                DB.selectAll('emotions').then(function(res) {
                    post.emoticons = res.data;
                    DB.select('reactions', 'postID', post.ID).then(function(res) {
                        post.emoticons.forEach(ikon => {
                            ikon.users = [];
                            res.data.forEach(react => {
                                if (react.emojiID == ikon.ID) {
                                    ikon.users.push({
                                        ID: react.userID,
                                        reactionID: react.ID
                                    });
                                }
                            });
                        });
                    })
                });
            }); 
        });
    }

    $scope.posting = function() {
        if ($scope.newPost.length > 0){
            let data = {
                userID: $rootScope.loggedUser.ID,
                date: moment(new Date()).format('YYYY-MM-DD H:mm'),
                postmessage: $scope.newPost
            };
            DB.insert("posts", data).then(function(res) {
                if (res.data.affectedRows == 0) {
                    alert('Váratlan hiba történt az adatbázis művelet során!');
                } else {
                    getPosts();
                }
            });
        }
    }

    $scope.postDelete = function(postID) {

        DB.delete('comments', 'postID', postID).then(function(res) {
            DB.delete('reactions', 'postID', postID).then(function(res) {
                DB.delete('posts', 'ID', postID).then(function(res) {
                    if (res.data.affectedRows == 0) {
                        alert('Váratlan hiba történt az adatbázis művelet során!');
                    } else {
                        getPosts();
                    }
                });
            });
        })
    }

    $scope.reagalt = function(users){
        if (users == null) {
            return false;
        }
        for (let i = 0; i < users.length; i++) {
            if ($rootScope.loggedUser.ID == users[i].ID) {
                return true;
            }
        }
        return false;
    }

    $scope.reagalas = function(emoticon, postid){
        let data = {
            userID: $rootScope.loggedUser.ID,
            postID: postid,
            emojiID: emoticon.ID
        }
        DB.insert("reactions", data).then(function(res) {
            if (res.data.affectedRows == 0) {
                alert('Váratlan hiba történt az adatbázis művelet során!');
            } else {
                emoticon.users.push({
                    ID: $rootScope.loggedUser.ID,
                    reactionID: res.data.insertId
                });
            }
        })
    }

    $scope.levesz = function(emoticon, postid){
        for (let i = 0; i < emoticon.users.length; i++) {
            if (emoticon.users[i].ID == $rootScope.loggedUser.ID) {
                DB.delete('reactions', 'ID', emoticon.users[i].reactionID).then(function(res) {
                    if (res.data.affectedRows == 0) {
                        alert('Váratlan hiba történt az adatbázis művelet során!');
                    } else {
                        emoticon.users.splice(i, 1);
                    }
                })
                //emoticon.users.splice(i, 1);
            }
        }
    }

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
