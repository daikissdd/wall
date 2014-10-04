App.factory('Geturl', function($http) {

	var baseUrl = 'http://linkbox.com:5677/geturl/';
	var api = { get: baseUrl + 'index/' };

	return {
		get: function(url) {
			return $http.post(api.get, {url: url});
		}
	};

});





