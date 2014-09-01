App.controller('homeCtrl', function($scope, $http, $location, Modal, Wall, storage, $modal) {

	$scope.latestCards = [
		'タイトル１',
		'これが私のお気に入りリスト',
		'my project',
		'my cards',
		'1',
		'2'
	];
	$scope.closeAllAlert();
	$scope.addAlert($scope.createAlert(
		'success',
		'Wall （ベータ版）は7月30日にオープンしました！ 無料で使えるのでためしてみてください。'
	));

	$scope.open = Modal.forge('modal.html', 'modalCtrl');

});