
function deleteEverything()
{
	//JS中的delete可不是c++的delete，delete只是用于删除对象的一个属性而已。所以，在这里我们还需要属性列表。
	var maximum = rand(40);
	for(var i = 0; i <  maximum; i++)
	{
		var tmpItem = getRandomKeyValuePairStr2();
		var out = "try{ delete " + tmpItem + "; } catch(e) {}; \n";
		g_fuzzingStmtTank.push ( out );
	}
}
