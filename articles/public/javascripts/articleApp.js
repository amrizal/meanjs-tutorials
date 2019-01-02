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

app.factory('articleService', function($http){
	var factory = {};
	factory.getArticles = function(){
		return $http.get ('/api/articles');
	}
	return factory;
});

app.controller('mainController', function($scope, $http, articleService){
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
	
	articleService.getArticles().then(function(response){
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
	