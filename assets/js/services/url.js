App.factory('Url', function($location) {

	var urls = {
		home: _.template('home/'),
		password: _.template('password/<%= wall_code %>'),
		app: _.template('app/<%= wall_code %>'),
		card: _.template('app/<%= wall_code %>/card/<%= card_code %>')
	};
	var currentUrl = '';

	return {
		method: {
			reset: function() {
				var u = currentUrl;
				currentUrl = '';
				return u;
			},
			url: function() {
				return '#/'+this.reset();;
			},
			get: function() {
				return this.reset();
			},
			replace: function() {
				return $location.path(this.reset()).replace();
			}
		},
		home: function() {
			this.set(urls.home());
			return this.method;
		},
		password: function(wall_code) {
			this.set(urls.password({wall_code: wall_code}));
			return this.method;
		},
		app: function(wall_code) {
			var p = urls.app({wall_code: wall_code});
			this.set(p);
			return this.method;
		},
		card: function(wall_code, card_code) {
			this.set(urls.card({wall_code: wall_code, card_code: card_code}));
			return this.method;
		},
		set: function(path) {
			currentUrl = path;
		}
	};

});





