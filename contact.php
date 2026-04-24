<?php
// NO OUTPUT BEFORE HEADERS!
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"] ?? '';
    $email = $_POST["email"] ?? '';
    $message = $_POST["message"] ?? '';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mymail@gmail.com';
        $mail->Password = 'app password'; // Use an app-specific password for Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('mymail@gmail.com', 'Museon Contact');
        $mail->addAddress('mymail@gmail.com');
        $mail->isHTML(false);
        $mail->Subject = "New Contact Form: $name";
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        $mail->send();
        
        // REDIRECT TO HOME WITH SUCCESS
        header("Location: index.php?success=1");  // Use your homepage filename!
        exit;
        
    } catch (Exception $e) {
        header("Location: index.php?error=1");
        exit;
    }
}
// Fallback redirect
header("Location: index.php");
exit;
?>
