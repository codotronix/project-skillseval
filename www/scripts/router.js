(function(){
	angular.module("skillseval")
	.config(["$routeProvider", function ($routeProvider) {

		$routeProvider

		.when("/auth", {
			templateUrl: "modules/auth/authTemplate.html",
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


		.when("/library/:libName", {
			templateUrl: "modules/library/libraryTemplate.html",
			controller: "libraryController",
			controllerAs: "vm",
			data: {
				pageID: "LIBRARY"
			}
		})
		.when("/library/:libName/:topic", {
			templateUrl: "modules/topic/topicTemplate.html",
			controller: "topicController",
			controllerAs: "vm",
			data: {
				pageID: "TOPIC"
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
			redirectTo: "/auth"
		})
		.otherwise({
			redirectTo: "/"
		});

	}]);
})();