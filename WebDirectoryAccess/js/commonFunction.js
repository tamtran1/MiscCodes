/*===============================> global variables <===============================*/
var crumbRecord = 
{
	"level" : 0,
	"dirString" : "."
};

var fileInfoHTML =
	"<div class = \"shiftUp\">" +
		"<div class=\"panel\">" +
			"<h5>File Info</h5>" +
			"Name: <name id = \"fileName\"></name><br>" +
			"Size: <size id = \"fileSize\"></size><br>" +
			"Date: <date id = \"fileDate\"></date><br>" +
			"Time: <time id = \"fileTime\"></time><br>" +
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

var sessionErr = 
	"<div style = \"width:350px\">" +
	"<err style =\"color: red\">" +
		"Oops! there seems to be a session error, try logging in again.<br>" +
		"<a style = \"float:right\"href = \"javascript: login();\" class = \"button [tiny small large]\">Log In</a>" +
	"</err>" +
	"</div>";

var logInHTML = 
	"<div id = \"logIn\" style = \"width: 350px;\">" +
		"<label>" +
			"User Name" +
			"<input id = \"userName\" type = \"text\" onkeydown = \"if (event.keyCode == 13) {login();}\"/>" +
		"</label>" +
		"<label>" +
			"Password" +
			"<input id = \"password\" type = \"password\" onkeydown = \"if (event.keyCode == 13) login();\"/>" +
		"</label>" +
		"<a style = \"float:right\"href = \"javascript: login();\" class = \"button [tiny small large]\">Log In</a>" +
		"<err id = \"err\" style = \"color: red\"></err>" +
	"</div>";
	
var navBarHTML = 
	"<ul class = \"button-group\">" +
		"<li>" +
			"<a href = \"report_maintentance_issue/index.html\" class = \"button\">CMSC331 Work</a>" +
		"</li>" +
		"<li>" +
			"<a href = \"planes_for_hire/Main.php\" class = \"button\">CMSC447 Work</a>" +
		"</li>" +
		"<li>" +
			"<a href = \"javascript: logOut();\" class = \"button\">Log Out</a>" +
		"</li>" +
	"</ul>";

/*===============================> common functions <===============================*/
function ajax (data, dstScript, callBack)
{
	//alert ("data = " + data + ", dstScript = " + dstScript + ", callBack = " + callBack);
	
	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject ("Microsoft.XMLHTTP");
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			if (xmlhttp.responseText)
				callBack (xmlhttp.responseText, 'ajax');
			else
				callBack (xmlhttp.responseText, 'ajax');
		}
	}
	
	xmlhttp.open ("post", dstScript, "true");
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send (data);
}

function logOut(arg1, arg2)
{
	if (!arg1 && !arg2)
		ajax ("logOut=true", "login.php", logOut);
	else if (!arg1 && arg2)
		ajax ("logOut=true", "login.php", logOut);
	else if (arg1 && arg2){
		document.getElementById('navBar').innerHTML = "";
		document.getElementById('dirHeader').innerHTML = "";
		document.getElementById('fileInfoPanel').innerHTML = "";
		document.getElementById('directoryList').innerHTML = "";
		document.getElementById('preview').innerHTML = "";
		document.getElementById('breadCrumb').innerHTML = "";
		login();
	}
}

function checkSession(arg1, arg2)
{	
	if (!arg1 && !arg2) {//first call both argument is null, invoke ajax
		ajax ("checkSession=true", "login.php", checkSession);
	} else if (!arg1 && arg2) { //call back will results in second argument being true, but if arg1 is null then login require
		login();
	} else if (arg1 && arg2) { //if call back result in both being true then session has started 
		setCurr(1, 'WebDirectoryAccess');
		setCurr(2, 'stuff');
	}
}

