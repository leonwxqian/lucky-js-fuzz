
function generateOneFunction(executeAfterDeclaration, argCount, needTryCatch)
{
	var out;
	var argList = '';
	var callList = '';
	for(var i = 0; i < argCount; i++)
	{
		if(i != argCount -1)
		{
			argList += "tmp_arg_" + i.toString() + ", "
			callList += '1, '
		}
		else
		{
			argList += "tmp_arg_" + i.toString()
			callList += '1'
		}
	}
	
	if(needTryCatch)
	{
		if(executeAfterDeclaration)
			out = '(function (' + argList + '){\ntry{';
		else
			out = 'function (' + argList + '){\ntry{';
	}
	else
	{
		if(executeAfterDeclaration)
			out = '(function (' + argList + '){\n';
		else
			out = 'function (' + argList + '){\n';
	}

		
	var stmtCount = 1 + rand(15);
	out += generateClassFunctionStatements(stmtCount);
	
	if(needTryCatch)
	{
		if(executeAfterDeclaration)
			out += "\n}catch(e){}})(" + callList + ");\n";
		else 
			out += "\n}catch(e){}};\n";
	
	}
	else
	{
		if(executeAfterDeclaration)
			out += "\n})(" + callList + ");\n";
		else 
			out += "\n};\n";
	}
		
	return out;
}

function functionFuzz()
{
	for(var i=0; i < 10; i++)
		stmtPush(generateOneFunction(rand(2), rand(2), true));
}