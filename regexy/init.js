function initVariantRegexy()
{
	for(var i = 0; i < g_variant_tank_count_regexy; i++)
	{
		g_tankVariant_regexy[i] = "v_regexy_" + i.toString();
		g_initScript += "try { var v_regexy_" + i.toString() + " = " + generateOneRegex(false) + ";} catch(e) {} \n";
	}
}