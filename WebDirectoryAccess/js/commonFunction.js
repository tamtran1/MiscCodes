/*
 * these are global variables 
 */
var crumbRecord = { //the bread crumb record data object
	"lvl" : 0, //start at lvl zero, the root directory
	"dir" : "/" //the root directory is the directory where this page is located
};

var fStatArr = []; //this array holds statistics objects for each file, it is used in the getFiles function

var logInHTML = "<div id = \"log-in-panel\" class = \"small-6 small-centered large-4 columns\">" +
					"<p></p>" +
					"<div class = \"row column log-in-form\">" +
						"<label>User ID" +
							"<input id = \"userName\" type = \"text\" onkeydown = \"if (event.keyCode == 13) {login();}\">" +
						"</label>" +
						"<label>Password" +
							"<input id = \"password\" type = \"password\" onkeydown = \"if (event.keyCode == 13) login();\">" +
						"</label>" +
						"<p><a style = \"float:right\" href = \"javascript: login();\" class = \"button expanded\">Log In</a></p>" +
						"<err id = \"err\" style = \"color: red\"></err>" +
					"</div>" +
				"</div>";

var TopMenuBarIconHTML = "<div id = \"toggle-topbar-menu-icon\">" +
							"<li class = \"toggle-topbar menu-icon\">" +
								"<a><span>menu</span></a>" +
							"</li>" +
						"</div>";
						
var TopBarSectionHTML = "<section id = \"top-bar-section\" class = \"top-bar-section\">" +
							"<ul class = \"right\">" +
								"<li class = \"divider\"></li>" +
								"<li class = \"has-dropdown\">" +
									"<a id = \"id\"></a>" +
									"<ul class = \"dropdown\">" +
										"<li class = \"has-dropdown\">" +
											"<a>Others</a>" +
											"<ul class = \"dropdown\">" +
												"<li><a href = \"#\">Some Game Project</a></li>" +
											"</ul>" +
										"</li>" +
										"<li><a href = \"javascript: logOut();\">Log Out</a></li>" +
									"</ul>" +
								"</li>" +
							"</ul>";
						"</section>";

var BreadCrumbPanelHTML = "<nav class = \"breadcrumbs\"></nav>";

var MainContentPanelHTML = "<div style = \"height : 480px; overflow : auto;\" id = \"directory-panel\" class = \"large-4 small-6 columns\"></div>" + //populated from getFile function
						
							"<div style = \"min-height : 480px;\" id = \"center-panel\" class = \"large-4 small-6 columns\">" +
								"<div id = \"image-panel\"></div><br>" +
								
								"<div id = \"file-info-panel\"></div>" + //populated from fileStat function
							"</div>" +
							
							"<div style = \"height : 480px; overflow : auto;\" id = \"file-panel\" class = \"large-4 small-12 columns\"></div>"; //populated from getFile function

var sessionErr = "<div style = \"width : 300px\" class = \"small-6 small-centered large-4 columns\"><br><err style =\"color: red\">" +
	"Oops! Can's access this directory.<br>Try to refresh the page or login again.<br><br>" +
	"<a href = \"javascript: login();\" class = \"button [tiny small large]\">Log In Again</a>" +
	"</err></div>";

var fileListErr = "<h4>Files</h4><hr><div class = \"row\"><h5><err>No Files Found</err></h5></div>";
var dirListErr = "<h4>Directory</h4><hr><div class = \"row\"><h5><err>No Sub Directory Found</err></h5></div>";
var featureImgHTML = "<div data-orbit>"; //this variable will hold the html string for the feature image
							
/*

var directoryListHTML = "<ul id = \"directoryList\" class = \"side-nav\" style = \"height:300px; width:237px; overflow:scroll;\"></ul>";
var fileListHTML = "<ul id = \"fileList\" class = \"side-nav\" style = \"height:497px; width:385px; overflow:scroll\"></ul>";

*/

/*
 * this is the common ajax function, all server requests are invoke through this function
 * takes three parameters, the date to send to the server, the script to which the data is to
 * be handled, and the callback function to whom the data is to be returned. 
 */
function ajax (data, dstScript, callback) {
	$.ajax ({
		url: dstScript,	//the data to send
		type: 'POST', //the method used to send the data
		data: data, //the data element
		contentType: "application/x-www-form-urlencoded", //the header
		success: callback //the callback, received data is applied to callback as single object 
	});
}

/*
 * function to clears all the panels, normally used for changing directory or logout
 */
function clrPanels () {
	$('#top-menu-bar-icon-panel').html ('');
	$('#top-bar-section').html ('');
	$('#bread-crumb-panel').html ('');
	$('#main-content-panel').html ('');
}

/*
 * this function is only called to initialize the top section panel and the breadcrumb
 * then there is log in or refresh is perform
 */
function initTopPanels (id) {
	$('#top-menu-bar-icon-panel').html (TopMenuBarIconHTML);
	$('#top-bar-section-panel').html (TopBarSectionHTML);
	$('#id').html ("Hello " + id);
	$('#bread-crumb-panel').html (BreadCrumbPanelHTML);
}

