<?php
/*
Tam Tran
Instructor: Mr. Lupoli
Class: CMSC 331
11/21/2014
Project 1
description: this is the debug.php, this page is used to display and verify the content that was pushed into the database. this page does not used the head, but only the tail
of the html document because it does not need the style format and the table display is simply too big to format properly in the standard style
*/

	include('common.php');
	$debug = false;
	$COMMON = new Common($debug);
	session_start();

	$sql = "select * from `Customer Request`";		
	$table = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);

	//defining the html head for the debug page
	print ("<!DOCTYPE html>");
	print ("<html>");
		print ("<head>");
			print ("<meta charset = \"ISO-8859-1\">");
			print ("<title>Debug</title>");
	
			print ("<style>");
				print ("body");
				print ("{");
					print ("background-color: linen;");
					print ("font-family: Arial, Verdana;");
				print ("}");
			print ("</style>");
	
		print ("</head>");
		print ("<body>");
		print ("<label><strong><center><font size = \"6\">The debug page</font></center></strong><br>");

		//this block pulls database's the field names for the table
		print ("<table border='1px'>");
		print ("<tr>");
		print ("<td>".mysql_field_name ($table, 4)."</td>");
		print ("<td>".mysql_field_name ($table, 6)."</td>");
		print ("<td>".mysql_field_name ($table, 7)."</td>");
		print ("<td>".mysql_field_name ($table, 8)."</td>");
		print ("<td>".mysql_field_name ($table, 9)."</td>");
		print ("<td>".mysql_field_name ($table, 10)."</td>");
		print ("<td>".mysql_field_name ($table, 11)."</td>");
		print ("<td>".mysql_field_name ($table, 15)."</td>");
		print ("<td>".mysql_field_name ($table, 16)."</td>");
		print ("<td>".mysql_field_name ($table, 17)."</td>");
		print ("<td>".mysql_field_name ($table, 18)."</td>");
		print ("<td>".mysql_field_name ($table, 25)."</td>");
		print ("<td>".mysql_field_name ($table, 27)."</td>");
		print ("<td>".mysql_field_name ($table, 30)."</td>");
		print ("<td>".mysql_field_name ($table, 32)."</td>");
		print ("<td>".mysql_field_name ($table, 43)."</td>");
		print ("<td>".mysql_field_name ($table, 44)."</td>");
		print ("<td>".mysql_field_name ($table, 47)."</td>");
		print ("</tr>");
		
		//this block itteratively populates the the table grid and echoes it to the screen. 
		while ($row = mysql_fetch_array($table))
			print ("<tr><td>".$row ['requestor']."</td><td>".$row ['desired_date'].
				"</td><td>".$row ['description']."</td><td>".$row ['long_desc'].
				"</td><td>".$row ['region_code']."</td><td>".$row ['fac_id'].
				"</td><td>".$row ['bldg']."</td><td>".$row ['contact'].
				"</td><td>".$row ['contact_ph']."</td><td>".$row ['contact_mc'].
				"</td><td>".$row ['problem_code']."</td><td>".$row ['login'].
				"</td><td>".$row ['shop']."</td><td>".$row ['company_id'].
				"</td><td>".$row ['oc_code']."</td><td>".$row ['order_type'].
				"</td><td>".$row ['category']."</td><td>".$row ['pri_code'].
				"</td></tr>");
		print ("</table><br><br>");
		
		print ("<a href = \"index.html\">Continue</a>");
		print ("<META http-equiv = \"REFRESH\" content = \"200; index.html\">");  //this line automatically redirects to a php page after one seconds
	
//===html tail===the tail html is used here
	include ("tailHTML.html");
?>

