(function(){
	angular.module("skillseval").factory("topicService", topicService);
	
	topicService.$inject = ['ajaxService', 'urlService'];

	function topicService (ajaxService, urlService) {
		return {
			getTopics: getTopics,
			getQuickExams: getQuickExams
		}

		function getTopics (libName, topicName) {
			return ajaxService.doGet(urlService.getTopicUrl(libName, topicName));
		}

		function getQuickExams (examCodeExt) {
			return [
                {
                    "subType": "Micro",
                    "examCode": examCodeExt + "-0",
                    "noOfQuestions": 10,
                    "totalTime": "00:15:00"
                },
                {
                    "subType": "Mini",
                    "examCode": examCodeExt + "-1",
                    "noOfQuestions": 30,
                    "totalTime": "00:45:00"
                },
                {
                    "subType": "Standard",
                    "examCode": examCodeExt + "-2",
                    "noOfQuestions": 60,
                    "totalTime": "01:30:00"
                },
                {
                    "subType": "Macro",
                    "examCode": examCodeExt + "-3",
                    "noOfQuestions": 80,
                    "totalTime": "02:00:00"
                },
                {
                    "subType": "Major",
                    "examCode": examCodeExt + "-4",
                    "noOfQuestions": 100,
                    "totalTime": "02:30:00"
                }
            ];
		}
	}
})();