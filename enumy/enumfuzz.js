

function generateOneEnumStatement()
{
	var rndItem = g_tankVariant_enumeratory[rand(g_tankVariant_enumeratory.length)];
	
	switch(rand(4))
	{
		case 0:
			return rndItem + ".atEnd()";
		case 1:
			return rndItem + ".item()";
		case 2:
			return rndItem + ".moveFirst()";
		case 3:
			return rndItem + ".moveNext()";
	}

}

function enumFuzz()
{
	for(var i =0; i < 10; i++)
		stmtPush(generateOneEnumStatement());
}
