App.controller('appCtrl', function($scope, $http, $location, Wall, storage, $modal, $log) {

	$scope.wall = {};
	$scope.card = {};
	$scope.latestCards = [];
	$scope.alerts = [];

	$scope.alertSet = function(click) {
    	storage.set('alert', {click: click, date: new Date().getTime()});
	};

	$scope.createAlert = function(type, msg) {
		return {type: type, msg: msg};
	};

	$scope.addAlert = function(alertObj) {
    	$scope.alerts.push(alertObj);
	};

	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
    	$scope.alertSet(true);
	};

	$scope.closeAllAlert = function() {
    	$scope.alerts = [];
	};

});