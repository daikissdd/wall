App.controller('homeCtrl', function($scope, $http, $location, Modal, Wall, Latest, storage, $modal) {

	$scope.isCollapsed = true;

	$scope.toggleCollapse = function($event) {
		$scope.isCollapsed = !$scope.isCollapsed;
	};

	$scope.latestCards = [];

	$scope.open = Modal.forge('modal.html', 'modalCtrl');
	$scope.linkCard = function($event, card) {
		var path = $scope.app.appUrl({wall_code: card.wall_code});
		$location.path(path).replace();
	};

	_.once(function() {
		$scope.closeAllAlert();
		var alertData = storage.get('alert');
		if (_.isNull(alertData)) return $scope.alertSet(false);
		if (!alertData.click) {
			$scope.addAlert($scope.createAlert(
				'success',
				'Wall （ベータ版）は7月30日にオープンしました！ 無料で使えるのでためしてみてください。'
			));
		}

		$scope.latestCards = Latest.get();
	})();


});