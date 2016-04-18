(function() {
	var app = angular.module('findFilm', []);

	app.directive('filmForm', function(){
		return {
			restrict : 'E',
			templateUrl : 'film-form.html'
		};
	});

 	app.controller('SubmitFilmController', ['$http', 'filmGlobal', function($http, filmGlobal){

		var film = {};

		/*filmGlobal.store(function(data) { 
			alert(2);
			console.log(data);
		});*/

		var titleG = filmGlobal.title;

		this.findFilm = function(film) {
			this.ajaxCall(film);
		};
		this.ajaxCall = function(film, Scopes) {

			var filmObj = this;
			filmObj.details = [];

			$http.get('http://www.omdbapi.com/?t='+film.title+'&y=&plot=full&r=json').success(function(data){
				filmObj.details = data;
				filmObj.details.show = true;

				filmGlobal.title = film.title;

				console.warn(filmGlobal.title)
			});
			//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=David+Lynch&rvprop=timestamp|user|comment|content
		} 
		
	}]);

	app.factory('filmGlobal', function ($rootScope) {    	

		var filmG = {};
		  
		filmG.title = 'Rambo';

		return filmG;
	});

	app.controller('NetflixController', ['$http', 'filmGlobal', function($http, filmGlobal){

		var netflix = {};
		//var titleG = filmGlobal.title;

		this.netflixCheck = function(titleG){

			var titleG = filmGlobal.title;

			//console.log(Scopes.get('SubmitFilmController', filmObj));

			//var filmTitle = angular.element(document.getElementById("filmTitle").innerHTML);
			var netflixObj = this;
			netflixObj.details = [];

			$http.get('http://netflixroulette.net/api/api.php?title='+titleG)
				.success(function(data){
					netflixObj.details = data;
				});
		};
	}]);


/*
	app.directive('netflixCheck', function(){
		return {
			restrict : 'E',
			templateUrl : 'netflix-check.html'
		};
	});

	app.controller('CheckOnNetflix', ['$http', function($http){

		var netflix = {};

		this.ajaxCall = function(film) {

			var netflixObj = this;
			netflixObj.details = [];
			$http.get('http://netflixroulette.net/api/api.php?title='+film.title).success(function(data){
				netflixObj.details = data;
				console.log(data);
			});
			// http://netflixroulette.net/api/api.php?title=memento&country=it
			// https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=David+Lynch&rvprop=timestamp|user|comment|content
		} 
	}]);
*/
})();







