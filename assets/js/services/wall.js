App.factory('Wall', function($http) {

	var baseUrl = 'http://linkbox.com:5677/wall/';
	var api = {
		create: baseUrl+'index/',
		get: baseUrl+'index/',
		checkPassword: baseUrl+'check_password/',
	};

	var wall = {
		id: 0,
		title: '',
		description: '',
		use_password_flag: 0,
		use_password_device_flag: false,
		cards: [],
		wall_code: '',
		api_code: '',
		created_at: '0000-00-00 00:00:00',
		updated_at: '0000-00-00 00:00:00',
	};

	return {
		create: function(data) {
			return $http.post(api.create, data);
		},
		get: function(code, callback) {
			return $http.get(api.get+code)
			.success(function(res) {
				callback(res);
			})
			.error(function(status, res) {
				console.log(res);
			});
		},
		checkPassword: function(id, password) {
			return $http.post(api.checkPassword, {id: id, password: password});
		},
		init: function(code) {
			wall.wall_code = code;
			return wall;
		}
	};
});