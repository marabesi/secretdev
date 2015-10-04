'use strict';

describe('Controller: Main', function() {
  beforeEach(module('secretDev'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  var $scope, controller, $firebase;

  beforeEach(function() {
    $scope = {};
    controller = null;
    $firebase = null;
  });

  it("Should load data from firebase API successfully", function() {
    $firebase = function(ref) {
          var firebaseData = [
            {
              $id : 123,
              createdDate : '2014-11-23T23:47:52.812Z',
              codeLanguage : 'Java',
              snippet : 'System.out.println("hello world");',
              status : {
                parabens : 0,
                esseEprogrameiro: 0,
                soSucesso: 0,
                manjaDosParanaue: 0,
                trampoDePresidiario: 0
              },
            },
          ];

          firebaseData.$loaded = function(callback) {
            callback();
          };

          return firebaseData;
    };

    controller = $controller('MainCtrl', {
      $firebaseArray : $firebase,
      $scope : $scope
    });

    expect($scope.snippetLoading).toBe(false);
    expect($scope.snippets.length).toEqual(1);
    expect($scope.snippets[0].$id).toEqual(123);
    expect($scope.snippets[0].createdDate).toEqual('2014-11-23T23:47:52.812Z');
    expect($scope.snippets[0].codeLanguage).toEqual('Java');
    expect($scope.snippets[0].snippet).toEqual('System.out.println("hello world");');
    expect($scope.snippets[0].status.parabens).toEqual(0);
    expect($scope.snippets[0].status.esseEprogrameiro).toEqual(0);
    expect($scope.snippets[0].status.soSucesso).toEqual(0);
    expect($scope.snippets[0].status.manjaDosParanaue).toEqual(0);
    expect($scope.snippets[0].status.trampoDePresidiario).toEqual(0);
  });

  it('Should not receive data from firebase', function() {
    $firebase = function(ref) {
      return {
        $asArray : function() {
          var firebaseData = [];

          // should not execute callback
          firebaseData.$loaded = function(callback) {};

          return firebaseData;
        },
      }
    };

    controller = $controller('MainCtrl', {
      $firebase : $firebase,
      $scope : $scope
    });

    expect($scope.snippetLoading).toBe(true);
    expect($scope.snippets.length).toEqual(0);
  });
});
