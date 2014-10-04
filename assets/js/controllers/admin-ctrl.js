App.controller('adminCtrl', function($scope, Geturl, Product) {

	$scope.product = {url: '', title: '', description: ''};

	$scope.getProduct = function() {
		var url = $scope.product.url;
		Geturl.get(url)
		.success(function(res) {
			// TODO
			res.data.url = url;
			$scope.product = res.data;
		})
		.error(function() {
			alert('can not get product data')
		});
	};

	$scope.createProduct = function() {
		Product.create($scope.product)
		.success(function(res) {
			console.log(res);
		})
		.error(function() {
			alert('can not get product data')
		});
	};

});