/*
 * function to initialize the empty panels
 */
function initMainPanels () {
	$('#main-content-panel').html (MainContentPanelHTML);
	$('#image-panel').html (featureImgHTML);
	/*
	 * important, below statement is necessary for webapp functionality, 
	 * must be last statement to execute after everything else is in place.
	 * do not delete !!!
	 */
	$(document).foundation();
	
}

/*
 * generate a random list of feature image from the given large list images
 * and use it for the orbit image preview
 */
function initFeatureImg (arg) {	
	if (arg) { //if empty list, do generate anything
		var lst = []; //the array to hold the random images
		
		for (var i = 0; i < 5; i++) { //loop for 5 times to select five different images
			var indx = Math.floor ((Math.random() * arg.length) - 1); //get random value up to size of large list
			lst.push (arg.splice (indx, 1)); //remove the image from large list and put in small list
		} //the image is remove from the large list so we don't select it twice
		
		for (var i in lst)
			featureImgHTML += "<img src = \"cacheImg/" + lst[i] + "\">";
		featureImgHTML += "</div>";
	}
}

/*
 * log out by invoking ajax to destroy session and clears all panels and reloads page
 * this function is called twice, the first call will invoke the ajax since both argument is undefined.
 * this function is also passed as a parameter to perform a callback, this second call clears the panel
 * and reload the page 
 */
function logOut(arg1, arg2) {
	if (arg1 && arg2) {
		clrPanels (); //callback returned and session destroy succeeds, clear the panels
		location.reload(); //and reload the page
	} else
		ajax ("logOut=true", "login.php", logOut); //invoke server to destroy the session first
}

/*
 *the preview image function, will only gets invoke if its an image and is a jpg file
 */
function previewImg (arg) {
	$('#image-panel').html (arg); //shows the preview image
}

/*
 * the file statistic function shows the statistics of the file when the user hovers mouse over the file name
 */
function fileStat (idx) {
	var fileInfoHTML = "<h6 class = \"subheader\">" +
		(fStatArr[idx].name.length > 30 ? fStatArr[idx].name.substr (0, 22) + "..." + fStatArr[idx].name.substr (-5) : fStatArr[idx].name) + "<br>" +
		fStatArr[idx].size + "<br>" +
		fStatArr[idx].date + "<br>" +
		fStatArr[idx].time + "<br>" +
		"</h6>";
	
	$('#file-info-panel').addClass ("panel");
	$('#file-info-panel').html (fileInfoHTML);
	
	if (fStatArr[idx].name.split ('.').pop().toLowerCase() == "jpg") //if this file is a jpg, show its preview
		ajax (data = "dir=" + fStatArr[idx].loc, "image.php", previewImg); //invoke ajax to resize image for faster rendering
}

/*
 * this check session function is called when the webpage just finish loaded or gets refresh
 * it is invoke twice on each call due to the ajax callback. the first call, both arguments is undefined
 * which will invoke ajax, then the callback from the ajax with the arguments defined. arg1 is the
 * response and arg2 is server response status, both arguments have to be true to determine a started session
 */
