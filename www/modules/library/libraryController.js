(function(){
	angular.module("skillseval").controller("libraryController", libraryController);
	
	libraryController.$inject = ['$rootScope', 'libraryService', 'urlService', '$routeParams', '$location', 'modalService']

	function libraryController ($rootScope, libraryService, urlService, $routeParams, $location, modalService) {
		
		//A library can be an "exam" library or "memcards" library
		var libType = undefined;

		var vm = this;
		vm.library = undefined;
		vm.libName = undefined;
		vm.goTo = goTo;

		init();

		function init () {
			modalService.showLoader();
			identifyLibraryType();
			getLibrary();
		}

		/*
		* This function will identify the library type,
		* i.e. whether it is an "exam" or "memcards"
		* from libType
		* If not found in possible libTypes, redirect back to /library
		*/
		function identifyLibraryType () {
			//$location.$$path usually gives
			// "/library/exam/:libname"
			// "/library/memcards/:libname"
			libType = $location.$$path.split('/')[2];

			//console.log("libType = " + libType);
		}

		function getLibrary () {
			$routeParams.libName = decodeURIComponent($routeParams.libName).toLowerCase();
			libraryService.getLibrary($routeParams.libName, libType)
			 .then(loadLibrary, commonErrorHandler);
		}

		/*
		* Clear / reset required variables
		* and send back to Library Index page
		*/
		function resetToLibraryIndexPage () {
			console.log("Sending back to Library Index Page...");
			$location.path("/library");
		}
		

		/*
		* Success-callback for getLibrary to load the examlibrary in vm
		*/
		function loadLibrary (res) {
			//console.log(res.data);
			var library = res.data;
			vm.libName = $routeParams.libName.toUpperCase();

			//populate attributes from group attribues
			// like, subjectType from groupSubjectType etc
			for(var i=0; i < library.list.length; i++) {
				library.list[i].subjectType = library.list[i].subjectType || library.groupSubjectType;

				if(library.list[i].subjectType === 'topic') {
					library.list[i].libName = library.groupLibName;
				}
			}
			
			vm.library = library;

			modalService.hideLoader();
		}

		//A common error handler for now
		function commonErrorHandler (err) {
			console.log(err);			
			resetToLibraryIndexPage();
		}

		//Navigate to Next Page
		function goTo (item) {
			if(item.notImplemented) { return; }
			 
			var url = '/library/' + libType + '/';


			if (item.subjectType === 'library') {
				url += item.name.toLowerCase();
			}
			else if (item.subjectType === 'topic') {
				//url += (item.libName.toLowerCase() !== 'index' ? item.libName.toLowerCase() + '/' : '' ) + (item.path || item.name.toLowerCase());
				url += item.libName.toLowerCase() + '/' + (item.path || item.name.toLowerCase());
				$rootScope.topicName = item.name;
			}
			else {
				url += 'index';
			}

			$location.path(url);
		}
	}
})();