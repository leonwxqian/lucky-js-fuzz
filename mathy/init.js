
function initVariantTankMathy()
{
	for(var i = 0; i < g_variant_tank_count_mathy; i++)
	{
		g_tankVariant_mathy[i] = "v_mathy_" + i.toString();
		g_initScript += "try{ var v_mathy_" + i.toString() + " = " + generateRndPureNumber() + ";} catch(e) {} \n";
	}
}