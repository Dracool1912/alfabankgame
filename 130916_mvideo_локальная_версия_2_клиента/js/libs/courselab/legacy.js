// CourseLab ToolBox
// v.2.7 20110710
//(c)2002-2011 Websoft Ltd. http://www.courselab.ru/ http://www.courselab.com/

var g_sSVGNameSpace = "http://www.w3.org/2000/svg";
var g_sXLinkNameSpace = "http://www.w3.org/1999/xlink";
var g_bDebugObjects = false;
var g_sCourseImages = "";
var g_sBlankImgSrc = "../courseimages/1blank.gif";
var g_oTextBuffer = null;


/*** Some array methods for IE5.0 compatibility ***/
// ShiftArray
var shiftArray = ShiftArray;
function ShiftArray(aArray)
{
	if(!(aArray instanceof Array)) return null;
	if(aArray.length==0) return null;
	try
	{
		return aArray.shift();
	}
	catch(e)
	{
		var vShifted = aArray[0];
		for(var i=0; i<aArray.length-1; i++) 	aArray[i] = aArray[i+1];
		aArray.length -= 1;
		return vShifted;
	}
	return null;
}

// UnshiftArray
var unshiftArray = UnshiftArray;
function UnshiftArray(aArray, vNewElement)
{
	if(!(aArray instanceof Array)) return null;

	try
	{
		return aArray.unshift(vNewElement);
	}
	catch(e)
	{
		aArray.length += 1;
		for(var i=aArray.length-1; i>0; i--) aArray[i] = aArray[i-1];
		aArray[0] = vNewElement;
		return aArray.length;
	}
	return null;
}

// PushArray
var pushArray = PushArray;
function PushArray(aArray, vNewElement)
{
	if(!(aArray instanceof Array)) return null;
	try
	{
		return aArray.push(vNewElement);
	}
	catch(e)
	{
		aArray.length += 1;
		aArray[aArray.length-1] = vNewElement;
		return aArray.length;
	}
	return null;
}

// PopArray
var popArray = PopArray;
function PopArray(aArray)
{
	if(!(aArray instanceof Array)) return null;
	if(aArray.length==null) return null;
	try
	{
		return aArray.pop();
	}
	catch(e)
	{
		var vPopped = aArray[aArray.length-1];
		aArray.length -= 1;
		return vPopped;
	}
	return null;
}

// SpliceArray
var spliceArray = SpliceArray;
function SpliceArray(aArray, iIndex, iLength)
{
	if(!(aArray instanceof Array)) return null;
	if(iIndex==null) return aArray;
	var iStartIndex = parseInt(iIndex, 10);
	if(isNaN(iStartIndex)) return aArray;
	var iToSplice = (iLength==null) ? 1 : parseInt(iLength,10);
	if(isNaN(iToSplice)) iToSplice = 1;
	var aSpliced;
	try
	{
		aArray.splice(iStartIndex, iToSplice);
		aSpliced = aArray;
	}
	catch(e)
	{
		aSpliced = new Array(0);
		var iIdx=0;
		for(var i=0; i<aArray.length; i++)
		{
			if(i<iStartIndex || i>=iStartIndex+iToSplice)
			{
				iIdx = aSpliced.length;
				aSpliced[iIdx] = aArray[i];
			}
		}
	}
	return aSpliced;
}


/*** Some string functions ***/

// ReplaceStr
var replaceStr = ReplaceStr;
function ReplaceStr(sTargetString, sToReplace, sReplaceBy) {

	var sResult = "";

	if(sToReplace=='\\"' && sReplaceBy=='"')
	{
		var reTarget = /\\\"/g;
		sResult = sTargetString.replace(reTarget,sReplaceBy)
		return sResult;
	}
	if(sToReplace=='"' && sReplaceBy=='\\"')
	{
		var reTarget = /\"/g;
		sResult = sTargetString.replace(reTarget,sReplaceBy)
		return sResult;
	}
	switch(sToReplace.charAt(0))
	{
		case "<":
		case "^":
		case "@":
		case "|":
			var sCorrectedToReplace = "\\"+sToReplace;
			break;
		case '\\':
			if(sToReplace=='\\"' && sReplaceBy=='"') sCorrectedToReplace = '\\\"';
			break;
		case '"':
			if(sToReplace=='"' && sReplaceBy=='\\"') sCorrectedToReplace = '\"';
			break;
		default:
			var sCorrectedToReplace = sToReplace;
			break;
	}
	var reTarget = new RegExp(sCorrectedToReplace,"g");
	sResult = sTargetString.replace(reTarget,sReplaceBy);
	return sResult;
}
// Legacy
function oldreplaceStr(string,text,by) {
// Replaces text with by in string
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;

    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;

    var newstr = string.substring(0,i) + by;

    if (i+txtLength < strLength)
        newstr += replaceStr(string.substring(i+txtLength,strLength),text,by);

    return newstr;
}

// Trim
var trim = Trim;
function Trim(sString, bStartSpace, bEndSpace, bDoubleSpace, bEnter)
{
	if(typeof sString != "string") return sString;
	var bStart = (bStartSpace!=false);
	var bEnd = (bEndSpace!=false);
	var bDblSpc = (bDoubleSpace!=false);
	var bCRLF = (bEnter!=false);
	var sReturn = sString;
	var sChar;
	if(bStart)
	{
		sChar = sReturn.substring(0, 1);
		while (sChar==" " || sChar=="\n" || sChar=="\r" || sChar=="\t")
		{
			sReturn = sReturn.substring(1, sReturn.length);
			sChar = sReturn.substring(0, 1);
		}
	}
	if(bEnd)
	{
   		sChar = sReturn.substring(sReturn.length-1, sReturn.length);
		while (sChar==" " || sChar=="\n" || sChar=="\r" || sChar=="\t")
		{
			sReturn = sReturn.substring(0, sReturn.length-1);
			sChar = sReturn.substring(sReturn.length-1, sReturn.length);
		}
	}
	if(bCRLF)
	{
		while (sReturn.indexOf("\n") != -1)
		{
			sReturn = sReturn.substring(0, sReturn.indexOf("\n")) +" "+ sReturn.substring(sReturn.indexOf("\n")+1, sReturn.length);
		}
		while (sReturn.indexOf("\r") != -1)
		{
			sReturn = sReturn.substring(0, sReturn.indexOf("\r")) + sReturn.substring(sReturn.indexOf("\r")+1, sReturn.length);
		}
		while (sReturn.indexOf("\t") != -1)
		{
			sReturn = sReturn.substring(0, sReturn.indexOf("\t")) + sReturn.substring(sReturn.indexOf("\t")+1, sReturn.length);
		}
	}
	if(bDblSpc)
	{
		while (sReturn.indexOf("  ") != -1)
		{
			sReturn = sReturn.substring(0, sReturn.indexOf("  ")) + sReturn.substring(sReturn.indexOf("  ")+1, sReturn.length);
		}
	}
	return sReturn;
}

// UnmaskValue
function UnmaskValue(sValue, sType)
{
	if(sValue==null) return null;
	var sNewValue = sValue;
	switch(sType)
	{
		case null:
			if(sNewValue.indexOf("@")==0) sNewValue = ReplaceStr(sNewValue, "@", "OBJ_");
			break;
		case "time":
		case "period":
			var aParts = sNewValue.split("~");
			var iIndex = parseInt(aParts[0], 10);
			if(isNaN(iIndex)) sNewValue;
			if(g_aConstants[iIndex]==null) return sNewValue;
			aParts[0] = g_aConstants[iIndex];
			sNewValue = sType=="time" ? aParts.join("T") : aParts.join("M");
			break;
	}
	return sNewValue;
}


// MaskValue
function MaskValue(sValue, sType)
{
	if(sValue==null) return null;
	var sNewValue = sValue;
	switch(sType)
	{
		case null:
			if(sNewValue.indexOf("OBJ_")==0) sNewValue = ReplaceStr(sNewValue, "OBJ_", "@");
			break;
		case "time":
			var aParts = sNewValue.split("T");
			var iIndex = g_aConstants.length;
			g_aConstants.push(aParts[0]);
			sNewValue = iIndex.toString() + "~" + aParts[1];
			break;
		case "period":
			var aParts = sNewValue.split("M");
			var iIndex = g_aConstants.length;
			g_aConstants.push(aParts[0]);
			sNewValue = iIndex.toString() + "~" + aParts[1];
			break;
	}
	return sNewValue;
}

/***  XML/XSL helpers ***/


// GetSibling
function GetSibling(oNode, sDir)
{
	if(g_isMSIE)
	{
		return sDir=="next" ? oNode.nextSibling : oNode.previousSibling;
	}
	else
	{
		var oParent = oNode.parentNode;
		if(oParent==null) return null;
		var aChildren = oParent.childNodes;
		var iCurrent = 0;
		if(sDir=="next")
		{
			for(var i=0; i<aChildren.length; i++)
			{
				if(aChildren[i].nodeType!=1) continue;
				if(aChildren[i]==oNode)
				{
					iCurrent = i;
					break;
				}
			}
			if(iCurrent>=aChildren.length) return null;
			for(var i=iCurrent+1; i<aChildren.length; i++)
			{
				if(aChildren[i].nodeType==1) return aChildren[i];
			}
		}
		else
		{
			var oParent = oNode.parentNode;
			if(oParent==null) return null;
			var aChildren = oParent.childNodes;
			var iCurrent = 0;
			for(var i=0; i<aChildren.length; i++)
			{
				if(aChildren[i].nodeType!=1) continue;
				if(aChildren[i]==oNode)
				{
					iCurrent = i;
					break;
				}
			}
			if(iCurrent<=0) return null;
			for(var i=iCurrent-1; i>=0; i--)
			{
				if(aChildren[i].nodeType==1) return aChildren[i];
			}
		}
		return null;
	}
}

