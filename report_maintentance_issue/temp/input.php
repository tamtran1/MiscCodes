<?php

	include('common.php');
	$debug = true;
	$COMMON = new Common($debug);
	


	$sql = "select * from question";		
	
	$value1 = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);	
	
	echo("<table border='1px'>");

	while ($row = mysql_fetch_row($value1))	
	{
		echo("<tr>");
		foreach ($row as $element)
		{
			echo("<td>".$element."</td>");
		}
		echo("</tr>");
	}

//	$tQuestion = $_POST['tfquiestion'];   // was name tfFname on HTML FORM!!!
//	$tType = $_POST['tftype'];   // was name tfLname on HTML FORM!!!

//	print ($value1 . " " . "\n<br>");

?>
