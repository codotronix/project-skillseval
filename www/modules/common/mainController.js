(function(){
    angular.module("skillseval").controller("mainController", mainController);
    
    mainController.$inject = ['$window', '$location', '$sce', 'modalService', 'persistenceService', '$rootScope']

    function mainController ($window, $location, $sce, modalService, persistenceService, $rootScope) {
        var mvm = this;
        mvm.devInProgressMsg = undefined;
        mvm.infoModal = {};
        mvm.infoModal.isVisible = false;
        mvm.showInfoModal = showInfoModal;
        mvm.hideInfoModal = hideInfoModal;
        mvm.gotoPrevPage = gotoPrevPage;
        mvm.goToHome = goToHome;
        mvm.goToBookmarks = goToBookmarks;
        mvm.isLoaderVisible = modalService.isLoaderVisible;
        mvm.copyToClipboard = copyToClipboard;


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

        function goToHome () {
            $location.path('/home');
        }

        function goToBookmarks () {

        }

        function updateProfilePicture () {
            $rootScope.profileImgUrl = persistenceService.getProfilePictureUrl();
            // setTimeout(function () {

            // }, 100);
        }


        function copyToClipboard (elemID) {
            document.getElementById(elemID).select();
            document.execCommand('copy');

            alert("Copied to clipboard...");
        }


        function showInfoModal (body, title) {
            mvm.infoModal.title = title || 'Hi there!';
            mvm.infoModal.body = body;
            mvm.infoModal.isVisible = true;
        }

        function hideInfoModal () {
            mvm.infoModal.isVisible = false;
        }
        
    }
})();