<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$message_status = '';
$message_type = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $message_text = trim($_POST["message"] ?? '');

    if (empty($name) || empty($email) || empty($message_text)) {
        $message_status = "Please fill in all fields!";
        $message_type = "error";
    } else {
        $mail = new PHPMailer(true);

        try {
            // SMTP Settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'sevdauysal1370@gmail.com';
            $mail->Password = 'nsscmrvpccxrrzmf';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Email content
            $mail->setFrom('sevdauysal1370@gmail.com', 'Contact Form');
            $mail->addAddress('sevdauysal1370@gmail.com');
            $mail->isHTML(false);
            $mail->Subject = "New Contact: $name";
            $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message_text";

            $mail->send();
            $message_status = "✅ Message sent successfully! Check your email.";
            $message_type = "success";
        } catch (Exception $e) {
            $message_status = "❌ Failed to send: " . $mail->ErrorInfo;
            $message_type = "error";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Contact</title>
    <style>
        body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
        .success { background: #d4edda; color: #155724; padding: 15px; border: 1px solid #c3e6cb; border-radius: 5px; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 5px; }
        input, textarea { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        button { background: #007cba; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background: #005a87; }
    </style>
</head>
<body>
    <?php if ($message_status): ?>
        <div class="<?= $message_type ?>">
            <strong><?= $message_status ?></strong>
            <br><br>
            <a href="contact.html">← Send Another Message</a>
        </div>
    <?php endif; ?>

    <h2>Contact Us</h2>
    <form action="contact.php" method="POST">
        <input type="text" name="name" placeholder="Your Name" value="<?= htmlspecialchars($_POST['name'] ?? '') ?>" required>
        <input type="email" name="email" placeholder="Your Email" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required>
        <textarea name="message" placeholder="Your Message" required><?= htmlspecialchars($_POST['message'] ?? '') ?></textarea>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>