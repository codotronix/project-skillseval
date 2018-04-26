(function(){
    angular.module("skillseval").factory("keymaker", keymaker);
    keymaker.$inject = ['helper'];

    function keymaker (helper) {
        return {
            
        }


        /*
         * This function creates "key" from "ans" 
         * 
         * "ans" can be
         * => array --- for Multiple Ans MCQ --- ['B', 'D']
         * => sinle char --- for Single Ans MCQ --- 'C'
        */
        function makeKey (ans) {
            var key;

            //Check if ans is an "Array of Options" i.e. Multi-Ans-MCQ
            if (Array.isArray(ans)) {
                //key = makeKeyForMultiAnsMCQ(ans);
            }

            //If not array, then is it a character?
            else if (ans.length === 1) {
                key = makeKeyForSingleAnsMCQ(ans);
            }

            return key;
        }


        /*
        * This function takes a single character, i.e. the correct option
        * of a single-ans-MCQ, like 'A' or 'B' or 'C' etc
        * and converts it to a key
        * 
        * The key will be of structure
        * CC-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
        *
        * CC = The code
        * x = alphanumeric character [A-Z and 0-9]
        *
        * ALGORITHM
        *
        * 1. CREATE A STRUCTURE LIKE
        * 2. CC - X(20) - X(20)
        * 3. CC code will tell some index of 1st X(20)
        * 4. Read the values from those indexes and add them,
        *       converting each alphas into a predefined numbers
        * 5. the sum will point to the index of 2nd X(20) where Ans is located
        */
        var singleMCQHelper = {
            codes: ["A1"],
            codeDef: {
                "A1": {
                    x1Indices: [4, 9, 17]
                }
            }
        };
        function makeKeyForSingleAnsMCQ (c) {

        }
    }
})();