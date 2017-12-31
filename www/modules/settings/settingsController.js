(function(){
    angular.module("skillseval").controller("settingsController", settingsController);
    
    settingsController.$inject = [];

    function settingsController () {
        var vm = this;
        vm.certCode = undefined;

        vm.user = {};
        vm.user.imgUrl = '';
        
        vm.updateImg = updateImg;


        function updateImg () {
            if(vm.user.imgUrl.trim().length <= 0) { return; }
            $('#trial-img-profile').attr('src', vm.user.imgUrl.trim());
        }
    }
})();