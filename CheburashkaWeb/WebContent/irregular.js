
var irregular = {
    // add here
    "хоте+" : {
        "present":["","хочешь","хочет","","",""]
    },
    "дать" : {
        "present":["дам","дашь","даст","дадим","дадите","дадут"]
    },
    "есть" : {
        "present":["ем","ешь","ест","едим","едите","едят"]
    }
};


/* 
 * Generate a conjugation set with getIrregular()
 */
function getConjugation(conjugationSet, generatedConjugation) { 
    if (conjugationSet.length != 6  && conjugationSet.length != 4) {
    	return null;
    }
    var table = new Array();
	for (var person = 0; person < 3; person++) {
    	for (var gender = 0; gender < 4; gender++) { // gender = 0,1,2 & plural = 3
    	    var entry = "";
    		if (conjugationSet.length == 6) {
    			entry = (gender == 3) ? conjugationSet[person + 3] : conjugationSet[person];
    		} else if (conjugationSet.length == 4) {
    			entry = conjugationSet[gender];
    			if (person > 0) {
    				entry = generatedConjugation.table[0][gender];
    			}
    		}

    		if (entry != "" && generatedConjugation) {
    			generatedConjugation.table[person][gender] = entry;
    		}
    	}
    }
	return generatedConjugation;
}


function getIrregular(stem, tense) {

	// stem is in the set - return as is
	if (stem in irregular) {
		if (tense in irregular[stem]) {
	     	return irregular[stem][tense];
	    }
	}
	
	// now check if stem has the same ending as a stem in the set
	var prefix = "";
	var baseSet = null;
	var conjSet = new Array();
	
    for (var baseStem in irregular) {
        if (stem.length >= baseStem.length && stem.substr(stem.length - baseStem.length) == baseStem ) { // stem ends with base stem in the set
            var position = stem.indexOf(baseStem);
            if (position > 0) { // assert: should always be 0
                prefix = stem.substring(0,position);
            }
            baseSet = irregular[baseStem][tense];
            break;
        }
    }
    
    if (!baseSet) {
        return null;
    }

    // get array and add prefix to each non empty entry
	for (var i = 0; i < baseSet.length; i++) {
	    if(baseSet[i].length > 0) {
		    conjSet[i] = prefix + baseSet[i];
		} else {
		    conjSet[i] = baseSet[i];
		}
	}
    return conjSet;
}