// SetTextNodeValue
function SetTextNodeValue(oDoc, oNode, sValue)
{
	if(g_isMSIE)
	{
		oNode.text = sValue;
		return true;
	}
	else
	{
		if(oNode.hasChildNodes())
		{
			var aChildren = oNode.childNodes;
			for(var i in aChildren)
			{
				if(aChildren[i].nodeType==3)
				{
					aChildren[i].nodeValue = sValue;
					return true;
				}
			}
		}
		var oTextNode = oDoc.createTextNode(sValue);
		oNode.appendChild(oTextNode);
		return true;
	}
	return false;
}

// AppendNode
var appendNode = AppendNode;
function AppendNode(oDoc, oRoot, oChild, sText, sCDATA, aAttrs)
{
	var oTextNode;
	var oElemNode;
	if(sCDATA!=null && sCDATA!="")
	{
		oTextNode = oDoc.createCDATASection(sCDATA);
	}
	else
	{
		if(sText!=null && sText!="")
		{
			oTextNode = oDoc.createTextNode(sText);
		}
	}
	oElemNode = oDoc.createElement(oChild);
	if(aAttrs!=null)
	{
		for(var i=0;i<aAttrs.length;i++)
		{
			oElemNode.setAttribute(aAttrs[i].name, aAttrs[i].value);
		}
	}
	if(oTextNode!=null)
	{
		oElemNode.appendChild(oTextNode);
	}
	oRoot.appendChild(oElemNode);
	return oElemNode;
}

// TransformXSL
function TransformXSL(oNode,oTemplate)
{
    if(g_isMSIE)
    {
        return oNode.transformNode(oTemplate);
    }
    else if(g_isFirefox)
    {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(oTemplate);

        return xsltProcessor.transformToFragment(oNode,document);
    }
	return null;
}

// XSLApply
function XSLApply(oXML, oXSL)
{
	if(oXML==null || oXSL==null) return "";
	var oResult = CreateDOMDocument();
    if(g_isMSIE)
    {
        oResult.loadXML(TransformXSL(oXML, oXSL));
    }
    else if(g_isFirefox)
    {
        oResult = TransformXSL(oRubric, g_oRubricTemplate);
    }
	return oResult;
}

// XSLApplyWithParam
function XSLApplyWithParam(oXML, oXSL, aParams)
{
	var oXSLTProc;
	if(g_isMSIE)
	{
        var oXSLTemplate = new ActiveXObject("MSXML2.XSLTemplate.3.0");
        oXSLTemplate.stylesheet = oXSL;
        oXSLTProc = oXSLTemplate.createProcessor();
        oXSLTProc.input = oXML;
		if(aParams!=null)
		{
			for(var i=0; i<aParams.length; i++)
			{
				oXSLTProc.addParameter(aParams[i].name, aParams[i].value);
			}
		}
        oXSLTProc.transform();
        return oXSLTProc.output;
    }
	else if(g_isFirefox)
	{
        oXSLTProc = new XSLTProcessor();
        oXSLTProc.importStylesheet(oXSL);
		if(aParams!=null)
		{
			for(var i=0; i<aParams.length; i++)
			{
				oXSLTProc.setParameter(null, aParams[i].name, aParams[i].value);
			}
		}
        var oResult = oXSLTProc.transformToDocument(oXML);
        //serialise output to string
		var oXMLSerial = new XMLSerializer;
        return oXMLSerial.serializeToString(oResult);
    }
	return null;
}

// LoadFile
function LoadFile(sURL)
{
    if(sURL==null) return null;
    var oDoc = CreateDOMDocument();
	var bLoaded = false;
	try
	{
	    if(g_isMSIE)
	    {
		    oDoc.async = false;
		    bLoaded = oDoc.load(sURL);
	    }
	    else
		{
			if(g_isFirefox)
			{
				if(window.location.protocol=="http:")
				{
					var oRequest = new XMLHttpRequest();
					oRequest.open("GET", sURL, false);
					oRequest.send(null);
					if(oRequest.status == 200)
					{
						var sResponseText = oRequest.responseText;
						var objDOMParser = new DOMParser();
						var objDoc = objDOMParser.parseFromString(sResponseText, "text/xml");
						oDoc = objDoc;
						bLoaded = true;
					}
				}
				else
				{
					oDoc.async = false;
					bLoaded = oDoc.load(sURL);
				}
			}
	    }
	}
	catch(e)
	{
	    return null;
	}
	return bLoaded ? oDoc : null;
}

/*** DOM helpers ***/

