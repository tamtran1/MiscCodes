<?php
	$debug = false;
	include ('common.php');
	$COMMON = new Common($debug);

//===html head===	
	include ("headHTML.html");
		print ("<form action = \"confirm.php\" method = \"post\" name = \"form\">");
		print ("<label><center><font size = \"6\">Report a maintenance issue</font></center><br>");
		print ("</label>");
		
		print ("<font size = \"4\">"); //sets the default font size for the rest of the content

//===name field====
		print ("<label>What is your name ?   ");
			print ("<input name = \"name\" type = \"text\" size = \"30\" maxlength = \"30\"/>");
			print ("<font size = 2 color = \"red\">*</font><br><br>");
		print ("</label>");

//===phone number field===
		print ("<label>What is your phone number ?   ");
			print ("<input name = \"phone\" type = \"text\" size = \"15\" maxlength = \"13\"/>");
			print ("<font size = 2 color = \"red\">*</font><br><br>");
		print ("</label>");

//===location field===
		$sql = "select * from Location";		
		$location = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
		print ("<label>Where is the location of the issue ?   ");
			print ("<select name = \"location\" id = \"location\">");
				print ("<option value = \"\">Select a location</option>");
				while ($row = mysql_fetch_array($location))
				{
					print ("<option value = \"".$row['Property']."\">".$row['Description']."</option>");
				}
			print ("</select>");
			print ("<font size = 2 color = \"red\">*</font><br><br>");
		print ("</label>");

//===problem field=== 
		$sql = "select * from Problem_Type";		
		$problemType = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
		print ("<label>What is the issue related to ?   ");
			print ("<select id = \"issue\" onchange = \"populateProblemList (this, document.getElementById('problem'))\">");
				print ("<option value = \"\">Select an issue</option>");
				while ($row = mysql_fetch_array($problemType))
				{
					print ("<option value = \"".$row['Code']."\">".$row['Type']."</option>");
				}
			print ("</select>");
			print ("<font size = 2 color = \"red\">*</font><br><br>");
		print ("</label>");

//===type field===
		print ("<label>What's the problem with it ?   ");
			print ("<select id = \"problem\">");
				print ("<option value = \"\">Select a problem</option>");
			print ("</select>");
			print ("<font size = 2 color = \"red\">*</font><br><br>");
		print ("</label>");

//===date field===		
		print ("<label>When should this job begin?   ");
			print ("<input type = \"text\" name = \"jobBeginDate\" value = \"mm/dd/yyyy\" size = \"9\" maxlength = \"10\"> ");
			print ("<font size = 2 color = \"grey\">(optional)</font><br><br>");
		print ("</label>");

//===text box field===
		print ("<label>Is there any additional details you would like to add ?<br>");
			print ("<textarea name = \"comments\" rows = \"3\" cols = \"40\" maxlength = \"120\"></textarea> ");
			print ("<font size = 2 color = \"grey\">(optional)</font><br>");
		print ("</label>");
		
//===required field message===		
		print ("<font size = 1 color = \"red\">* are required information</font><br>");

//===date stamp===
		print ("<font size = 1 color = \"grey\">It is <script>document.write(Date());</script></font>");

//===submit button===
		print ("<input name = \"Submit\" type = \"submit\" value = \"Submit\" class = \"button\"/>");

//===java script function===
		print ("<script type=\"text/javascript\">"); 
			print ("function populateProblemList (type, problem)");
			print ("{");
				
				$sql = "select * from Electrical";		
				$electrical = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
				print ("var electrical = new Array();");
				$x = 0;
				while ($row = mysql_fetch_array($electrical))
					print ("electrical[".$x++."] = \"".$row['Issue']."\";");
				
				$sql = "select * from AC_and_Heating";		
				$acHeating = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
				print ("var acHeating = new Array();");
				$x = 0; 
				while ($row = mysql_fetch_array($acHeating))
					print ("acHeating[".$x++."] = \"".$row['Issue']."\";");
				
				$sql = "select * from Landscape_n_Grounds";		
				$landscape = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
				print ("var landscape = new Array();");
				$x = 0;
				while ($row = mysql_fetch_array($landscape))
					print ("landscape[".$x++."] = \"".$row['Issue']."\";");

				$sql = "select * from Plumbing";		
				$plumbing = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
				print ("var plumbing = new Array();");
				$x = 0;
				while ($row = mysql_fetch_array($plumbing))
					print ("plumbing[".$x++."] = \"".$row['Issue']."\";");
				
				print ("switch (type.value)");
				print ("{");
					print ("case 'CSE01':");
						print ("problem.options.length = 1;");
						print ("for (i = 0; i < electrical.length; i++)");
							print ("createOption(problem, electrical[i], electrical[i]);");
						print ("break;");
					print ("case 'CSE02':");
						print ("problem.options.length = 1;");
						print ("for (i = 0; i < acHeating.length; i++)");
							print ("createOption(problem, acHeating[i], acHeating[i]);");
						print ("break;");
					print ("case 'CSE03':");
						print ("problem.options.length = 1;");
						print ("for (i = 0; i < plumbing.length; i++)");
							print ("createOption(problem, plumbing[i], plumbing[i]);");
						print ("break;");
					print ("case 'CSE04':");
						print ("problem.options.length = 1;");
						print ("for (i = 0; i < landscape.length; i++)");
							print ("createOption(problem, landscape[i], landscape[i]);");
						print ("break;");
					print ("default:");
						print ("problem.options.length = 1;");
				print ("}");
			print ("}");
			
			print ("function createOption(problem, text, value)");
			print ("{");
				print ("var opt = document.createElement('option');");
				print ("opt.value = value;");
				print ("opt.text = text;");
				print ("problem.options.add(opt);");
			print ("}");
		print ("</script>");

//===html tail===
		print ("</font></form>");
	include ("tailHTML.html")
?>