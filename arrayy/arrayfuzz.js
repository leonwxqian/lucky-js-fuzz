

var g_ruleList_array_Operations = new Array(
		//retvalue, argcount, argtype, argdecl., func decl., fragment type
		[ARRAY, 2, ARRAY, CAN_BE_INSTANT_VAL, COMMA_MULTILIST, CAN_BE_INSTANT_VAL, "[1].concat([2])", FRAGMENT],
		[STRING, 2, ARRAY, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].join([2])", FRAGMENT],
		[STRING, 1, ARRAY, CAN_BE_INSTANT_VAL, "[1].join()", FRAGMENT],
		[UNDEFINED, 1, ARRAY, CANT_BE_INSTANT_VAL, "[1].pop()", STATEMENT],
		[NUMBER, 2, ARRAY, CANT_BE_INSTANT_VAL, COMMA_MULTILIST, CAN_BE_INSTANT_VAL, "[1].push([2])", STATEMENT],
		[ARRAY, 1, ARRAY, CAN_BE_INSTANT_VAL, "[1].reverse()", FRAGMENT],
		[OBJECT, 1, ARRAY, CANT_BE_INSTANT_VAL, "[1].shift()", FRAGMENT],
		[ARRAY, 2, ARRAY, CANT_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].slice([2])", FRAGMENT],
		[ARRAY, 3, ARRAY, CANT_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].slice([2], [3])", FRAGMENT],
		[ARRAY, 1, ARRAY, CAN_BE_INSTANT_VAL, "[1].sort()", FRAGMENT],
		[ARRAY, 2, ARRAY, CAN_BE_INSTANT_VAL, FUNCTION, CAN_BE_INSTANT_VAL, "[1].sort([2])", FRAGMENT],
		[ARRAY, 3, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].splice([2], [3])", FRAGMENT],
		[ARRAY, 4, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, COMMA_MULTILIST, CAN_BE_INSTANT_VAL, "[1].splice([2], [3], [4])", FRAGMENT],
		[NUMBER, 2, ARRAY, CANT_BE_INSTANT_VAL, COMMA_MULTILIST, CAN_BE_INSTANT_VAL, "[1].unshift([2])", STATEMENT],
		[STRING, 1, ARRAY, CAN_BE_INSTANT_VAL, "[1].toString()", FRAGMENT],
		[STRING, 1, ARRAY, CAN_BE_INSTANT_VAL, "[1].toLocaleString()", FRAGMENT],
		[NUMBER, 1, ARRAY, CAN_BE_INSTANT_VAL, "[1].isArray()", FRAGMENT],
		//[ARRAY, 2, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].fill([2])", FRAGMENT],
		[NUMBER, 2, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].indexOf([2])", FRAGMENT],
		[NUMBER, 2, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].lastIndexOf([2])", FRAGMENT],
		//[ARRAY, 2, ARRAY, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].fill([2])", FRAGMENT],
		[NUMBER, 2, ARRAY, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].indexOf([2])", FRAGMENT],
		[NUMBER, 2, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, "[1].indexOf([2])", FRAGMENT],
		[NUMBER, 3, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, ARRAY, CAN_BE_INSTANT_VAL, "[1].indexOf([2], [3])", FRAGMENT],
		[NUMBER, 4, ARRAY, CAN_BE_INSTANT_VAL, NUMBER, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, FUNCTION, CAN_BE_INSTANT_VAL, "[1].indexOf([2], {[3]:[4]})", FRAGMENT],
		[NUMBER, 2, ARRAY, CAN_BE_INSTANT_VAL, STRING, CAN_BE_INSTANT_VAL, "[1].lastIndexOf([2])", FRAGMENT]
		
);


// you can specific to replace [1] or something with specific
// statement so you can fuzz like a chain-statement
// EG: replace all STRING with specific "XXX" will generate:
// 1time :	"XXX".toLowerCase() -->Statement1
// 2times:   Statement1.toString() -->Statement2
// 3times:   Statement2.split('X', 4958);
//
// output: "XXX".toLowerCase().toString().split('X', 4958);
//

function parseOneFragRuleArrayyWithStatement(rule, fragment, replaceWhom)
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
		if(rule[2 + j] == ARRAY && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
		{
			var choose = rand(2);
			switch(choose)
			{
				case 0:
					//from global string tank;
					tempTank[tankCount++] = generateRndArrayVarFromTank();
					break;
				case 1:
					tempTank[tankCount++] = "[" + generateOneArrayInitTable() + "]";
					break;
				
				//todo: from global runtime tank;
			}
		}
		else if(rule[2 + j] == ARRAY && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
		{
			tempTank[tankCount++] = generateRndArrayVarFromTank();
		}
		else if(rule[2 + j] == STRING && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
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
		else if(rule[2 + j] == COMMA_MULTILIST) //todo: does this need to change to meet our need??
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

function generateRndArrayVarFromTank()
{
	return g_tankVariant_arrayy[parseInt(rand(g_tankVariant_arrayy.length))];
}

//parse one rule and generate one fragment.
function parseOneFragRuleArrayy(rule)
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
		if(rule[2 + j] == ARRAY && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
		{
			var choose = rand(2);
			switch(choose)
			{
				case 0:
					//from global string tank;
					tempTank[tankCount++] = generateRndArrayVarFromTank();
					break;
				case 1:
					tempTank[tankCount++] = "[" + generateOneArrayInitTable() + "]";
					break;
				
				//todo: from global runtime tank;
			}
		}
		else if(rule[2 + j] == ARRAY && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
		{
			tempTank[tankCount++] = generateRndArrayVarFromTank();
		}
		else if(rule[2 + j] == STRING && rule[2 + j + 1] == CAN_BE_INSTANT_VAL)
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
		else if(rule[2 + j] == COMMA_MULTILIST) //todo: does this need to change to meet our need??
			tempTank[tankCount++] = generateOneMathStatement('', 0, 2);
		
	}
	
	var fragmentFormat = rule[j + 2];
	for(var i = 1; i <= maximumArgCount; i++)
	{
		fragmentFormat = fragmentFormat.replace('[' + i.toString() + ']', tempTank[i - 1]);
	}
	
	return fragmentFormat;
}


function generateOneArrayStatement(bExactOneStatement)
{
	var out = '';
	var genTimes = 2 + rand(4);
	
	var bStartWithLastStatement = false;
	var sLastStatement = '';
	
	for(var i = 0; i < genTimes; i++)
	{
		var tmpRule = g_ruleList_array_Operations[rand(g_ruleList_array_Operations.length)];
		
		var retType = tmpRule[0];
		
		var tmpFragment;
		
		if(bStartWithLastStatement)
		{
			//usually, replace the first one is the safest way to do this..
			//you can idenfify this by type and write a more robust code. It all depends on you.
			tmpFragment = parseOneFragRuleArrayyWithStatement(tmpRule, sLastStatement, 1);
		}
		else
		{
			tmpFragment = parseOneFragRuleArrayy(tmpRule);
		}
		 
		
		if(rand(2) && retType == ARRAY && i != genTimes)
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


function arrayFuzz()
{
	for(var i = 0; i < 10; i++)
		stmtPush(generateOneArrayStatement(false));
}
