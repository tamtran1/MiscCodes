/*
 * these are global variables 
 */
var crumbRecord = { //the bread crumb record data object
	"level" : 0,
	"dirString" : ""
};

var fStatArr = [];

var fileInfoHTML = "<div class = \"shiftUp\"><div class=\"panel\"><h5>File Info</h5>" +
	"Name: <name id = \"fileName\"></name><br>" +
	"Size: <size id = \"fileSize\"></size><br>" +
	"Date: <date id = \"fileDate\"></date><br>" +
	"Time: <time id = \"fileTime\"></time><br>" +
	"</div></div>";

var sessionErr = "<div style = \"width:350px\"><err style =\"color: red\">" +
	"Oops! there seems to be a session error, try logging in again.<br>" +
	"<a style = \"float:right\"href = \"javascript: login();\" class = \"button [tiny small large]\">Log In</a>" +
	"</err></div>";

var logInHTML = "<div id = \"logIn\" style = \"width: 350px;\">" +
	"<label>User Name" +
	"<input id = \"userName\" type = \"text\" onkeydown = \"if (event.keyCode == 13) {login();}\"/></label>" +
	"<label>Password" +
	"<input id = \"password\" type = \"password\" onkeydown = \"if (event.keyCode == 13) login();\"/></label>" +
	"<a style = \"float:right\"href = \"javascript: login();\" class = \"button [tiny small large]\">Log In</a>" +
	"<err id = \"err\" style = \"color: red\"></err></div>";
	
var navBarHTML = "<ul class = \"button-group\">" +
	//"<li><a href = \"report_maintentance_issue/index.html\" class = \"button\">CMSC331 Work</a></li>" +
	//"<li><a href = \"planes_for_hire/Main.php\" class = \"button\">CMSC447 Work</a></li>" +
	"<li><a href = \"javascript: logOut();\" class = \"button\">Log Out</a></li></ul>";

var directoryListHTML = "<ul id = \"directoryList\" class = \"side-nav\" style = \"height:300px; width:237px; overflow:scroll;\"></ul>";
var fileListHTML = "<ul id = \"fileList\" class = \"side-nav\" style = \"height:497px; width:385px; overflow:scroll\"></ul>";
var fileListErr = "<err class = \"shiftRight\">No Files Found</err>";
var dirListErr = "<err class = \"shiftLeft\">No Sub Directory Found</err>";

/*
 * this is the common ajax function, all server requests are invoke through this function
 * takes three parameters, the date to send to the server, the script to which the data is to
 * be handled, and the callback function to whom the data is to be returned. 
 */
function ajax (data, dstScript, callback) {
	$.ajax ({
		url: dstScript,
		type: 'POST',
		data: data,
		contentType: "application/x-www-form-urlencoded",
		success: callback
	});
}

/*
 * function to clears all the panels, normally used for changing directory or logout
 */
function clrPanels () {
	$('#navBar').html('');
	$('#breadCrumb').html('');
	$('#dirHeader').html('');
	$('#fileInfoPanel').html('');
	$('#directoryListPanel').html('');
	$('#preview').html('');
}

/*
 * function to initialize the empty panels
 */
function initPanels () {
	$('#navBar').html (navBarHTML);
	$('#dirHeader').html ('Directories');
	$('#directoryListPanel').html(directoryListHTML);
	$('#fileInfoPanel').html(fileInfoHTML);
	$('#fileListPanel').html (fileListHTML);
	$('#preview').html('');
}

/*
 * log out by invoking ajax to destroy session and clears all panels and reloads page
 * this function is called twice, the first call will invoke the ajax since both argument is undefined.
 * this function is also passed as a parameter to perform a callback, this second call clears the panel
 * and reload the page 
 */
function logOut(arg1, arg2) {
	if (arg1 && arg2) {
		clrPanels (); //when callback succeeds, clear the panels and reload the page
		location.reload();
	} else
		ajax ("logOut=true", "login.php", logOut);
}

