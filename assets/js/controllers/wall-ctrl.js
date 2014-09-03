App.controller('wallCtrl', function($scope, $routeParams, Modal, Wall, Card, Latest, storage, $location) {

	if (!$routeParams.code) $location.path('home').replace();

	$scope.wall = Wall.init($routeParams.code);

	Wall.get($scope.wall.wall_code, function(res) {
		_.extend($scope.wall, res.data.wall);
		Latest.push($scope.wall);
		$scope.card = Card.init($scope.wall.id, $routeParams.card);
	});

	$scope.open = Modal.forge('card-modal.html', 'cardCtrl');
	$scope.openCard = function(card) {
		var path = Card.createUrl({
			wall_cade: $routeParams.code,
			card_cade: card.card_code
		});
		$location.path(path).replace();
	};

	$scope.navLinks = {home: '#/'+$scope.app.homeUrl()};

	$scope.wallTitleEditFlag = false;
	$scope.wallTitleEdit = function() {
		return $scope.wallTitleEditFlag = !$scope.wallTitleEditFlag;
	};

	$scope.wallTitleEditSave = function() {
		// save
		Wall.update($scope.wall.wall_code, $scope.wall, function(res) {
			console.log(res);
		});
		return $scope.wallTitleEdit();
	};
	_.once(function() {
		$scope.closeAllAlert();

		if (_.isUndefined($routeParams.card)) return false;
		Card.get($routeParams.card, function(res) {
			_.extend($scope.card, res.data.card);
			$scope.open($scope, 'lg', {
				modalParam: function() {
					return $scope.card;
				}
			});
		});
	})();

	$scope.createCard = function($event) {
		Card.create($scope.card, function(res) {
			$scope.wall.cards.push(res.data.card);
			var path = Card.createUrl({
				wall_cade: $routeParams.code,
				card_cade: res.data.card.card_code
			});
			$location.path(path).replace();
		});
	};

});


/*
var wall = storage.get(code);
	if (!_.isNull(wall)) {
		$scope.wall = wall
	};
*/