(function(){
    angular.module("skillseval").controller("examController", examController);
    
    examController.$inject = ["examService", "$location", 'modalService', '$timeout'];

    function examController (examService, $location, modalService, $timeout) {
        var vm = this;
        vm.abortExam = abortExam;
        vm.startExam = startExam;
        vm.rulesDialogHidden = false;
        vm.submitExam = submitExam;
        vm.questions = undefined;
        vm.optionIndices = examService.getOptionIndices();
        vm.displayTime = "00:00:00";
        vm.last5minLeft = false;
        var currentTime;
        var totalTime;
        
        init();

        function init () {
            modalService.showLoader();
            //examService.startExam();
            examService.getQuestions().then(loadQuestions, errorOccurred);
        }

        function loadQuestions (questions) {
            vm.questions = questions;
            //console.log(vm.questions);
            modalService.hideLoader();
        }
            
        function errorOccurred (err) {
            console.log(err);
            alert("Some error occurred... See logs");
        }

        function startExam () {
            totalTime = convertToSec(examService.getCurrentExam().totalTime);
            currentTime = totalTime;
            examService.startExam();
            vm.rulesDialogHidden = true;
            _countDown();
        }

        function abortExam () {
            examService.abortExam();
            $location.path('/');
        }

        /*
        * To show seconds accurately, we will keep checking each half second
        */
        var tempLastTime = 0;
        function _countDown () {
            var now = (new Date()).getTime();
            if((now - tempLastTime) >= 1000) {
                vm.displayTime = _formatDisplayTime(--currentTime);
                tempLastTime = now;

                if(currentTime < 300) {
                    vm.last5minLeft = true;
                }             
            }

            if(examService.getCurrentExam().running && currentTime > 0) {
                $timeout(_countDown, 500);
            }
            else if (currentTime <= 0) {
                submitExam();
            }          
        }


        /*
        * Seconds to hh:mm:ss converter
        */
        function _formatDisplayTime (sec) {
            var h = Math.floor(sec / 3600).toString();
            var residual = sec % 3600;
            var m = Math.floor(residual / 60).toString();
            var s = (residual % 60).toString();

            h = (h.length < 2) ? "0" + h: h;
            m = (m.length < 2) ? "0" + m: m;
            s = (s.length < 2) ? "0" + s: s;

            return (h + ":" + m + ":" + s);
        }


        /*
        * Turn hh:mm:ss to seconds
        */
        function convertToSec (t) {
            var temp = t.split(":");
            return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60 + parseInt(temp[2]);
        }

        function submitExam () {
            examService.getCurrentExam().running = false;
            examService.getCurrentExam().timeTaken = _formatDisplayTime(totalTime - currentTime);
            //examService.getCurrentExam().
            modalService.showLoader();
            //console.log(vm.questions);
            var result = examService.getResult(vm.questions);
            //console.log(result);

            //alert(JSON.stringify(result));

            $location.path('/examresult');
        }
    }
})();