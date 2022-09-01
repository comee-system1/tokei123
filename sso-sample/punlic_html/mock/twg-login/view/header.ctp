<!DOCTYPE html>
<html lang="jp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= APP_NAME ?></title>
</head>
<body style="background-color: rgb(237, 177, 255);">
<div style="margin: 5vh 10vh;">

    <header>
        <h1 style="text-align: center;"><?= APP_NAME ?></h1>
        <div style="text-align: right;">
        <?php if (isset($_SESSION['user'])): ?>
            <p><?= $_SESSION['user']['email'] ?></p>
                <form method="POST">
                    <button type="submit" name="logout">Logout</button>
                </form>
            <?php else: ?>
                <a href="/login">Login</a>
                 | 
                <a href="/register">Register</a>
            <?php endif ?>
            <div style="margin: 10px;">
                <a href="http://twg-outer.se-sendai.co.jp" target="_blank">外部連携サイト</a>
            </div>
        </div>
    </header>
    <main style="text-align: center;">