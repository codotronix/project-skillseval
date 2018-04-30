(function(){
    angular.module("skillseval").controller("certController", certController);
    
    certController.$inject = ["secretService", "examService", "$location", 'modalService', "$rootScope"];

    function certController (secretService, examService, $location, modalService, $rootScope) {
        var vm = this;
        vm.certCode = undefined;
        vm.showInfoTooltip = false;
        vm.adjustDisplayForCert = adjustDisplayForCert;
        vm.backToOriginalSize = backToOriginalSize;

        var certCodeArguments = [
            "nameOfUser",
            "examName",
            "examDate",
            "totalQ",
            "skipped",
            "correct",
            "totalTime",
            "timeTaken"
        ];
        
        init();

        function init () {
            modalService.showLoader();
            decodeCertificate();            
        }

        function decodeCertificate () {
            if (!$rootScope.tempCertCode) {
                $location.path("/exam/viewcertificate");
                modalService.hideLoader();
                return;
            }

            vm.certCode = $rootScope.tempCertCode;
            $rootScope.tempCertCode = null; //Once used up, empty the $rootScope.tempCertCode
            var args = secretService.decipher(vm.certCode).split('|');

            for ( var i = 0; i < certCodeArguments.length; i++ ) {                
                vm[certCodeArguments[i]] = args[i];
            }

            examService.getExamNameFromExamCode(vm.examName)
            .then(function(ExCodes){
                vm.examName = ExCodes[vm.examName];

                //set proper height to the decorative side columns
                //$('.decorative-col').height($('body').height());

                adjustDisplayForCert();

                //Finally hide the modal
                modalService.hideLoader();
            }, 
            function(err){
                console.log(err);
            });
        }


        /*
        * This function will ensure that the certificate will 
        * always display properly
        * If the browser is in Portrait mode, then it will apply a
        * transform rotate 90 degree to show the certificate 
        * in landscape way
        *
        */
        function adjustDisplayForCert () {
            var realWidth = 1440;
            var realHeight = 900;

            var winWidth = $(window).width();
            var winHeight = $(window).height();

            //i.e. If already in Landscape
            //if(winWidth > winHeight) {
                $('#certificate-body').css({
                    "transform": "scale(" + (winWidth / realWidth) + ", " + (winHeight / realHeight) + ")"
                });
            //}
            // //if in portrait, make certificate landscape
            // else {
            //     $('#certificate-body').css({
            //         "transform": "scale(" + (winWidth / realHeight) + ", " + (winHeight / realWidth) + ") rotate(-90deg)"
            //     });
            // }

            window.scrollTo(0, 0);
        }

        /*
        * Show certificate in full height and width, i.e. 1440x900
        */
        function backToOriginalSize () {
            $('#certificate-body').css({
                "transform": "scale(1,1)"
            });

            window.scrollTo(550, 120);
        }
    }
})();