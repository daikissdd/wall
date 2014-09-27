App.controller('passwordCtrl', function($scope, $routeParams, Wall, Switcher, Url) {

	$scope.wall = {
		wall_code: $routeParams.code,
		password: '',
		auto: true,
		error: false
	};

	$scope.setWallError = function(bool) {
		$scope.wall.error = bool;
	};

	$scope.checkPassword = function($event) {

		$scope.setWallError(false);

		var w = $scope.wall;
		Wall.checkPassword(w.wall_code, w.password)
		.success(function(res) {
			var result = Switcher.setStorage(w.wall_code, res.data.password, w.auto);
			if (Boolean(result)) return Url.app(w.wall_code).replace();
			return $scope.setWallError(true);
		})
		.error(function() {
			$scope.setWallError(true);
		});
	};

});