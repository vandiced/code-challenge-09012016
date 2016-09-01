<?php

// this simple script just gets the instagram feed json

// begin
$curl = curl_init();

// set options
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://www.instagram.com/JoinCornerstone/media/',
    CURLOPT_USERAGENT => 'Codular Sample cURL Request'
));

// execute
$resp = curl_exec($curl);

// need to check status of the call, if success, echo the result
// if fail echo the appropriate message
$resultStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);
if ($resultStatus == 200) {
    // return the response
	echo $resp;
} else {
    // something went wrong
	echo '{"status": "fail", "message": "No images found"}';
}

// end
curl_close($curl);

?>