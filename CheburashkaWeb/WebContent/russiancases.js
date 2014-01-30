
var nouns = new Array();
nouns[0] = "человек [6]";
nouns[1] = "собака [4]";
nouns[2] = "окно (о) [4]";
nouns[3] = "здание [3]";
nouns[4] = "гений [2]";
nouns[5] = "фотография [7]";
nouns[6] = "словарь [2]";
nouns[7] = "лошадь [2]";
nouns[8] = "спальня [3]";
nouns[9] = "певица [4]";
nouns[10] = "сестра (ё) [6]";
nouns[11] = "ключ [3]";
nouns[12] = "книга [3]";
nouns[13] = "карандаш [7]";
nouns[14] = "актриса [5]";
nouns[15] = "билет [4]";
nouns[16] = "конверт [5]";
nouns[17] = "галстук [2]";
nouns[18] = "деньги (е) [2]";
nouns[19] = "отец (е) [3]";
nouns[20] = "девушка (е) [2]";
nouns[21] = "полотенце (е) [6]";
nouns[22] = "письмо (е) [6]";
nouns[23] = "кухня (о) [2]";
nouns[24] = "край [3]";
nouns[25] = "лес [2] {у}";
nouns[26] = "год [2] {у}";
nouns[27] = "кошка (е) [2]";
nouns[28] = "неделя (е) [2]";
nouns[29] = "семья [2]";

var adjectives = new Array();
adjectives[0] = "последний";
adjectives[1] = "хороший";
adjectives[2] = "большой";
adjectives[3] = "русский";
adjectives[4] = "новый";

var casesKeys = ["N","A","Aa","G","P","D","I"]; 


/////////////////////////////////////////////////

function createNounFromNotation(stemString) {
	var cb = getClusterBuster(stemString);
	var sp = getStressPosition(stemString);
	var st = getStem(stemString);
	var u  = getUloc(stemString);
	
	var n = new Noun(st, sp-1, cb, u);
	
	return n;
}




function Noun(word, stress, cluster, uloc) {
    this.word = word;
    
    this.secondaryStem; 
    
    this.isPlural = false;
	this.stem;
	this.stemType;
	this.gender;
	this.isAnimate;
	this.cases = new Object();
	this.stressPosition = stress;
	this.clusterBuster = cluster;
	this.uloc = uloc; // locative in 'у'
	this.plural;
	
	this.generateStems();
	this.guessGenderAndPlural();
	this.generatePlural();
	//this.generateCases();
}

Noun.prototype.generateStems = function() {

    // 1) singular stem
	var wordSuffix = getSuffix(this.word,1); // last letter
	if (isVowel(wordSuffix) || wordSuffix == "ь" || wordSuffix == "й") {
		this.stem = this.word.substring(0, this.word.length-1);
	} else {
	    this.stem = this.word;
	}
	
	var stemSuffix = getSuffix(this.stem,1); // last letter of stem
	if (isVelar(stemSuffix) || isHusher(stemSuffix)) {
		this.stemType = "spelling-rule";
	} else if (isVowel(stemSuffix) || isSoftLetter(wordSuffix)) {
		this.stemType = "soft";
	} else {
	    this.stemType = "hard";
	}
	
	if (this.clusterBuster) { // generate second stem
		// get second last letter of stem
		var cbSuffix = getSuffix(this.stem,2);
		var secndLastLetter = cbSuffix.substring(0,1);
		var lastLetter = cbSuffix.substring(1,2);
		this.secondaryStem = this.stem.substring(0, this.stem.length - 2);
		
		// if it is a consonant, insert cluster buster
		if (!isVowel(secndLastLetter)) {
		    if ((secndLastLetter == "ь" || secndLastLetter == "й") && isSoftLetter(this.clusterBuster)) {
	            secndLastLetter = "";
	        }
		    this.secondaryStem = this.secondaryStem + secndLastLetter + this.clusterBuster + lastLetter;
		} else {
			if(secndLastLetter == this.clusterBuster) {
				this.secondaryStem = this.secondaryStem + lastLetter;
			} else {
				alert("bad entry: cluster buster ("+this.clusterBuster+") not found in "+this.stem+".");
			}
		}
	}
};
Noun.prototype.guessGenderAndPlural = function() { // fails with мужчина, время, and words that end in ь 
    var suffix = getSuffix(this.word,1);
	if (suffix == "а" || suffix == "я") {
		this.gender = 1;
	} else if (suffix == "о" || suffix == "е") {
	    this.gender = 2;
	} else if (suffix == "и" || suffix == "ы") {
		this.isPlural = true;
		this.plural = this.word;
	} else if (!isVowel(suffix)) { // consonant
		this.gender = 0;
	} // leave undefined
};
Noun.prototype.generatePlural = function() {
    var newStem = this.stem;
    var ending = "";
    var lastLetter = getSuffix(this.word,1);
	if (!this.plural) {
		if(this.stemType == "hard") {
		   if (this.gender != 2) {
		   	   ending = "ы";
		   } else {
		       ending = "а";
		   }
		} else {
		   if (this.gender != 2) {
		   	   ending = "и";
		   } else {
		       ending = "я";
		   }
		}
		
		if(this.secondaryStem && !isVowel(lastLetter) && lastLetter != "й") { 
		    newStem = this.secondaryStem + ending;
	    } else {
			newStem = this.stem + ending;	
		}
	    this.plural = newStem;
	}
};
Noun.prototype.generateCases = function() { 
	for (var k in casesKeys) {
		this.cases[casesKeys[k]] = generateNounCase(casesKeys[k], this);
	}
};


