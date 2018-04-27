(function(){
    angular.module("skillseval").controller("mainController", mainController);
    
    mainController.$inject = ['$window', '$sce', 'modalService', 'persistenceService', '$rootScope']

    function mainController ($window, $sce, modalService, persistenceService, $rootScope) {
        var mvm = this;
        mvm.devInProgressMsg = undefined;
        mvm.gotoPrevPage = gotoPrevPage;
        mvm.isLoaderVisible = modalService.isLoaderVisible;



        init();

        function init () {
            updateProfilePicture();

            if(angular._9.isDevInProgress) {
                mvm.devInProgressMsg =  $sce.trustAsHtml(angular._9.devInProgressMsg);
            }
        }

        function gotoPrevPage () {
            $window.history.back();
        }

        function updateProfilePicture () {
            $rootScope.profileImgUrl = persistenceService.getProfilePictureUrl();
            // setTimeout(function () {

            // }, 100);
        }

        
    }
})();