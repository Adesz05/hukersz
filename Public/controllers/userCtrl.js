app.controller('userCtrl', function($scope, DB, $rootScope, $location) {

    $scope.user = {};

    $scope.registration = function() {
        if ($scope.user.name == null || $scope.user.email == null || $scope.user.pass1 == null || $scope.user.pass2 == null) {
            alert('Nem adtál meg minden kötelező adatot!');
        } else {
            if ($scope.user.pass1 != $scope.user.pass2) {
                alert('A megadott jelszavak nem egyeznek!');
            } else {
                var pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                if (!$scope.user.pass1.match(pwd_pattern)) {
                    alert('A megadott jelszó nem felel meg a minimális biztonsági követelményeknek!');
                } else {
                    let data = {
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: CryptoJS.SHA1($scope.user.pass1).toString(),
                        phone: $scope.user.phone,
                        address: $scope.user.address,
                    }

                    DB.insert('users', data).then(function(res) {
                        if (res.data.affectedRows == 0) {
                            alert('Váratlan hiba történt az adatbázis művelet során!');
                        } else {
                            if (res.data.affectedRows != 0) {
                                alert('A regisztráció sikeres! Beléphetsz az oldalra!');
                                $scope.user = {};
                                $location.path('/');
                            } else {
                                alert('Váratlan hiba történt az adatbázis művelet során!');
                            }
                        }
                    });
                }
            }
        }
    };

    $scope.login = function() {
        if ($scope.user.email == null || $scope.user.pass == null) {
            alert('Nem adtál meg minden kötelező adatot!');
        } else {
            let data = {
                table: 'users',
                email: $scope.user.email,
                password: CryptoJS.SHA1($scope.user.pass).toString()
            }

            DB.logincheck(data).then(function(res) {
                console.log(res.data);
                if (res.data.length == 0) {
                    alert('Hibás belépési adatok!');
                } else {
                    if (res.data[0].status == 0) {
                        alert('Tiltott felhasználó!');
                    } else {
                        res.data[0].last = moment(new Date()).format('YYYY-MM-DD H:m:s');
                        $rootScope.loggedUser = res.data[0];
                        let data = {
                            last: res.data[0].last
                        }
                        DB.update('users', res.data[0].ID, data).then(function(result) {
                            sessionStorage.setItem('loggedUser', angular.toJson($rootScope.loggedUser));
                        });
                        $location.path('/posts');
                    }
                }
            });
        }
    }

});