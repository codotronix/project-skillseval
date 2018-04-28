(function(){
    angular.module("skillseval").factory("persistenceService", persistenceService);
    
    persistenceService.$inject = [];

    function persistenceService () {
        
        var dataStore;


        init();

        return {
            getUser: getUser,
            setUser: setUser,
            getProfilePictureUrl: getProfilePictureUrl
        }

        function init () {
            dataStore = JSON.parse(localStorage.getItem("dataStore")) || {};
            //console.log("dataStore");
            //console.log(dataStore);
        }


        function getUser () {
            if(!dataStore.userInfo) {
                dataStore.userInfo = {
                    "userType": "Guest",
                    "imgUrl": ""
                }
            }

            return dataStore.userInfo;
        }

        function getProfilePictureUrl () {
            if(!dataStore.userInfo || !dataStore.userInfo.imgUrl) {
                return "images/default-profile-white.png";
            }
            else {
                return dataStore.userInfo.imgUrl;
            }
        }


        function setUser (userInfo) {
            dataStore.userInfo = userInfo;
            saveDataStore();            
        }

        function saveDataStore () {
            localStorage.setItem("dataStore", JSON.stringify(dataStore));
        }
    }
})();