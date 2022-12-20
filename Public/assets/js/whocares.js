let app = new angular.module('hukerszApp', ['ngRoute']);

app.run(function($rootScope, $locale, DB) {

    $locale.NUMBER_FORMATS.GROUP_SEP = ".";
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";

    $rootScope.settings = {};
    $rootScope.loggedUser = {};
    $rootScope.settings.appTitle = 'Hukersz';
    $rootScope.settings.company = 'Csapatnev';
    $rootScope.settings.author = '2/14.szft szoftverfejlesztő';
    DB.selectAll('users').then(function(res) {
        $rootScope.users = res.data;
    });

});

app.config(function($routeProvider) {
    $routeProvider
    // bárki számára
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'userCtrl'
        })
        .when('/reg', {
            templateUrl: 'views/registration.html',
            controller: 'userCtrl'  
        })
        .when('/posts', {
            templateUrl: 'views/posts.html',
            controller: 'postsCtrl'  
        })
        .otherwise('/')
});

app.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

app.service('fileUpload', function($http, $q) {

    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);

        var deffered = $q.defer();
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        }).then(
            function(res) {
                deffered.resolve(res);
            },
            function(err) {
                deffered.reject(err);
            }
        );
        return deffered.promise;
    }
});