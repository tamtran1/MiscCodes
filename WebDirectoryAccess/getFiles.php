<?php
	session_start();
	
	$directoryList;
	$fileList;
	$fileSizeList;
	$fileSizeListBytes;
	$bytes;
	$fileDate;
	$fileTime;
	$logData = "";
	
	if (isset ($_SESSION['login']))
	{
		$currDir = $_POST['directory'];
		$dir = ".".$currDir;
		$contentArr = scandir($dir);
		
		$logData = $logData.$_SESSION['login']." ".date('m/d/Y h:i:s')." ".$_SERVER['REMOTE_ADDR']." ".$currDir." \r\n";
		$file = fopen("activity.log", "a") or die("Unable to open file!");
		fwrite ($file, $logData);
		fclose($file);
	
		foreach ($contentArr as $item)
		{	
			if ($item != "." && $item != "..")
			{
				if (is_dir($dir.DIRECTORY_SEPARATOR.$item))
				{
					if (isset ($directoryList))
						$directoryList = $directoryList.$item."|";
					else
						$directoryList = $item."|";
				} else
				{
					if (isset ($fileList))
						$fileList = $fileList.$item."|";
					else
						$fileList = $item."|";
				
					$bytes = filesize ($dir."/".$item);
				
					if ($bytes >= 1073741824)
						$bytes = number_format($bytes / 1073741824, 2) . ' GB';
					elseif ($bytes >= 1048576)
						$bytes = number_format($bytes / 1048576, 2) . ' MB';
					elseif ($bytes >= 1024)
						$bytes = number_format($bytes / 1024, 2) . ' KB';
					elseif ($bytes > 1)
						$bytes = $bytes . ' bytes';
					elseif ($bytes == 1)
						$bytes = $bytes . ' byte';
					else
						$bytes = '0 bytes';
				
					if (isset ($fileSizeList) && isset ($fileSizeListBytes))
					{
						$fileSizeList = $fileSizeList.$bytes."|";
						$fileSizeListBytes = $fileSizeListBytes.filesize ($dir."/".$item)."|";
					} else
					{
						$fileSizeList = $bytes."|";
						$fileSizeListBytes = filesize ($dir."/".$item)."|";
					}
				
					if (isset ($fileDate) && isset ($fileTime))
					{
						$fileDate = $fileDate.date ("m/d/Y", filemtime($dir."/".$item))."|";
						$fileTime = $fileTime.date ("H:i:s", filemtime($dir."/".$item))."|";
					} else
					{
						$fileDate = date ("m/d/Y", filemtime($dir."/".$item))."|";
						$fileTime = date ("H:i:s", filemtime($dir."/".$item))."|";
					}
				}
			}
		}
		
		if (!isset($directoryList))
			$directoryList = "";
		
		if (!isset($fileList))
		{
			$fileList = "";
			$fileSizeList = "";
			$fileSizeListBytes = "";
			$bytes = "";
			$fileDate = "";
			$fileTime = "";
		}	
		
		$dataArr = array("fileList" => $fileList, "fileSizeList" => $fileSizeList, "fileSizeListBytes" => $fileSizeListBytes, "fileDate" => $fileDate, "fileTime" => $fileTime, "breadCrumb" => $directoryList);
		print (json_encode($dataArr));
	} else
		print (NULL);
?>