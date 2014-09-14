App.directive('copyright', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			copy: '@'
		},
		template: '<div>Copyright &copy; {{year}} {{copy}} ALL Rights Reserved</div>',
		link: function($scope, element, attrs) {
			$scope.year = new Date().getFullYear();
		}
	};
});