<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "tli67";
$password = "50429507";
$dbname = "tli67_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$user_message = $_POST['user_message'] ?? null;
$gpt_response = $_POST['gpt_response'] ?? null;
if ($user_message && $gpt_response) {
    $stmt = $conn->prepare("INSERT INTO responses (user_message, gpt_response) VALUES (?, ?)");
    $stmt->bind_param("ss", $user_message, $gpt_response);

    if ($stmt->execute()) {
        echo "Response saved successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Invalid input.";
}
$conn->close();
?>
