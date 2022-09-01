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

    <!-- SSOログインキャンセルボタン -->
    <?php if (isset($_GET['client_id'])): ?>
        <hr>
        <a href="/register?<?= http_build_query($_GET) ?>">新規登録</a>
    <?php endif ?>
</div>
<?php include_once(VIEW_DIR . '/footer.ctp'); ?>