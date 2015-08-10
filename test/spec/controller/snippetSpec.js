'use strict';

describe('Controller: Snippet', function() {
  beforeEach(module('secretDev'));

  var $controller, $location, $scope, $firebase;

  beforeEach(inject(function(_$controller_, _$rootScope_ ,_$location_) {
    $controller = _$controller_;
    $location = _$location_;
    $scope = _$rootScope_.$new();

    $firebase = function(ref) {
      return {
        $push : function(snippet) {
          this.snippet = snippet;
        }
      }
    };

    spyOn($location, 'path').and.returnValue('/');

    $controller('Snippet', {
      $firebase : $firebase,
      $scope : $scope,
      $location : $location
    });
  }));

  it('Should create a new snippet', function() {
    $scope.codeSnippet = 'Hello world';
    $scope.codeLanguage = 'PHP';

    $scope.sendSnippet();

    expect($scope.newSnippet.snippet).toEqual('Hello world');
    expect($scope.newSnippet.codeLanguage).toEqual('PHP');
    expect($scope.newSnippet.status.parabens).toEqual(0);
    expect($scope.newSnippet.status.esseEprogrameiro).toEqual(0);
    expect($scope.newSnippet.status.soSucesso).toEqual(0);
    expect($scope.newSnippet.status.manjaDosParanaue).toEqual(0);
    expect($scope.newSnippet.status.trampoDePresidiario).toEqual(0);
    expect($location.path).toHaveBeenCalledWith('/');
  });
});
