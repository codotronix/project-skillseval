(function(){
	angular.module("skillseval").factory("urlService", urlService);
	
	urlService.$inject = ["$window", "secretService"];

	function urlService ($window, secretService) {
		var hostType = angular._9.hostType;
		var appRoot = angular._9.appRoot;
		var webRoot = angular._9.webRoot;
		var dataRoot = angular._9.dataRoot;

		return {
			getDataRootUrl: getDataRootUrl,
			getLibraryUrl: getLibraryUrl,
			getTopicUrl: getTopicUrl,
			getMightyUrl: getMightyUrl,
			getCardUrl: getCardUrl,
			getExamCodeConfigUrl: getExamCodeConfigUrl
		};

		function getRoot () {
			var root;
			//if app, get appRoot
			if (hostType === "app") {
				root = appRoot;
			}
			//else get webRoot
			else {
				root = webRoot || $window.location.href.substr(0, $window.location.href.indexOf('#'));
			}

			return root;
		}

		function getDataRootUrl () {
			return getRoot() + "/" + dataRoot;
		}

		function getPathToLibrary (libName, libType) {
			var libRoot = angular._9.libRoots[libType];
			var pathToLib = angular._9[libRoot][libName];
			
			//If does not start with raw, then must be encoded
			if (pathToLib.substr(0,4) !== "raw:") {
				pathToLib = secretService.decipher(pathToLib);
			}

			//if still starts with "raw:" then remove it 
			if (pathToLib.substr(0,4) === "raw:") {
				pathToLib = pathToLib.substr(4);
			}
			return pathToLib;
		}

		function getLibraryUrl (libName, libType) {
			var ext = (angular._9.dataRoot === 'devData') ? 'index.json' : 'index.enc.json';
			return getDataRootUrl() + "/" + getPathToLibrary(libName, libType) + "/" + ext;
		}


		//This is only for Exam topics
		function getTopicUrl(libName, topicName) {
			var libType = "exam";
			var ext = (angular._9.dataRoot === 'devData') ? 'index.json' : 'index.enc.json';
			return getDataRootUrl() + "/" + getPathToLibrary(libName, libType) + "/" + topicName + "/" + ext;
		}
		

		//This is only for Exams
		function getMightyUrl (libName, topicName) {
			var libType = "exam";
			var ext = (angular._9.dataRoot === 'devData') ? '.mighty.qa.json' : '.mighty.qa.enc.json';
			return getDataRootUrl() + "/" + getPathToLibrary(libName, libType) + "/" + topicName + "/" + topicName + ext;
		}


		//This is only for Memcards topics
		function getCardUrl(libName, topicName, fileID) {
			var libType = "memcards";
			var fileID = fileID || "0";
			fileID  += (angular._9.dataRoot === 'devData') ? '.json' : '.enc.json';
			return getDataRootUrl() + "/" + getPathToLibrary(libName, libType) + "/" + topicName + "/" + fileID;
		}

		function getExamCodeConfigUrl(examCode) {
			return getRoot() + "/configs/examCode-" + examCode.split('-')[0] + ".json";
		}
	}
})();