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

  
    
});