function AdjectiveSet(masculineWord) {
    this.masculineWord = masculineWord;
	this.stem;
	this.stemType; // hard, soft, velar, husher
	this.genderSet = new Array();
	this.plural;
	
	this.generateStem();
	this.generateGenderSet();
	this.generatePlural();
	this.generateCases();
}
AdjectiveSet.prototype.generateStem = function() {
	var suffix = getSuffix(this.masculineWord,2);
	this.stem = this.masculineWord.substring(0, this.masculineWord.indexOf(suffix));
	
	var lastStemLetter    = this.stem.substring(this.stem.length-1, this.stem.length);
	var firstSuffixLetter = suffix.substring(0,1);
	
	if (firstSuffixLetter == "ы") {
	    this.stemType = "hard"; 
	} else if (suffix == "ой") {
		this.stemType = "end-stressed";
	} else if (isHusher(lastStemLetter)) {
		this.stemType = "husher";
	} else if (isVelar(lastStemLetter)) {
		this.stemType = "velar";
	} else {
	    this.stemType = "soft";
	}
};
AdjectiveSet.prototype.generateGenderSet = function() {
    for (var i = 0; i < 3; i++) {
    	this.genderSet[i] = new Adjective();
    	this.genderSet[i].gender = i;
    	this.genderSet[i].stem = this.stem;
    	this.genderSet[i].stemType = this.stemType;
    }
	this.genderSet[0].word = this.masculineWord;
	if (this.stemType == "hard" || this.stemType == "velar" || this.stemType == "end-stressed") {
	    this.genderSet[1].word = this.stem + "ая";
		this.genderSet[2].word = this.stem + "oe";
	} else if(this.stemType == "husher") {
	    this.genderSet[1].word = this.stem + "ая";
	    this.genderSet[2].word = this.stem + "ee";
	} else { // this.stemType == "soft"
		this.genderSet[1].word = this.stem + "яя";
		this.genderSet[2].word = this.stem + "ee";
	}
};
AdjectiveSet.prototype.generatePlural = function() {
    var lastStemLetter = this.stem.substring(this.stem.length-1, this.stem.length);
    this.plural = new Adjective();
    this.plural.isPlural = true;
	if (this.stemType == "hard" && !isSpellingRule(lastStemLetter)) {
		this.plural.word = this.stem + "ые";
	} else {
		this.plural.word = this.stem + "ие";
	}
	this.plural.stem = this.stem;
	this.plural.stemType = this.stemType;
};

function Adjective() {
    this.word;
    this.stem;
    this.stemType;
    this.gender = 3; //  default plural
    this.isPlural = false;
	this.cases = new Object();   // cases[case+anim]
}

AdjectiveSet.prototype.generateCases = function() { 
	for (var k in casesKeys) { 
		generateAdjectiveCase(casesKeys[k], this); 
	}
};


////////////////////////