/*
 * this check session function is called when the webpage just finish loaded or gets refresh
 * it is invoke twice on each call due to the ajax callback. the first call, both arguments is undefined
 * which will invoke ajax, then the callback from the ajax with the arguments defined. arg1 is the
 * response and arg2 is server response status, both arguments have to be true to determine a started session
 */
function checkSession (arg1, arg2) {
	if (arg1 && arg2) //if call back result in both arg being true then session has started 
		chDir (1, 'stuff');
	else if (!arg1 && arg2) { //call back will results in second argument being true, but if arg1 is null then login require
		login();
	} else //if both argument are null, invoke ajax
		ajax ("checkSession=true", "login.php", checkSession);
}

/*
 * this login function is called twice, the first time its called is from the check session function, and the second time is
 * from the ajax callback. the same principle applies similar to the check session, both arguments has to be true to determine
 * a started session
 */
function login(arg1, arg2) {
	if ($('#logIn').length) { //first check if div logIn element exist, if not create one
		$('err').html(''); //empty out the error message tag 
		
		if (!$('#userName').val () || !$('#password').val ()) { //check if both input fields has a value 
			$('err').html ("Missing fields"); //raise an error message if either fields is empty
			logIn(); //calls itself again, cannot invoke ajax until this if condition is satisfy
		}
		
		if (arg1 && arg2) //if both argument are satisfied
			chDir(1, 'stuff'); //go to designated directory
		else if (!arg1 && arg2) //arg1 is the server response, if this is false, logIn failed raise error message
			$('#err').html ("Log in failed");
		else //if both argument are undefined, invoke ajax to check the username and password
			ajax ("login=true" + "&userName=" + $('#userName').val () + "&password=" + $('#password').val (), "login.php", login);
	} else
		$('#fileListPanel').html (logInHTML); //populate the fileInfoPanel with the logIn form
}

/*
 *the preview image function, will only gets invoke if its an image and is a jpg file
 */
function previewImg (arg) {
	$('#preview').html (arg); //shows the preview image
}

/*
 * the file statistic function shows the statistics of the file when the user hovers mouse over the file name
 */
function fileStat (idx) {
	$('#fileName').html (fStatArr[idx].name.length > 16 ? fStatArr[idx].name.substr (0, 8) + "..." + fStatArr[idx].name.substr (-5) : fStatArr[idx].name);
	$('#fileSize').html (fStatArr[idx].size);
	$('#fileDate').html (fStatArr[idx].date);
	$('#fileTime').html (fStatArr[idx].time);
	$('#preview').html ('');
	
	if (fStatArr[idx].name.split ('.').pop().toLowerCase() == "jpg") //if this file is a jpg, show its preview
		ajax (data = "dir=" + fStatArr[idx].loc, "image.php", previewImg); //invoke ajax to resize image for faster rendering
}

/*
 * the change directory function clears the panel and updates the crumbRecord struct
 * the crumbRecord struct is responsible for manoeuvrability on the directories structure 
 */
function chDir (lvl, directory) {
	initPanels(); //initialize the panels for new directory contents
	
	if (lvl > crumbRecord.level) { //if lvl is greater than the crumbRecord level, then going deeper into sub-folder
		crumbRecord.level ++; //increment a level for going into sub-folder
		crumbRecord.dirString += ("/" + directory); //append the selected folder name to the crumbRecord directory string
		constrBrdCrmb (crumbRecord.level); //update the breadcrumb of the new selected folder
	} else {
		crumbRecord.level = lvl; //if lvl is lesser than crumbRecord level, then going back out of sub-folder
		constrBrdCrmb (lvl); //update the breadcrumb of the new selected directory
	}
}

/*
 * this function takes the an integer argument that represent the directory level
 * and use it to create the directory bread crumb in a loop
 */
