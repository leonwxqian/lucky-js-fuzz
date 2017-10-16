
function generateRandomChar(length, pureString) {
    var str = '';
    for ( ; str.length < length;)
	{
		switch(rand(4))
		{
			case 0: //25% chance
				if(!pureString)
				{
					//str += generateRandomRegexMeta();
					str+="\\x41";
					break;
				}
			case 1:
			case 2:
			case 3:
				str += Math.random().toString(36).substr(3,1);
				break;
		}
	}
    return str;
}

function generateOneRndUnicodeOrNormal()
{
	//return ('0x' + getRandomInt(0, 9999).toString());
	return String.fromCharCode(rand(0xffff));
}


var g_ruleList_string_Operations = new Array(

		[STRING, 2, STRING, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].charAt([2])", FRAGMENT],
		[STRING, 2, STRING, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].concat([2])", FRAGMENT],
		[STRING, 1, COMMA_MULTILIST, CAN_BE_INSTANT_VAL, "String.fromCharCode([1])", FRAGMENT],
		[NUMBER, 2, STRING, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].indexOf([2])", FRAGMENT],
		[STRING, 2, STRING, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].lastIndexOf([2])", FRAGMENT],
		[STRING, 2, STRING, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL,"[1].localeCompare([2])", FRAGMENT],
		[STRING, 2, STRING, CAN_BE_INSTANT_VAL, REGEX, CAN_BE_INSTANT_VAL,"[1].match([2])", FRAGMENT],
		[STRING, 3, STRING, CAN_BE_INSTANT_VAL, REGEX, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].replace([2], [3])", FRAGMENT],
		[STRING, 2, STRING, CAN_BE_INSTANT_VAL, REGEX, CAN_BE_INSTANT_VAL,"[1].search([2])", FRAGMENT],
		[STRING, 3, STRING, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].slice([2], [3])", FRAGMENT],
		[STRING, 3, STRING, CAN_BE_INSTANT_VAL, REGEX, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL,  "[1].split([2], [3])", FRAGMENT],
		[STRING, 3, STRING, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL,  "[1].split([2], [3])", FRAGMENT],
		[STRING, 3, STRING, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].substr([2], [3])", FRAGMENT],
		[STRING, 3, STRING, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].substring([2], [3])", FRAGMENT],
		[STRING, 1, STRING, CAN_BE_INSTANT_VAL, "[1].toLocaleLowerCase()", FRAGMENT],
		[STRING, 1, STRING, CAN_BE_INSTANT_VAL, "[1].toLocaleUpperCase()", FRAGMENT],
		[STRING, 1, STRING, CAN_BE_INSTANT_VAL, "[1].toLowerCase()", FRAGMENT],
		[STRING, 1, STRING, CAN_BE_INSTANT_VAL, "[1].toUpperCase()", FRAGMENT],
		[STRING, 1, STRING, CAN_BE_INSTANT_VAL, "[1].toString()", FRAGMENT],
		[STRING, 1, STRING, CAN_BE_INSTANT_VAL, "[1].valueOf()", FRAGMENT]
);


