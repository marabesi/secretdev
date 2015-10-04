'use stric';

describe('Controller: SnippetDetail', function() {
  beforeEach(module('secretDev'));

  var $controller, controller, $scope, $routeParams, firebase = {}, firebaseObj;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $routeParams = _$routeParams_;
    firebaseObj = {
        $id : 999,
        createdDate : '2013-09-23T22:11:09.812Z',
        codeLanguage : 'CSS',
        snippet : '#global { color:#000; }',
        status : {
          parabens : 0,
          esseEprogrameiro: 0,
          soSucesso: 0,
          manjaDosParanaue: 0,
          trampoDePresidiario: 0
        }
    };
    firebase = function(ref) {
      ref.child = function(name) {
        return {
          push : function(comment) {}
        }
      };

      return firebaseObj;
    };

    controler = $controller('SnippetDetails', {
      $scope : $scope,
      $routeParams : $routeParams,
      $firebaseObject : firebase
    });
  }));

  it('Should retrieve snippet data from firebase', function() {
    expect($scope.idSnippet).toBe(undefined);

    $routeParams.idSnippet = 666;

    expect($routeParams.idSnippet).toEqual(666);
    expect($scope.snippet.$id).toEqual(999);
    expect($scope.snippet.createdDate).toEqual('2013-09-23T22:11:09.812Z');
    expect($scope.snippet.codeLanguage).toEqual('CSS');
    expect($scope.snippet.snippet).toEqual('#global { color:#000; }');
    expect($scope.snippet.status.parabens).toEqual(0);
    expect($scope.snippet.status.esseEprogrameiro).toEqual(0);
    expect($scope.snippet.status.soSucesso).toEqual(0);
    expect($scope.snippet.status.manjaDosParanaue).toEqual(0);
    expect($scope.snippet.status.trampoDePresidiario).toEqual(0);
  });

  it('Should not append a new comment to a snippet when validation fails', function() {
      $scope.addComment(false);

      expect($scope.snippet.comments).toBe(undefined);
  });

  it('Should append a new comment', function() {
    $scope.codeName = 'Matheus Marabesi';
    $scope.codeComment = 'Workaround!';
    $scope.addComment(true);

    expect($scope.codeName).toEqual('');
    expect($scope.codeComment).toEqual('');
  });

});