// GetWindowSize
function GetWindowSize()
{
	var iW = 0;
	var iH = 0;
	if( typeof( window.innerWidth ) == "number" )
	{
    //Non-IE
		iW = window.innerWidth;
		iH = window.innerHeight;
	}
	else
	{
		if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
		{
		//IE 6+ in 'standards compliant mode'
			iW = document.documentElement.clientWidth;
			iH = document.documentElement.clientHeight;
		}
		else
		{
			if( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
			{
			//IE 4 compatible
				iW = document.body.clientWidth;
				iH = document.body.clientHeight;
			}
		}
	}
	this.w = iW;
	this.h = iH;
	return this;
}

// GetRelativeOffset
function GetRelativeOffset(oObject, oContainer, sCoord)
{
	var iOffset = 0;
	if(oObject==null || oContainer==null) return iOffset;
	var oTarget = oObject;
	var oParent = oTarget.offsetParent;
	iOffset += (sCoord=="x") ? oTarget.offsetLeft : oTarget.offsetTop;
	var iCnt = 0;
	do
	{
		oTarget = oParent;
		oParent = oTarget.offsetParent;
		iOffset += (sCoord=="x") ? oTarget.offsetLeft : oTarget.offsetTop;
		iCnt++;
		if(iCnt==100) return iOffset;
	}
	while(oParent!=null && oParent!=oContainer)
	return iOffset;
}

// GetParentByTagName
function GetParentByTagName(oElem, sTagName, iLimit)
{
	if(oElem==null || sTagName==null || sTagName=="") return null;
	var iMax = (iLimit==null) ? 10 : iLimit;
	var iCnt = 0;
	var oParent = oElem.parentNode;
	if(oParent==null) return null;
	while(oParent.nodeName.toLowerCase()!=sTagName.toLowerCase())
	{
		iCnt++;
		if(iCnt>iMax) return null;
		oParent = oParent.parentNode;
		if(oParent==null) return null;
	}
	return oParent;
}

// GetParentByClassName
function GetParentByClassName(oElem, sClassName, iLimit)
{
	if(oElem==null || sClassName==null || sClassName=="") return null;
	var iMax = (iLimit==null) ? 10 : iLimit;
	var iCnt = 0;
	var oParent = oElem.parentNode;
	if(oParent==null) return null;
	while(oParent.className!=sClassName)
	{
		iCnt++;
		if(iCnt>iMax) return null;
		oParent = oParent.parentNode;
		if(oParent==null) return null;
	}
	return oParent;
}

// GetElementOffset
function GetElementOffset(oElem, sCoord)
{
	if(oElem==null) return null;
	var iOffset = 0;
	var iCurOffset = 0;
	var oParent;
	var iCnt = 0;
	if(sCoord=="x")
	{
		iOffset = oElem.offsetLeft;
		oParent = oElem.offsetParent;
		do
		{
			iCurOffset = oParent.offsetLeft;
			if(iCurOffset!=null)
			{
				iCurOffset = parseInt(iCurOffset,10);
				if(!isNaN(iCurOffset))	iOffset += iCurOffset;
			}
			iCnt++;
		}
		while(oParent = oParent.offsetParent && iCnt<1000)
	}
	else
	{
		iOffset = oElem.offsetTop;
		oParent = oElem.offsetParent;
		do
		{
			iCurOffset = oParent.offsetTop;
			if(iCurOffset!=null)
			{
				iCurOffset = parseInt(iCurOffset,10);
				if(!isNaN(iCurOffset))	iOffset += iCurOffset;
			}
			iCnt++;
		}
		while(oParent = oParent.offsetParent && iCnt<1000)
	}
	return iOffset;
}

// GetElementByAttribute
function GetElementsByAttribute(aElements, sAttribute, sValue)
{
	if(aElements==null || sAttribute==null) return null;
	var sAttrValue = "";
	var aResult = new Array();
	for(var i=0; i<aElements.length; i++)
	{
		sAttrValue = aElements[i].getAttribute(sAttribute);
		if(sAttrValue==null) continue;
		if(sValue==null)
		{
			aResult.push(aElements[i]);
			continue;
		}
		else
		{
			if(sAttrValue==sValue) aResult.push(aElements[i]);
		}
	}
	return aResult;
}

// GetElementsByClassName
function GetElementsByClassName(aElements, sClassName)
{
	if(aElements==null || sClassName==null) return null;
	var aSelected = new Array();
	for(var i=0; i<aElements.length; i++)
	{
		if(aElements[i].className==sClassName) aSelected.push(aElements[i])
	}
	return aSelected.length>0 ? aSelected : null;
}

// GetElementSize
function GetElementSize(oElem)
{
	if(oElem==null) return null;
	var iW = 0;
	var iH = 0;
	if(oElem.offsetWidth)
	{
		iW = oElem.offsetWidth;
		iH = oElem.offsetHeight;
	}
	else
	{
		if(oElem.currentStyle)
		{
		// in IE
			iW = oElem.clientWidth - parseInt(oElem.currentStyle["paddingLeft"],10) - parseInt(oElem.currentStyle["paddingRight"],10);
			iH = oElem.clientHeight - parseInt(oElem.currentStyle["paddingTop"],10) - parseInt(oElem.currentStyle["paddingBottom"],10);
			// for IE5: var y = x.offsetWidth;
		}
		else
		{
			if (window.getComputedStyle)
			{
			// in Gecko
				//var iW = oElem.offsetWidth;
				iW = document.defaultView.getComputedStyle(oElem,null).getPropertyValue("width");
				//iH = document.defaultView.getComputedStyle(oElem,null).getPropertyValue("height");
				iH = oElem.offsetHeight;
			}
		}
	}
	this.w = iW;
	this.h = iH;
	return this;
}

// GetElementWidth
function GetElementWidth(oElem)
{
	if(oElem.currentStyle)
		// in IE
		var iW = oElem.clientWidth - parseInt(oElem.currentStyle["paddingLeft"]) - parseInt(oElem.currentStyle["paddingRight"]);
		// for IE5: var y = x.offsetWidth;
	else if (window.getComputedStyle)
		// in Gecko
		//var iW = oElem.offsetWidth;
		var iW = document.defaultView.getComputedStyle(oElem,null).getPropertyValue("width");
	return iW || 0;
}

// GetElementHeight
function GetElementHeight(oElem)
{
	if (oElem.currentStyle)
		// in IE
		var iH = oElem.clientHeight - parseInt(oElem.currentStyle["paddingTop"]) - parseInt(oElem.currentStyle["paddingBottom"]);
		// for IE5: var y = x.offsetWidth;
	else if (window.getComputedStyle)
		// in Gecko
		var iH = oElem.offsetHeight;
		//var iH = document.defaultView.getComputedStyle(oElem,null).getPropertyValue("height");
	return iH || 0;
}

// GetRect
var GetRect = getRect;
function getRect(ref)
{
	var linkx=0;
	var linky=0;
	var parent=ref;

	linkx=0;
	linky=0;
	linkt=0;
	linkb=0;

	while(parent) {
		linkx+=parent.offsetLeft;
		linky+=parent.offsetTop;
		if(parent.nodeName=="TD" && linkt==0) linkt=parent.offsetWidth;
		if(parent.nodeName=="TD") parent=parent.parentNode;
		if(parent.nodeName=="BODY" && linkb==0) linkb=parent.offsetWidth;
		if(parent.nodeName=="BODY") break;
		parent=parent.parentNode;
	}

	this.shiftx=linkx;
	this.shifty=linky;
	this.tdwidth=linkt;
	this.bodywidth=linkb;
	return this;
}


/*** Common helpers ***/

// voidfunc
function voidfunc()
{
}

// InnerText
function InnerText(oElem)
{
	var sResult = "";
	if(document.body.textContent)
	{
		sResult = oElem.textContent;
	}
	else if(document.body.innerText)
	{
    	sResult = oElem.innerText;
	}
	return sResult;
}

// Dice
var throwDice = Dice;
var ThrowDice = Dice;
function Dice(iMaxValue, bIncludeMaxValue, aUsedValues, iMaxTries) {
	var iRandomNumber = 0;
	var iCnt = 0;
	var bUsed = false;
	if(iMaxTries==null || isNaN(iMaxTries)) iMaxTries=100;
	do
	{
		if(bIncludeMaxValue)
		{
			iRandomNumber = Math.ceil(Math.random()*iMaxValue);
		}
		else
		{
			iRandomNumber = Math.floor(Math.random()*iMaxValue);
		}
		iCnt++;
		if(aUsedValues.length==0) return iRandomNumber;
		bUsed = true;
		for(var i=0;i<aUsedValues.length;i++) {
			if(aUsedValues[i]==iRandomNumber) {
				bUsed = false;
				break;
			}
		}
		if(bUsed) return iRandomNumber;
	}
	while(iCnt<iMaxTries);
	return 0;
}

// Legacy MM function
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr;
	for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

// Legacy MM function
function MM_preloadImages() { //v3.0
	var d=document;
	if(d.images) {
		if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
		for(i=0; i<a.length; i++)
		if(a[i].indexOf("#")!=0) {
			d.MM_p[j]=new Image;
			d.MM_p[j++].src=a[i];
		}
	}
}

// Legacy MM function
function MM_findObj(n, d) { //v3.0
	var p,i,x;
	if(!d) d=document;
	if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document;
		n=n.substring(0,p);
	}
	if(!(x=d[n])&&d.all) x=d.all[n];
	for(i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	return x;
}

// Legacy MM function
function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments;
	document.MM_sr=new Array;
	for(i=0;i<(a.length-2);i+=3) {
 		if((x=MM_findObj(a[i]))!=null) {
			document.MM_sr[j++]=x;
			if(!x.oSrc) x.oSrc=x.src;
			x.src=a[i+2];
		}
	}
}

// NumericCompare
function NumericCompare(v1,v2)
{
	var n1 = parseFloat(v1);
	var n2 = parseFloat(v2);
	if(isNaN(n1) || isNaN(n2)) return 0;
	return (n1-n2);
}

// PreventEvent
function PreventEvent(e)
{
	var oEvent = e || window.event;
	if (oEvent.preventDefault)
	{
		oEvent.preventDefault();
	}
	else
	{
		if(oEvent.cancelBubble)
		{
			oEvent.cancelBubble = true;
		}
		else
		{
			if (oEvent.stopPropagation)
			{
				oEvent.stopPropagation();
			}
			else
			{
				oEvent.returnValue = false;
			}
		}
	}
	return false;
}

/*** Converters ***/

// FormatReal_10_7
function FormatReal_10_7(param)
{
	if(param == null) return null;
	if(typeof param != "number")
	{
		var rArg = parseFloat(param);
		if(isNaN(rArg)) return null;
	}
	else
	{
		var rArg = param;
	}
	var sSign = rArg<0 ? "-" : "";
	rArg = Math.abs(rArg);
	var sArg = rArg.toString();
	if(sArg.indexOf("e")==-1)
	{
		if(sArg.indexOf(".")!=-1 && sArg.length<=8) return sSign+sArg;
		if(sArg.indexOf(".")==-1 && sArg.length<=7) return sSign+sArg;
		if(sArg.indexOf(".")!=-1 && sArg.length>8)
		{
			var aParts = sArg.split(".");
			if(aParts[0].length>7)
			{
				return sSign+aParts[0];
			}
			else
			{
				var iL = 8 - aParts[0].length;
				return sSign+aParts[0]+"."+aParts[1].substring(0,iL);
			}
			return sSign+sArg;
		}
		if(Math.abs(rArg)<0.5e-7) return "0";
	}
	return false;
}

// ConvertPeriodToISO8601
function ConvertPeriodToISO8601(iTime)
{
	if(isNaN(iTime)) return null;
	var iValue = Math.round(iTime/1000);
	var iDays = 0;
	var iHours = 0;
	var iMin = 0;
	var iSec = 0;
	if(iValue > 86399) {	iDays = Math.floor(iValue/86400);	iValue = iValue - 86400*iDays;	}
	if(iValue > 3599) {		iHours = Math.floor(iValue/3600);	iValue = iValue - 3600*iHours;	}
	if(iValue > 59) {		iMin = Math.floor(iValue/60);		iValue = iValue - 60*iMin;		}
	iSec = iValue;
	var sValue = "P";
	if(iDays != 0) sValue += iDays.toString()+"D";
	sValue += "T" + iHours.toString() + "H" + iMin.toString() + "M" + iSec.toString() + "S";
	return sValue;
}

// ConvertDateToISO8601
function ConvertDateToISO8601(dDate)
{
	var iTmp = dDate.getUTCMonth() + 1;
	var sMonth = iTmp.toString();
	if(sMonth.length==1) sMonth = "0" + sMonth;
	iTmp = dDate.getUTCDate();
	var sDate = iTmp.toString();
	if(sDate.length==1) sDate = "0" + sDate;
	iTmp = dDate.getUTCHours();
	var sH = iTmp.toString();
	if(sH.length==1) sH = "0" + sH;
	iTmp = dDate.getUTCMinutes();
	var sM = iTmp.toString();
	if(sM.length==1) sM = "0" + sM;
	iTmp = dDate.getUTCSeconds();
	var sS = iTmp.toString();
	if(sS.length==1) sS = "0" + sS;
	iTmp = dDate.getUTCMilliseconds();
	iTmp = Math.round(iTmp/10);
	var sMS = iTmp.toString();
	if(sMS.length==1) sMS = "0" + sMS;
	var sValue = dDate.getUTCFullYear() + "-" + sMonth + "-" + sDate + "T" + sH + ":" + sM + ":" + sS + "." + sMS + "Z";
	return sValue;
}

