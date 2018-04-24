module.exports = {
    getAlphaNumString: getAlphaNumString,
    breakIntoFives: breakIntoFives,
    replaceAt: replaceAt
};

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
 * This function takes a string s and replaces character at i index with character c pr string c
*/
function replaceAt(s, i, c) {
    return s.substr(0, i) + c + s.substr(i + c.toString().length);
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