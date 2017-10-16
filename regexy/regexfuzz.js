
function generateRandomRegexMeta()
{

	var meta = new Array('.','\\w','\\W','\\d','\\D','\\s','\\S','\\b','\\B','\\0','\\n','\\f','\\r','\\t','\\v','\\xxx','\\xdd','\\uxxxx');
	var rndOne = meta[rand(meta.length)];
	if(rndOne == '\\xxx')
		rndOne = '\\0' + rand(0xff).toString(8);
	else if(rndOne == '\\xdd')
		rndOne = '\\x' + rand(0xff).toString(16);
	else if(rndOne == '\\uxxxx')
	{
		rndOne = rand(0xffff).toString(16);
		rndOne = '0000'.substr(0, 4 - rndOne.length) + rndOne;
		rndOne = '\\u' + rndOne;
	}
	
	return rndOne;
}


function generateRandomIntRange(){
	var p = parseInt(rand(10));
	var q = parseInt(rand(10));
	if(p < q)
		return p.toString() + "-" + q.toString();
	else
		return q.toString() + "-" + p.toString(); //edge complains about p is lager than q
}
function min(p , q)
{
	return p < q ? p : q
}

function max(p , q)
{
	return p > q ? p : q
}

function generateRandomCharRange(){
	var p = parseInt(rand(26));
	var q = parseInt(rand(26));
	var xcase = parseInt(rand(2));
	var r = xcase ? 0x41 : 0x61;
	var s = xcase ? 0x41 : 0x61; //edge complains about case difference....
	
	var minone = min(p, q);
	var maxone = max(p, q);
	return String.fromCharCode(minone + r) + "-" + String.fromCharCode(maxone + s);
}

function generateClassfier(noun)
{
	var cf = rand(13);
	switch(cf)
	{
		case 0:
			return noun + "+";
		case 1:
			return noun + "*";
		case 2:
			return noun + "?";
		case 3:
			return noun + "{" + rand(30).toString() + "}";
		case 4:
			return noun + "{" + rand(65535).toString() + "}"; //edge complains number is too large..
		case 5:
			var p = rand(30);
			var q = rand(30);
			return noun + "{" + min(p, q).toString() + "," + max(p, q).toString() + "}";	
		case 6:
			var p = rand(65535);
			var q = rand(65535);
			return noun + "{" + min(p, q).toString() + "," + max(p, q).toString() + "}";	
		case 7:
			return noun + "{" + rand(30).toString() + ",}";
		case 8:
			return noun + "{" + rand(65535).toString() + ",}";
		case 9:
			return noun + "$";
		case 10:
			return "^" + noun;
		case 11:
			return "?=" + noun; //edge complains nothing before ?=...
		case 12:
			return "?!" + noun;
	}
}

function generateRegexRange(){
	var type = rand(5);
	var output = '[';
	switch(type)
	{
		case 0: output += generateRandomChar(rand(10), false); break;
		case 1: output += '^' + generateRandomChar(rand(10), false); break;
		case 2: output += generateRandomIntRange(); break;
		case 3: output += generateRandomCharRange(); break;
		case 4: 
			output = '(';
			var max = rand(5);
			for(var i=0; i < max; i++)
				output += generateRandomChar(rand(10), true) + '|';
			output += generateRandomChar(rand(10), true) + ')';
			return output;
	}
	output += ']';
	return output;
}


function generateOneRegex(useAssignFormExplictly)
{
	var out;
	
	var assignForm = rand(2) ? true : false;
	if(useAssignFormExplictly)
		assignForm = true;
		
	if(assignForm)
		out = '/';
	else
		out = 'new RegExp(\"';
		
	var randStep = 2 + rand(10);
	for(var i = 0; i < randStep; i++)
	{
		var tmp = generateClassfier(generateRegexRange());
		if(tmp[0] == '?') tmp = 'o' + tmp;
		out += tmp;
		
		
		out += generateRandomChar(3, false);
	}
	
	if(assignForm)
		out += '/';
	else 
		out += "\", \"";
	
	switch(rand(3))
	{
		case 0:
			out += 'g';
			break;
		case 1:
			out += 'i';
			break;
		case 2:
			out += 'm';
			break;
	}
	
	if(!assignForm)
		out += "\")";
	return out;
}

function generateRndRegexVarFromTank()
{
	return g_tankVariant_regexy[parseInt(rand(g_tankVariant_regexy.length))];
}



function regexFuzz()
{
	//1. get one item from all tanks;
	//2. get rndOne from rndItemArray
	var strOut = '';
	for(var i = 0; i < 10; i++)
	{
		var rndItemArray = g_alltanks[rand(g_alltanks.length)];
		var rndOne = rndItemArray[rand(rndItemArray.length)]; 
		var rndRegex = g_tankVariant_regexy[rand(g_tankVariant_regexy.length)];
		
		//todo: pass these return value to a random object.
		switch(rand(2))
		{
			case 0:
				strOut += rndRegex + ".test(" + rndOne + ");\n";
				break;
			case 1:
				strOut += rndRegex + ".exec(" + rndOne + ");\n";
				break;				
				
		}
		
	}
	//3. test compile(). compiled items will be reused in galaxyFuzz.
	
	for(var i = 0; i < g_variant_tank_count_regexy; i++)
	{
		strOut += "v_regexy_" + i.toString() + " = " + generateOneRegex(true) + ";\n";
		strOut += "v_regexy_" + i.toString() + ".compile();\n";
	}
	
	/*
	todo: do this later.
	global
	ignoreCase
	lastIndex
	multiline
	source
	*/
	
	stmtPush(strOut);
	return strOut;
	
}

function generateSomeAggresiveString()
{
	return generateRandomRegexMeta();
}