// ConvertDateFromISO8601
function ConvertDateFromISO8601(sDate)
{
	var sValue = sDate;
	sValue = sValue.toUpperCase();
	var dDate = new Date();
	var aParts = sValue.split("T");
	if(aParts.length!=2) return null;
	var aDate = aParts[0].split("-");
	var aTime = aParts[1].split(":");
	dDate.setUTCFullYear(parseInt(aDate[0],10));
	dDate.setUTCMonth(parseInt(aDate[1],10)-1);
	dDate.setUTCDate(parseInt(aDate[2],10));
	dDate.setUTCHours(parseInt(aTime[0],10));
	dDate.setUTCMinutes(parseInt(aTime[1],10));
	dDate.setUTCSeconds(parseInt(aTime[2],10));
	return dDate.valueOf();
}

// ConvertPeriodFromISO8601
function ConvertPeriodFromISO8601(sPeriod)
{
	var sValue = Trim(sPeriod,true,true,true,true);
	sValue = sValue.toUpperCase();
	var regDec = new RegExp("\\d+","g");
	var regNonDec = new RegExp("\\D","g");
	var aNums = sValue.match(regDec);
	var aLetters = sValue.match(regNonDec);
	if(aLetters[0]!="P") return null;
	var iValue = 0;
	var iMod = 0;
	var bTime = false;
	var iIndx = -1;
	var sTmp = "-";
	for(var i=1;i<aLetters.length;i++)
	{
		if(aLetters[i]=="T")
		{
			bTime = true;
			continue;
		}
		switch(aLetters[i])
		{
			case "Y":	iIndx++;	iValue += parseInt(aNums[iIndx],10)*977616000000; 	break;
			case "M":
				iIndx++;
				if(bTime)
				{
					iValue += parseInt(aNums[iIndx],10)*60000;
				}
				else
				{
					iValue += parseInt(aNums[iIndx],10)*2678400000;
				}
				break;
			case "D":	iIndx++; 	iValue += parseInt(aNums[iIndx],10)*86400000; 		break;
			case "H":	iIndx++; 	iValue += parseInt(aNums[iIndx],10)*3600000; 		break;
			case ".":	iIndx++;	sTmp = aNums[iIndx]; 								break;
			case "S":
				iIndx++;
				if(sTmp=="-")
				{
					iValue += parseInt(aNums[iIndx],10)*1000;
					break;
				}
				else
				{
					sTmp += "."+aNums[iIndx];
					iValue += parseFloat(sTmp)*1000;
				}
				break;
			default:	iMod = 0;			break;
		}
	}
	return iValue;
}

// ConvertCMITimeToInteger
function ConvertCMITimeToInteger(sTime)
{
	if(sTime==null || sTime=="") return "";
	var sValue = Trim(sTime);
	sValue = sValue.toUpperCase();
	var regDec = new RegExp("\\d+","g");
	var regNonDec = new RegExp("\\D","g");
	var aNums = sValue.match(regDec);
	var aLetters = sValue.match(regNonDec);
	var iDate = Date.UTC(aNums[0], aNums[1], aNums[2], aNums[3], aNums[4], aNums[5], aNums[6]!=null ? aNums[6] : 0);
	return iDate;
}

// ConvertCMITimespanToISO8601
function ConvertCMITimespanToISO8601(sTimespan)
{
	if(sTimespan==null || sTimespan=="") return "";
	var aParts = sTimespan.split(":");
	var iD = 0;
	var iH = 0;
	var iM = 0;
	var iS = 0;
	if(aParts.length==3)
	{
		iH = parseInt(aParts[0],10);
		if(iH>23)
		{
			iD = Math.floor(iH/24);
			iH = iH - iD*24;
		}
		iM = parseInt(aParts[1],10);
		iS = parseInt(aParts[2],10);
	}
	if(aParts.length==2)
	{
		iM = parseInt(aParts[0],10);
		iS = parseInt(aParts[1],10);
	}
	var sResult = iD==0 ? "PT" : "P"+iD.toString()+"DT";
	sResult += iH.toString()+"H"+iM.toString()+"M"+iS.toString()+"S";
	return sResult;
}

// ConvertISO8601ToCMITimespan
function ConvertISO8601ToCMITimespan(sPeriod)
{
	if(sPeriod==null || sPeriod=="") return "";
	var sValue = Trim(sPeriod);
	sValue = sValue.toUpperCase();
	var regDec = new RegExp("\\d+","g");
	var regNonDec = new RegExp("\\D","g");
	var aNums = sValue.match(regDec);
	var aLetters = sValue.match(regNonDec);
	if(aLetters[0]!="P") return "";
	var bTime = false;
	var iIndx = -1;
	var sResult = "";
	var iH,iM,iS = 0;
	for(var i=1;i<aLetters.length;i++)
	{
		if(aLetters[i]=="T")
		{
			bTime = true;
			continue;
		}
		switch(aLetters[i])
		{
			case "Y":	iIndx++;	iH += 8760*parseInt(aNums[iIndx],10); 	break;
			case "M":	iIndx++; 	bTime ? iM = parseInt(aNums[iIndx],10) : iH += 720*parseInt(aNums[iIndx],10);		break;
			case "D":	iIndx++;	iH += 24*parseInt(aNums[iIndx],10);		break;
			case "H":	iIndx++;	iH += parseInt(aNums[iIndx],10);		break;
			case "S":	iIndx++;	iS = parseInt(aNums[iIndx],10); 		break;
			default:	break;
		}
	}
	var sH = iH.toString();
	if(sH.length==1) sH = "0"+sH;
	var sM = iM.toString();
	if(sM.length==1) sM = "0"+sM;
	var sH = iS.toString();
	if(sS.length==1) sS = "0"+sS;
	var sResult = sH+":"+sM+":"+sS;
	return sResult;
}

// ConvertPeriodToString
function ConvertPeriodToString(iInterval)
{
	var iValue = Math.round(iInterval/1000);
	var sOutput = "";
	var iT = 0;
	var sT = "";
	if(iValue>86399)
	{
		iT = Math.floor(iValue/86400);
		iValue = iValue - iT*86400;
		sOutput += iT.toString() + g_sDaysString;
	}
	if(iValue>3599)
	{
		iT = Math.floor(iValue/3600);
		iValue = iValue - iT*3600;
		sT = iT.toString();
		if(sT.length==1) sT = "0"+sT;
		sOutput += sT + g_sHoursString;
	}
	if(iValue>59)
	{
		iT = Math.floor(iValue/60);
		iValue = iValue - iT*60;
		sT = iT.toString();
		if(sT.length==1) sT = "0"+sT;
		sOutput += sT + g_sMinutesString;
	}
	sT = iValue.toString();
	if(sT.length==1) sT = "0"+sT;
	sOutput += sT + g_sSecondsString;
	return sOutput;
}


/********** SVG ************/

// CreateSVGContainer
function CreateSVGContainer(nWidth, nHeight)
{
	if(nWidth==null || nHeight==null) return null;
	var iWidth = parseInt(nWidth, 10);
	var iHeight = parseInt(nHeight, 10);
	if(isNaN(iWidth) || isNaN(iHeight)) return null;
	if(iWidth<=0 || iHeight<=0) return null;
	var sWidth = iWidth.toString();
	var sHeight = iHeight.toString();
	try
	{
		var svgRoot = document.createElementNS(g_sSVGNameSpace, "svg");
		svgRoot.setAttribute("width", sWidth);
		svgRoot.setAttribute("height", sHeight);
		svgRoot.setAttribute("viewBox", "0 0 " + sWidth + " " + sHeight);
		return svgRoot;
	}
	catch(e)
	{
		alert(e.description);
		return null;
	}
}