function generateNounCase(caseType, noun) { 
	if (caseType == "N") {
		return generateNounNominativeCase(noun);
	} else if (caseType == "A") {
	    return generateNounAccusativeCase(noun);
	} else if (caseType == "G") {
	    return generateNounGenitiveCase(noun);
	} else if (caseType == "P") {
	    return generateNounPrepositionalCase(noun);
	} else if (caseType == "D") {
	    return generateNounDativeCase(noun);
	} else if (caseType == "I") {
	    return generateNounInstrumentalCase(noun);
	}
}

function generateAdjectiveCase(caseType, adjectiveSet) { 
	if (caseType == "N") {
		for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = adjectiveSet.genderSet[i].word;
	    }
	    adjectiveSet.plural.cases[caseType] = adjectiveSet.plural.word;
	} else if (caseType == "A") {
	    for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = generateAdjectiveAccusativeCase(adjectiveSet.genderSet[i], false);
	    }
	    adjectiveSet.plural.cases[caseType] = generateAdjectiveAccusativeCase(adjectiveSet.plural, false);
	} else if (caseType == "Aa") {
	    for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = generateAdjectiveAccusativeCase(adjectiveSet.genderSet[i], true);
	    }
	    adjectiveSet.plural.cases[caseType] = generateAdjectiveAccusativeCase(adjectiveSet.plural, true);
	} else if (caseType == "G") {
	    for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = generateAdjectiveGenitiveCase(adjectiveSet.genderSet[i]);
	    }
	    adjectiveSet.plural.cases[caseType] = generateAdjectiveGenitiveCase(adjectiveSet.plural);
	} else if (caseType == "P") {
	    for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = generateAdjectivePrepositionalCase(adjectiveSet.genderSet[i]);
	    }
	    adjectiveSet.plural.cases[caseType] = generateAdjectivePrepositionalCase(adjectiveSet.plural);
	} else if (caseType == "D") {
	    for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = generateAdjectiveDativeCase(adjectiveSet.genderSet[i]);
	    }
	    adjectiveSet.plural.cases[caseType] = generateAdjectiveDativeCase(adjectiveSet.plural);
	} else if (caseType == "I") {
	    for(var i = 0; i < adjectiveSet.genderSet.length; i++) {
	         adjectiveSet.genderSet[i].cases[caseType] = generateAdjectiveInstrumentalCase(adjectiveSet.genderSet[i]);
	    }
	    adjectiveSet.plural.cases[caseType] = generateAdjectiveInstrumentalCase(adjectiveSet.plural);
	}
}

function generateNounNominativeCase(noun) { 
    if (noun.isPlural) {
		return noun.plural;
	} else { 
		return noun.word;
	}
}


function generateNounAccusativeCase(noun) { 
    if (noun.gender == 1 && !noun.isPlural) { // feminine singular
		var lastWordLetter = getSuffix(noun.word, 1); 
		
		if (lastWordLetter == "я") {
			return noun.stem + "ю";
		} else if (lastWordLetter == "а") {
			return noun.stem + "у";
		} else { // ь
			return noun.word;
		}
	} else { // fem. plural, masc sing & plural, neut sing & plural
		if (!noun.isAnimate || noun.gender == 2) { // non-animate or neuter, plural or not
			return noun.word;
		} else { // animate nouns (sing or plural), not neuter
			return generateNounGenitiveCase(noun);
		}
	}
}

function generateAdjectiveAccusativeCase(adjective, ofAnimateNoun) { 
	if (adjective.gender == 1 && !adjective.isPlural) { // feminine singular
		var suffix = getSuffix(adjective.word, 2);
		if (suffix == "яя") {
			return adjective.stem + "юю";
		} else if (suffix == "ая") {
			return adjective.stem + "ую";
		} else {
			alert("I think this is not an adjective.")
		}
	} else {
		if (!ofAnimateNoun || adjective.gender == 2) { // non-animate or neuter, plural or not
			return adjective.word;
		} else { // animate nouns (sing or plural), not neuter
			return generateAdjectiveGenitiveCase(adjective);
		}
	}
}

