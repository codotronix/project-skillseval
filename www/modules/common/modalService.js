(function(){
    angular.module("skillseval").factory("modalService", modalService);
    
    modalService.$inject = ['$timeout'];

    function modalService ($timeout) {
        var loaderVisible = false;
        var minLoaderVisTime = 2000;
        var loaderStartTime = 0;

        var infoModal = {};
        infoModal.isVisible = false;
        infoModal.title = undefined;
        infoModal.body = undefined;


        return {
            showLoader: showLoader,
            hideLoader: hideLoader,
            isLoaderVisible: isLoaderVisible,
            getInfoModal: getInfoModal,
            showInfoModal: showInfoModal,
            hideInfoModal: hideInfoModal
        }

        function getInfoModal () {
            return infoModal;
        }

        function showInfoModal (body, title) {
            infoModal.title = title || 'Hi there!';
            infoModal.body = body;
            infoModal.isVisible = true;
        }

        function hideInfoModal () {
            infoModal.isVisible = false;
        } 

        function showLoader () {
            loaderVisible = true;
            loaderStartTime = (new Date()).getTime();
        }

        function hideLoader () {
            var diff = (new Date()).getTime() - loaderStartTime;
            if(diff > minLoaderVisTime) {
                loaderVisible = false;
                loaderStartTime = 0;
            }
            else {                
                $timeout(hideLoader, (minLoaderVisTime - diff));
            }            
        }

        function isLoaderVisible () {
            return loaderVisible;
        }
    }
})();