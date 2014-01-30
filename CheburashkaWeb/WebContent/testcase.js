/**
 * Test case for conjugation generator
 */
 
var stemStrings = new Array(); // stem strings (notation)
stemStrings[0] = "читай+//про-";
stemStrings[1] = "говори+//сказа+";
stemStrings[2] = "смотре+//по-";
stemStrings[3] = "люби+//по-";
stemStrings[4] = "виде+//у-";
stemStrings[5] = "целовай+ся//по-";
stemStrings[6] = "знай+//у-";
stemStrings[7] = "танцевай+//с-";
stemStrings[8] = "обещай+//обещай+";
stemStrings[9] = "лежа+//{ляг+/лёг+}";
stemStrings[10] = "занимай+ся//{займ+/заня+ся}";
stemStrings[11] = "жив+//по-";
stemStrings[12] = "делай+//с-";
stemStrings[13] = "думай+//по-";
stemStrings[14] = "писа+//на-"; 
stemStrings[15] = "покупай+//купи+";
stemStrings[16] = "готови+//при-";
stemStrings[17] = "приноси+//принес+";
stemStrings[18] = "исчезай+//исчез[ну]+";
stemStrings[19] = "{пьй+/пи+}//вы-";
stemStrings[20] = "{пой+/пе+}//с-";
stemStrings[21] = "{ид+/шёл+(ё)}//{пойд+/пошёл+(ё)}";
stemStrings[22] = "приходи+//{прид+/пришёл+(ё)}";
stemStrings[23] = "мог+//с-";
stemStrings[24] = "{ед+/еха+}//по-";
stemStrings[25] = "начинай+//{начн+/нача+}";
stemStrings[26] = "плака+//за-";
stemStrings[27] = "спрашивай+//спроси+";
stemStrings[28] = "убивай+//{убьй+/уби+}";
stemStrings[29] = "пек+//ис-";
stemStrings[30] = "ложи+ся//{ляг+/лёг+}";
stemStrings[31] = "входи+//{войд+/вошёл+(ё)}";
stemStrings[32] = "чувствовай+//по-";
stemStrings[33] = "понимай+//{пойм+/поня+}";
stemStrings[34] = "улыбай+ся//улыбну+ся";
stemStrings[35] = "{встай+/вставай+}//встан+";

// Irregular in past or present (fails in one of the two) - TODO: add irregular verb database
stemStrings[36] = "хоте+//за-";
stemStrings[37] = "{есть/е+}//съ-";
stemStrings[38] = "давай+//{дать/да+}";


function toggleScript(ckbox, page) {
    if (!ckbox.checked) {
    	USE_IRREG_DB = true;
    } else {
    	USE_IRREG_DB = false;
    }
    page.innerHTML=''
    test(page);
}

function test(page) {
    var contents = document.createElement("ol");
 	page.appendChild(contents);

    for (var i = 0; i < stemStrings.length; i++) {
        conjugate(stemStrings[i], page, contents);
    }
}

function conjugate(stemString, page, contents) {
    stemString = stemString.trim();
	var pair = null;
	var v = null;
	if(stemString.indexOf("//") > 0) {
	   pair = getPairFromGrammarNotation(stemString);
	   pair.generateConjugations();
	   v = pair.impf;
	} else {
	   v = new Verb(stemString);
	   v.generateConjugations();
	}
  
	var verbSection = document.createElement("section");
	var header = document.createElement("h2");
	
	var impfSection = document.createElement("section");
	impfSection.setAttribute("class", "imperfective");

	var table1 = document.createElement("table");
	var table2 = document.createElement("table");
	var h31 = document.createElement("h3");
	var h32 = document.createElement("h3");
	
	var item = null;
	
	if (contents) {
	    item = document.createElement("li");
	    item.innerHTML = "<a href='#"+stemString+"'>"+stemString+"</а>";
	    contents.appendChild(item);
	}
	
	header.innerHTML = "<a name='"+stemString+"'>"+stemString+"</а>";
	
	h31.innerHTML = "PRESENT TENSE";
	table1.innerHTML += "<tr><td>я</td><td>"+v.presentTense.ya()+"</td></tr>";
	table1.innerHTML += "<tr><td>ты</td><td>"+v.presentTense.ty()+"</td></tr>";
	table1.innerHTML += "<tr><td>он, она, оно</td><td>"+v.presentTense.on()+"</td></tr>";
	table1.innerHTML += "<tr><td>мы</td><td>"+v.presentTense.my()+"</td></tr>";
	table1.innerHTML += "<tr><td>вы</td><td>"+v.presentTense.vy()+"</td></tr>";
	table1.innerHTML += "<tr><td>они</td><td>"+v.presentTense.oni()+"</td></tr>";
	
	h32.innerHTML = "PAST TENSE";
	table2.innerHTML += "<tr><td>я, ты, он</td><td>"+v.pastTense.on()+"</td></tr>";
	table2.innerHTML += "<tr><td>я, ты, она</td><td>"+v.pastTense.ona()+"</td></tr>";
	table2.innerHTML += "<tr><td>оно</td><td>"+v.pastTense.ono()+"</td></tr>";
	table2.innerHTML += "<tr><td>мы, вы, они</td><td>"+v.pastTense.oni()+"</td></tr>";
	
	verbSection.appendChild(header);
	
	impfSection.appendChild(h31);
	impfSection.appendChild(table1);
	impfSection.appendChild(h32);
	impfSection.appendChild(table2);
	
	verbSection.appendChild(impfSection);
	
	if (pair) { // do perfective tables
		var perfSection = document.createElement("section");
		perfSection.setAttribute("class", "perfective");
		
		var table3 = document.createElement("table");
		var table4 = document.createElement("table");
		var h33 = document.createElement("h3");
		var h34 = document.createElement("h3");
	
		h33.innerHTML = "PERFECTIVE FUTURE TENSE";
		table3.innerHTML = "<tr><td>я</td><td>"+pair.perf.presentTense.ya()+"</td></tr>";
		table3.innerHTML += "<tr><td>ты</td><td>"+pair.perf.presentTense.ty()+"</td></tr>";
		table3.innerHTML += "<tr><td>он, она, оно</td><td>"+pair.perf.presentTense.on()+"</td></tr>";
		table3.innerHTML += "<tr><td>мы</td><td>"+pair.perf.presentTense.my()+"</td></tr>";
		table3.innerHTML += "<tr><td>вы</td><td>"+pair.perf.presentTense.vy()+"</td></tr>";
		table3.innerHTML += "<tr><td>они</td><td>"+pair.perf.presentTense.oni()+"</td></tr>";
		
		h34.innerHTML = "PERFECTIVE PAST TENSE";
		table4.innerHTML = "<tr><td>я, ты, он</td><td>"+pair.perf.pastTense.on()+"</td></tr>";
		table4.innerHTML += "<tr><td>я, ты, она</td><td>"+pair.perf.pastTense.ona()+"</td></tr>";
		table4.innerHTML += "<tr><td>оно</td><td>"+pair.perf.pastTense.ono()+"</td></tr>";
		table4.innerHTML += "<tr><td>мы, вы, они</td><td>"+pair.perf.pastTense.oni()+"</td></tr>";
		
		perfSection.appendChild(h33);
		perfSection.appendChild(table3);
		perfSection.appendChild(h34);
		perfSection.appendChild(table4);
		
		verbSection.appendChild(perfSection);
	}
	
	page.appendChild(verbSection);
}