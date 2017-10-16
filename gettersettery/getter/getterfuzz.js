/*
	1. getWho :
		the subject of which we will modify the getter function with.
		this could be an usual object, such as o1 in "var o1 = [];" but can not be "undefined",
	2. whichKey :
		set the key that we will access later. for ex. "k", we can access as o1["k"] or o1.k;
*/
function generateDefineGetterStmt(getWho, whichKey)
{
	g_tankVariant_data_getaccessKeyTank.push(getWho);
	g_tankVariant_data_getaccessValueTank.push(whichKey);
	
	var out = getWho + ".__defineGetter__(\"" + whichKey + "\", function () {";
	var maximumStmts = 4 + rand(5);
	
	var stmtCount = 1 + rand(15);
	out += generateClassFunctionStatements(stmtCount);
	out += "\r\nreturn " + getRndItemInGlobalTank();
	out += "\r\n});\r\n";
	
	out += getWho + "[\"" + whichKey + "\"];\r\n";
	//access key_value pairs randomly later!
	return out;
}

function getRandomKeyValuePairStr()
{
	var keyIndex = parseInt(rand(g_tankVariant_data_getaccessKeyTank.length));
	return g_tankVariant_data_getaccessKeyTank[keyIndex] + "[\"" + g_tankVariant_data_getaccessValueTank[keyIndex] + "\"]";
}

function getRandomKeyValuePairStr2()
{
	var keyIndex = parseInt(rand(g_tankVariant_data_getaccessKeyTank.length));
	return g_tankVariant_data_getaccessKeyTank[keyIndex] + "." + g_tankVariant_data_getaccessValueTank[keyIndex];
}


//this was usually NOT a STATEMENT but only a FRAGMENT
function generateOneRndGetFragment()
{
	return getRandomKeyValuePairStr();
}

function defineOneGetter()
{
	var g_prototypes_can_be_set = new Array(
		"this", "Object.prototype", "Array.prototype", "String.prototype", "Number.prototype", "Function.prototype", "Map.prototype", "Set.prototype",
		"ArrayBuffer.prototype", "DataView.prototype", "Promise.prototype"
	);
	
	var rndSubject = g_prototypes_can_be_set[parseInt(rand(g_prototypes_can_be_set.length))];
	var rndObject = g_tankVariant_attrofobject[parseInt(rand(g_tankVariant_attrofobject.length))];
	return generateDefineGetterStmt(rndSubject, rndObject);

}

//this shall be in init.js but we got a problem about sequence, so we just put it here temporarily
function initGetterInitFuzzer()
{
	for(var i = 0; i < g_variant_tank_count_getter; i++)
		 g_initScript += defineOneGetter() + "\r\n";
}

function fuzzGetter()
{
	var maximum = 4 + rand(20);
	for(var i = 0; i < maximum; i++)
		g_fuzzingStmtTank.push( "try{" + generateOneRndGetFragment() + "} catch(e){}; \r\n" );
}
