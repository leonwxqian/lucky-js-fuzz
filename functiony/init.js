
function initVariantFunctiony()
{
	for(var i = 0; i < g_variant_tank_count_functiony; i++)
	{
		g_tankVariant_functiony[i] = "v_functiony_" + i.toString();
		g_initScript += "function v_functiony_" + i.toString() + "() {\n\ttry{" +  generateClassFunctionStatements(5) + "}catch(e){}\n};\n";
		
		//this function (a){return ..} was provided to use for iterators.
		g_tankVariant_functiony_iterator[i] = "v_iteratory_" + i.toString();
		
		var rndTwoWayOp = getRndTwoWayOp(false);
		var attr1 = generateRndClassAttrVarFromTank();
		var item1 = g_tankVariant_classyv[rand(g_tankVariant_classyv.length)];
		
		g_initScript += "function v_iteratory_" + i.toString() + "(a) {\n\t" +
			"try{\r\n" +  
				"return a " + rndTwoWayOp + attr1 + "." + item1 +
			"}catch(e){" +
			 "return true;" +
			 "}"+
		"\n};\n";
		
	}
}
