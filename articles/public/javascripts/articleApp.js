var app = angular.module('articleApp', ['ngRoute', 'ngResource']);

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

app.factory('articleService', function($resource){
	return $resource('/api/articles');
});

app.controller('mainController', function($scope, $http, articleService){
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
	
	$scope.articles = articleService.query();
	
	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();
		
		articleService.save($scope.newArticle, function(){
			$scope.articles.push($scope.newArticle);
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		});
	}
});
	