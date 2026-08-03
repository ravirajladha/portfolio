<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php#contact', true, 303);
    exit;
}

// Honeypot: bots tend to fill this hidden field.
if (!empty($_POST['website'])) {
    header('Location: index.php?status=sent#contact', true, 303);
    exit;
}

$name = trim((string)($_POST['name'] ?? ''));
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || !$email || $subject === '' || $message === '' || strlen($message) > 3000) {
    header('Location: index.php?status=error#contact', true, 303);
    exit;
}

// Remove newlines to prevent email-header injection.
$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeSubject = str_replace(["\r", "\n"], ' ', $subject);
$to = 'ravirajladha@gmail.com';
$body = "New portfolio enquiry\n\nName: {$safeName}\nEmail: {$email}\n\n{$message}";
$headers = [
    'From: Portfolio Contact <noreply@attentionisallyouneed.in>',
    "Reply-To: {$safeName} <{$email}>",
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, '[Portfolio] ' . $safeSubject, $body, implode("\r\n", $headers));
header('Location: index.php?status=' . ($sent ? 'sent' : 'error') . '#contact', true, 303);
exit;