function checkSession (arg1, arg2) {
	if (arg1 && arg2) {//if call back result in both arg being true then session has started 
		var dataObj = JSON.parse (arg1);
		initFeatureImg (dataObj.imgLst);
		initTopPanels (dataObj.id); //if session is still active, initialize the top panels again
		chDir(dataObj.lvl, dataObj.dir); //go to designated directory
	} else if (!arg1 && arg2) { //call back will results in second argument being true, but if arg1 is null then login require
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
	if ($('#log-in-panel').length) { //first check if div logIn element exist, if not create one
		$('err').html(''); //empty out the error message tag 
		
		if (!$('#userName').val () || !$('#password').val ()) { //check if both input fields has a value 
			$('err').html ("Missing fields"); //raise an error message if either fields is empty
			logIn(); //calls itself again, cannot invoke ajax until this if condition is satisfy
		}
		
		if (arg1 && arg2) { //if both argument are satisfied
			var dataObj = JSON.parse (arg1);
			initFeatureImg (dataObj.imgLst);			
			initTopPanels (dataObj.id); //log in succeed, initialize the top panels 
			chDir(dataObj.lvl, dataObj.dir); //go to designated directory
		} else if (!arg1 && arg2) //arg1 is the server response, if this is false, logIn failed raise error message
			$('#err').html ("Log in failed");
		else //if both argument are undefined, invoke ajax to check the username and password
			ajax ("login=true" + "&userName=" + $('#userName').val () + "&password=" + $('#password').val (), "login.php", login);
	} else
		$('#main-content-panel').html (logInHTML); //populate the fileInfoPanel with the logIn form
}

/*
 * the change directory function clears the panel and updates the crumbRecord struct
 * the crumbRecord struct is responsible for manoeuvrability on the directories structure
 * Note: a browser refresh will zero the crumbRecord.lvl, no need case for lvl == crumbRecord.lvl
 */
function chDir (lvl, dir) {
	initMainPanels(); //initialize panels for new contents
	
	if (lvl > crumbRecord.lvl) { //if lvl is greater than the crumbRecord level, then going deeper into sub-folder
		crumbRecord.lvl += lvl - crumbRecord.lvl; //increment a level based on this offset
		
		crumbRecord.dir += (crumbRecord.dir.length > 1) ? ("/" + dir) : dir; //append the selected directory to the string
		constrBrdCrmb (crumbRecord.lvl); //update the breadcrumb of the new selected folder
	} else {
		crumbRecord.lvl = lvl; //if lvl is lesser than crumbRecord level, then going back out of sub-folder
		constrBrdCrmb (lvl); //update the breadcrumb lvl
	}
}

/*
 * this function takes the an integer argument that represent the directory level
 * and use it to create the directory bread crumb in a loop
 */
function constrBrdCrmb (lvl) {
	var dirArr = crumbRecord.dir.split("/"); //split directory string into pieces and puts them in an array
	crumbRecord.dir = "/"; //need to reset directory string, since going up a directory would shortens the string
	
	//begin constructing the bread crumb HTML, NOTE! first crumb is hard coded, since the '/' was removed after the split
	var breadCrumbHTML = "<nav class = \"breadcrumbs\"><a href = \"javascript: chDir (0, '/');\">/</a>";
	for (var i = 1; i <= lvl; i ++) {
		crumbRecord.dir += (crumbRecord.dir.length > 1) ? ("/" + dirArr[i]) : dirArr[i]; //new directory string reconstruction based on selected bread crumb
			if (i == lvl) //if this is the current directory element, make it non-clickable 
				breadCrumbHTML += "<a class = \"current\">" + dirArr[i] + "</a>";
			else //truncate any long directory name for easier display, if > 10 chars just take the first four and last three chars of string
				breadCrumbHTML += "<a href = \"javascript: chDir (" + i + ", '" + dirArr[i] + "');\">" + ((dirArr[i].length > 10) ? dirArr[i].substr (0, 4) + "..." + dirArr[i].substr (-3) : dirArr[i]) + "</a>";
	}
	breadCrumbHTML += "</nav>"; //attach the closing tags
	
	$('#bread-crumb-panel').html (breadCrumbHTML); //update the new bread crumb HTML content
	//crumbRecord.dir could be an empty string, the '.' indicating root, is appended at the server side
	ajax (data = "directory=" + crumbRecord.dir + "&lvl=" + lvl, "getFiles.php", getFiles);
}

/*
 * this is the get files function, it is invoke as a callback from ajax, which was invoke after constructing the bread crumb
 */
function getFiles (arg) {
	if (arg) {
		var dataObj = JSON.parse(arg); //parsing the json object
		var dirArr = dataObj.breadCrumb.split("|");
		dirArr.pop(); //pop off the last empty element that was included after the split
		var dirListHTML = "<h4>Directory</h4>";
		var fileListHTML = "<h4>Files</h4>";
		
		if (dirArr[0]) {
			for (var i in dirArr) //constructing the directory list HTML	
				dirListHTML += "<div class = \"row\"><h5><a href = \"javascript: chDir (" + (crumbRecord.lvl + 1) + ", '" + dirArr[i] + "');\">" + dirArr[i] + "</a></h5></div>";
			
			$('#directory-panel').html (dirListHTML); //update the directory list with the new HTML content
		} else
			$('#directory-panel').html (dirListErr); //error could also means there are no sub-directory
		
		var fDateArr = dataObj.fileDate.split("|"); //parsing the JSON object data into their respective lists
		var fTimeArr = dataObj.fileTime.split("|");
		var fSizeArr = dataObj.fileSizeList.split("|");
		var fileArr = dataObj.fileList.split("|");
		fileArr.pop(); //pop off the last empty element that was included after the split, this is needed if we are going to iterate 
						//over the list since the last empty element will show up in the browser
		fStatArr.length = 0; //clear the previous file stat list for content of new directory
		
		if (fileArr[0]) {
			for(var i in fileArr) {
				 //pushing the stat of the current file into the list
				fStatArr.push ({
					name: fileArr[i], 
					size: fSizeArr[i], 
					date: fDateArr[i], 
					time: fTimeArr[i], 
					loc: crumbRecord.dir + (crumbRecord.dir != "/" ? "/" : "") + fileArr[i]});
				
				fileListHTML += "<div class = \"row\"><h5><a href = \"" + fStatArr[i].loc + "\"" + //parameter of location of file
					"onMouseOver = \"fileStat (" + i + ");\">" + //on mouse over will show the statistics of the file at this idx
					fStatArr[i].name + "</a></h5></div>"; //name of file as it would appear in browser, not a parameter of fileStat
			}
			
			$('#file-panel').html (fileListHTML); //update the fileList with the new HTML content
		} else
			$('#file-panel').html (fileListErr); //this could means that the directory does not have any file
	} else { //this error situation happens when the user is logged in and then clears their cookies cache while the page is displayed in the browser, 
		clrPanels (); //a refresh or change directory will raise a session error since their credential is missing
		$('#main-content-panel').html (sessionErr); //raises the session error
	}
}