function generateOneString()
{
	var out = '';
	var len = 1 +rand(14);
	for(var i = 0; i < len; i++)
	{
		switch(rand(2))
		{
			case 0:
				out += generateRandomChar(5, false);
				break;
			case 1:
				out += generateOneRndUnicodeOrNormal();
				break;
		}
	}
	out = out.replace(/\r/g,"x")
	out = out.replace(/\n/g,"x")
	out = out.replace(/"/g,"x")
	out = out.replace(/\u2028/g,"x")
	out = out.replace(/\u2029/g,"x")
	return out;
	
}

function generateRndStringVarFromTank()
{
	return g_tankVariant_stringy[parseInt(rand(g_tankVariant_stringy.length))];
}

// you can specific to replace [1] or something with specific
// statement so you can fuzz like a chain-statement
// EG: replace all STRING with specific "XXX" will generate:
// 1time :	"XXX".toLowerCase() -->Statement1
// 2times:   Statement1.toString() -->Statement2
// 3times:   Statement2.split('X', 4958);
//
// output: "XXX".toLowerCase().toString().split('X', 4958);
//

function parseOneFragRuleStringyWithStatement(rule, fragment, replaceWhom)
{
	var pos = 0;
	var maximumArgCount = rule[1];
	var tempTank = new Array();
	var tankCount = 0;
	
	//rule[0] : return type
	//rule[1] : frag count
	//rule[2] : frag descriptor
	
	for(var i = 0, j = 0; i < maximumArgCount; i += 1, j += 2)
	{
		if(rule[2 + j] == STRING && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
		{
			var choose = rand(2);
			switch(choose)
			{
				case 0:
					//from global string tank;
					tempTank[tankCount++] = generateRndStringVarFromTank();
					break;
				case 1:
					tempTank[tankCount++] = "\"" + generateOneString() + "\"";
					break;
				
				//todo: from global runtime tank;
			}
		}
		else if(rule[2 + j] == REGEX && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
		{
			var choose = rand(2);
			switch(choose)
			{
				case 0:
					//from global regex tank;
					tempTank[tankCount++] = generateRndRegexVarFromTank();
					break;
				case 1:
					tempTank[tankCount++] = generateOneRegex(true) ;
					break;
				
				//todo: from global runtime tank;
			}
		}
		else if(rule[2 + j] == NUMBER && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndVarFromTank();
		else if(rule[2 + j] == NUMBER && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndNumber();
		else if(rule[2 + j] == GENERAL_OBJECT && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndVarFromTank();
		else if(rule[2 + j] == GENERAL_OBJECT && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndNumber();
		else if(rule[2 + j] == COMMA_MULTILIST)
			tempTank[tankCount++] = generateOneMathStatement('', 0, 2);
		
	}
	
	var fragmentFormat = rule[j + 2];
	for(var i = 1; i <= maximumArgCount; i++)
	{
		if(replaceWhom == i)
			fragmentFormat = fragmentFormat.replace('[' + replaceWhom.toString() + ']', fragment);
		else
			fragmentFormat = fragmentFormat.replace('[' + i.toString() + ']', tempTank[i - 1]);
	}
	
	return fragmentFormat;
}


//parse one rule and generate one fragment.
function parseOneFragRuleStringy(rule)
{
	var pos = 0;
	var maximumArgCount = rule[1];
	var tempTank = new Array();
	var tankCount = 0;
	
	//rule[0] : return type
	//rule[1] : frag count
	//rule[2] : frag descriptor
	
	for(var i = 0, j = 0; i < maximumArgCount; i += 1, j += 2)
	{
		if(rule[2 + j] == STRING && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
		{
			var choose = rand(2);
			switch(choose)
			{
				case 0:
					//from global string tank;
					tempTank[tankCount++] = generateRndStringVarFromTank();
					break;
				case 1:
					tempTank[tankCount++] = "\"" + generateOneString() + "\"";
					break;
				
				//todo: from global runtime tank;
			}
		}
		else if(rule[2 + j] == REGEX && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
		{
			var choose = rand(2);
			switch(choose)
			{
				case 0:
					//from global regex tank;
					tempTank[tankCount++] = generateRndRegexVarFromTank();
					break;
				case 1:
					tempTank[tankCount++] = generateOneRegex(true) ;
					break;
				
				//todo: from global runtime tank;
			}
		}
		else if(rule[2 + j] == NUMBER && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndVarFromTank();
		else if(rule[2 + j] == NUMBER && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndNumber();
		else if(rule[2 + j] == GENERAL_OBJECT && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndVarFromTank();
		else if(rule[2 + j] == GENERAL_OBJECT && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
			tempTank[tankCount++] = generateRndNumber();
		else if(rule[2 + j] == COMMA_MULTILIST)
			tempTank[tankCount++] = generateOneMathStatement('', 0, 2);
		
	}
	
	var fragmentFormat = rule[j + 2];
	for(var i = 1; i <= maximumArgCount; i++)
	{
		fragmentFormat = fragmentFormat.replace('[' + i.toString() + ']', tempTank[i - 1]);
	}
	
	return fragmentFormat;
}

function generateOneStringStatement(bExactOneStatement)
{
	var out = '';
	var genTimes = 2 + rand(4);
	
	var bStartWithLastStatement = false;
	var sLastStatement = '';
	
	for(var i = 0; i < genTimes; i++)
	{
		var tmpRule = g_ruleList_string_Operations[rand(g_ruleList_string_Operations.length)];
		
		var retType = tmpRule[0];
		
		var tmpFragment;
		
		if(bStartWithLastStatement)
		{
			//usually, replace the first one is the safest way to do this..
			//you can idenfify this by type and write a more robust code. It all depends on you.
			tmpFragment = parseOneFragRuleStringyWithStatement(tmpRule, sLastStatement, 1);
		}
		else
		{
			tmpFragment = parseOneFragRuleStringy(tmpRule);
		}
		 
		
		if(rand(2) && retType == STRING && i != genTimes)
		{
			//generate chain statement!
			bStartWithLastStatement = true;
			sLastStatement = tmpFragment;
		}
		else
		{
			bStartWithLastStatement = false;
			if(bExactOneStatement)
			{
				out += tmpFragment;
				break;
			}
			else
				out += tmpFragment + ';\n';
		}
	}
	return out;
}



function stringFuzz()
{
	for(var i=0; i < 10; i++)
		stmtPush(generateOneStringStatement(false));
}
