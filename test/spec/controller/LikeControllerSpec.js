'use strict'

describe('Controller: Like', function() {
  beforeEach(module('sdLike'));

  var $controller, $firebaseObject, sdFirebaseFactory;

  beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
  }));

  var $scope, controller;

  beforeEach(function() {
    $scope = {};
    controller = null;
    $firebaseObject;
    sdFirebaseFactory = null;
  });

  it('Should return isntance of Firebase to be used', function() {
    controller = $controller('LikeController', {
      $scope: $scope,
      $firebaseObject : $firebaseObject,
      sdFirebaseFactory : sdFirebaseFactory
    })

    expect(sdFirebaseFactory).toBeDefined();
    expect(sdFirebaseFactory.get()).toBeDefined();
  })
});
