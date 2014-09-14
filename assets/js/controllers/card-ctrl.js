App.controller('cardCtrl', [
	'$scope',
	'$modalInstance',
	'$routeParams',
	'$location',
	'modalParam',
	'Card',
	'Mail',
	function($scope, $modalInstance, $routeParams, $location, modalParam, Card, Mail) {

	$scope.card = modalParam;
	$scope.mail = {};

	var replaceCardList = function() {
		$location.path('app/'+$routeParams.code).replace();
	};
  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
    	replaceCardList();
	};

	$modalInstance.result.then(replaceCardList, replaceCardList);

	$scope.editFlags = {
		title: false,
		url: false,
		description: false
	};

	var update = function(flag, card) {
		if (!flag) return false;
		Card.update(card, function(res) {
			console.log(res);
		});
	};

	$scope.toggleTitle = function() {
		update($scope.editFlags.title, $scope.card);
		$scope.editFlags.title = !$scope.editFlags.title;
	};

	$scope.toggleUrl = function() {
		update($scope.editFlags.url, $scope.card);
		$scope.editFlags.url = !$scope.editFlags.url;
	};

	$scope.toggleDescription = function() {
		update($scope.editFlags.description, $scope.card);
		$scope.editFlags.description = !$scope.editFlags.description;
	};

	$scope.edited = false;
	$scope.blur = function(bool) {
		$scope.edited = bool;
	};

	$scope.sendMail = function($event) {
		var data = {to: $scope.mail.to, body: $scope.mail.body};
		Mail.send($routeParams.code, data)
		.success(function(res) {
			$scope.mail = {};
			$scope.blur(false);
			console.log(res);
		})
		.error(function(status, res) {
			console.log(res);
		});
	};

	$scope.cardDelete = function($event) {
		Card.delete($scope.card.id, function(res) {
			$scope.cancel();
		});
	};

}]);