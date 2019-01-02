var app = angular.module('articleApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		.when('/about', {
			templateUrl: 'about.html',
		})
});

app.controller('mainController', function($scope, $http){
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
	
	$http.get('/api/articles').then(function(response){
		$scope.articles = response.data;
	});
	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();
		$http.post('/api/articles', $scope.newArticle).then(function(response){
			$scope.articles.push(response.data);
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		});
	}
});
	