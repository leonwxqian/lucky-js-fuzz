
//parse one rule and generate one fragment.
function parseOneFragRuleMathy(rule)
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
		if(rule[2 + j] == NUMBER && rule[2 + j + 1] == CANT_BE_INSTANT_VAL)
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

function parseOneFragRuleMathyWithFragment1Arg(rule, value)
{
	var pos = 0;
	var maximumArgCount = rule[1];
	var tempTank = new Array();
	var tankCount = 0;
	
	for(var i = 0, j = 0; i < maximumArgCount; i += 1, j += 2)
	{
		;
	}
	
	var fragmentFormat = rule[j + 2];
	for(var i = 1; i <= maximumArgCount; i++)
	{
		fragmentFormat = fragmentFormat.replace('[' + i.toString() + ']', value);
	}
	
	return fragmentFormat;
}


function generateOneMathStatement(originalStat, currentNestLevel, maxNestLevel)
{
	var sStatement = originalStat;
	var sStatmentThisStep = '';
	
	var iNestLevel = currentNestLevel;
	
	var currentStat = NONE;
	
	while((currentStat == NONE || currentStat == FRAGMENT) && iNestLevel < maxNestLevel)
	{		
		sStatmentThisStep = '';
		
		var rndOp = parseInt(rand(4));
		var rule;
		var bCanNest = false;
		switch(rndOp)
		{
			case 0:
				//rule = g_ruleList_general_assignment[parseInt(rand(g_ruleList_general_assignment.length))];

				//break;
			
			case 2:
				rule = g_ruleList_mathy[parseInt(rand(g_ruleList_mathy.length))];
				break;
			case 1:
			
				//rule = g_ruleList_mathy_statement[parseInt(rand(g_ruleList_mathy_statement.length))];
				//break;
			case 3:
				rule = g_funcList_mathy[parseInt(rand(g_funcList_mathy.length))];
				bCanNest = true;
				break;
		}
		
		if(!bCanNest || iNestLevel >= maxNestLevel)
		{
			sStatmentThisStep =  parseOneFragRuleMathy(rule);	
		}
		else
		{
			iNestLevel++;
			sStatmentThisStep = generateOneMathStatement(sStatement, iNestLevel, maxNestLevel);
			sStatmentThisStep = parseOneFragRuleMathyWithFragment1Arg(rule, sStatmentThisStep);
		}
				
		if(bCanNest)
			sStatement = sStatmentThisStep;
		else if(sStatement.length > 0)
			sStatement =   sStatement + ", " + sStatmentThisStep;
		else
			sStatement +=  sStatmentThisStep;
			
		currentStat = rule[rule.length - 1];
		
		// 1/3 chance: stop generate statement
		//if(currentStat != NONE && rand(10) < 3) 
		//	break;
	}
	
	return sStatement;
	
}

function mathFuzz()
{
	 for(var i =0 ; i < 10; i++)
		stmtPush(generateOneMathStatement('', 0, 2))
}