function login(arg1, arg2)
{	
	document.getElementById('navBar').innerHTML = "";
	document.getElementById('dirHeader').innerHTML = "";
	document.getElementById('fileInfoPanel').innerHTML = "";
	document.getElementById('directoryList').innerHTML = "";
	
	if (document.getElementById('logIn'))
	{
		document.getElementById('err').innerHTML = "";
		var userName = document.getElementById('userName').value;
		var password = document.getElementById('password').value;
		
		if (!userName)
		{
			document.getElementById('err').innerHTML = "Missing user name";
			return;
		} else if (!password)
		{
			document.getElementById('err').innerHTML = "Missing password";
			return;
		}
		
		var data = "login=true" + "&userName=" + userName + "&password=" + password;
		
		if (!arg1 && !arg2)
			ajax (data, "login.php", login);
		else if (!arg1 && arg2)
			document.getElementById('err').innerHTML = "Log In Failed";
		else if (arg1 && arg2) {
			setCurr(1, 'WebDirectoryAccess');
			setCurr(2, 'stuff');
		}
		
	} else
		document.getElementById('fileList').innerHTML = logInHTML;
}

function previewImg (arg1, arg2)
{
	document.getElementById('preview').innerHTML = arg1;
}

function preview(img, name, size, date, time, sizeInBytes, arg1, arg2) 
{
	if (name.length > 16)
		name = name.substr (0, 8) + "..." + name.substr (name.length - 5, name.length);
	document.getElementById('fileName').innerHTML = name;
	document.getElementById('fileSize').innerHTML = size;
	document.getElementById('fileDate').innerHTML = date;
	document.getElementById('fileTime').innerHTML = time;
	document.getElementById('preview').innerHTML = "";
	
	if (sizeInBytes < 20971520 && name.substr(name.length - 3, name.length).toLowerCase() == "jpg")
		ajax (data = "dir=" + img, "image.php", previewImg);
}

function setCurr (lvl, directory)
{	
	document.getElementById('navBar').innerHTML = navBarHTML;
	document.getElementById('dirHeader').innerHTML = "Directories";
	
	if (lvl > crumbRecord.level)
	{
		crumbRecord.level ++;
		crumbRecord.dirString += ("/" + directory);
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
	
	for (var i = 0; i <= dirLvl; i ++)
	{
		if (dirArr[i] == ".")
			crumbRecord.dirString += dirArr[i];
		else
			crumbRecord.dirString += ("/" + dirArr[i]);
		truncDirName = dirArr[i]; //truncate long directory name (> 10) into shorter name easier display
		if (dirArr[i].length > 10) //if > 10 chars, take the first four and last three chars of string
			truncDirName = dirArr[i].substr (0, 4) + "..." + dirArr[i].substr (dirArr[i].length - 3, dirArr[i].length);
		crumbHTML += 
			"<li>" +
				"<a href=\"javascript: setCurr(" + 
					i + ", '" + 
					dirArr[i] + "');\">" + 
					truncDirName + 
				"</a>" +
			"</li>";
	}
	crumbHTML += 
			"</ul>" +
		"</div>";
	document.getElementById('breadCrumb').innerHTML = crumbHTML;
	ajax (data = "directory=" + crumbRecord.dirString, "getFiles.php", getFiles);
}

function getFiles (arg)
{
	if (arg){
		var dataObj = JSON.parse(arg);
		var dirArr = dataObj.breadCrumb.split("|");
		var dirList = "";
		var fileList = "";
		
		if (dirArr[0])
		{
			for (var i in dirArr)
				if (dirArr[i] !== "")
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
		
		if (fileArr[0])
		{
			for(var i in fileArr)
				if (fileArr[i] !== "")
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
	} else {
		document.getElementById('navBar').innerHTML = "";
		document.getElementById('dirHeader').innerHTML = "";
		document.getElementById('fileInfoPanel').innerHTML = "";
		document.getElementById('directoryList').innerHTML = "";
		document.getElementById('preview').innerHTML = "";
		document.getElementById('breadCrumb').innerHTML = "";
		document.getElementById('fileList').innerHTML = sessionErr;
	}
}