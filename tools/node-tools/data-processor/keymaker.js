const helper = require('./helper');

module.exports = keymaker (helper);


function keymaker (helper) {
        var availableIndices20 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
        var singleMCQCodes = {
            codeInitial: 'A',
            codeRefs: [[15,9,2],[10,14,15,3],[1,2,19,14],[1,8,0],[9,7,4,19,2],[5,17,11,8,14],[11,17,8,16],[9,11,19],[12,15,6],[12,3,11,15]]
        };

        return {
            makeKey: makeKey,
            decodeKey: decodeKey,
            makeKeyForSingleAnsMCQ: makeKeyForSingleAnsMCQ,
            decodeKeyForSingleAnsMCQ: decodeKeyForSingleAnsMCQ,
            makeKeyForMultiAnsMCQ: makeKeyForMultiAnsMCQ,
            decodeKeyForMultiAnsMCQ: decodeKeyForMultiAnsMCQ
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
                key = makeKeyForMultiAnsMCQ(ans);
            }

            //If not array, then is it a character?
            else if (ans.length === 1) {
                key = makeKeyForSingleAnsMCQ(ans);
            }

            return key;
        }


        /*
        * This function decodes a key and returns the answer
        */
        function decodeKey (key) {
            var ans;

            //If it starts with A, then it is a SingleAnsMCQ
            if(key[0] === 'A') {
                ans = decodeKeyForSingleAnsMCQ(key);
            }

            //if starts with 'B', then it is a Multi-Ans-MCQ
            else if (key[0] === 'B') {
                ans = decodeKeyForMultiAnsMCQ(key);
            }

            return ans;
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


        /*
        * This function takes an Array of Chars as ans of MultiAnsMCQ
        * and makes a key where the array is hidden
        *
        * The key will be of structure
        * CC-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
        * i.e
        * CS-X(20)-X(20)
        *
        * C - The code, for MultiAnsMCQ, it is 'B'
        * S - The no of correct answers, Alpha, cant be greater than 25
        * 
        * X(20) - Unique value of 0 to 19, alphanumeric and randomized
        * i.e. A3G9K..... upto 20th place
        *
        * NEXT X(20) will hold the answers in the index places stored in First
        * i.e. one after another A,3,G,9 will be filled with answers S number
        * of options
        *
        */
        function makeKeyForMultiAnsMCQ (ansArr) {
            //store the size or the number of correct answers
            // in variable 's'
            var s = helper.numToAlpha(ansArr.length);

            //randomize 0 to 19 index values
            var randIndices = helper.randomizeArray(availableIndices20);

            //Create the first X(20) i.e. x1
            var x1 = "";

            for (var i=0; i<randIndices.length; i++) {
                //If the index value > 9, definitely store it as ALPHA
                //Also Store it as Alpha depending on some randomeness
                if(randIndices[i] > 9 || Math.floor(Math.random()*100) % 4 === 0) {
                    x1 += helper.numToAlpha(randIndices[i]);
                }
                else {
                    x1 += randIndices[i];
                }
            }

            var x2 = helper.getAlphaNumString(20);
            var ind;
            // store ans in the x2 String in the corresponding places as
            // stored in x1
            for(var i=0; i<ansArr.length; i++) {
                ind = isNaN(x1[i]) ? helper.alphaToNum(x1[i]) : x1[i];
                x2 = helper.replaceStringAt(x2, ind, ansArr[i]);
            }

            x1 = helper.breakIntoFives(x1);
            x2 = helper.breakIntoFives(x2);

            return 'B' + s + '-' + x1 + '-' + x2;
        }


        /*
        * This is opposite of makeKeyForMultiAnsMCQ
        * 
        * key structure will be
        * CS-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
        * => CS-XXXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXX
        *
        * C will be 'B' for MultiAnsMCQ
        * S is an Alpha denoting NoOfCorrectAns
        * 
        * firstX20 will hold the indexPositions of correct answers of 
        * SecondX20
        */
        function decodeKeyForMultiAnsMCQ (key) {

            var splitted = key.split('-');
            var code = splitted[0];
            var alphaNum1 = splitted[1] + splitted[2] + splitted[3] + splitted[4];
            var alphaNum2 = splitted[5] + splitted[6] + splitted[7] + splitted[8];

            var noOfCorrectOptions = code.substr(1);
            noOfCorrectOptions = isNaN(noOfCorrectOptions) ? helper.alphaToNum(noOfCorrectOptions) : noOfCorrectOptions;

            var ans = [];
            var ind;
            for(var i=0; i<noOfCorrectOptions; i++) {
                ind = isNaN(alphaNum1[i]) ? helper.alphaToNum(alphaNum1[i]) : alphaNum1[i];
                ans.push(alphaNum2[ind]);                
            }

            return ans;
        }

    }