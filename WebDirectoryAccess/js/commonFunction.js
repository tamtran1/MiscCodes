//global variables
var crumbRecord = 
{
	"level" : 0,
	"dirString" : ""
};

var fileInfoHTML =
	"<div class = \"shiftUp\">" +
		"<div class=\"panel\">" +
			"<h5>File Info</h5>" +
			"<p>" +
			"Name: <name id = \"fileName\"></name><br>" +
			"Size: <size id = \"fileSize\"></size><br>" +
			"Date: <date id = \"fileDate\"></date><br>" +
			"Time: <time id = \"fileTime\"></time><br>" +
			"</p>" +
		"</div>" +
	"</div>";

var fileListErr = 
	"<err class = \"shiftRight\">" +
		"No Files Found" +
	"</err>";

var dirListErr = 
	"<err class = \"shiftLeft\">" +
		"No Sub Directory Found" +
	"</err>";

//common functions
function preview(img, name, size, date, time, sizeInBytes) 
{
	document.getElementById('fileName').innerHTML = name;
	document.getElementById('fileSize').innerHTML = size;
	document.getElementById('fileDate').innerHTML = date;
	document.getElementById('fileTime').innerHTML = time;
	if (sizeInBytes < 5242880)
		document.getElementById('preview').innerHTML = "<img class = \"fadeIn\" src=\"" + img + "\"/>";
}

function setCurr (lvl, directory)
{	
	if (lvl > crumbRecord.level)
	{
		crumbRecord.level ++;
		crumbRecord.dirString = crumbRecord.dirString + "/" + directory;
		listFiles(crumbRecord.level);
	} else
	{
		crumbRecord.level = lvl;
		listFiles(lvl);
	}
}

function listFiles(dirLvl)
{	

	var dirArr = crumbRecord.dirString.split("/");
	crumbRecord.dirString = "";
	var crumbHTML = "<div class = \"shiftRight\">" +
						"<ul class=\"breadcrumb\">";
	var tmpdirString = "";
	
	for (var i = 1; i <= dirLvl; i ++)
	{
		crumbRecord.dirString = crumbRecord.dirString + "/" + dirArr[i];
		crumbHTML += 
			"<li>" +
				"<a href=\"javascript: setCurr(" + 
					i + ", '" + 
					dirArr[i] + "');\">" + 
					dirArr[i] + 
				"</a>" +
			"</li>";
	}
	crumbHTML += 
			"</ul>" +
		"</div>";
	document.getElementById('breadCrumb').innerHTML = crumbHTML;
	
	getFiles("directory=" + crumbRecord.dirString);
}

function getFiles(data)
{
	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject ("Microsoft.XMLHTTP");
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var dataObj = JSON.parse(xmlhttp.responseText);
			var dirArr = dataObj.breadCrumb.split("|");
			if (dirArr[0])
			{
				var dirList = "";
				for (var i in dirArr)
					dirList =
						dirList + 
							"<li>" +
								"<a class = \"shiftLeft\" href = \"javascript: setCurr(" + 
									(crumbRecord.level + 1) + ", '" + 
									dirArr[i] + "');\">" + 
									dirArr[i] + 
								"</a>" +
							"</li>";
				
				document.getElementById('directoryList').innerHTML = dirList;	
			} else
				document.getElementById('directoryList').innerHTML = dirListErr;
			
			var fileDateArr = dataObj.fileDate.split("|");
			var fileTimeArr = dataObj.fileTime.split("|");
			var fileSizeArr = dataObj.fileSizeList.split("|");
			var fileSizeBytesArr = dataObj.fileSizeListBytes.split("|");
			var fileArr = dataObj.fileList.split("|");
			var fileList = "";
			if (fileArr[0])
			{
				for(var i in fileArr)
					fileList =
						fileList + 
							"<li>" +
								"<a class = \"shiftRight\" href = \"" + 
									crumbRecord.dirString + "/" + 
									fileArr[i] + "\" onMouseOver=\"preview('" + 
									crumbRecord.dirString + "/" + 
									fileArr[i] + "', '" + 
									fileArr[i] + "', '" + 
									fileSizeArr[i] + "', '" + 
									fileDateArr[i] + "', '" + 
									fileTimeArr[i] + "', '" + 
									fileSizeBytesArr[i] + "');\">" + 
									fileArr[i] + 
								"</a>" +
							"</li>";
					
				document.getElementById('fileList').innerHTML = fileList;
			} else
				document.getElementById('fileList').innerHTML = fileListErr;
			
			document.getElementById('fileInfoPanel').innerHTML = fileInfoHTML;				
			document.getElementById('preview').innerHTML = "";
		}	
	}
	
	xmlhttp.open ("post", "getFiles.php", "true");
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send (data);
}