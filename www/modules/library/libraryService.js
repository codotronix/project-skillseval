(function(){
	angular.module("skillseval").factory("libraryService", libraryService);
	
	libraryService.$inject = ['ajaxService', 'urlService'];

	function libraryService (ajaxService, urlService) {
		return {
			getLibrary: getLibrary
		}

		function getLibrary (libName, libType) {
			return ajaxService.doGet(urlService.getLibraryUrl(libName, libType));
		}
	}
})();