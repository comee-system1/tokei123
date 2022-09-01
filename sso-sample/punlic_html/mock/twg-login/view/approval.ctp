<?php include_once(VIEW_DIR . '/header.ctp'); ?>
<div>
    <h2>連携同意</h2>
    <p>外部サイトがあなたのアカウント情報にアクセスすることを許可しますか？</p>

    <h3>連携するアカウント</h3>
        <p><?= $_SESSION['user']['email'] ?> さん</p>
    <h3>連携する情報</h3>
    <?php $scorps = explode(' ', $_GET['scope']); ?>
    <?php if ($scorps): ?>
        <div style="display: flex; align-items: center; flex-direction: column">
            <ul style="list-style: disc; padding-left: 15px;">
                <?php foreach($scorps as $s): ?>
                    <li><?= $s ?>(読み取り専用)</li>
                <?php endforeach ?>
            </ul>
        </div>

    <?php endif ?>
    <hr style="margin: 10px;">
    <form method="POST">
        <button type="submit" name="approval" value="0">同意しない</button>
        <button type="submit" name="approval" value="1">同意する</button>
    </form>
</div>
<?php include_once(VIEW_DIR . '/footer.ctp'); ?>
