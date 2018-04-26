(function(){
    angular.module("skillseval").factory("keymaker", keymaker);
    keymaker.$inject = ['helper'];

    function keymaker (helper) {

        var singleMCQCodes = {
            codeInitial: 'A',
            codeRefs: [[15,9,2],[10,14,15,3],[1,2,19,14],[1,8,0],[9,7,4,19,2],[5,17,11,8,14],[11,17,8,16],[9,11,19],[12,15,6],[12,3,11,15]]
        };

        return {
            makeKey: makeKey,
            makeKeyForSingleAnsMCQ: makeKeyForSingleAnsMCQ,
            decodeKeyForSingleAnsMCQ: decodeKeyForSingleAnsMCQ
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

        *******
        * Code snippet to generate n random array of m length arrays
        function createNArraysOfMArray () {
            var res=[], n=10;
            for(var k=0; k<n; k++) {
                var m = Math.floor(Math.random()*4 + 3);
                var b = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                var r = [], ind;
                for(var i=0; i<m; i++) {
                    ind = Math.floor(Math.random()*b.length);
                    r.push(b[ind]);
                    b.splice(ind, 1);
                }

                res.push(r);
            }
            return res;
        }
        */
        
        //ans will be a single Char
        //code will be something like A0, A1... A9
        function makeKeyForSingleAnsMCQ (ans, code) {
            var codeRefIndex;
            if (code) {
                codeRefIndex = parseInt(code.substr(1))
            }
            else {
                codeRefIndex = Math.floor(Math.random()*singleMCQCodes.codeRefs.length);
            }

            var codeRef = singleMCQCodes.codeRefs[codeRefIndex];

            //get a alphanum string of length 20
            var alphaNum1 = helper.getAlphaNumString(20);
            var sum = 0;

            //Go thru the codeRef indexes of alphaNum1 and sum the values
            for(var i in codeRef) {
                sum += isNaN(codeRef[i]) ? helper.alphaToNum(codeRef[i]) : codeRef[i];
            }

            //if the sum goes above 19, circulize it
            sum = sum % 20;

            //Take another alphanum of length 20
            var alphaNum2 = helper.getAlphaNumString(20);

            //place ans in sum-th inde of alphanum2
            alphaNum2 = helper.replaceStringAt(alphaNum2, sum, ans);

            return ('A' + codeRefIndex + '-' + helper.breakIntoFives(alphaNum1 + alphaNum2));
        }


        /*
        * This function is just opposite of makeKeyForSingleAnsMCQ
        */
        function decodeKeyForSingleAnsMCQ (key) {
            var splitted = key.split('-');
            var codeRefIndex = parseInt(splitted[0].substr(1));
            var codeRef = singleMCQCodes.codeRefs[codeRefIndex];

            var alphaNum1 = splitted[1] + splitted[2] + splitted[3] + splitted[4];
            var alphaNum2 = splitted[5] + splitted[6] + splitted[7] + splitted[8];

            var sum = 0;

            //Go thru the codeRef indexes of alphaNum1 and sum the values
            for(var i in codeRef) {
                sum += isNaN(codeRef[i]) ? helper.alphaToNum(codeRef[i]) : codeRef[i];
            }

            //if the sum goes above 19, circulize it
            sum = sum % 20;

            return alphaNum2[sum];
        }
    }
})();