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

    $scope.reakcio = function(postid,index){
        let reagalas = document.getElementById('reagalas'+postid+index);
        let classnevek = reagalas.className
        console.log(classnevek)
        let joclassnev=classnevek.split(' ')[3]
        console.log(joclassnev)
        if(joclassnev.split('-')[1]=="outline"){
            let csakazoutlineclasskiszedes=joclassnev.split('-')[0]+"-"+joclassnev.split('-')[2]
            console.log(csakazoutlineclasskiszedes)
            reagalas.classList.remove(joclassnev)
            reagalas.classList.add(csakazoutlineclasskiszedes)
        }else{
            console.log(joclassnev+"  az elseben")
            reagalas.classList.remove(joclassnev)
            let outlinehozzaadas=joclassnev.split('-')[0]+"-outline-"+joclassnev.split('-')[2]
            reagalas.classList.add(outlinehozzaadas)
            console.log(outlinehozzaadas)
        }
    }

    $scope.kommentSelectPost = function(postID, hely) {
        $scope.kommentPost = {
            ID: postID,
            listID: hely
        };
        $scope.newComment.text = "";
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
                            posts[$scope.kommentPost.listID].comments.forEach(comment => {
                                comment.date = moment(comment.date).format('YYYY-MM-DD H:mm')
                            });
                        }
                    })
                }
            });
        }
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
                        $scope.newPost = "";
                    });
                }
            });
        }
    }

    $scope.postDelete = function(postID) {

        DB.delete('comments', 'postID', postID).then(function(res) {
            if (res.data.affectedRows == 0) {
                alert('Váratlan hiba történt az adatbázis művelet során!');
            } else {
                DB.delete('posts', 'ID', postID).then(function(res) {
                    if (res.data.affectedRows == 0) {
                        alert('Váratlan hiba történt az adatbázis művelet során!');
                    } else {
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
                    }
                });
            }
        })
    }
  
    
});
