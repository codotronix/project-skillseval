(function(){
    angular.module("skillseval").factory("userService", userService);
    
    userService.$inject = ['$http', '$q', "secretService"];

    function userService ($http, $q, secretService) {
        
        return {
            
        }

        
    }
})();