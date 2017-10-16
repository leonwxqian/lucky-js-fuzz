
//attr of object是一组预设的属性值，用来做class fuzz用，当然你也可以让它变成其他的什么也好
//在这里提前存储属性值的缘故是，之后可能会有频繁的操作读取，所以用固定的名字，可以更方便的让fuzzer取到正确属性。
function initVariantAttrofobject()
{
	for(let i = 0; i < g_variant_tank_count_attrofobject; i++)
	{
		//属性中生成的字符串没必要随机，这不会有什么大问题，7个字，足够小几率不重复就好。
		//加a是为了防止出现什么鬼数字开头的情况
		g_tankVariant_attrofobject.push("a" + generateRandomChar(7, true)); 
	}
}

function initVariantClassy()
{
	for(var i = 0; i < g_variant_tank_count_classy; i++)
	{
		g_tankVariant_classyf[i] = "f_classy_" + i.toString();
		g_tankVariant_classyv[i] = "v_classy_" + i.toString();
		g_initScript += "function f_classy_" + i.toString() + 
			"(input) {\n\tthis.fuzzy = input;\n};\n" +  
			"f_classy_" + i.toString() + 
			".prototype.fuzz = function() {\n\t\t\ttry{" + 
			generateClassFunctionStatements(12) + 
			";'warning2';return fuzzy;}catch(e){}\n}\n";
			
		g_initScript += "try{ var v_classy_" + i.toString() + " = new f_classy_" + i.toString() +"(" + genClassyInitParameter() + ");} catch(e) {}"
		//call v_classy_X.fuzz() anytime.
	}
}