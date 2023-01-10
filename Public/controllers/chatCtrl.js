app.controller('chatCtrl', function($scope, $rootScope, DB) {
    $scope.messages = [];



    DB.select('messages', 'fromID', $rootScope.loggedUser.ID).then(function(res) {
        //???????????????????????????
    });

    $scope.sending = function(){
        if ($scope.newMessage.length > 0) {
            let data = {
                fromID: $rootScope.loggedUser.ID,
                toID: $rootScope.partner.ID,
                date: moment(new Date()).format('YYYY-MM-DD H:mm'),
                message: $scope.newMessage
            }
            DB.insert('messages', data).then(function(res) {
                if (res.data.affectedRows == 0) {
                    alert('Váratlan hiba történt az adatbázis művelet során!');
                } else {
                    data.ID = res.data.insertId;
                    $scope.messages.push(data);
                    $scope.newMessage = "";
                }
            })
        }
    }
});