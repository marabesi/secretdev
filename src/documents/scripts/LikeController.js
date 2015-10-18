var like = angular.module('sdLike', ['firebase', 'sdFirebaseFactory']);

like.controller('LikeController', function($scope, $firebaseObject,
  sdFirebaseFactory) {
  $scope.addLike = function(id, tag) {
    var ref = sdFirebaseFactory.getSnippet(id);
    var total = 0

    ref.on('value', function(snapshot) {
      var current = snapshot.child('status/' + tag).val();

      total = current + 1;
    });

    var newObjectValue = {};
    newObjectValue[tag] = total;

    ref.child('status').update(newObjectValue);
  };
});
