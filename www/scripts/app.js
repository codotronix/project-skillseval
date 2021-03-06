(function(){
    angular.module("skillseval", ['ngRoute', 'ngStorage'])

    .run(["$rootScope", "examService", function ($rootScope, examService) {

        // $rootScope.$on('$routeChangeStart',function (event, next, current){
        //     if(next.originalPath.indexOf('route1')!==-1){
        //         console.log("routeChangeStart detected");
        //         event.preventDefault();
        //     }
        // });

        $rootScope.typeof = function (obj) {
            return typeof(obj);
        };

        $rootScope.isArray = function (obj) {
            return Array.isArray(obj);
        }

        if(angular._9.hostType === 'app') {
            $rootScope.isMobileApp = true;
        }

        /*
        * When a route change is starting
        */
        $rootScope.$on("$locationChangeStart", function(event, nextUrl, currentUrl) {
            //if(nextUrl.indexOf('route1')!==-1){
                //console.log('locationChangeStart detected');
                //console.log(currentUrl);
                //event.preventDefault();
            //}

            //User should not be able to use back button in exam page
            if (currentUrl.indexOf("/examenv") > -1 && examService.getCurrentExam().running) {
                event.preventDefault();
                console.log("Can't use browser navigation from Exam Environment...");
            }
        });

        /*
        * When a route change is successful
        */
        $rootScope.$on("$routeChangeSuccess", function(event, nextUrl, currentUrl) {
            //console.log(event);
            $rootScope.pageID = nextUrl.$$route.data.pageID;
        });


        $(window).on('resize', function (ev) {
            $rootScope.$emit('WINDOW_RESIZED', ev);
        })

        //var prevPageY = 0;
        // $(document).on('scroll', function(e){

        //     //console.log(e);

        //     if($(window).width() <= 600) {
        //         return;
        //     }

        //     //going up
        //     if ($(window).scrollTop() < 70) {
        //         $('body').removeClass('scrollingDown');
        //     }

        //     //coming down
        //     else {\
        //         $('body').addClass('scrollingDown');          
        //     }

        //     //prevPageY = e.originalEvent.pageY;
        // });
    }]);
})();