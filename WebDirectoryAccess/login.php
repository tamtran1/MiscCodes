<?php	
	session_start();
	
	/*======================< create new user section >======================*/
	//to create a new account, just uncomment this area and enter in a user name and password, 
	//and refresh the client's browser, and a new account will be created
	/*
	$data = fopen("data.dat", "a") or die("Unable to open file!"); //uncomment this line when creating new account
	
	$cost = 10; // the bigger the cost the better the password will be after hashed
	$number = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.'); // will create a random numbers
	$number = sprintf("$2a$%02d$", $cost) . $number; // prefix the password for the compare log in later
	
	fwrite ($data, crypt("", $number)."|".crypt("", $number)."|\n"); //put the user name and password in the according position 
	exit;
	*/
	/*======================< end of crate new user section >======================*/
	
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
		$data = fopen ("data.dat", "r") or die ("Unable to open file!");
		
		while (!feof ($data))
		{
			$dataContent = explode("|", fgets($data));
			if ($dataContent[0] && password_verify($_POST['userName'], $dataContent[0]) && password_verify($_POST['password'], $dataContent[1]))
			{
				$_SESSION['login'] = $_POST['userName'];
				print ($_SESSION['login']);
				fclose ($data);
				exit;
			}
		}	
		
		fclose($data);
		print (NULL);
	}
?>