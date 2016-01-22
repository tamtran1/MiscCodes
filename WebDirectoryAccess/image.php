<?php
	/*
	 * file received is original file $_POST['dir'], need to preview the small version to save
	 * bandwidth. first attached a period to the front of it to make relative path, then take the 
	 * sub-string to remove the file extension, then add in the _small.jpg at the end, then look
	 * in the directory to see if this file exist, if it doesn't then create one. if it exist, just
	 * preview it.
	*/
	$img = basename(substr($_POST['dir'], 0, -4))."_small.jpg";
	
	//since we're interested in fixed sized width, so width has to be 400px wide
	list($width, $height) = getimagesize(".".$_POST['dir']); //determine the size of image
	$newWidth = 350; //set the new width to 400px
	$ratio = $newWidth / $width; //determine the ratio of the new width to the original width
	$newHeight = round ($ratio * $height); //multiply the ratio with the original height to get the new height
	
	if (file_exists ("./cacheImg/".$img)) {
		/*
		 * this next line puts the rendered image as a background in a div and put a larger empty transparent image on top as the loaded image,
		 * this will prevent users from downloading the preview image. idea is to prevent preview image being saved by right clicking
		 * then return the entire html string back to ajax call
		*/
		print ("<div id = \"imageDiv\" style = \"background-image: url(../cacheImg/".$img."); height: ".$newHeight."px; width: ".$newWidth."px; \"><img src = \"./cacheImg/image.png\" height = \"550\" width = \"450\"/></div>");
	} else {	
		//resamples the new image
		$image_p = imagecreatetruecolor($newWidth, $newHeight);
		$image = imagecreatefromjpeg(".".$_POST['dir']);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
		
		//ob_start(); //start the output buffer to get the rendered image, this is use if we don't want to create a cache image file
		imagejpeg($image_p, "./cacheImg/".$img, 100); //render the image - set second parameter to null stream direct!!!
		//print ("<img class = \"fadeIn\" src = \"data:image/png;base64, ".base64_encode (ob_get_clean())."\"/>"); //get the rendered content from the output buffer, clean, then turn off the output buffer, then encode it to base 64 
		/*
		 * this next line puts the rendered image as a background in a div and put a larger empty transparent image on top as the loaded image,
		 * this will prevent users from downloading the preview image. idea is to prevent preview image being saved by right clicking
		 * then return the entire html string back to ajax call
		*/
		print ("<div id = \"imageDiv\" style = \"background-image: url(../cacheImg/".$img."); height: ".$newHeight."px; width: ".$newWidth."px; \"><img src = \"./cacheImg/image.png\" height = \"550\" width = \"450\"/></div>");
		imagedestroy ($image_p); //flushed the rendered image to free memory
	}
?>