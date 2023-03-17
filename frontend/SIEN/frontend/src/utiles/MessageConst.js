const CONFIRM = {
    POST: '登録を実行します。よろしいですか？',
    PUT: '更新を実行します。よろしいですか？',
    DELETE: '削除を実行します。よろしいですか？',
    MOVE_TO: "へ移動します。よろしいですか？",
    NO_RESET: '順番変更を実行します。よろしいですか？',
    NO_RESET_AUTOSET: '順番変更を実行します。よろしいですか？\r(※未設定個所は自動的に付与されます。)',
    ROW_EDIT_ADD: '選択行の下に新しい行を挿入します。よろしいですか？',
    ROW_EDIT_DELETE: '選択行を削除します。よろしいですか？',
    ADD_RIREKI: '履歴を新規作成します。よろしいですか？',
    HAS_SAME_NAME: '既に同じ名前が登録済みですが、よろしいですか？'
}

const ERROR = {
    ERROR: 'エラーが発生しました。',
}

const WARN = {
    NO_SELECT: '対象が未選択です。',
    ROW_EDIT_NO_SELECT: '一覧が未選択のため、実行できません。',
    NO_CREATE: 'が未作成です。' // 先頭に項目名を追加する
}

const INPUT_ERROR = {
    NO_INPUT: 'が未入力です。', // 先頭に項目名を追加する
    NO_SELECT: 'が未選択です。', // 先頭に項目名を追加する
}

export default {
    CONFIRM,
    ERROR,
    WARN,
    INPUT_ERROR
}