// DefineSVGGradient
function DefineSVGGradient(oHostSVG, sGradientId, sStartColor, sEndColor, oParams, sGradientIdToCopy)
{
	if(oHostSVG==null || sGradientId==null || sStartColor==null || sEndColor==null || oParams==null) return false;
	var aDefs = oHostSVG.getElementsByTagName("defs");
	var oDefs;
	if(aDefs[0]==null)
	{
		try
		{
			oDefs = document.createElementNS(g_sSVGNameSpace, "defs");
			oHostSVG.appendChild(oDefs);
		}
		catch(e)
		{
			alert(e.description);
			return false;
		}
	}
	else
	{
		oDefs = aDefs[0];
	}
	var iX1 = 0;
	var iY1 = 0;
	var iX2 = 100;
	var iY2 = 100;
	if(oParams.angle!=null)
	{
		var nAngle = parseFloat(oParams.angle);
		if(isNaN(nAngle)) nAngle = 0;
		if(nAngle>=360) nAngle = nAngle % 360;
		var nRadAngle = nAngle * Math.PI / 180;
		if(nAngle>=0 && nAngle<90)
		{
			iX1 = 0; iY1 = 100; iX2 = 100 * Math.tan(nAngle * Math.PI / 180); iY2 = 0;
		}
		if(nAngle>=90 && nAngle<180)
		{
			nAngle -= 90;
			iX1 = 0; iY1 = 0; iX2 = 100; iY2 = 100 * Math.tan(nAngle * Math.PI / 180);
		}
		if(nAngle>=180 && nAngle<270)
		{
			nAngle -= 180;
			iX1 = 100; iY1 = 0; iX2 = 100 * (1 - Math.tan(nAngle * Math.PI / 180)); iY2 = 100;
		}
		if(nAngle>=270 && nAngle<360)
		{
			nAngle -= 270;
			iX1 = 100; iY1 = 100; iX2 = 0; iY2 = 100 * (1 - Math.tan(nAngle * Math.PI / 180));
		}
	}
	else
	{
		iX1 = oParams.x1;
		iY1 = oParams.y1;
		iX2 = oParams.x2;
		iY2 = oParams.y2;
	}
	try
	{
		var svgGradient = document.createElementNS(g_sSVGNameSpace, "linearGradient");
		svgGradient.setAttribute("id", sGradientId);
		svgGradient.setAttribute("x1", iX1.toString()+"%");
		svgGradient.setAttribute("y1", iY1.toString()+"%");
		svgGradient.setAttribute("x2", iX2.toString()+"%");
		svgGradient.setAttribute("y2", iY2.toString()+"%");
		var svgStop1 = document.createElementNS(g_sSVGNameSpace, "stop");
		svgStop1.setAttribute("offset", oParams.offset1==null ? "0%" : oParams.offset1);
		svgStop1.setAttribute("stop-color", sStartColor);
		svgGradient.appendChild(svgStop1);
		var svgStop2 = document.createElementNS(g_sSVGNameSpace, "stop");
		svgStop2.setAttribute("offset", oParams.offset2==null ? "100%" : oParams.offset1);
		svgStop2.setAttribute("stop-color", sEndColor);
		svgGradient.appendChild(svgStop2);
		oDefs.appendChild(svgGradient);
		return true;
	}
	catch(e)
	{
		alert(e.description);
		return false;
	}
}

// CreateSVGRoundRect
function CreateSVGRoundRect(iX, iY, iW, iH, iR, oParams)
{
	if(iX==null || iY==null || iW==null || iH==null || iR==null) return null;
	var nX = parseFloat(iX);
	var nY = parseFloat(iY);
	var nW = parseFloat(iW);
	var nH = parseFloat(iH);
	var nR = parseFloat(iR);
	if(isNaN(nX) || isNaN(nY) || isNaN(nW) || isNaN(nH) || isNaN(nR)) return null;
	try
	{
		var svgRect = document.createElementNS(g_sSVGNameSpace, "rect");
		if(oParams!=null)
		{
			if(oParams.stroke!=null)
			{
				if(oParams.stroke!="none")
				{
					svgRect.setAttribute("stroke", oParams.stroke);
					var nStrokeWidth = parseFloat(oParams.strokewidth);
					if(isNaN(nStrokeWidth)) nStrokeWidth = 1;
					svgRect.setAttribute("stroke-width", nStrokeWidth.toString());
					var nHalfStrokeWidth = nStrokeWidth/2;
					nX += nHalfStrokeWidth;
					nY += nHalfStrokeWidth;
					nW -= nStrokeWidth;
					nH -= nStrokeWidth;
					nR -= nHalfStrokeWidth;
					if(nR<0) nR = 0;
					if(oParams.strokepattern!=null) svgRect.setAttribute("stroke-dasharray", oParams.strokepattern);
				}
				else
				{
					svgRect.setAttribute("stroke", "none");
				}
			}
			else
			{
				svgRect.setAttribute("stroke", "none");
			}

			if(oParams.fill!=null)
			{
				if(oParams.fill!="none")
				{
					svgRect.setAttribute("fill", oParams.fill);
				}
				else
				{
					svgRect.setAttribute("fill", "none");
				}
			}
			else
			{
				svgRect.setAttribute("fill", "none");
			}
		}
		svgRect.setAttribute("x", nX.toString());
		svgRect.setAttribute("y", nY.toString());
		svgRect.setAttribute("width", nW.toString());
		svgRect.setAttribute("height", nH.toString());
		svgRect.setAttribute("rx", nR.toString());
		svgRect.setAttribute("ry", nR.toString());
		return svgRect;
	}
	catch(e)
	{
		alert(e.description);
		return null;
	}
}

// CreateSVGRect
function CreateSVGRect(iX, iY, iW, iH, oParams)
{
	if(iX==null || iY==null || iW==null || iH==null) return null;
	var nX = parseFloat(iX);
	var nY = parseFloat(iY);
	var nW = parseFloat(iW);
	var nH = parseFloat(iH);
	if(isNaN(nX) || isNaN(nY) || isNaN(nW) || isNaN(nH)) return null;
	try
	{
		var svgRect = document.createElementNS(g_sSVGNameSpace, "rect");
		if(oParams!=null)
		{
			if(oParams.stroke!=null)
			{
				if(oParams.stroke!="none")
				{
					svgRect.setAttribute("stroke", oParams.stroke);
					var nStrokeWidth = parseFloat(oParams.strokewidth);
					if(isNaN(nStrokeWidth)) nStrokeWidth = 1;
					svgRect.setAttribute("stroke-width", nStrokeWidth.toString());
					var nHalfStrokeWidth = nStrokeWidth/2;
					nX += nHalfStrokeWidth;
					nY += nHalfStrokeWidth;
					nW -= nStrokeWidth;
					nH -= nStrokeWidth;
					if(oParams.strokepattern!=null) svgRect.setAttribute("stroke-dasharray", oParams.strokepattern);
				}
				else
				{
					svgRect.setAttribute("stroke", "none");
				}
			}
			else
			{
				svgRect.setAttribute("stroke", "none");
			}
			if(oParams.fill!=null)
			{
				if(oParams.fill!="none")
				{
					svgRect.setAttribute("fill", oParams.fill);
				}
				else
				{
					svgRect.setAttribute("fill", "none");
				}
			}
			else
			{
				svgRect.setAttribute("fill", "none");
			}
		}
		svgRect.setAttribute("x", nX.toString());
		svgRect.setAttribute("y", nY.toString());
		svgRect.setAttribute("width", nW.toString());
		svgRect.setAttribute("height", nH.toString());
		svgRect.setAttribute("rx", "0");
		svgRect.setAttribute("ry", "0");
		return svgRect;
	}
	catch(e)
	{
		alert(e.description);
		return null;
	}
}

// DefineSVGPath
function DefineSVGPath(oHostSVG, sPathId, oParams)
{
	if(oHostSVG==null || sPathId==null || oParams==null) return false;
	var aDefs = oHostSVG.getElementsByTagName("defs");
	var oDefs;
	if(aDefs[0]==null)
	{
		try
		{
			oDefs = document.createElementNS(g_sSVGNameSpace, "defs");
			oHostSVG.appendChild(oDefs);
		}
		catch(e)
		{
			alert(e.description);
			return false;
		}
	}
	else
	{
		oDefs = aDefs[0];
	}
	try
	{
		var svgPath = document.createElementNS(g_sSVGNameSpace, "path");
		svgPath.setAttribute("id", sPathId);
		svgPath.setAttribute("fill", "none");
		svgPath.setAttribute("stroke", "none");
		svgPath.setAttribute("d", oParams.path);
		oDefs.appendChild(svgPath);
		return true;
	}
	catch(e)
	{
		alert(e.description);
		return false;
	}
}

// CreateSVGCircle
function CreateSVGCircle(iCenterX, iCenterY, nRadius, oParams)
{
	if(iCenterX==null || iCenterY==null || nRadius==null) return null;
	try
	{
		var svgCircle = document.createElementNS(g_sSVGNameSpace, "circle");
		svgCircle.setAttribute("cx", iCenterX.toString());
		svgCircle.setAttribute("cy", iCenterY.toString());
		svgCircle.setAttribute("r", nRadius.toString());
		if(oParams!=null)
		{
			if(oParams.fill!=null)
			{
				svgCircle.setAttribute("fill", oParams.fill);
			}
			else
			{
				svgCircle.setAttribute("fill", "none");
			}
			if(oParams.stroke!=null)
			{
				if(oParams.stroke!="none")
				{
					svgCircle.setAttribute("stroke", oParams.stroke);
					if(oParams.strokewidth!=null) svgCircle.setAttribute("stroke-width", oParams.strokewidth);
					if(oParams.strokepattern!=null) svgCircle.setAttribute("stroke-dasharray", oParams.strokepattern);
				}
				else
				{
					svgCircle.setAttribute("stroke", "none");
				}
			}
			else
			{
				svgCircle.setAttribute("stroke", "none");
			}
		}
		return svgCircle;
	}
	catch(e)
	{
		alert(e.description);
		return null;
	}
}

// CreateSVGLine
function CreateSVGLine(iX1, iY1, iX2, iY2, oParams)
{
	if(iX1==null || iY1==null || iX2==null || iY2==null) return null;
	try
	{
		var svgLine = document.createElementNS(g_sSVGNameSpace, "path");
		var sPath = "M " + iX1.toString() + "," + iY1.toString() + " L " + iX2.toString() + "," + iY2.toString() + " Z";
		svgLine.setAttribute("d", sPath);
		if(oParams.stroke!=null)
		{
			if(oParams.stroke!="none")
			{
				svgLine.setAttribute("stroke", oParams.stroke);
				if(oParams.strokewidth!=null) svgLine.setAttribute("strokewidth", oParams.strokewidth);
				if(oParams.strokepattern!=null) svgLine.setAttribute("stroke-dasharray", oParams.strokepattern);
			}
			else
			{
				svgLine.setAttribute("stroke", "none");
			}
		}
		else
		{
			svgLine.setAttribute("stroke", "none");
		}
		return svgLine;
	}
	catch(e)
	{
		alert(e.description);
		return null;
	}
}

