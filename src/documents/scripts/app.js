'use strict';

var URL_FIREBASE = "https://secretdev.firebaseio.com/";

var secretDev = angular.module('secretDev', [
    'secretDev.filters',
    'secretDev.config',
    'firebase'
]);

secretDev.controller('MainCtrl', function ($firebase, $scope) {
    $scope.snippetLoading = true;

    var ref = new Firebase(URL_FIREBASE);
    var sync = $firebase(ref);

    $scope.snippets = sync.$asArray();

    $scope.snippets.$loaded(function () {
        $scope.snippetLoading = false;
    });
});

secretDev.controller('Snippet', function ($firebase, $scope, $location) {
    $scope.sendSnippet = function () {
        var fireBaseSnippet = {
            snippet: $scope.codeSnippet,
            codeLanguage: $scope.codeLanguage,
            createdDate: new Date().toISOString(),
            status: {
                parabens: 0,
                esseEprogrameiro: 0,
                soSucesso: 0,
                manjaDosParanaue: 0,
                trampoDePresidiario: 0
            }
        };

        var ref = new Firebase(URL_FIREBASE);
        var sync = $firebase(ref);

        sync.$push(fireBaseSnippet);
        $location.path('/');
    };
});

secretDev.controller('SnippetDetails', function ($scope, $routeParams, $firebase) {
    var idSnippet = $routeParams.idSnippet;
    var ref = new Firebase(URL_FIREBASE + idSnippet);
    var sync = $firebase(ref);

    $scope.snippet = sync.$asObject();

    $scope.addComment = function (isValid) {
        if (isValid) {
            var newComment = {
                name: $scope.codeName,
                comment: $scope.codeComment,
                createdDate: new Date().toISOString()
            }

            var newCommentChild = ref.child("comments");
            newCommentChild.push(newComment);

            $scope.codeName = "";
            $scope.codeComment = "";
        }
    }
});