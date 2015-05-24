/*===============================> global variables <===============================*/
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

var sessionErr = 
	"<div style = \"width:350px\">" +
		"<err style =\"color: red\">" +
			"Oops! there seems to be a session error, try logging in again.<br>" +
			"<a style = \"float:right\"href = \"javascript: login();\" class = \"button [tiny small large]\">Log In</a>" +
		"</err>" +
	"</div>";

var logInHTML = 
	"<div id = \"logIn\" style = \"width:350px\">" +
		"<label>" +
			"User Name" +
			"<input id = \"userName\" type = \"text\" onkeydown = \"if (event.keyCode == 13) {login();}\"/>" +
		"</label>" +
		"<label>" +
			"Password" +
			"<input id = \"password\" type = \"password\" onkeydown = \"if (event.keyCode == 13) {login();}\"/>" +
		"</label>" +
		"<a style = \"float:right\"href = \"javascript: login();\" class = \"button [tiny small large]\">Log In</a>" +
		"<err id = \"err\" style = \"color: red\"></err>" +
	"</div>";
	
var navBarHTML = 
	"<ul class = \"button-group\">" +
		"<li>" +
			"<a href = \"javascript: logOut();\" class = \"button\">" +
				"Log Out" +
			"</a>" +
		"</li>" +
	"</ul>";
	
var logInFailedHTML =
	"<div id = \"logInFailed\" style = \"width:350px\">" +
		"<label style = \"color : red\">" +
			"Log In Failed" +
		"</label>" +
		"<a style = \"float:right\"href = \"javascript: login()\" class = \"button [tiny small large]\">Try Again</a>" +
	"</div>";

/*===============================> common functions <===============================*/
function logOut()
{
	if (window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject ("Microsoft.XMLHTTP");
	
		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				document.getElementById('navBar').innerHTML = "";
				document.getElementById('dirHeader').innerHTML = "";
				document.getElementById('fileInfoPanel').innerHTML = "";
				document.getElementById('directoryList').innerHTML = "";
				document.getElementById('preview').innerHTML = "";
				document.getElementById('breadCrumb').innerHTML = "";
				login();
			}
		}
		xmlhttp.open ("post", "login.php", "true");
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send ("logOut=true");
}

function checkSession(logOut)
{
	var data = "checkSession=true";
		
	if (window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject ("Microsoft.XMLHTTP");
	
		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				if (xmlhttp.responseText)
					setCurr(1, 'stuff');
				else
					login();
			}
		}
		xmlhttp.open ("post", "login.php", "true");
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send (data);
}

function login()
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
		
		if (window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject ("Microsoft.XMLHTTP");
	
		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				if (xmlhttp.responseText)
					setCurr(1, 'stuff');
				else
					document.getElementById('fileList').innerHTML = logInFailedHTML;
			}	
		}
	
		xmlhttp.open ("post", "login.php", "true");
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send (data);
		
	} else
		document.getElementById('fileList').innerHTML = logInHTML;
}

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
	document.getElementById('navBar').innerHTML = navBarHTML;
	document.getElementById('dirHeader').innerHTML = "Directories";
	
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
			if (xmlhttp.responseText)
			{
				var dataObj = JSON.parse(xmlhttp.responseText);
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
			} else
			{
				document.getElementById('navBar').innerHTML = "";
				document.getElementById('dirHeader').innerHTML = "";
				document.getElementById('fileInfoPanel').innerHTML = "";
				document.getElementById('directoryList').innerHTML = "";
				document.getElementById('preview').innerHTML = "";
				document.getElementById('breadCrumb').innerHTML = "";
				document.getElementById('fileList').innerHTML = sessionErr;
			}
		}	
	}
	
	xmlhttp.open ("post", "getFiles.php", "true");
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send (data);
}