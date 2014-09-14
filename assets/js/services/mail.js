App.factory('Mail', function($http) {

	var baseUrl = 'http://linkbox.com:5677/mail/';
	var api = {
		send: baseUrl+'index/'
	};

	return {
		send: function(wall_code, data) {
			return $http.post(api.send+wall_code, data);
		}
	};
});