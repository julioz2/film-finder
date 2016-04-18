(function() {
	var app = angular.module('findFilm', []);

	//http://www.omdbapi.com/?t=fight+club&y=&plot=full&r=json
/*
	app.controller('OmdbController', ['$http', function($http, ){
		var film = this;
		film.details = [];
		$http.get('http://www.omdbapi.com/?t='+filmTitle+'&y=&plot=full&r=json').success(function(data){
				film.details = data;
		});
	}]);

	app.controller('SubmitFilmController', function() {

		var filmTitle;
		this.findFilm = function(filmTitle) {

			return filmTitle === filmTitle;
		};

	});
*/

	app.directive('filmForm', function(){
		return {
			restrict : 'E',
			templateUrl : 'film-form.html'
		};
	});

 	app.controller('SubmitFilmController', ['$http', function($http){

		var film = {};

		this.findFilm = function(film) {
			this.ajaxCall(film);
		};
		this.ajaxCall = function(film) {

			var filmObj = this;
			filmObj.details = [];
			$http.get('http://www.omdbapi.com/?t='+film.title+'&y=&plot=full&r=json').success(function(data){
				filmObj.details = data;
			});
			//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=David+Lynch&rvprop=timestamp|user|comment|content
		} 
	}]);

})();







