App.factory('Card', function($http) {

	var baseUrl = 'http://linkbox.com:5677/card/';
	var api = {
		create: baseUrl+'index/',
		update: baseUrl+'index/',
		get: baseUrl+'index/'
	};

	var redirectUrl = _.template('app/<%= wall_cade %>/card/<%= card_cade %>');

	return {
		create: function(data, callback) {
			console.log(data);
			return $http.post(api.create, data)
			.success(function(res) {
				callback(res);
			})
			.error(function(status, res) {
				alert('error');
			});
		},
		get: function(cade, callback) {
			return $http.get(api.get+cade)
			.success(function(res) {
				callback(res);
			})
			.error(function(status, res) {});
		},
		init: function(wall_id, card_code) {
			return {
				wall_id: wall_id,
				title: 'no title',
				description: 'no description',
				url: '',
				card_code: card_code
			};
		},
		update: function(data, callback) {
			return $http.put(api.update+data.id, data)
			.success(function(res) {
				callback(res);
			})
			.error(function(status, res) {});
		},
		createUrl: function(props) {
			return redirectUrl(props);
		}
	};
});





