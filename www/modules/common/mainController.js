(function(){
    angular.module("skillseval").controller("mainController", mainController);
    
    mainController.$inject = ['$window', '$location', '$sce', 'modalService', 'persistenceService', '$rootScope']

    function mainController ($window, $location, $sce, modalService, persistenceService, $rootScope) {
        var mvm = this;
        mvm.devInProgressMsg = undefined;
        
        mvm.infoModal = modalService.getInfoModal();
        mvm.infoModal.isVisible = false;

        mvm.showInfoModal = showInfoModal;
        mvm.hideInfoModal = hideInfoModal;
        mvm.gotoPrevPage = gotoPrevPage;
        mvm.goToSettings = goToSettings;
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

        function goToSettings () {
            $location.path('/settings');
        }

        function updateProfilePicture () {
            $rootScope.profileImgUrl = persistenceService.getProfilePictureUrl();
            // setTimeout(function () {

            // }, 100);
        }


        function copyToClipboard (elemID) {
            document.getElementById(elemID).select();
            document.execCommand('copy');

            // alert("Copied to clipboard...");
            modalService.showInfoModal("Certificate code successfully copied to clipboard. Paste it and keep it in someplace safe.", "Copy Successful");
        }


        function showInfoModal (body, title) {
            modalService.showInfoModal(body, title);
        }

        function hideInfoModal () {
            modalService.hideInfoModal();
        }
        
    }
})();