(function(){
	angular.module("skillseval")
	.config(["$routeProvider", "$locationProvider", 
		function ($routeProvider, $locationProvider) {

		// use the HTML5 History API
		// Causing Error if hit domain.com/home on 1st load
		// because there is not home until angular and router 
		// and everything loads up
        //$locationProvider.html5Mode(true);


		$routeProvider

		.when("/auth", {
			templateUrl: "modules/auth/authTemplate.html",
			controller: "authController",
			controllerAs: "vm",
			data: {
				pageID: "AUTH"
			}
		})

		.when("/home", {
			templateUrl: "modules/home/homeTemplate.html",
			controller: "homeController",
			controllerAs: "vm",
			data: {
				pageID: "HOME"
			}
		})

		.when("/settings", {
			templateUrl: "modules/settings/settingsTemplate.html",
			controller: "settingsController",
			controllerAs: "vm",
			data: {
				pageID: "SETTINGS"
			}
		})


		.when("/library", {
			redirectTo: "/home"
		})
		
		.when("/library/exam/:libName", {
			templateUrl: "modules/library/libraryTemplate.html",
			controller: "libraryController",
			controllerAs: "vm",
			data: {
				pageID: "EXAMLIBRARY"
			}
		})

		.when("/library/exam/:libName/:topic", {
			templateUrl: "modules/topic/topicTemplate.html",
			controller: "topicController",
			controllerAs: "vm",
			data: {
				pageID: "TOPIC"
			}
		})

		.when("/library/memcards/:libName", {
			templateUrl: "modules/library/libraryTemplate.html",
			controller: "libraryController",
			controllerAs: "vm",
			data: {
				pageID: "MEMCARDSLIBRARY"
			}
		})


		.when("/library/memcards/:libName/:memcard", {
			templateUrl: "modules/memcards/memcardTemplate.html",
			controller: "memcardController",
			controllerAs: "vm",
			data: {
				pageID: "MEMCARD"
			}
		})

		
		.when("/examenv", {
			templateUrl: "modules/exam/examTemplate.html",
			controller: "examController",
			controllerAs: "vm",
			data: {
				pageID: "EXAMENV"
			}
		})
		.when("/examresult", {
			templateUrl: "modules/exam/examResultTemplate.html",
			controller: "examResultController",
			controllerAs: "vm",
			data: {
				pageID: "EXAMRESULT"
			}
		})

		.when("/exam/certificate", {
			templateUrl: "modules/exam/certificateTemplate.html",
			controller: "certController",
			controllerAs: "vm",
			data: {
				pageID: "CERTIFICATE"
			}
		})

		.when("/exam/viewcertificate", {
			templateUrl: "modules/exam/viewCertificateTemplate.html",
			controller: "viewCertController",
			controllerAs: "vm",
			data: {
				pageID: "VIEWCERTIFICATE"
			}
		})

		.when("/", {
			redirectTo: "/home"
		})
		.otherwise({
			redirectTo: "/"
		});

	}]);
})();