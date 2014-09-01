App.factory('Modal', function($modal) {

	return {
		forge: function(tmplUrl, ctrl) {

			var modalOps = {};
			modalOps.templateUrl = tmplUrl;
			modalOps.controller = ctrl;

			return function($scope, size, resolve) {
				modalOps.$scope = $scope;
				if (!_.isUndefined(size)) modalOps.size = size;
				if (!_.isUndefined(resolve)) modalOps.resolve = resolve;
				var modalInstance = $modal.open(modalOps);
			}
		},
		modal: function() {
			return $modal;
		}
	};
});