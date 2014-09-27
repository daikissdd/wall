App.factory('Switcher', function(storage) {

	return {
		usePassword: function(wall_code) {
			var result = Number(wall_code.charAt(0));
			return (result === 1) ? true: false;
		},
		checkStorage: function(wall_code) {
			var p = storage.get(wall_code);
			if (_.isNull(p)) return p;
			if (p.expire < new Date().getTime()) {
				storage.remove(wall_code);
				return null;
			}
			return p.password;
		},
		setStorage: function(wall_code, password, auto) {
			var time = new Date().getTime() + (60 * 60);
			if (auto) time = time + (60 * 60 * 24 * 365);
			return storage.set(wall_code, {
				password: password,
				expire: time,
			});
		}
	};
});