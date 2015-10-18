'use strict';

var URL_FIREBASE = "https://secretdev.firebaseio.com/";

var secretDev = angular.module('secretDev', [
    'secretDev.filters',
    'secretDev.config',
    'firebase',
    'sdLike'
]);

secretDev.controller('MainCtrl', function ($firebaseArray, $scope) {
    $scope.snippetLoading = true;

    var ref = new Firebase(URL_FIREBASE);

    $scope.snippets = $firebaseArray(ref);

    $scope.snippets.$loaded(function () {
        $scope.snippetLoading = false;
    });
});

secretDev.controller('Snippet', function ($scope, $location) {
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

        ref.push(fireBaseSnippet);

        $scope.newSnippet = fireBaseSnippet;

        $location.path('/');
    };
});

secretDev.controller('SnippetDetails', function ($scope, $routeParams, $firebaseObject) {
    var idSnippet = $routeParams.idSnippet;
    var ref = new Firebase(URL_FIREBASE + idSnippet);

    $scope.snippet = $firebaseObject(ref);

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
