angular.module('notesApp', ['ngMaterial'])
  .controller('NoteController', ['$scope', function($scope) {

    $scope.notes = JSON.parse(localStorage.getItem('myNotes')) || [];
 
    $scope.addNote = function() {
      $scope.notes.push($scope.currentNote);
      $scope.currentNote = '';
    };

    $scope.deleteNote = function(index){
      $scope.notes.splice(index,1);
    }

    $scope.editNote = function(note, index){
      $scope.notes[index]=note;
    }

    $scope.$watch('notes', (function(newval, oldval){
      localStorage.setItem('myNotes', JSON.stringify(newval));
    }), true);

  }])
  .directive("contenteditable", function() {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {

        function read() {
          ngModel.$setViewValue(element.html());
        }

        ngModel.$render = function() {
          element.html(ngModel.$viewValue || "");
        };

        element.bind("blur keyup change", function() {
          scope.$apply(read);
        });
      }
    };
  });