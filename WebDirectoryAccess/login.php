<?php	
	session_start();
	
	if (isset ($_POST['logOut']))
	{
		session_destroy();
		exit;
	}
	
	if (isset ($_POST['checkSession']))
	{
		if (isset ($_SESSION['login']))
			print ($_SESSION['login']);
		else
			print (NULL);
		
		exit;
	}
	
	if (isset ($_POST['login']))
	{
		$userName = $_POST['userName'];
		$password = $_POST['password'];
		
		if ($userName == "Tam" && $password == "testtest")
			$_SESSION['login'] = $userName;
	
		if (isset($_SESSION['login']))
			print ($_SESSION['login']);
		else
			print (NULL);
	}
?>