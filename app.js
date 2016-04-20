(function() {
	var app = angular.module('findFilm', []);

	// AIzaSyDDRFC6h1sm7wS3tOxUQNXOA82xnU5auh4

	app.directive('filmForm', function(){
		return {
			restrict : 'E',
			templateUrl : 'film-form.html'
		};
	});

	app.controller('SubmitFilmController', ['$http', 'filmGlobal', function($http, filmGlobal){

		var film = {};
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
				filmGlobal.show = filmObj.details.show;
			});
		} 
		
	}]);

	app.factory('filmGlobal', function ($rootScope) {    	

		var filmG = {
			title : '',
			show : false
		};

		return filmG;
	});

	app.controller('NetflixController', ['$http', 'filmGlobal', function($http, filmGlobal){

		var netflix = {};
		//var titleG = filmGlobal.title;

		this.show = true;

		this.netflixCheck = function(){

			this.show = true;

			var titleG = filmGlobal.title;
			//console.log(Scopes.get('SubmitFilmController', filmObj));

			//var filmTitle = angular.element(document.getElementById("filmTitle").innerHTML);
			var netflixObj = this;
			netflixObj.details = [];

			$http.get('http://netflixroulette.net/api/api.php?title='+titleG)
			.success(function(data){
				netflixObj.details = data;
				netflixObj.details.show = true;
			});
		};
	}]);

	app.controller('CinemaController', ['$http', 'filmGlobal', function($http, filmGlobal){

		var cinema = {};
		//var titleG = filmGlobal.title;

		this.cinemaCheck = function(){

			var titleG = filmGlobal.title;

			//console.log(Scopes.get('SubmitFilmController', filmObj));

			//var filmTitle = angular.element(document.getElementById("filmTitle").innerHTML);
			var cinemaObj = this;
			cinemaObj.details = [];

			$http.get('http://www.cinetecadibologna.it/api/GetSchedule')
			.success(function(data){
				cinemaObj.details = data;
			});
		};
	}]);

	app.directive('youtubeTrailer', function(){
		return {
			restrict : 'E',
			templateUrl : 'trailer.html'
		};
	});

	app.controller('YoutubeTrailer', ['filmGlobal', function(filmGlobal){


		this.videoStart = function(){

			var query = filmGlobal.title + ' trailer';

			var video = gapi.client.youtube.search.list({
				part: "snippet",
				type: "video",
				q: query,
				maxResults: 1
			});

			video.execute(function(response) {

				console.log(response);

				this.id = response.items[0].id.videoId;

				this.iframe = '<iframe class="video w100" width="100%" height="360" src="//www.youtube.com/embed/'+this.id+'" frameborder="0" allowfullscreen></iframe>';

				$('.trailer').append(this.iframe);

/*
				$.each(results.items, function(index, item) {
					$.get("tpl/item.html", function(data) {
						$("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
					});
				});

				console.warn(response);*/
			});
		}
	}]);

})();







