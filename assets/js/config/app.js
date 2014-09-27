App.define = (function(define) {
	return {
		set: function(name, value) { return define[name] = value; },
		get: function(name) { return define[name]; }
	};
})({});

App.define.set('app', {
	v: '0.0.1',
	author: 'daiki shirakawa',
	discription: 'this app is link list web app.'
});

App.define.set('api', {
	v: '0.0.1',
	author: 'daiki shirakawa',
	discription: 'this app is link list web app.'
});