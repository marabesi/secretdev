'use strict';

angular.module('secretDev.config', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/pages/main.html',
        controller: 'MainCtrl'
    })
        .when('/snippet.html', {
            templateUrl: '/pages/snippet.html',
            controller: 'Snippet'
        })
        .when('/snippet-details.html/:idSnippet', {
            templateUrl: '/pages/snippet-details.html',
            controller: 'SnippetDetails'
        }).otherwise({
            redirectTo: '/'
        });
});