function generateNounGenitiveCase(noun) { // still not OK - must review: семья, дочь, мать, люди.
    if (!noun.isPlural) {
	    if(noun.gender == 0 || noun.gender == 2) {
		    if(noun.stemType == "hard" || noun.stemType == "spelling-rule") {
			    return noun.stem + "а";
		    } else {
			    return noun.stem + "я";
		    }
	    } else { // noun.gender == 1
		    if(noun.stemType == "hard" && noun.stemType != "spelling-rule") {
			    return noun.stem + "ы";
		    } else {
			    return noun.stem + "и";
		    }
		}
	} else {  
	    var lastSingWordLetter = getSuffix(noun.word,1);
	    var lastSingStemLetter = getSuffix(noun.stem,1);
		if(isHusher(lastSingWordLetter) || lastSingWordLetter == "ь") {
			return noun.stem + "ей";
	    } else if (isVowel(lastSingWordLetter)) {
	    
	        var stem = noun.stem;
	        
	        if(noun.secondaryStem) {
	        	stem = noun.secondaryStem;
	        }
	        
			if (isSoftLetter(lastSingWordLetter)) {  
				if (isVowel(lastSingStemLetter) || lastSingStemLetter == "ь") {
					return stem + "й";
				} else { 
					return stem + "ь";
				}
			} else {
				return stem;
			}
		} else { // hard consonant
		    var ending = "ов";
		    if(lastSingWordLetter == "ц" || lastSingWordLetter == "й") { 
		        if (!isLastSyllableStressed(noun)) {
		    	    ending = "ев";
		        } else if(lastSingWordLetter == "й") { 
		        	ending = "ёв";
		        }
		        // stressed after ц = ов
			}

			if (noun.secondaryStem) {
				return noun.secondaryStem + ending;
			} else {
				return noun.stem + ending;
			}
		}
	}
}


function generateAdjectiveGenitiveCase(adjective) {
    if (adjective.isPlural) {
    	if (adjective.stemType == "hard") {
			return adjective.stem + "ых";
		} else { // husher or soft
			return adjective.stem + "их";
		}
    } else {
    	if(adjective.gender == 1) { // feminine
    		if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ой";
			} else { // husher or soft
				return adjective.stem + "eй";
			}
    	} else { // masc & neuter
    		if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ого";
			} else { // husher or soft
				return adjective.stem + "его";
			}
    	}
    }
}


function generateNounPrepositionalCase(noun) {
	if(!noun.isPlural) {
	    suffix1 = getSuffix(noun.word,1);
	    suffix2 = getSuffix(noun.word,2);
	    if (noun.uloc) {
	    	return noun.stem + "у";
	    } else if(noun.gender == 1 && (suffix1 == "ь" || suffix2 == "ия")) {
		    return noun.stem + "и";
		} else if (suffix2 == "ий" || suffix2 == "ие") {
			return noun.stem + "и";
		} else {
			return noun.stem + "e";
		}
	} else { // plural
	    if (noun.stemType == "soft") {
			return noun.stem + "ях";
		} else { 
			return noun.stem + "ах";
		}
		
		// deal with cbs like отец
	}
}

function generateAdjectivePrepositionalCase(adjective) {
	if(adjective.isPlural) {
		if (adjective.stemType == "hard") {
			return adjective.stem + "ых";
		} else { // husher or soft
			return adjective.stem + "их";
		}
	} else {
		if(adjective.gender == 1) {
			if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ой";
			} else { // husher or soft
				return adjective.stem + "eй";
			}
		} else {
			if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ом";
			} else { // husher or soft
				return adjective.stem + "ем";
			}
		}
	}
}

function generateNounDativeCase(noun) {
    suffix1 = getSuffix(noun.word,1);
	suffix2 = getSuffix(noun.word,2);
	
	if(noun.isPlural) {
		if (noun.stemType == "soft") {
			return noun.stem + "ям";
		} else { 
			return noun.stem + "ам";
		}
	} else {
		if(noun.gender == 1) {
			if (suffix1 == "ь") {
				return noun.stem + "и";
			} else if (suffix2 == "ия") {
				return noun.stem + "и";
			} else {
		    	return noun.stem + "е";
		    }
		} else {
		    if(noun.stemType == "hard" || noun.stemType == "spelling-rule") {
			    return noun.stem + "у";
		    } else {
			    return noun.stem + "ю";
		    }
		}
	}
}

function generateAdjectiveDativeCase(adjective) {
	if(adjective.isPlural) {
		if (adjective.stemType == "hard") {
			return adjective.stem + "ым";
		} else { // husher or soft
			return adjective.stem + "им";
		}
	} else {
		if(adjective.gender == 1) {
			if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ой";
			} else { // husher or soft
				return adjective.stem + "eй";
			}
		} else {
			if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ому";
			} else { // husher or soft
				return adjective.stem + "ему";
			}
		}
	}
}

