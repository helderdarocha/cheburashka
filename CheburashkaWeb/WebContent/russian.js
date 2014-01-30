// Russian verb conjugation generator (for regular verbs)
// Version 0.1
// helder.darocha@gmail.com
// Based on grammar notation used in the University of Princeton Russian Course:
//   stem+			Basic stem: apply rules to the + to conjugate
//   stem+ся		Apply rules to the + and add ся or сь according to rules
//   stem[ну]+		Apply rules to the + and remove ну in the past
//   stem+(o)		Apply rules, removing or adding cluster buster vowel
//   {stem+/stem+}	Double stem - one for past, aonther for present and future
//   stem+//prefix-	Full notation for a verb pair, where perfective is formed by prefix
//   stem+//stem+	Full notation for a verb pair, where perfective is provided


String.prototype.trim = function() {
   return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

var USE_IRREG_DB = true; // if true, will use functions in irregular.js

/////////////////////// OBJECTS ///////////////////////////
function Verb(stem) {
    this.stem = stem;
    this.pastStem = stem;
    this.presentStem = stem;
    this.clusterBuster;
    this.presentTense; // (VerbConjugation)
    this.pastTense; // (VerbConjugation)
    this.infinitive;
    this.singularImperative;
    this.pluralImperative;
    
    if (isDoubleStem(this.stem)) { 
		this.pastStem    = getPastFromDoubleStem(this.stem);
		this.presentStem = getPresentFromDoubleStem(this.stem);
		this.stem = "{"+this.presentStem+"/"+this.pastStem+"}";
	}
}
Verb.prototype.addPrefix = function (prefix) {
    // TODO: add prefix to bare stem only (not double stemStrings!)
    prefix = prefix.substring(0, prefix.length-1); // remove the dash -
	
	this.pastStem    = prefix + this.pastStem;
	this.presentStem = prefix + this.presentStem;

    if (isDoubleStem(this.stem)) { 
		this.stem = "{"+this.presentStem+"/"+this.pastStem+"}";
	} else {
		this.stem = prefix + this.stem;
	}
};
Verb.prototype.generateConjugations = function() {

    this.presentTense = generateConjugationFromStem(this.presentStem, "present");
    this.pastTense    = generateConjugationFromStem(this.pastStem, "past");
    
    if (USE_IRREG_DB) {
        var conj = getIrregular(this.presentStem, "present");
        if (conj) { // will replace generated conjugations with data received
        	this.presentTense = getConjugation(conj, this.presentTense);
        }
        conj = getIrregular(this.pastStem, "past");
        if (conj) {
        	this.pastTense = getConjugation(conj, this.pastTense);
        }
    }
};



function VerbPair(impVerb, perfVerb, prefix) {
    this.impf = impVerb; // (Verb)
    this.perf = perfVerb; // (Verb)
};
VerbPair.prototype.generateConjugations = function() { 
	this.impf.generateConjugations();
	this.perf.generateConjugations();
}



function VerbConjugation(table) {
	this.table = table; // Table[person=0,1,2][gender=0,1,2 or plural=3]
}
VerbConjugation.prototype.ya = function() {
	return this.table[0][0];
};
VerbConjugation.prototype.yaa = function() {
	return this.table[0][1];
};
VerbConjugation.prototype.yao = function() {
	return this.table[0][2];
};
VerbConjugation.prototype.ty = function() {
	return this.table[1][0];
};
VerbConjugation.prototype.tya = function() {
	return this.table[1][1];
};
VerbConjugation.prototype.tyo = function() {
	return this.table[1][2];
};
VerbConjugation.prototype.on = function() {
	return this.table[2][0];
};
VerbConjugation.prototype.ona = function() {
	return this.table[2][1];
};
VerbConjugation.prototype.ono = function() {
	return this.table[2][2];
};
VerbConjugation.prototype.my = function() {
	return this.table[0][3];
};
VerbConjugation.prototype.vy = function() {
	return this.table[1][3];
};
VerbConjugation.prototype.oni = function() {
	return this.table[2][3];
};


/////////////////////// FUNCTIONS ///////////////////////////
function generateConjugationFromStem(stem, type) {

    var table = new Array();
    
    for (var person = 0; person < 3; person++) {
    	table[person] = new Array();
    	for (var gender = 0; gender < 4; gender++) { // gender = 0,1,2 & plural = 3
    		if (type == "present") {
    			table[person][gender] = doPresentFuture(person+1, gender==3?true:false, stem);
    		} else if (type == "past") {
    			table[person][gender] = doPast(gender+1, stem);
    			if (person > 0) {
    				table[person][gender] = table[0][gender];
    			}
    		}
    	}
    }
	return new VerbConjugation(table);
}



function doPast(personNumber, stem) { // 0 - infinitive, 1 - masc, 2 - fem, 3 - neut, 4 - plural
    
    // double stem notation
	if (isDoubleStem(stem)) {
		stem = getPastFromDoubleStem(stem);
	}
	
	// cluster buster vowel notation
	var clusterBuster = getClusterBuster(stem);
	
	// + stem notation
	var mais = stem.indexOf("+");
	var verb = stem.substring(0, mais); // removes the +

    // ся suffix notation
	var caSuffix = ( stem.indexOf("+ся") > 0 );

    // disappearing [ну] notation
	var nu = stem.indexOf("[ну]+");
	if (nu > 0) {
		verb = stem.substring(0, nu); // removes the [ну] from the stem!
	}
	
	var lastCharOfStem  = verb.substring(verb.length-1, verb.length);
	var secLastCharOfStem = verb.substring(verb.length-2, verb.length-1);
	
	// apply grammar rule - GreaSy ZeKe
	if (!isGreasyZeke(lastCharOfStem) && !isVowel(lastCharOfStem)) {
		verb = verb.substring(0, verb.length-1); // removes the conflicting consonant
	}
	
	// apply grammar rule - cluster buster vowel
	if (clusterBuster != null && clusterBuster == secLastCharOfStem && (personNumber == 2 || personNumber == 3 || personNumber == 4)) {
	    verb = verb.substring(0,verb.length-1);
	}
	
	// apply ending rule
	if (personNumber == 2) {
		verb += "ла";
	} else if (personNumber == 3) {
		verb += "ло";
	} else if (personNumber == 4) {
		verb += "ли";
	} else if (personNumber == 1) { 
		if (!isGreasyZeke(lastCharOfStem)) {
		    verb += "л";
	    }
	}

    // apply ся and съ suffix rule
	if (caSuffix) {
		var lastChar = verb.substring(verb.length-1, verb.length);
		if (isVowel(lastChar)) {
			verb += "сь";
		} else {
			verb += "ся";
		}
	}

	return verb;	
}


function doPresentFuture(person, isPlural, stem) {

    if (isDoubleStem(stem)) {
		stem = getPresentFromDoubleStem(stem);
	}

	var mais = stem.indexOf("+");
	var lastCharOfStem  = stem.substring(mais-1, mais);
	var secLastCharOfStem = stem.substring(mais-2, mais-1);
	
	var caSuffix = ( stem.indexOf("+ся") > 0);
	
	var ova = stem.indexOf("евай+");
	if (ova < 0) {
		ova = stem.indexOf("овай+");
	}
	var isOvaVerb = ( ova > 0 );
	
	var verb = stem.substring(0, mais); // removes the +
	
	var nu = stem.indexOf("[ну]+");
	if (nu > 0) {
		verb = stem.substring(0, nu); // removes the [ну]
		verb += "н"; // returns the N to the stem
	}
	
	if (!isSecondConj(lastCharOfStem, secLastCharOfStem)) {
		if (isSoft(lastCharOfStem)) {
			verb = verb.substring(0, verb.length-1); // remove the й
		}
		if (isOvaVerb) {
			verb = verb.substring(0, ova) + "у";
		}
		if (isAStem(lastCharOfStem)) {
			verb = verb.substring(0, verb.length-2); // remove the consonant and the a
			// mutate the second last char
			secLastCharOfStem = mutate(secLastCharOfStem)
			verb += secLastCharOfStem;
	    }
	    
	    if (isGreasyZeke(lastCharOfStem) && !((person == 1 && !isPlural) || (person == 3 && isPlural))) {
			lastCharOfStem = mutate(lastCharOfStem);
			verb = verb.substring(0, verb.length-1) + lastCharOfStem;
		}
		
		if ((person == 1 && !isPlural) || (person == 3 && isPlural)) {
		   if (isSoft(lastCharOfStem) && !isSpellingRule(secLastCharOfStem)) {
			  verb = verb + "ю";
		   } else if (isVowel(lastCharOfStem) && !isAStem(lastCharOfStem)) {
			  verb = verb + "ю";
		   } else {
			  verb = verb  + "у";
		   } 
		   if (isPlural) {
			  verb += "т";
		   }
		} else if (person == 2 && !isPlural) {
		   verb += "ешь";
		} else if (person == 3 && !isPlural) {
		   verb += "ет";
		} else if (person == 1 && isPlural) {
		   verb += "ем";
		} else if (person == 2 && isPlural) {
		   verb += "ете";
		} 
	} else { // is second conjugation
		if (isVowel(lastCharOfStem)) {
			verb = verb.substring(0, verb.length-1); // remove the vowel
		}
		
		if (person == 1 && !isPlural) {
		   var slc = secLastCharOfStem;
		   if(requiresL(slc)) {
			  verb += "л";
		   } else if (mutatesConsonant(slc)) {
			  slc = mutate(slc);
			  verb = verb.substring(0, verb.length-1) + slc;
		   }
		   if (isVowel(lastCharOfStem) && !isSpellingRule(slc)) {
			  verb = verb + "ю";
		   } else {
			  verb = verb  + "у";
		   }
		} else if (person == 3 && isPlural) {
		   if (isVowel(lastCharOfStem) && !isSpellingRule(secLastCharOfStem)) {
			  verb = verb + "ят";
		   } else {
			  verb = verb  + "ат";
		   }
		} 
		
		if (person == 2 && !isPlural) {
		   verb += "ишь";
		} else if (person == 3 && !isPlural) {
		   verb += "ит";
		} else if (person == 1 && isPlural) {
		   verb += "им";
		} else if (person == 2 && isPlural) {
		   verb += "ите";
		} 
	}
	
	if (caSuffix) {
		var lastChar = verb.substring(verb.length-1, verb.length);
		if (isVowel(lastChar)) {
			verb += "сь";
		} else {
			verb += "ся";
		}
	}
	
	return verb;
}




function isSecondConj(lastLetter, secondLastLetter) {
    var secondLast = /[жщшчЖЩШЧ]/;
    var last = /[еиЕИ]/;
    var jaja = /[аА]/; //  оnly if second last is one of the above
    if (last.test(lastLetter)) { 
        return true;
    } else if (jaja.test(lastLetter)) { 
        return secondLast.test(secondLastLetter);
    }
    return false;
}

function mutatesConsonant(letter) {
    var letters = /[дДтТсСкКгГзЗ]/;
    return letters.test(letter);
}

function mutate(letter) {
    if (letter == 'т') {
    	return 'ч';
    }
    if (letter == 'д') {
    	return 'ж';
    }
    if (letter == 'с') {
    	return 'ш';
    }
    if (letter == 'г') {
    	return 'ж';
    }
    if (letter == 'к') {
    	return 'ч';
    }
    if (letter == 'з') {
    	return 'ж';
    }
    return letter;
}

function isGreasyZeke(letter) {
    var letters = /[гГсСзЗкЗ]/;
    return letters.test(letter);
}

function isAStem(letter) {
    var letters = /[аА]/;
    return letters.test(letter);
}

function requiresL(letter) {
    var letters = /[пПбБвВ]/;
    return letters.test(letter);
}

function isSpellingRule(letter) {
    var letters = /[жЖшШщЩчЧкКгГхХ]/;
    return letters.test(letter);
}

function isVowel(letter) {
    var vowels = /[аеиоуяыоёю]/;
    return vowels.test(letter);
}

function isSoft(letter) {
    var consonants = /[йЙ]/;
    return consonants.test(letter);
}




// Grammar notation parsing

function getClusterBuster(stem) {
	var clusterBusterStart = stem.indexOf("(");
	if (clusterBusterStart > 0) { 
	    return stem.substring(clusterBusterStart+1, clusterBusterStart+2);
	} else {
	    return null;
	}
}

function isDoubleStem(stem) {
    if (stem.indexOf("/") < 0) {
        return false;
    }
	if (stem.substring(0,1) == "{" && stem.substring(stem.length-1, stem.length) == "}") {
	    return true;
	}
	return false;
}

function getPastFromDoubleStem(stemSet) {
	var stems = stemSet.split("/");
	stems[1] = stems[1].trim();
	return stems[1].substring(0,stems[1].length-1).trim(); // remove the }
}

function getPresentFromDoubleStem(stemSet) {
	var stems = stemSet.split("/");
	stems[0] = stems[0].trim();
	return stems[0].substring(1,stems[0].length).trim(); // remove the {
}

function getPairFromGrammarNotation(verbString) {
	var pStemOrPfx = null;
	var vStem = null;
	var pair  = null;

	var pair = verbString.split("//");
	vStem = pair[0].trim();
	pStemOrPfx = pair[1].trim();

	var pv = null;
	var v = new Verb(vStem);
	
	var prefix = null;
	var pStem  = null;
		
	if (pStemOrPfx.substring(pStemOrPfx.length-1, pStemOrPfx.length) == "-") {
		prefix = pStemOrPfx;
		pv = new Verb(vStem);
		pv.addPrefix(prefix);
	} else {
		pStem = pStemOrPfx;
		pv = new Verb(pStem);
	}

	return new VerbPair(v, pv);
}
