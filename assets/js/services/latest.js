App.factory('Latest', function(storage) {

	var key = 'latest';

	return {
		check: function() {
			var cards = storage.get(key);
			if (_.isNull(cards)) cards = [];
			storage.set(key, cards);
			return cards;
		},
		get: function() {
			this.check();
			return storage.get(key);
		},
		push: function(data) {
			this.check();
			if (_.isUndefined(data)) return this.get();
			var cards = this.get();

			var sortedCards = _.reject(cards, function(card) {
				return card.wall_code === data.wall_code;
			});

			sortedCards.unshift({
				title: data.title,
				wall_code: data.wall_code
			});

			if (Number(sortedCards.length) > 12) sortedCards.pop();

			storage.set(key, sortedCards);
			return this.get();
		}
	};
});