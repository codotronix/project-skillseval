(function(){
    angular.module("skillseval").controller("mainController", mainController);
    
    mainController.$inject = ['$window', 'modalService', 'persistenceService', '$rootScope']

    function mainController ($window, modalService, persistenceService, $rootScope) {
        var mvm = this;
        mvm.gotoPrevPage = gotoPrevPage;
        mvm.isLoaderVisible = modalService.isLoaderVisible;

        init();

        function init () {
            updateProfilePicture();
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