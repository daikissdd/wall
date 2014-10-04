App.factory('Product', function($http) {

	var baseUrl = 'http://linkbox.com:5677/product/';
	var api = { create: baseUrl + 'index/' };

	return {
		create: function(data) {
			return $http.post(api.create, data);
		}
	};

});





