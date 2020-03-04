<?php
$name = $_POST['name'];
$telephone = $_POST['telephone'];
$email = $_POST['email'];

$name = htmlspecialchars($name);
$telephone = htmlspecialchars($telephone);
$email = htmlspecialchars($email);

$name = urldecode($name);
$telephone = urldecode($telephone);
$email = urldecode($email);

$name = trim($name);
$telephone = trim($telephone);
$email = trim($email);

$subject = "Промокод";
$message = "Привет, ".$name."! Держи промокод на скидку: МЯСО";

$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: От кого письмо <post.951138@gmail.com>\r\n";
$headers .= "Reply-To: post.951138@gmail.com\r\n";

if (mail($email, $subject, $message, $headers)) {
    echo "<div class='alert'>Письмо отправлено</div>";
} else {
    echo "<div class='alert'>Что-то пошло не так...</div>";
};