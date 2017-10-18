var g_list_domlist = new Array("a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "slot", "small", "Source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp");

function generateRndDomVarFromTank()
{
	return g_list_domlist[parseInt(rand(g_list_domlist.length))];
}

function generateRndDomVarFromIndex(arr, maxIndex)
{
	return arr[parseInt(rand(maxIndex))];
}


function initVariantAttrofdom()
{
	for(let i = 0; i < g_variant_tank_count_attrofobject; i++)
	{
		//set attr
		    //todo: add things here.
		    //you sohuld give the initial attribute of the given dom here.
		//set css
		    //and more css rules here.
	}
}

function initVariantDomy()
{
	for(var i = 0; i < g_variant_tank_count_domy; i++)
	{
		g_tankVariant_domy[i] = "v_domy_" + i.toString();
		g_initScript += "var " + g_tankVariant_domy[i] + "= document.createElement(\"" + generateRndDomVarFromTank() + "\");\r\n";
		
		var times = 1 + rand(4);
		let j = 0;
		while(j++ < times)
		{
		    if(i >= 1)
		        g_initScript += "try {\r\n" + generateRndDomVarFromIndex(g_tankVariant_domy, i) + ".appendChild(" + g_tankVariant_domy[i] + ");\r\n} catch(e) {} \r\n";
		}
	}
	
	//finally attach those elements into the page.
	g_initScript += "try{ document.body.appendChild(v_domy_0); } catch(e) {}; \r\n"; 
}
