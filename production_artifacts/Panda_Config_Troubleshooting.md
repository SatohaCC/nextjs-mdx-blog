# Panda CSS 設定ファイルのトラブルシューティング

`panda.config.ts` の変更後にビルドエラーが発生し、修正後もエラーが解消されない場合のガイドです。

## 発生した事象

- `panda.config.ts` を編集後、`Build failed` エラーが発生。
- コード上の構文エラー（括弧の不整合など）を修正し、`node -c` 等で妥当性を確認しても、`npm run dev` や `storybook` で以前と同じ行番号のエラーが出続ける。
- 例: `panda.config.ts:466:8: ERROR: Expected ")" but found ":"`（実際のファイルは466行も存在しない場合でも発生する）

## 原因

主な原因は **ビルドキャッシュの固着** です。

1. **メモリキャッシュ**: Next.js (Turbopack) や esbuild が、メモリ上に古い（壊れた）設定ファイルの情報を保持し続けてしまう。
2. **ディスクキャッシュ**: `.next` や `node_modules/.cache/panda` 内に、古い解析結果が残ってしまう。
3. **ファイルロック**: 開発サーバーが動作したままだと、一部のファイルがロックされ、`panda codegen` 等による正しい上書きが阻害される。

## 解決手順（クリーンアップ）

エラーが解消されない場合は、以下の手順を順番に実行してください。

### 1. 実行中のプロセスをすべて停止

開発サーバー（`npm run dev`）や Storybook をすべて停止します。
Windows の場合、確実に終了させるためにターミナルで以下を実行します：

```powershell
taskkill /F /IM node.exe
```

### 2. キャッシュディレクトリの物理削除

ビルドキャッシュを強制的にクリアします。

```powershell
rm -Recurse -Force .next, node_modules/.cache
```

### 3. Panda CSS のコード再生成

クリーンな状態の設定ファイルから `styled-system` を作り直します。

```powershell
npm run prepare
```

※ `panda codegen` がエラーなく `✔️` を表示することを確認してください。

### 4. サーバーの再起動

再度開発サーバーを立ち上げます。

```powershell
npm run dev
```

## 予防策

- `panda.config.ts` を大幅に書き換える際は、一度開発サーバーを止めてから作業することを推奨します。
- 複雑なオブジェクトの入れ子（`tokens` や `textStyles`）を編集した後は、必ず `npm run prepare` を実行して、生成されたコードとの整合性を確認してください。
