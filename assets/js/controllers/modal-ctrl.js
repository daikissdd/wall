App.controller('modalCtrl', function($scope, $modalInstance, $http, $location, Wall, storage, $modal, $log) {

	$scope.wall = {};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};

	$scope.create = function ($event) {
		// closeに渡したものはthenに渡せる
    	$modalInstance.close();

		Wall.create($scope.wall)
		.success(function(res) {
			$location.path('app/'+res.data.wall.wall_code).replace();
		})
		.error(function(res, status) {
			alert('error');
		});
	};
});