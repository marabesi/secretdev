'use strict'

angular.module('sdFirebaseFactory', [])
.factory('sdFirebaseFactory', function() {
    var URL = 'https://secretdev.firebaseio.com/';

    return {
      getNewInstance : function() {
        return new Firebase(URL)
      },
      getSnippet : function(idSnippet) {
        console.log(URL + idSnippet);
        return new Firebase(URL + idSnippet)
      }
    }
});
