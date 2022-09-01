<?php include_once(VIEW_DIR . '/header.ctp'); ?>
<h2>ログイン</h2>
<div>
    <form method="POST">
        <input type="email" name="email" id="email" placeholder="email" required>
        <br>
        <input type="password" name="password" id="password" placeholder="password" required>
        <br><br>
        <button type="submit" name="login">ログイン</button>
    </form>
</div>
<hr style="margin: 20px;">
<div>
    <form method="POST">
        <button type="submit" name="sso-login">餃子サークル会員でログイン</button>
    </form>
</div>
<?php include_once(VIEW_DIR . '/footer.ctp'); ?>