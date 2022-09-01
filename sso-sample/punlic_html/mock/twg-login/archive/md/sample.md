# Aglio を使って HTML に出力する

##  適当な作業ディレクトリを作成
    1. npmコマンド実行
    1. <code>npm init -y</code>
    1. <code>npm install -S aglio</code>
         - 私の環境だとエラーが出たため<code>--unsafe-perm</code>オプションを付けてインストール
         - <code>npm install -g aglio --unsafe-perm</code>
    -aglio@ がインストールできた

## インストールできたか確認
   1. <code>aglio</code>

***
Usage: C:\Program Files\nodejs\node.exe
C:\Users\takahiro\AppData\Roaming\npm\node_modules\aglio\bin\aglio.js [options]
-i infile [-o outfile -s]

Options:
  -i, --input           Input file
  -o, --output          Output file
  -t, --theme           Theme name or layout file           [default: "default"]
  -f, --filter          Sanitize input from Windows
***
-インストールできました。

## API仕様を記述
- <code>mkdir md</code>
- <code>cd md</code>
- <code>copy nul sample.md</code>

- HTMLの書き出し
- <code>aglio -i sample.md -o sample.html</code>

## ライブ修正
- <code>aglio -i sample.md -s -h 127.0.0.1</code>
- ブラウザから 127.0.0.1:3000 にアクセス
- sample.mdを修正して保存するとブラウザが更新される
- 修正完了後、HTMLの書き出しを実行