// CreateSVGShape
function CreateSVGShape(sPath, oParams)
{
	if(sPath==null) return null;
	try
	{
		var svgShape = document.createElementNS(g_sSVGNameSpace, "path");
		svgShape.setAttribute("d", sPath);
		if(oParams.stroke!=null)
		{
			if(oParams.stroke!="none")
			{
				svgShape.setAttribute("stroke", oParams.stroke);
				if(oParams.strokewidth!=null) svgShape.setAttribute("stroke-width", oParams.strokewidth);
				if(oParams.strokepattern!=null) svgShape.setAttribute("stroke-dasharray", oParams.strokepattern);
			}
			else
			{
				svgShape.setAttribute("stroke", "none");
			}
		}
		else
		{
			svgShape.setAttribute("stroke", "none");
		}
		if(oParams.fill!=null)
		{
			if(oParams.fill!="none")
			{
				svgShape.setAttribute("fill", oParams.fill);
				if(oParams.opacity!=null) svgShape.setAttribute("fill-opacity", oParams.opacity);
			}
			else
			{
				svgShape.setAttribute("fill", "none");
			}
		}
		else
		{
			svgShape.setAttribute("fill", "none");
		}
		return svgShape;
	}
	catch(e)
	{
		alert(e.description);
		return false;
	}
}

// CreateSVGTextByPath
function CreateSVGTextByPath(sText, sPathURI, oParams)
{
	if(sText==null || sPathURI==null) return null;
	var svgText = document.createElementNS(g_sSVGNameSpace, "text");
	svgText.setAttribute("stroke", oParams.stroke);
	svgText.setAttribute("fill", oParams.fill);
	svgText.setAttribute("font-family", oParams.fontfamily);
	svgText.setAttribute("font-size", oParams.fontsize);
	svgText.setAttribute("font-weight", oParams.fontweight);
	svgText.setAttribute("font-style", oParams.fontstyle);
	svgText.setAttribute("text-anchor", "start");
	svgText.setAttribute("alignment-baseline", "middle");
	svgText.setAttribute("dominant-baseline", oParams.baseline);

	var svgTextPath = document.createElementNS(g_sSVGNameSpace, "textPath");
	svgTextPath.setAttributeNS(g_sXLinkNameSpace, "href", "#" + sPathURI);
	var oTextNode = document.createTextNode(sText);
	svgTextPath.appendChild(oTextNode);
	svgText.appendChild(svgTextPath);
	return svgText;
}


/******** Rapid *********/
function SetAttributes(oObject, oAttributes)
{
	if(oObject==null || oAttributes==null) return false;
	try
	{
		for(var i in oAttributes) oObject.setAttribute(i, oAttributes[i]);
	}
	catch(e)
	{
		return false;
	}
	return true;
}
function SetCSSStyles(oObject, oStyles)
{
	if(oObject==null || oStyles==null) return false;
	try
	{
		for(var i in oStyles) oObject.style[i] = oStyles[i];
	}
	catch(e)
	{
		return false;
	}
	return true;
}


function VMLSetColors(oShape, sColor1, sColor2)
{
	if(oShape==null || sColor1==null) return false;
	var oFill = oShape.fill;
	if(oFill==null)
	{
		oShape.fillColor = sColor1;
		return true;
	}
	oFill.color = sColor1;
	if(sColor2==null) return false;
	oFill.color2 = sColor2;
	return true;
}

function VMLSetOpacity(oShape, nOpacity)
{
	if(oShape==null || nOpacity==null) return false;
	var oFill = oShape.fill;
	if(oFill==null) return false;
	oFill.opacity = nOpacity;
	return true;
}

function WSDelegateEvent(oArgs)
{
	var oTarget = document.getElementById(oArgs.elem.getAttribute("eventtargetid"));
	if(oTarget==null) return false;
	if(document.createEvent)
	{
		var oEventObj = document.createEvent("MouseEvents");
		oEventObj.initEvent(oArgs.eventname, true, false);
        oTarget.dispatchEvent(oEventObj);
    }
	else if(document.createEventObject)
	{
		oTarget.fireEvent("on" + oArgs.eventname);
    }
	return true;
}

function QTIEvalRespCondition(oRespcondition, aResponse, sQType)
{
	if(oRespcondition==null || aResponse==null || sQType==null) return false;
	var oConditionVar = oRespcondition.selectSingleNode("conditionvar");
	return QTIEvalVarConditionBlock(oConditionVar, aResponse, sQType);
}

function QTIEvalVarConditionBlock(oConditionRoot, aResponse, sQType)
{
	var aConditions = oConditionRoot.childNodes;
	var sEvalString = "";
	for(var i=0; i<aConditions.length; i++)
	{
		if(aConditions[i].nodeType!=1) continue;
		switch(aConditions[i].nodeName)
		{
			case "not":
			{
				if(sEvalString!="") sEvalString += " && ";
				sEvalString += " !" + QTIEvalVarConditionBlock(aConditions[i], aResponse, sQType).toString();
				break;
			}
			case "or":
			{
				sEvalString += " || " + QTIEvalVarConditionBlock(aConditions[i], aResponse, sQType).toString();
				break;
			}
			case "and":
			{
				sEvalString += " && " + QTIEvalVarConditionBlock(aConditions[i], aResponse, sQType).toString();
				break;
			}
			default:
			{
				if(sEvalString!="") sEvalString += (sQType=="string") ? " || " : " && "; // WS!!!
				sEvalString += QTIEvalVarCondition(aConditions[i], aResponse, sQType).toString();
				break;
			}
		}
	}
	return eval(sEvalString);
}

function QTIEvalVarCondition(oCondition, aResponse, sQType)
{
	var sCondText = Trim(oCondition.text);
	var sRespIdent = oCondition.getAttribute("respident");
	if(oCondition.nodeName=="other") return true;
	switch(sQType)
	{
		case "choice":
		{
			return (aResponse[0]==sCondText);
		}
		case "select":
		{
			for(var i=0; i<aResponse.length; i++)
			{
				if(aResponse[i]==sCondText) return true;
			}
			break;
		}
		case "order":
		{
			var oRoot = oCondition.parentNode;
			var aConds = oRoot.childNodes;
			var iPos = -1;
			for(var i=0; i<aConds.length; i++)
			{
				if(aConds[i].nodeType!=1) continue;
				if(aConds[i]==oCondition)
				{
					return (aResponse[i]==sCondText);
				}
			}
			break;
		}
		case "match":
		{
			if(sRespIdent==null) return false;
			var sJoined = sRespIdent + "[.]" + sCondText;
			for(var i=0; i<aResponse.length; i++)
			{
				if(aResponse[i]==sJoined) return true;
			}
			break;
		}
		case "numeric":
		{
			if(sRespIdent==null) return false;
			for(var i=0; i<aResponse.length; i++)
			{
				if(aResponse[i].indexOf(sRespIdent + "[.]")!=-1)
				{
					var aPair = aResponse[i].split("[.]");
					if(aPair[1]!=null)
					{
						var nValueUser = parseFloat(aPair[1]);
						var nValueCond = parseFloat(sCondText);
						if(!isNaN(nValueUser) && !isNaN(nValueCond))
						{
							switch(oCondition.nodeName)
							{
								case "varequal": 	return (nValueUser==nValueCond);
								case "vargt":		return (nValueUser>nValueCond);
								case "vargte":		return (nValueUser>=nValueCond);
								case "varlt":		return (nValueUser<nValueCond);
								case "varlte":		return (nValueUser<=nValueCond);
							}
							
						}
					}
				}
			}
			break;
		}
		case "string":
		{
			if(sRespIdent==null) return false;
			var sCase = oCondition.getAttribute("case");
			var bCase = (sCase==null) ? false : (sCase.toLowerCase()=="yes");
			for(var i=0; i<aResponse.length; i++)
			{
				if(aResponse[i].indexOf(sRespIdent + "[.]")!=-1)
				{
					var aPair = aResponse[i].split("[.]");
					if(aPair[1]!=null)
					{
						switch(oCondition.nodeName)
						{
							case "varequal":
							{
								if(bCase)
								{
									return (aPair[1]==sCondText);
								}
								else
								{
									return (aPair[1].toLowerCase()==sCondText.toLowerCase());
								}
								break;
							}
							case "varsubstring":
							{
								if(bCase)
								{
									return (aPair[1].indexOf(sCondText)!=-1);
								}
								else
								{
									return (aPair[1].toLowerCase().indexOf(sCondText.toLowerCase())!=-1);
								}
								break;
							}
						}
					}
				}
			}
			break;
		}
	}
	return false;
}


