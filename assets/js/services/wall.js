App.factory('Wall', function($http) {

	var baseUrl = 'http://linkbox.com:5677/wall/';
	var api = {
		create: baseUrl+'index/',
		get: baseUrl+'index/',
		privateGet: baseUrl+'private_get/',
		checkPassword: baseUrl+'check_password/',
		update: baseUrl+'index/'
	};

	var wall = {
		id: 0,
		title: '',
		description: '',
		password: '',
		use_password_flag: 0,
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
			return $http.post(api.get+code)
			.success(function(res) {
				callback(res);
			})
			.error(function(status, res) {
				console.log(res);
			});
		},
		privateGet: function(code, password, callback) {
			return $http.post(api.privateGet+code, {password: password})
			.success(callback).error(function(status, res) { console.log(res); });
		},
		checkPassword: function(code, password) {
			return $http.post(api.checkPassword+code, {password: password});
		},
		update: function(code, data, callback) {
			return $http.put(api.update+code, {title: data.title}, callback)
			.success(function(res) {
				callback(res);
			})
			.error(function(status, res) {
				console.log(res);
			});
		},
		init: function(code) {
			wall.wall_code = code;
			return wall;
		}
	};
});