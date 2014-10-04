App.controller('wallCtrl', [
	'$scope',
	'$routeParams',
	'Modal',
	'Wall',
	'Card',
	'Latest',
	'Switcher',
	'Url',
	function($scope, $routeParams, Modal, Wall, Card, Latest, Switcher, Url) {

	if (!$routeParams.code) Url.home().replace();

	$scope.wall = Wall.init($routeParams.code);

	var wallGetHandler = function(res) {
		_.extend($scope.wall, res.data.wall);
		Latest.push($scope.wall);
		$scope.card = Card.init($scope.wall.id, $routeParams.card);
	};

	// password use switcher
	if (Switcher.usePassword($scope.wall.wall_code)) {
		var password = Switcher.checkStorage($scope.wall.wall_code);
		if (_.isNull(password)) return Url.password($scope.wall.wall_code).replace();
		Wall.privateGet($scope.wall.wall_code, password, wallGetHandler);
	} else {
		// get wall data
		Wall.get($scope.wall.wall_code, wallGetHandler);
	}

	$scope.open = Modal.forge('card-modal.html', 'cardCtrl');
	$scope.openCard = function(card) {
		Url.card($routeParams.code, card.card_code).replace();
	};

	_.once(function() {
		$scope.closeAllAlert();

		if (_.isUndefined($routeParams.card)) return false;
		Card.get($routeParams.card, function(res) {
			_.extend($scope.card, res.data.card);
			$scope.open($scope, 'lg', {modalParam: function() {
				return $scope.card;
			}});
		});

	})();

	$scope.navLinks = {home: Url.home().url()};

	$scope.wallTitleEditFlag = false;
	$scope.wallTitleEdit = function() {
		return $scope.wallTitleEditFlag = !$scope.wallTitleEditFlag;
	};

	$scope.wallTitleEditSave = function() {
		$scope.myPromise = Wall.update($scope.wall.wall_code, $scope.wall, function(res) {
			console.log(res);
		});
		Latest.push($scope.wall);
		return $scope.wallTitleEdit();
	};

	$scope.createCard = function($event) {
		Card.create($scope.card, function(res) {
			$scope.wall.cards.push(res.data.card);
			Url.card($routeParams.code, res.data.card.card_code).replace();
		});
	};

}]);