function InjectSVG(oElem, oCurObj)
{
	if(oElem==null) return false;
	var sHTML = oElem.innerHTML;
	var sSVGW = oElem.getAttribute("svg-w");
	var sSVGH = oElem.getAttribute("svg-h");
	var sSVGVB = oElem.getAttribute("svg-vb");
	var sSVGQty = oElem.getAttribute("svg-qty");
	if(sSVGQty==null) sSVGQty = "1";
	var iSVGQty = parseInt(sSVGQty, 10);
	var sSVGGradQty = oElem.getAttribute("svg-grad-qty");
	if(sSVGGradQty==null) sSVGGradQty = "0";
	var iSVGGradQty = parseInt(sSVGGradQty, 10);
	if(g_oEnv.SVG.inject)
	{
		oElem.innerHTML = "";
		sHTML = '<svg width="' + sSVGW + '" height="' + sSVGH + '" viewBox="' + sSVGVB + '" xmlns="' + g_sSVGNameSpace + '" xmlns:xlink="' + g_sXLinkNameSpace + '"';
		if(g_isSafari) sHTML += 'style="background-image: ' + oElem.getAttribute("svg-bg") + ';"' // Safari does not support transparent bg in injection
		sHTML += '>';
		if(iSVGGradQty>0)
		{
			// no sense in gradients since no browsers support injection with gradient, but...
			sHTML += '<defs>';
			for(var i=0; i<iSVGGradQty; i++)
			{
				sStopQty = oElem.getAttribute("svg-grad-stop-qty-" + i);
				if(sStopQty==null) continue;
				iStopQty = parseInt(sStopQty, 10);
				sHTML += '<linearGradient id="' + oElem.getAttribute("svg-grad-id-" + i) + '" x1="' + oElem.getAttribute("svg-grad-x1-" + i) + '" y1="' + oElem.getAttribute("svg-grad-y1-" + i) + '" x2="' + oElem.getAttribute("svg-grad-x2-" + i) + '" y2="' + oElem.getAttribute("svg-grad-y2-" + i) + '">';
				for(var j=0; j<iStopQty; j++)
				{
					sHTML += '<stop offset="' + oElem.getAttribute("svg-grad-stop-offset-" + i + "-" + j) + '" style="stop-color: ' + oElem.getAttribute("svg-grad-stop-color-" + i + "-" + j) + '; stop-opacity: 1;"/>';
				}
				sHTML += '</linearGradient>';
			}
			sHTML += '</defs>';
		}
		for(var i=0; i<iSVGQty; i++)
		{
			sHTML += '<path d="' + oElem.getAttribute("svg-path-" + i) + '" fill="' + oElem.getAttribute("svg-fill-" + i) + '" stroke="' + oElem.getAttribute("svg-stroke-" + i) + '" stroke-width="' + oElem.getAttribute("svg-stroke-width-" + i) + '"/>';
		}
		sHTML += '</svg>';
		var oObj = document.createElement("object");
		oObj.setAttribute("width", sSVGW);
		oObj.setAttribute("height", sSVGH);
		oObj.setAttribute("type", "image/svg+xml");
		oObj.setAttribute("data", "data:image/svg+xml," + sHTML);
		oElem.appendChild(oObj);
	}
	else
	{
		if(oCurObj==null) return false;
		var oDiv = document.createElement("div");
		oDiv.style.position = "absolute";
		oDiv.style.top = "0px";
		oDiv.style.left = "0px";
		oDiv.style.width = sSVGW + "px";
		oDiv.style.height = sSVGH + "px";
		document.body.appendChild(oDiv);
		var svgRoot = CreateSVGContainer(sSVGW, sSVGH);
		oDiv.appendChild(svgRoot);
		var svgShape;
		if(iSVGGradQty>0) for(var i=0; i<iSVGGradQty; i++) DefineSVGGradient(svgRoot, oElem.getAttribute("svg-grad-id-" + i), oElem.getAttribute("svg-grad-stop-color-" + i + "-0"), oElem.getAttribute("svg-grad-stop-color-" + i + "-1"), { angle: 0 });
		for(var i=0; i<iSVGQty; i++)
		{
			svgShape = CreateSVGShape(oElem.getAttribute("svg-path-" + i),
			{
				stroke: oElem.getAttribute("svg-stroke-" + i), strokewidth: oElem.getAttribute("svg-stroke-width-" + i), fill: oElem.getAttribute("svg-fill-" + i), opacity: 1
			});
			svgRoot.appendChild(svgShape);
		}
		oElem.innerHTML = "";
		document.body.appendChild(oCurObj); 
		oElem.appendChild(oDiv);
	}
	return true;
}

function RedrawVMLRoundRectShape(oShape, iWidth, iHeight, iRadius, iCoordSize)
{
	if(oShape==null || iWidth==null || iHeight==null || iRadius==null || iCoordSize==null) return false;
	if(oShape.path==null) return false;
	var iW = parseInt(iWidth, 10);
	var iH = parseInt(iHeight, 10);
	var iR = parseInt(iRadius, 10);
	var iCS = parseInt(iCoordSize, 10);
	if(isNaN(iW) || isNaN(iH) || isNaN(iR) || isNaN(iCS)) return false;
	var nUnitX = iCS/iW;
	var nUnitY = iCS/iH;
	var iX0 = 0;
	var iX1 = Math.round(iR*nUnitX);
	var iX2 = Math.round(iCS - iR*nUnitX);
	var iX3 = iCS;
	var iY0 = 0;
	var iY1 = Math.round(iR*nUnitY);
	var iY2 = Math.round(iCS - iR*nUnitY);
	var iY3 = iCS;
	var sPath = "M" + iX0 + "," + iY1 + " QY" + iX1 + "," + iY0 + " L" + iX2 + "," + iY0 + " QX" + iX3 + "," + iY1 + " L" + iX3 + "," + iY2 + " QY" + iX2 + "," + iY3 + " L" + iX1 + "," + iY3 + " QX" + iX0 + "," + iY2 + " XE";
	oShape.path = sPath;
	return true;
}

function TransitionZoom(argobj)
{
	if(argobj.targetid==null) return false;
	var oTarget = document.getElementById(argobj.targetid);
	if(oTarget==null) return false;
	if(argobj.zoom==null)
	{
		var sDir = (argobj.dir==null) ? "c" : argobj.dir;
		var iDur = (argobj.transdur==null) ? 1 : parseFloat(argobj.transdur);
		if(isNaN(iDur)) iDur = 1;
		iDur = Math.round(iDur*1000);
		var iWidth = oTarget.offsetWidth;
		var iHeight = oTarget.offsetHeight;
		var iFinalLeft = parseInt(oTarget.style.left, 10);
		var iFinalTop = parseInt(oTarget.style.top, 10);
		oTarget.style.visibility = "hidden";
		var iDelay = 40;
		if(iDur<800) iDelay = 60;
		var iStepQty = Math.floor(iDur/iDelay);
		var nStepX;
		var nStepY;
		var sOrigin;
		switch(sDir)
		{
			case "c":
			{
				nStepX = -0.5*iWidth/iStepQty;
				nStepY = -0.5*iHeight/iStepQty;
				sOrigin = "50% 50%";
				break;
			}
			case "nw":
			{
				nStepX = 0;
				nStepY = 0;
				sOrigin = "0% 0%";
				break;
			}
			case "n":
			{
				nStepX = -0.5*iWidth/iStepQty;
				nStepY = 0;
				sOrigin = "0% 50%";
				break;
			}
			case "ne":
			{
				nStepX = -1*iWidth/iStepQty;
				nStepY = 0;
				sOrigin = "0% 100%";
				break;
			}
			case "e":
			{
				nStepX = -1*iWidth/iStepQty;
				nStepY = -0.5*iHeight/iStepQty;
				sOrigin = "100% 50%";
				break;
			}
			case "se":
			{
				nStepX = -1*iWidth/iStepQty;
				nStepY = -1*iHeight/iStepQty;
				sOrigin = "100% 100%";
				break;
			}
			case "s":
			{
				nStepX = -0.5*iWidth/iStepQty;
				nStepY = -1*iHeight/iStepQty;
				sOrigin = "50% 100%";
				break;
			}
			case "sw":
			{
				nStepX = 0;
				nStepY = -1*iHeight/iStepQty;
				sOrigin = "0% 100%";
				break;
			}
			case "w":
			{
				nStepX = 0;
				nStepY = -0.5*iHeight/iStepQty;
				sOrigin = "0% 50%";
				break;
			}
		}
		var oArgs = {};
		var nTransStep = 1/iStepQty;
		var iTriggerTime = (new Date()).valueOf();
		var iTime;
		var nZoom;
		var sZoom;
		var iLeft;
		var iTop;
		var iCnt = iStepQty-1;
		while(iCnt>=0)
		{
			iTime = iTriggerTime + iDelay*(iStepQty - iCnt - 1);
			if(iCnt==0)
			{
				nZoom = 1;
				sZoom = "100%";
				iLeft = iFinalLeft;
				iTop = iFinalTop;
			}
			else
			{
				nZoom = 1 - nTransStep*iCnt;
				sZoom = Math.round(nZoom*100) + "%";
				iLeft = Math.floor(iFinalLeft - nStepX*iCnt);
				iTop = Math.floor(iFinalTop - nStepY*iCnt);
				if(iCnt==iStepQty-1)
				{
					if(g_oEnv.browser.isIE)
					{
						oTarget.style.left = iLeft + "px";
						oTarget.style.top = iTop + "px";
						oTarget.style.zoom = sZoom;
					}
					else
					{
						if(g_oEnv.browser.isFF)
						{
							oTarget.style.MozTransform = "scale(" + nZoom + ")";
							oTarget.style.MozTransformOrigin = sOrigin;						
						}
						else
						{
							if(g_oEnv.browser.isWebkit)
							{
								oTarget.style.webkitTransform = "scale(" + nZoom + ")";
								oTarget.style.webkitTransformOrigin = sOrigin;
							}
							else
							{
								if(g_oEnv.browser.isOpera)
								{
									oTarget.style.OTransform = "scale(" + nZoom + ")";
									oTarget.style.OTransformOrigin = sOrigin;
								}
								else
								{
									oTarget.style.visibility = "visible";
								}
							}
						}
					}
					iCnt--;
					continue;
				}
			}
			oArgs = { targetid: argobj.targetid, zoom: sZoom, mzoom: nZoom, left: iLeft, top: iTop };
			g_aTimeLine.unshift({ targetid: argobj.targetid, time: iTime, func: TransitionZoom, args: oArgs });
			iCnt--;
		}
		if(g_iTimeLineId==null || g_iTimeLineId==0) g_iTimeLineId = setInterval(TickTimeLine, g_iTimeLineTick);
	}
	else
	{
		oTarget.style.visibility = "visible";
		if(g_oEnv.browser.isIE)
		{
			oTarget.style.left = argobj.left + "px";
			oTarget.style.top = argobj.top + "px";
			oTarget.style.zoom = argobj.zoom;
		}
		else
		{
			if(g_oEnv.browser.isFF)
			{
				oTarget.style.MozTransform = "scale(" + argobj.mzoom + ")";					
			}
			else
			{
				if(g_oEnv.browser.isWebkit)
				{
					oTarget.style.webkitTransform = "scale(" + argobj.mzoom + ")";
				}
				else
				{
					if(g_oEnv.browser.isOpera)
					{
						oTarget.style.OTransform = "scale(" + argobj.mzoom + ")";
					}
				}
			}
		}
	}
	return true;
}

