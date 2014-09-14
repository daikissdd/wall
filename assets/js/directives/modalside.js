App.factory('Modalsides', function() {

	var sideModal = [];

	return {
		push: function($scope) {
			return sideModal.push($scope);
		},
		reset: function() {
			angular.forEach(sideModal, function($scope, key) {
				$scope.display = false;
			});
		},
		get: function() {
			return sideModal;
		},
		empty: function() {
			sideModal = [];
		}
	};
});

App.directive('modalside', function() {
	return {
		restrict: 'EA',
		replace: false,
		transclude: true,
		controller: function($scope, Modalsides) {
			Modalsides.push($scope);

  			$scope.display = false;
  			$scope.modalSideToggle = function() {
				if ($scope.display) {
					Modalsides.reset();
				} else {
					Modalsides.reset();
					$scope.display = true;
				}
			};
			$scope.$on('$destroy', function() {
				console.log(Modalsides.get());
				Modalsides.empty();
  			});
		},
		scope: {
			title: '@',
			closetext: '@',
			btnclass: '@',
			btntitle: '@'
		},
		templateUrl: 'assets/js/tmpls/modal-side-tmpl.html',
		link: function($scope, $element, attrs) {
			$scope.title = (!angular.isUndefined($scope.title)) ? $scope.title: '';
			$scope.closetext = (!angular.isUndefined($scope.closetext)) ? $scope.closetext: 'hide menu';
		}
	};
});