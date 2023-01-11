app.controller('chatCtrl', function($scope, $rootScope, DB) {
    $scope.messages = [];


    getMessages();

    function getMessages() {
        DB.select('messages', 'fromID', $rootScope.loggedUser.ID).then(function(res) {
            let messages = res.data;
            DB.select('messages', 'toID', $rootScope.loggedUser.ID).then(function(resu) {
                $scope.messages = messages.concat(resu.data);

                console.log(`PartnerID: ${$rootScope.partner.ID}`)
                console.log(`PartnerID: ${$rootScope.loggedUser.ID}`)
                console.log($scope.messages);
                for (let i = 0; i < $scope.messages.length; i++) {
                    if (!(($scope.messages[i].toID == $rootScope.partner.ID && $scope.messages[i].fromID == $rootScope.loggedUser.ID) || ($scope.messages[i].fromID == $rootScope.partner.ID && $scope.messages[i].toID == $rootScope.loggedUser.ID))) {
                        $scope.messages.splice(i, 1);
                        i--;
                    }
                }
                console.log($scope.messages);
                console.log(`PartnerID: ${$rootScope.partner.ID}`)
                console.log(`PartnerID: ${$rootScope.loggedUser.ID}`)

                $scope.messages.sort((a, b) => {return a.ID - b.ID});
                $scope.messages.forEach(message => {
                    message.date = moment(message.date).format('YYYY-MM-DD H:mm:ss');
                    if (message.fromID == $rootScope.partner.ID) {
                        message.name = $rootScope.partner.name;
                    } else {
                        message.name = $rootScope.loggedUser.name;
                    }
                });
                setTimeout(() => {
                    document.querySelector('#messageboxok').scrollTop = document.querySelector('#messageboxok').scrollHeight - document.querySelector('#messageboxok').clientHeight;
                }, 200)
            });
        });
    } 

    $scope.sending = function(){
        if ($scope.newMessage.length > 0) {
            let data = {
                fromID: $rootScope.loggedUser.ID,
                toID: $rootScope.partner.ID,
                date: moment(new Date()).format('YYYY-MM-DD H:mm:ss'),
                message: $scope.newMessage
            }
            DB.insert('messages', data).then(function(res) {
                if (res.data.affectedRows == 0) {
                    alert('Váratlan hiba történt az adatbázis művelet során!');
                } else {
                    data.ID = res.data.insertId;
                    data.name = $rootScope.loggedUser.name;
                    $scope.messages.push(data);
                    $scope.newMessage = "";
                    setTimeout(() => {
                        document.querySelector('#messageboxok').scrollTop = document.querySelector('#messageboxok').scrollHeight - document.querySelector('#messageboxok').clientHeight;
                    }, 200)
                    
                }
            })
        }
    }

    $scope.reFresh = function() {
        getMessages();
    }
});