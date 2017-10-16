
function initVariantEnumeratory()
{
	for(var i = 0; i < g_variant_tank_count_enumeratory; i++)
	{
		g_tankVariant_enumeratory[i] = "v_enumy_" + i.toString();
		g_initScript += "try { var v_enumy_" + i.toString() + " = new Enumerator([" + generateOneArrayInitTable() + "]);} catch(e) {} \n";
		g_initScript += "try { v_enumy_" + i.toString() + ".moveFirst();} catch(e) {} \n";
	}
}
