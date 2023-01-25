<?php
// Multiple recipients
$recipient = 'johny@example.com, sally@example.com'; // note the comma

// Subject
$subject = 'Verification Email for account';

// Message
$message = '
<html>
<head>
  <title>Verification email for account</title>
</head>
<body>
  <button>Activate account</button>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';


// Mail it
mail($to, $subject, $message, implode("\r\n", $headers));
?>