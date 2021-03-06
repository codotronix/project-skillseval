module.exports = helper();




function helper () {
    //constant randomAlphas helps us know value of each ALPHABET
    var randomAlphas = "GBUYEWIZNXADTHVPQFCSLRMOKJ";

    return {
        getRandomAlphas: getRandomAlphas,
        getAlphaNumString: getAlphaNumString,
        replaceStringAt: replaceStringAt,
        breakIntoFives: breakIntoFives,
        randomizeArray: randomizeArray,
        alphaToNum: alphaToNum,
        numToAlpha: numToAlpha
    }

    /*
    * This function returns constant randomAlphas
    */
    function getRandomAlphas () {
        return randomAlphas;
    }

    /*
    * It takes a number between 0 to 25
    * and returns an ALPHABET corresponding to it 
    */
    function numToAlpha (num) {
        return randomAlphas[num];
    }

    /*
     * This function creates and returns an AlphaNumeric String of given length
    */
    function getAlphaNumString (len) {
        var allAlphsNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var res = '';
        for(var i=0; i<len; i++) {
            res += allAlphsNum[Math.floor(Math.random()*allAlphsNum.length)];
        }

        return res;
    }

    /*
    * This function breaks a long String like 
    * 'XXXXXXXXXXXXXXXXXXXXXX'
    * 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX' etc
    */
    function breakIntoFives (s, sep) {
        var res = "";
        var separator = sep || '-';

        for (var i=0; i < s.length; i++) {
            if (i !== 0 && i % 5 === 0) {
               res += separator; 
            }

            res += s[i];
        }

        return res;
    }

    /*
     * This function takes a string s and replaces characterstring c at i 
     * index with character c or string c
    */
    function replaceStringAt(s, i, c) {
        i = parseInt(i);
        c = c.toString();
        return s.substr(0, i) + c + s.substr(i + c.length);
    }


    /*
     * This function will randomize the members of a given array
    */
    function randomizeArray (arr) {
        var arr = arr.slice();  //make a copy of the original array
        var res = [];
        var ind;
        while (arr.length > 0) {
            ind = Math.floor(Math.random() * arr.length);
            res.push(arr[ind]);
            arr.splice(ind, 1);
        }
        return res;
    }


    /*
    * This function will take in an Alpha and return a number
    */
    function alphaToNum(c) {
        return randomAlphas.indexOf(c);
    }
}