function TransitionFlyIn(argobj)
{
	if(argobj.targetid==null) return false;
	var oTarget = document.getElementById(argobj.targetid);
	if(oTarget==null) return false;
	if(argobj.top==null && argobj.left==null)
	{
		var sDir = (argobj.dir==null) ? "w" : argobj.dir;
		var iDur = (argobj.transdur==null) ? 1 : parseFloat(argobj.transdur);
		if(isNaN(iDur)) iDur = 1;
		iDur = Math.round(iDur*1000);
		var oBody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
		var iWW = (window.innerWidth!=null) ? window.innerWidth : ((!(document.documentElement.clientWidth == 0)) ? document.documentElement.clientWidth : document.body.clientWidth);
		var iWH = (window.innerHeight!=null) ? window.innerHeight : ((!(document.documentElement.clientHeight==0)) ? document.documentElement.clientHeight : document.body.clientHeight);
		var iAbsTop = oTarget.offsetTop;
		var iAbsLeft = oTarget.offsetLeft;
		var oParent = oTarget.parentNode;
		var iCnt = 100;
		while(oParent!=oBody && iCnt>0)
		{
			iAbsTop += oParent.offsetTop;
			iAbsLeft += oParent.offsetLeft;
			oParent = oParent.parentNode;
			iCnt--;
		}
		var iWidth = oTarget.offsetWidth;
		var iHeight = oTarget.offsetHeight;
		var iFinalLeft = parseInt(oTarget.style.left, 10);
		var iFinalTop = parseInt(oTarget.style.top, 10);
		oTarget.style.visibility = "hidden";
		var iDelay = 40;
		if(iDur<800) iDelay = 60;
		var iStepQty = Math.floor(iDur/iDelay);
		var iStepX;
		var iStepY;
		var iStartTop = 0;
		var iStartLeft = 0;
		var iDiffX;
		var iDiffY;
		switch(sDir)
		{
			case "nw":
			{
				iDiffX = iAbsLeft + iWidth;
				iDiffY = iAbsTop + iHeight;
				iStartLeft = iFinalLeft - iDiffX;
				iStartTop = iFinalTop - iDiffY;
				iStepX = Math.floor(iDiffX/iStepQty);
				iStepY = Math.floor(iDiffY/iStepQty);
				break;
			}
			case "n":
			{
				iDiffX = 0;
				iDiffY = iAbsTop + iHeight;
				iStartLeft = iFinalLeft;
				iStartTop = iFinalTop - iDiffY;
				iStepX = 0;
				iStepY = Math.floor(iDiffY/iStepQty);
				break;
			}
			case "ne":
			{
				iDiffX = iWW - iAbsLeft;
				iDiffY = iAbsTop + iHeight;
				iStartLeft = iFinalLeft + iDiffX;
				iStartTop = iFinalTop - iDiffY;
				iStepX = -1*Math.floor(iDiffX/iStepQty);
				iStepY = Math.floor(iDiffY/iStepQty);
				break;
			}
			case "e":
			{
				iDiffX = iWW - iAbsLeft;
				iDiffY = 0;
				iStartLeft = iFinalLeft + iDiffX;
				iStartTop = iFinalTop;
				iStepX = -1*Math.floor(iDiffX/iStepQty);
				iStepY = 0;
				break;
			}
			case "se":
			{
				iDiffX = iWW - iAbsLeft;
				iDiffY = iWH - iAbsTop;
				iStartLeft = iFinalLeft + iDiffX;
				iStartTop = iFinalTop + iDiffY;
				iStepX = -1*Math.floor(iDiffX/iStepQty);
				iStepY = -1*Math.floor(iDiffY/iStepQty);
				break;
			}
			case "s":
			{
				iDiffX = 0;
				iDiffY = iWH - iAbsTop;
				iStartLeft = iFinalLeft;
				iStartTop = iFinalTop + iDiffY;
				iStepX = 0;
				iStepY = -1*Math.floor(iDiffY/iStepQty);
				break;
			}
			case "sw":
			{
				iDiffX = iAbsLeft + iWidth;
				iDiffY = iWH - iAbsTop;
				iStartLeft = iFinalLeft - iDiffX;
				iStartTop = iFinalTop + iDiffY;
				iStepX = Math.floor(iDiffX/iStepQty);
				iStepY = -1*Math.floor(iDiffY/iStepQty);
				break;
			}
			case "w":
			{
				iDiffX = iAbsLeft + iWidth;
				iDiffY = 0;
				iStartLeft = iFinalLeft - iDiffX;
				iStartTop = iFinalTop;
				iStepX = Math.floor(iDiffX/iStepQty);
				iStepY = 0;
				break;
			}
		}
		var oArgs = {};
		var iTriggerTime = (new Date()).valueOf();
		var iTime;
		var nZoom;
		var sZoom;
		var iCnt = iStepQty-1;
		while(iCnt>=0)
		{
			iTime = iTriggerTime + iDelay*(iStepQty - iCnt - 1);
			if(iCnt==0)
			{
				iLeft = iFinalLeft;
				iTop = iFinalTop;
			}
			else
			{
				iLeft = Math.floor(iStartLeft + iStepX*(iStepQty - iCnt));
				iTop = Math.floor(iStartTop + iStepY*(iStepQty - iCnt));
				if(iCnt==iStepQty-1)
				{
					oTarget.style.left = iStartLeft + "px";
					oTarget.style.top = iStartTop + "px";
					iCnt--;
					continue;
				}
			}
			oArgs = { targetid: argobj.targetid, left: iLeft, top: iTop };
			g_aTimeLine.unshift({ targetid: argobj.targetid, time: iTime, func: TransitionFlyIn, args: oArgs });
			iCnt--;
		}
		if(g_iTimeLineId==null || g_iTimeLineId==0) g_iTimeLineId = setInterval(TickTimeLine, g_iTimeLineTick);
	}
	else
	{
		oTarget.style.visibility = "visible";
		oTarget.style.left = argobj.left + "px";
		oTarget.style.top = argobj.top + "px";
	}
	return true;
}

function TransitionBlink(argobj)
{
	if(argobj.targetid==null) return false;
	var oTarget = document.getElementById(argobj.targetid);
	if(oTarget==null) return false;
	if(oTarget.style.display=="none") return false;
	var iTriggerTime = (new Date()).valueOf();
	if(argobj.blink!=true)
	{
		var nDelay = (argobj.delay==null) ? 1 : parseFloat(argobj.delay);
		if(isNaN(nDelay)) nDelay = 1;
		nDelay = Math.round(nDelay*1000); 
		g_aTimeLine.unshift({ targetid: argobj.targetid, time: iTriggerTime + nDelay, infinite: true, delay: nDelay, func: TransitionBlink, args: { targetid: argobj.targetid, delay: nDelay, blink: true } });
		if(g_iTimeLineId==null || g_iTimeLineId==0) g_iTimeLineId = setInterval(TickTimeLine, g_iTimeLineTick);
	}
	else
	{
		oTarget.style.visibility = (oTarget.style.visibility=="hidden") ? "visible" : "hidden";
	}
	return true;
}

function ClearTransitionBlink(sTargetId)
{
	if(g_aTimeLine[0]==null) return false;
	var iCnt = g_aTimeLine.length-1;
	var oTarget;
	while(iCnt>=0)
	{
		if(g_aTimeLine[iCnt].targetid==sTargetId) g_aTimeLine.splice(iCnt,1);
		iCnt--;
	}
	return true;
}