function generateNounInstrumentalCase(noun) { // must check
	suffix1 = getSuffix(noun.word,1);
	secondLastChar = getSuffix(noun.word,2).substring(0,1);
	
	if(noun.isPlural) {
		if (noun.stemType == "soft") {
			return noun.stem + "ями";
		} else { 
			return noun.stem + "ами";
		}
	} else {
		if(noun.gender == 1) {
			if (suffix1 == "ь") {
				return noun.stem + "ью";
			} else if(noun.stemType == "hard" || (noun.stemType == "spelling-rule" && !isHusher(secondLastChar) )) {
				return noun.stem + "ой";
			} else {
		    	return noun.stem + "ей";
		    }
		} else {
		    if(noun.stemType == "hard") {
			    return noun.stem + "ом";
		    } else {
			    return noun.stem + "ем";
		    }
		}
	}
}

function generateAdjectiveInstrumentalCase(adjective) { // must check
	if(adjective.isPlural) {
		if (adjective.stemType == "hard") {
			return adjective.stem + "ыми";
		} else { // husher or soft
			return adjective.stem + "ими";
		}
	} else {
		if(adjective.gender == 1) {
			if (adjective.stemType == "hard" || adjective.stemType == "velar" || adjective.stemType == "end-stressed") {
				return adjective.stem + "ой";
			} else { // husher or soft
				return adjective.stem + "eй";
			}
		} else {
			if (adjective.stemType == "hard") {
				return adjective.stem + "ым";
			} else { // husher or soft
				return adjective.stem + "им";
			}
		}
	}
}



function isLastSyllableStressed(noun) {
	// discover position of last vowel in base stem
	var lastVowelPosition = -1;
	for(var i = noun.stem.length-1; i > 0; i--) { 
		if(isVowel(noun.stem.charAt(i))) {
			lastVowelPosition = i;
			break;
		}
	}
	if (noun.stressPosition >= lastVowelPosition) {
		return true;
	}
	return false;
}

function getSuffix(word, size) {
	return word.substring(word.length - size, word.length);
}

function isSoftLetter(letter) {
    var letters = /[ьйЙяЯеёЕЁиИюЮ]/;
    return letters.test(letter);
}

function isVelar(letter) {
    var letters = /[кКгГхХ]/;
    return letters.test(letter);
}
function isHusher(letter) {
    var letters = /[жЖшШщЩчЧ]/;
    return letters.test(letter);
}

function getStressPosition(stem) {
	var spStart = stem.indexOf("[");
	var spEnd = stem.indexOf("]");
	if (spStart > 0) { 
	    return parseInt(stem.substring(spStart+1, spEnd));
	} else {
	    return 0; // single syllable
	}
}

function getUloc(stemString) {
	if (stemString.indexOf("{у}") > 0) {
	    return true;
	}
	return false;
}

function getStem(stemString) {
	var end = stemString.indexOf(" ");
	if (end < 0) {
	   end = stemString.indexOf("(");
	   if (end < 0) {
	       end = stemString.indexOf("[");
	   }
	}
	if (end < 0) {
	   return stemString.trim();
	} else {
	   return stemString.substring(0,end);
	}
}




////////////////////  testing  /////////////////////

function testNouns() {  
    var result = "";
	var n = createNounFromNotation(nouns[29]);

	n.isPlural = true;
	n.isAnimate = false;
	
	n.generateCases();
	
	for (var k in casesKeys) {
		result += casesKeys[k] + ": " + n.cases[casesKeys[k]] + "\n";
	}
    alert(result); 
}

function testAdjectives() {
  var result = "";
  //for(var i = 0; i < adjectives.length; i++) {
  
    for (var k in casesKeys) {
    
		var adjset = new AdjectiveSet(adjectives[1]);
	
		var plural = adjset.plural.cases[casesKeys[k]] + "\n";
		result += "pl["+casesKeys[k]+"]: " + plural + "; ";
	
		for (var j = 0; j < adjset.genderSet.length; j++) {
			var adjective = adjset.genderSet[j];
			result += "g["+j+"]["+casesKeys[k]+"]: " + adjective.cases[casesKeys[k]] + "; ";
		}
	
	}
	
	result += "\n";
	
  //}
  alert(result);
}