function constrBrdCrmb (dirLvl) {
	var dirArr = crumbRecord.dirString.split("/"); //split directory string into pieces and puts them in an array
	crumbRecord.dirString = ""; //need to reset directory string, since going up a directory would shortens the string
	
	//begin constructing the bread crumb HTML, NOTE! first crumb is hard coded, since the '/' was removed after the split
	var crumbHTML = "<div class = \"shiftRight\"><ul class=\"breadcrumb\"><li><a href=\"javascript: chDir (0, '/');\">./</a></li>";
	for (var i = 1; i <= dirLvl; i ++) {
		crumbRecord.dirString += ("/" + dirArr[i]); //new directory string reconstruction based on selected bread crumb
		crumbHTML += "<li><a href=\"javascript: chDir (" + i + ", '" + dirArr[i] + "');\">" +
			//truncate any long directory name for easier display, if > 10 chars just take the first four and last three chars of string
			((dirArr[i].length > 10) ? dirArr[i].substr (0, 4) + "..." + dirArr[i].substr (-3) : dirArr[i]) + "</a></li>";
	}
	crumbHTML += "</ul></div>"; //attach the closing tags
	
	$('#breadCrumb').html (crumbHTML); //update the new bread crumb HTML content
	ajax (data = "directory=" + crumbRecord.dirString, "getFiles.php", getFiles); //begin fetching content on the selected directory
}

/*
 * this is the get files function, it is invoke as a callback from ajax, which was invoke after constructing the bread crumb
 */
function getFiles (arg) {
	if (arg) {
		var dataObj = JSON.parse(arg); //parsing the json object
		var dirArr = dataObj.breadCrumb.split("|");
		dirArr.pop(); //pop off the last empty element that was included after the split
		var dirListHTML = "";
		var fileListHTML = "";
		
		if (dirArr[0]) {
			for (var i in dirArr) //constructing the directory list HTML	
				dirListHTML += "<li><a class = \"shiftLeft\" href = \"javascript: chDir (" + (crumbRecord.level + 1) + ", '" + dirArr[i] + "');\">" + dirArr[i] + "</a></li>";
			
			$('#directoryList').html (dirListHTML); //update the directory list with the new HTML content
		} else
			$('#directoryList').html (dirListErr); //error could also means there are no sub-directory
		
		var fDateArr = dataObj.fileDate.split("|"); //parsing the JSON object data into their respective lists
		var fTimeArr = dataObj.fileTime.split("|");
		var fSizeArr = dataObj.fileSizeList.split("|");
		var fileArr = dataObj.fileList.split("|");
		fileArr.pop(); //pop off the last empty element that was included after the split, this is needed if we are going to iterate 
						//over the list since the last empty element will show up in the HTML browser
		fStatArr.length = 0; //clear the previous file stat list for content of new directory
		
		if (fileArr[0]) {
			for(var i in fileArr) {
				 //pushing the stat of the current file into the list
				fStatArr.push ({name: fileArr[i], size: fSizeArr[i], date: fDateArr[i], time: fTimeArr[i], loc: crumbRecord.dirString + "/" + fileArr[i]});
				
				fileListHTML += "<li><a class = \"shiftRight\" href = \"" + fStatArr[i].loc + "\"" + //parameter of location of file
					"onMouseOver = \"fileStat (" + i + ");\">" + //on mouse over will show the statistics of the file at this idx
					fStatArr[i].name + "</a></li>"; //name of file as it would appear in browser, not a parameter of fileStat
			}
			
			$('#fileList').html (fileListHTML); //update the fileList with the new HTML content
		} else
			$('#fileList').html (fileListErr); //this could means that the directory does not have any file
	} else { //this error situation happens when the user is logged in and then clears their cookies cache while the page is displayed in the browser, 
		clrPanels (); //a refresh or change directory will raise a session error since their credential is missing
		$('#fileList').html (sessionErr); //raises the session error
	}
}