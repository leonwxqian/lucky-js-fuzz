
function generateRndClassAttrVarFromTank()
{
	return g_tankVariant_attrofobject[parseInt(rand(g_tankVariant_attrofobject.length))];
}

function genClassyInitParameter()
{
	var rnd = rand(8);
	switch (rnd)
	{
		case 0:
			return '';
		case 1:
			return 'this';
		case 2:
			return 'window';
		case 3:
			return 'navigator';
		case 4:
			return generateOneMathStatement('', 0, 2);
		case 5:
			return generateOneRegex(true);
		case 6:
			return generateOneStringStatement(true);
		case 7:
			return generateOneArrayStatement(true);
	}

}


function generateIfClause(ifWhat, ifTrueThenWhat, elseDoWhat)
{
	var out = "if (";
	out += ifWhat + ") {\n\t";
	out += ifTrueThenWhat + "\n}\n";
	if(elseDoWhat.length)
	{
		out += "else\n{\n\t"
		out += elseDoWhat + "\n}\n"
	}
	return out;
}

function generateOneJSONStatement()
{
	var items = rand(8);
	var out = '{';
	
	for(var i = 0; i < items; i++)
	{
		var keyLen = 2 + rand(6);
		var key = generateRandomChar(keyLen, false);
		var value = genClassyInitParameter();
		if(value == '') value = "\"\"";
		
		out +=  "\"" + key + "\"" + ":" + value + ", \n";
		
	}
	
	out += "}";
	return out;
}

function generateClassFunctionStatements(stmtcount)
{
	for(var i = 0; i < stmtcount; i++)
	{
		var rnd = rand(7);
		switch (rnd)
		{
			case 0:
			{
				var leftOprand = g_tankVariant_mathy[rand(g_tankVariant_mathy.length)];
				var rndTwoWayOp = getRndTwoWayOp(false);
				var rightOprand = rand(2) ? g_tankVariant_mathy[rand(g_tankVariant_mathy.length)] :
											generateOneMathStatement('', 0, 2);
				if(rightOprand.length < 2) rightOprand = 'this';
				if(rightOprand.indexOf("try{") != 0) 
					return leftOprand + rndTwoWayOp + rightOprand + ";\n";
				else
					return leftOprand + rndTwoWayOp + 'null; \n';
			}
			case 1:
			{
				var leftOprand = g_tankVariant_regexy[rand(g_tankVariant_regexy.length)];
				var assignOp = '=';
				var rightOprand = generateOneRegex(true);
				if(rightOprand.length < 2) rightOprand = 'this';
				
				return leftOprand + assignOp + rightOprand + ";\n" + leftOprand + ".compile();\n";
			}
			case 2:
			{
				var leftOprand = g_tankVariant_arrayy[rand(g_tankVariant_arrayy.length)];
				var assignOp = '=';
				var rightOprand = generateOneArrayStatement(true);
				
				//retry!
				if(rightOprand.length < 2) rightOprand = 'this';
				
				return leftOprand + assignOp + rightOprand + ";\n"
			}
			case 3:
			{
				var ifWhat = getRndItemInGlobalTank() + " instanceof " + getOneOfInstancesInRuntime();
				var thenWhat = getRndItemInGlobalTank() + " = " + generateOneJSONStatement();
				var elseWhat = rand(2) ? '' : getRndItemInGlobalTank() + " = " + generateOneJSONStatement();
				return generateIfClause(ifWhat, thenWhat, elseWhat);
			}
			case 4:
			{
				var accessWhat = getRndItemInGlobalTank();
				if(accessWhat == undefined || accessWhat == 'undefined')
					accessWhat = "[]"
				var accessStmt = generateElementAccess(accessWhat, rand(10));
				var rndTwoWayOp = getRndTwoWayOp(false);
				var rightOprand = rand(2) ? g_tankVariant_mathy[rand(g_tankVariant_mathy.length)] :
											generateOneMathStatement('', 0, 2);
				if(rightOprand.length < 2) rightOprand = 'this';
				if(rightOprand.indexOf("try{") == 0)  rightOprand = "null";
				
				return '"xy";'+ accessStmt + rndTwoWayOp + rightOprand + ";\n";
			}
			case 5:
			{
				var accessWhat = getRndItemInGlobalTank();
				var accessStmt = generateElementAccess(accessWhat, rand(0xffffffff));
				var rndTwoWayOp = getRndTwoWayOp(false);
				var rightOprand = rand(2) ? g_tankVariant_mathy[rand(g_tankVariant_mathy.length)] :
											generateOneMathStatement('', 0, 2);
				if(rightOprand.length < 2) rightOprand = 'this';
				if(rightOprand.indexOf("try{") == 0)  rightOprand = "null";
				
				return '"xz";'+ accessStmt + rndTwoWayOp + rightOprand + ";\n";
			}
			case 6:
			{
				var windowStmt = g_funcList_windowy_returnString[rand(g_funcList_windowy_returnString.length)];
				return windowStmt[windowStmt.length - 2].replace("[1]" , generateOneStringStatement(true));
			
			}
		}
	}
}


function generateClassAssignmentStmt()
{
	var attr1 = generateRndClassAttrVarFromTank();
	var attr2 = generateRndClassAttrVarFromTank();
	var item1 = g_tankVariant_classyv[rand(g_tankVariant_classyv.length)];
	var item2 = g_tankVariant_classyv[rand(g_tankVariant_classyv.length)];
	var op1 = getRndTwoWayOp(false);
	var op2 = getRndTwoWayOp(false);
	var out = item1 + "." + attr1 + " " + op1 + " (" + generateClassFunctionStatements(1 + rand(5)) + "); \r\n" + 
	item2 + "." + attr2 + " " + op2 + " (" + generateClassFunctionStatements(1 + rand(5)) + "); \r\n";
	
	for(var x = 0; x < 1; x++)
	{
		var assignmentTotal = 1 + rand(2);
		out += "Object.assign(" + (x == 0 ? item1 : item2);
		for(let i = 0; i < assignmentTotal; i++)
		{
			if(i != assignmentTotal)
				out += ",";
			if(rand(2))
				out += (x == 0 ? item2 : item1);
			else
				out += getRndItemInGlobalTank();
		}
		out += ");\r\n";
	}
	
	return out;
}

function generateOneClassFuzzStatement()
{
	var out = '';
	
	var item = g_tankVariant_classyv[rand(g_tankVariant_classyv.length)];
	var op = getRndTwoWayOp(false);
	out += item + ".fuzz(); \n";
	out += item + op + g_NScript_builtin_prototypes[rand(g_NScript_builtin_prototypes.length)] + "; 'warning';\n";
	
	return out;
}

function classFuzz()
{
	for(var i = 0; i < 10; i++)
		stmtPush(generateOneClassFuzzStatement());
}
