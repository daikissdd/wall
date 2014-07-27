App.controller('appCtrl', function($scope) {

	$scope.data = {};
	$scope.data.aws = {
		key: 'aaa',
		secret: 'bbb'
	};

	$('#popover').popover({placement: 'top',trigger: 'hover'});

});

App.controller('wallCtrl', function($scope, $routeParams) {
	$scope.wall = {
		title: '',
		password: '',
		passwordConfig: false,
		urls: [],
		code: $routeParams.code,
		url: location.href
	}

	console.log($scope.wall);
});