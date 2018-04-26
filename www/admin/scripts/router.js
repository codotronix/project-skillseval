(function(){
	angular.module("skillseval")
	.config(["$routeProvider", function ($routeProvider) {

		$routeProvider

		.when("/home", {
			templateUrl: "admin/modules/home/homeTemplate.html",
			controller: "homeController",
			controllerAs: "vm",
			data: {
				pageID: "HOME"
			}
		})

		.when("/key", {
			templateUrl: "admin/modules/key/keyTemplate.html",
			controller: "keyController",
			controllerAs: "vm",
			data: {
				pageID: "KEY"
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