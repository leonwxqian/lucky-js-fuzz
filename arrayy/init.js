
function initVariantArrayy()
{
	for(var i = 0; i < g_variant_tank_count_arrayy; i++)
	{
		g_tankVariant_arrayy[i] = "v_arrayy_" + i.toString();
		g_initScript += "try{ var v_arrayy_" + i.toString() + " = new Array(" + generateOneArrayInitTable() + "); } catch(e) {} \n";
	}
}



function generateOneArrayInitTable()
{
	var out = '';
	var rndOp = rand(3);
	switch(rndOp)
	{
		case 0:
			return '';
		case 1:
			return generateRndNumber();
		case 2:
		{
			//generate an init-list.
			//this could be ANY type, feel excited?
			
			var maxItems = 2 + rand(13);
			var func = function(){
			 switch(rand(3))
				{
					case 0:
						out += generateOneMathStatement('', 0, 2);
						break;
					case 1:
						out += generateOneRegex(false);
						break;
					case 2:
						//out += "\"" + generateOneStringStatement(true) + "\"";
						out += generateOneStringStatement(true) ;
						break;
					//todo : add more more more!
					//	funcs or whatever!
				}
			}
			
			for(var i=0; i < maxItems; i++)
			{
				func();
				out += ",";
			}
			
			func();
		}
	}
	if(out[out.length - 1] == ',') out=out+"0";
	if(out[0] == ',') out = '0' + out;
	return out;
}