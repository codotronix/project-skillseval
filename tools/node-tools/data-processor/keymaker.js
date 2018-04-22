const helper = require('./helper');

module.exports = {
    makeKey: makeKey,
    decodeKey: decodeKey,
    test: test
};

/*
 * This function creates "key" from "ans" 
 * 
 * "ans" can be
 * => array --- for Multiple Ans MCQ --- ['B', 'D']
 * => sinle char --- for Single Ans MCQ --- 'C'
*/
function makeKey (ans) {
    var key;
    //Check if ans is an Array of Options i.e. Multi-Ans-MCQ
    if (Array.isArray(ans)) {
        key = makeKeyForMultiAnsMCQ(ans);
    }

    return key;
}

/*
* This function decodes key and returns ans, either Character or Array of Characters
*/
var singleAnsMCQCodes = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'];
var multiAnsMCQCodes = ['B1', 'B2', 'B3', 'B4', 'B5'];
function decodeKey (key) {
    var ans;
    var formulaID = key.split('-')[0];

    if (singleAnsMCQCodes.indexOf(formulaID) > -1) {

    }
    else if (multiAnsMCQCodes.indexOf(formulaID) > -1) {
        ans = decodeKeyForMultiAnsMCQ(key);
    }

    return ans;
}


/*
 * This function makes key from an ansArray e.g. ['B', 'D']
 * The Flavours is a look up for all possible flavous for this technique
 * Read design doc for the formula
 * 
*/
var multiMcqFlavours = [
    {
        code: 'B1',
        fixedIndex: 4,
    },
    {
        code: 'B2',
        fixedIndex: 3,
    },
    {
        code: 'B3',
        fixedIndex: 1,
    },
    {
        code: 'B4',
        fixedIndex: 0,
    },
    {
        code: 'B5',
        fixedIndex: 2,
    },
];

function makeKeyForMultiAnsMCQ (ansArray) {

    // get an AlphaNumeric String of Length 20
    var alphaNum20 = helper.getAlphaNumString(20);

    //choose ansArray.length numbers of random indexes inside alphaNum20
    //where we will hide the answers
    var availableSlots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    var chosenSlots = [];
    for(var i=0; i<ansArray.length; i++) {
        var randomIndex = Math.floor(Math.random()*availableSlots.length);
        var slot = availableSlots[randomIndex];

        //put this answer in this slot
        //alphaNum20[slot] = ansArray[i]
        alphaNum20 = helper.replaceAt(alphaNum20, slot, ansArray[i]);

        //save the slot number
        chosenSlots.push(slot);

        //make that slot unavailable
        availableSlots.splice(randomIndex, 1);
    }

    //At this point our answers are saved in alphaNum20
    //at the index locations saved in array chosenSlots
    console.log("chosenSlots = " + JSON.stringify(chosenSlots));

    //Now let's get another alphaNum string of length 5
    //we will store Number of Correct Answers to choose, i.e. ansArray.length here
    var alphaNum5 = helper.getAlphaNumString(5);
    console.log(alphaNum5);
    var randomFlavour = multiMcqFlavours[Math.floor(Math.random()*multiMcqFlavours.length)];
    //alphaNum5[randomFlavour.fixedIndex] = ansArray.length;
    alphaNum5 = helper.replaceAt(alphaNum5, randomFlavour.fixedIndex, ansArray.length);

    console.log(JSON.stringify(randomFlavour));
    console.log('|' + alphaNum5 + '|');
    
    //Now take Another 15 length AlphaNum String and hide the chosen slots
    var alphaNum15 = helper.getAlphaNumString(15);
    var shift = (ansArray.length <= 4) ? 1 : 0;
    var gap = Math.floor(15 / ansArray.length);
    for (var i=0; i<chosenSlots.length; i++) {
        //alphaNum15[i + shift] = chosenSlots[i];
        var ind = i*gap + shift;
        alphaNum15 = helper.replaceAt(alphaNum15, ind, chosenSlots[i]);
        shift *= -1;
    }

    return randomFlavour.code + '-' + helper.breakIntoFives(alphaNum5 + alphaNum15 + alphaNum20);
}



/*
 * This function decodes a key and returns Array of Character as Answers
*/
function decodeKeyForMultiAnsMCQ (key) {
    var parts = key.split('-');

    var formulaID = parts[0];
    var alphaNum1 = parts[1];
    var alphaNum15 = parts[2] + parts[3] + parts[4];
    var alphaNum20 = parts[5] + parts[6] + parts[7] + parts[8];

    var fixedIndex;
    for(var i in multiMcqFlavours) {
        if(multiMcqFlavours[i].code === formulaID) {
            fixedIndex = multiMcqFlavours[i].fixedIndex;
        }
    }

    var noOfCorrectOptions = alphaNum1[fixedIndex];
    var shift = (noOfCorrectOptions <= 4)  ? 1 : 0;
    var correctAns = [];
    var gap = Math.floor(15 / noOfCorrectOptions);

    for (var i=0; correctAns.length < noOfCorrectOptions; i++) {
  
      correctAns.push( alphaNum20 [ alphaNum15 [i*gap + shift] ] );
      shift *= -1;
    }

    return correctAns;
}


/*
* This function will test The functions of this Entire Module
* It is like a self health check
*/
var lineSep = "\n*******************************************\n";
function test () {
    testMultiAnsMCQ();
}

function testMultiAnsMCQ() {
    console.log(lineSep);
    console.log("Testing Module: keymaker");
    console.log(lineSep);
    console.log("Testing functions makeKey and decodeKey for Multi Answer MCQ\n");
    var ans = ['C', 'D'];
    console.log('Testing with answer array = ' + JSON.stringify(ans) + '\n');
    var key = makeKey(ans);
    console.log("key received from makeKey = " + key + '\n');
    var backToAns = decodeKey(key);
    console.log("decoded ans from decodeKey = " + JSON.stringify(backToAns) + '\n');
    console.log('Test Passed = ' + (JSON.stringify(ans) === JSON.stringify(backToAns)));
    console.log(lineSep);
}