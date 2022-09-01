<?php $users = $c->getUserList(); ?>

<?php include_once(VIEW_DIR . '/header.ctp'); ?>
<h2>登録ユーザー一覧</h2>

<div>
    <table border="1" style="margin: auto;">
        <tr>
            <th style="width: 50px;">ID</th>
            <th style="width: 200px;">メールアドレス</th>
            <th style="width: 200px;">登録日時</th>
        </tr>
        <?php if($users): ?>
            <?php foreach($users as $user): ?>
                <tr>
                    <th><?= $user['id'] ?></th>
                    <th><?= $user['email'] ?></th>
                    <th><?= $user['regist_ts'] ?></th>
                </tr>
            <?php endforeach ?>
        <?php endif ?>
    </table>
</div>
<?php include_once(VIEW_DIR . '/footer.ctp'); ?>