<?php
/*
Tam Tran
Instructor: Mr. Lupoli
Class: CMSC 331
11/21/2014
Project 1
description: this is the workOrder.php page, this is the actual content to collect the user data. the head.html and tail.htnl are included and used
in here. all the dropdown boxes actions are demonstrated here. the first database elements to populate a dropbox is the location table, and to start the user off with
something to select and then it proceed to populate the suceeding dropbox relative to one another. much thoughts have been emphasize on the simplicity of the interface
to along with descriptive text contents to make it as easy to use and as little input as posible for the user, while at the same time still able to gather effective
information to serve the purpose of this tool.
*/
	$debug = false;
	include ('common.php');
	$COMMON = new Common($debug);

//===html head===this is where the head of the html is used, all content below are rendered on the user browser from the server.
	include ("headHTML.html");
	
		//defining the form for the html document
		print ("<form id = \"form\" name = \"form\" action = \"confirm.php\" method = \"post\">");
		print ("<label><strong><center><font size = \"6\">Report a maintenance issue</font></center></strong><br>");
		print ("</label>");
		
//===name field====this is the first user input text box. this is where the user can enter their name 
		print ("<label>What is your name ?   ");
			print ("<input name = \"name\" id = \"name\" type = \"text\" placeholder = \"First name then last name\" size = \"30\" maxlength = \"30\" class = \"input\"/>");
			print ("<font size = 2 color = \"red\"> *</font><br><br>");
		print ("</label>");

//===phone number field===this text box collect the user telephone number
		print ("<label>What is your phone number ?   ");
			print ("<input name = \"phone\" id = \"phone\" type = \"text\" placeholder = \"Enter only the digits\" size = \"17\" maxlength = \"10\" class = \"input\" onKeyup = \"isValidChar (this.value)\"/>");
			print ("<font size = 2 color = \"red\"> *</font><br><br>");
		print ("</label>");

//===location field===this is the first dropdown selection box to select the location of the issue, table is pulled from the database from here.
		$sql = "select * from Location";
		$location = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
		print ("<label>Where is the issue located ?   ");
			print ("<select name = \"location\" id = \"location\" onchange = \"populateList (this.value, 'issue', 'problem', 'detail')\">");
				print ("<option value = \"Select related issue\">Select a location</option>");
				while ($row = mysql_fetch_array($location))
					print ("<option value = \"".$row['Property']."\">".$row['Description']."</option>");
			print ("</select>");
			print ("<font size = 2 color = \"red\"> *</font><br><br>");
		print ("</label>");

//===issue field===this selection box populate after the user selects a location, it is fixed to one table from the database despite which ever location the user picks 
		print ("<label>What is the issue related to ?   ");
			print ("<select id = \"issue\" name = \"issue\" onchange = \"populateList (this.value, 'problem', 'detail')\">");
				print ("<option value = \"Select specific problem\">Select related issue</option>");
			print ("</select>");
			print ("<font size = 2 color = \"red\"> *</font><br><br>");
		print ("</label>");

//===type field===this selection box populates after the user selects a ralated issue, this box populates relatively based on the related issue selected by the user 
		print ("<label>What's the problem with it ?   ");
			print ("<select id = \"problem\" name = \"problem\" onchange = \"populateList (this.value, 'detail')\">");
				print ("<option value = \"Select specific detail\">Select specific problem</option>");
			print ("</select>");
			print ("<font size = 2 color = \"red\"> *</font><br><br>");
		print ("</label>");

//===detail field===on certain situation that require more specfic content, the user may have to pick this box to fill in more details on the issue 
		print ("<label>Where or which one is it ?   ");
			print ("<select id = \"detail\" name = \"detail\">");
				print ("<option value = \"\">Select specific detail</option>");
			print ("</select>");
			print ("<font size = 2 color = \"red\"> *</font><br><br>");
		print ("</label>");

//===date field===this is the optional field where the user can enter in the desire date to carry out the service 
		print ("<label>When should this job begin?   ");
			print ("<input type = \"date\" id = \"jobBeginDate\" name = \"jobBeginDate\" placeholder = \"yyyy-mm-dd\" size = \"9\" maxlength = \"10\" class = \"input\"/> ");
			print ("<font size = 1 color = \"grey\">(optional)</font><br><br>");
		print ("</label>");

//===text box field===this is the optional comment box to fill in extra details about the issue which may not be available from the dropdown selection box
		print ("<label>Is there any additional details you would like to add ?<br>");
			print ("<textarea name = \"comments\" id = \"comments\" placeholder = \"You got 120 characters limit, please be brief.\" rows = \"4\" cols = \"45\" maxlength = \"120\"></textarea> ");
			print ("<font size = 1 color = \"grey\">(optional)</font><br>");
		print ("</label>");
		
//===required field message===just a message to tell user the fields are required to process the request
		print ("<font size = 1 color = \"red\">* are required information</font><br>");

//===date stamp===display the date and time at the bottom of the page
		print ("<font size = 1 color = \"grey\">It is <script>document.write(Date());</script></font>");

//===submit button===this is the submit button
		print ("<button type = \"button\" id = \"submitButton\" onclick= \"confirm()\">Submit</button><br><br>");
		//print ("<input name = \"Submit\" type = \"submit\" id = \"submit\" value = \"Submit\"/><br><br>");

//===html tail===the tail of the html content is used here to close off the html document
		print ("</form>");
	include ("tailHTML.html");
?>