(function(){
    angular.module("skillseval").controller("settingsController", settingsController);
    
    settingsController.$inject = ["persistenceService"];

    function settingsController (persistenceService) {
        var vm = this;
        vm.user = undefined;
        vm.saveUserInfo = saveUserInfo;
        vm.updateImg = updateImg;

        init();

        function init () {
            vm.user = persistenceService.getUser();
        }

        function updateImg () {
            if(vm.user.imgUrl.trim().length <= 0) { return; }
            $('#trial-img-profile').attr('src', vm.user.imgUrl.trim());
        }

        function saveUserInfo () {
            if(vm.user.firstName.trim() && vm.user.lastName.trim()) {
                persistenceService.setUser(vm.user);

                //update the profile picture
                setTimeout(function(){
                    $('#user-profile-picture').attr('src', $('#trial-img-profile').attr('src'));
                }, 100);
            }
        }
    }
})();