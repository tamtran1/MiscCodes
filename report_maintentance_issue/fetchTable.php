<?php
/*
Tam Tran
Instructor: Mr. Lupoli
Class: CMSC 331
11/21/2014
Project 1
description: this is the fetchTable.php, this php file is used in conjunction with the ajax script to dynamically populate the dropdown selection box.
this is how the ajax is able to asychronously communicates with the server just to retrieves a piece of information to updates a portion of the page
*/
	$debug = false;
	include ('common.php');
	$COMMON = new Common($debug);
	
	//information is exchange via post
	$category = $_POST['category'];
	$type = $_POST['type'];

	//this determines which dropdown box to populate, in here the php directly renders the retieved content to the webpage rather than returning something back 
	if ($type == "issue")
		if ($category !== "Select related issue")
		{
			$sql = "select * from `problemType`";
			$list = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
	
			print ("<option value = \"Select specific problem\">Select related issue</option>");
			if ($list !== false)				
				while ($row = mysql_fetch_array($list))
					print ("<option value = \"".$row['problem_code']."\">".$row['description']."</option>");
		}
		else
			print ("<option value = \"Select relatted issue\">".$category."</option>");
	
	//this renders the specific problem dropdown box	
	if ($type == "problem")
	{
		$sql = "select * from `".$category."`";
		$list = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
		
		print ("<option value = \"\">Select specific problem</option>");
		if ($list !== false)		
			while ($row = mysql_fetch_array($list))
				print ("<option value = \"".$row['Issue']."\">".$row['Issue']."</option>");
	}
	
	//this renders the specific details dropdown box 
	if ($type == "detail")
	{
		$sql = "select * from `".$category."`";
		$list = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
		
		print ("<option value = \"\">Select specific detail</option>");
		if ($list !== false)		
			while ($row = mysql_fetch_array($list))
				print ("<option value = \"".$row['code']."\">".$row['description']."</option>");
	}
?>