<?php
require_once dirname(__DIR__) . "/backend/config.php";
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная</title>
    <link rel="icon" href="../../ico.ico" type="image/x-icon">
    <link rel="stylesheet" href="../styles/header.css">
    <link rel="stylesheet" href="../styles/general.css">
    <link rel="stylesheet" href="../styles/auth.css">
</head>

<body>
    <?php require_once ROOT . '/templates/header.php'; ?>

    <div class="registration-buttons">
        <button class="registration-button" onclick="document.getElementById('registrationForm').style.display='block';document.getElementById('loginForm').style.display='none';">Регистрация</button>
        <button class="login-button" onclick="document.getElementById('registrationForm').style.display='none';document.getElementById('loginForm').style.display='block';">Авторизация</button>
    </div>

    <div class="container" id="registrationForm">
        <form>
            <label for="login">Логин:</label><br>
            <input type="text" id="login" name="login"><br>
            <label for="name">Имя:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="gender">Пол:</label><br>
            <select id="gender" name="gender">
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="IDIOT">Я ИДИОТ</option>
            </select><br>
            <label for="birthdate">Дата рождения:</label><br>
            <input type="date" id="birthdate" name="birthdate"><br>
            <label for="password">Пароль:</label><br>
            <input type="password" id="password" name="password"><br>
            <label for="confirm-password">Подтверждение пароля:</label><br>
            <input type="password" id="confirm-password" name="confirm-password"><br>
            <button type="submit">Зарегистрироваться</button>
        </form>
    </div>

    <div class="container" id="loginForm">
        <form>
            <label for="login">Логин:</label><br>
            <input type="text" id="login" name="login"><br>
            <label for="password">Пароль:</label><br>
            <input type="password" id="password" name="password"><br>
            <button type="submit">Войти</button>
        </form>
    </div>

</body>

</html>