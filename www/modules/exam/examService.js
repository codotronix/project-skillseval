(function(){
    angular.module("skillseval").factory("examService", examService);
    
    examService.$inject = ["$q", "ajaxService", "urlService", "secretService"];

    function examService ($q, ajaxService, urlService, secretService) {

        var currentExam = {
            running: false,
            subType: undefined,
            libName: undefined,
            topic: undefined,
            examID: undefined,
            examName: undefined,
            totalTime: undefined,
            noOfQuestions: undefined,
            timeTaken: undefined,
            result: undefined
        };


        var optionIndices = 'ABCDEFGHIJKLMNOP';

        return {
            getCurrentExam: getCurrentExam,
            setCurrentExam: setCurrentExam,
            getQuestions: getQuestions,
            startExam: startExam,
            abortExam: abortExam,
            getResult: getResult,
            getOptionIndices: getOptionIndices,
            getExamNameFromExamCode: getExamNameFromExamCode
        }

        function getCurrentExam () {
            return currentExam;
        }

        function startExam () {
            currentExam.running = true;
            //_deductTime();
        }

        // function _deductTime () {

        // }

        function setCurrentExam (cf) {
            for (var i in cf) {
                currentExam[i] = cf[i];
            }
        }

        function abortExam () {
            currentExam = {}; 
                       
        }

        function getOptionIndices () {
            return optionIndices;
        }

        function getQuestions () {
            var deferred = $q.defer();

            ajaxService.doGet(urlService.getMightyUrl(currentExam.libName, currentExam.topic))
            .then(function(res){
                var qstns;
                if (currentExam.type === "QE") {
                    qstns = selectRandomQs(res.data, currentExam.noOfQuestions);
                }
                else {
                    qstns = res.data;
                }

                deferred.resolve(qstns);
            },

            function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function selectRandomQs(allQ, noOfQ) {
            var allPossibleIndex = [];
            var resultQ = [];

            var tempIndex;
            while (resultQ.length < noOfQ && allQ.length > 0) {
                tempIndex = Math.floor(Math.random() * allQ.length);
                resultQ.push(allQ[tempIndex]);
                allQ.splice(tempIndex, 1);
            }

            return resultQ;
        }


        /*
        * Get result is called when user clicks on submit button
        */
        function getResult (qs) {
            currentExam.running = false;

            var correct = 0, 
            //incorrect = 0, 
            notAnswered = 0, 
            totalQ = 0, 
            incorrectQs = [];

            for(var i in qs) {
                ++totalQ;

                //If SingleAnsMCQ
                if (qs[i].type === 'A') {
                    if (qs[i].chosenAns === 'Z') {
                        ++notAnswered;
                    }
                    else {
                        var correctAns = (qs[i].ans || secretService.getAnswer(qs[i].key));
                        if(qs[i].chosenAns === correctAns) {
                            ++correct;
                        }
                        else {
                            //++incorrect;
                            qs[i].incorrectAns = [];
                            qs[i].correctAns = [];
                            qs[i].incorrectAns.push(qs[i].chosenAns + '. ' + qs[i].options[optionIndices.indexOf(qs[i].chosenAns)]);
                            qs[i].correctAns.push(correctAns + '. ' + qs[i].options[optionIndices.indexOf(correctAns)]);
                            incorrectQs.push(qs[i]);
                        }
                    }
                }

                //If MultiAnsMCQ
                else if (qs[i].type === 'B') {
                    var unattended = true;
                    var ansArray = [];
                    /*
                    * see if it is unattended, i.e. All Checkbox False
                    * in MultiAnsMCQ qs[i].chosenAns is a JSON with
                    * options marked either true or false
                    * like, if correct options are [A, C]
                        {
                            A: true,
                            C: true
                        }
                    */
                    for(var option in qs[i].chosenAns) {
                        if(qs[i].chosenAns[option]) {
                            unattended = false;
                            ansArray.push(option);
                        }
                    }

                    //if unattended then Not Answered
                    if(unattended) {
                        ++notAnswered;
                    }
                    else {

                        var correctAnsArray = qs[i].ans || secretService.getAnswer(qs[i].key);
                        //if correct
                        if(JSON.stringify(ansArray) === JSON.stringify(correctAnsArray)) {
                            ++correct;
                        }
                        //else incorrect
                        else {
                            qs[i].incorrectAns = [];
                            qs[i].correctAns = [];
                            ansArray.map(function(option) {
                                qs[i].incorrectAns.push(option + '. ' + qs[i].options[optionIndices.indexOf(option)]);
                            });

                            correctAnsArray.map(function(option) {
                                qs[i].correctAns.push(option + '. ' + qs[i].options[optionIndices.indexOf(option)]);
                            });

                            incorrectQs.push(qs[i]);
                        }

                    }
                }

                //If type flag is not set from html, that means something is FISHY
                else {
                    console.log("Cannot decide type for " + JSON.stringify(qs[i]));
                }
            }

            currentExam.result = {
                correct: correct,
                //incorrect: incorrect,
                skipped: notAnswered,
                totalQ: totalQ,
                incorrectQs: incorrectQs
            };

            return currentExam.result;
        }

        /*
        * This function will receive an ExamNameCode
        * will lookup that examCode in appropriate lookup file
        * and will return the full name of the exam
        */
        function getExamNameFromExamCode (ExamNameCode) {
            var deferred = $q.defer();
            ajaxService.doGet(urlService.getExamCodeConfigUrl(ExamNameCode))
            .then(function(res){
                deferred.resolve(res.data);
            }, 
            function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


    }
})();