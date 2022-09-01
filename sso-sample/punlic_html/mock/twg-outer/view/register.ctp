<?php include_once(VIEW_DIR . '/header.ctp'); ?>
<h2>アカウント登録</h2>
<div>
    <form method="POST">
        <input type="email" name="email" id="email" placeholder="email" required>
        <br>
        <input type="password" name="password" id="password" placeholder="password" required>
        <br><br>
        <button type="submit" name="register">登録</button>
    </form>
</div>
<?php include_once(VIEW_DIR . '/footer.ctp'); ?>