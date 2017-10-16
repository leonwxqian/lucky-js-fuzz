
function initVariantStringy()
{
	for(var i = 0; i < g_variant_tank_count_stringy; i++)
	{
		g_tankVariant_stringy[i] = "v_stringy_" + i.toString();
		g_initScript += "try{ var v_stringy_" + i.toString() + " = \"" + generateOneString() + "\";} catch(e) {} \n";
	}
}
