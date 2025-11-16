# Tech Aile

モダンなWebテクノロジーを駆使したポートフォリオサイトです。

## 機能

- アニメーションとスクロール効果
- レスポンシブデザイン
- ダークモード対応
- 開発用メールサーバー対応のお問い合わせフォーム

## 開発環境のセットアップ

1. リポジトリをクローン
```bash
git clone <repository-url>
cd tech_aile
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
プロジェクトのルートに`.env`ファイルを作成し、以下の内容を追加します：
```
# 開発用メールサーバー設定
RECEIVER_EMAIL=your-email@example.com

# SMTPサーバー設定（オプション）
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-username
# SMTP_PASS=your-password
```

4. 開発サーバーとメールサーバーの起動
```bash
# フロントエンドの開発サーバーのみを起動
npm run dev

# 開発用メールサーバーのみを起動
npm run mail-server

# 両方を同時に起動
npm run dev:all
```

## 開発用メールサーバーについて

このプロジェクトには、開発時にメール送信をテストするための開発用メールサーバーが含まれています。

### 機能

- お問い合わせフォームからのメール送信処理
- 送信したメールのファイルへの保存（デフォルト）
- 実際のSMTPサーバーを使用したメール送信（設定時）
- 送信済みメール一覧の確認（開発用）

### エンドポイント

- `http://localhost:3001/api/send` - メール送信API
- `http://localhost:3001/api/sent-mails` - 送信済みメール一覧（開発用）
- `http://localhost:3001/health` - ヘルスチェック

### SMTP設定（オプション）

実際のメールを送信したい場合は、`.env`ファイルにSMTP設定を追加します。設定しない場合は、メールはファイルに保存されます。

- Gmail SMTPを使用する場合は、[アプリパスワード](https://support.google.com/accounts/answer/185833)を設定する必要があります。
- 他のSMTPサービス（SendGrid、Mailgun、Amazon SESなど）も使用できます。

## デプロイ

### ビルド

```bash
npm run build
```

`dist`ディレクトリに生成されたファイルをホスティングサービス（Netlify、Vercel、GitHub Pagesなど）にデプロイします。

### Vercelへのデプロイ

このプロジェクトはVercelへの直接デプロイに対応しています。

1. Vercelアカウントを作成し、GitHubリポジトリと連携します。
2. Vercelダッシュボードで新しいプロジェクトを作成し、リポジトリを選択します。
3. 以下の環境変数を設定します：

| 環境変数名 | 説明 |
|------------|------|
| `RESEND_API_KEY` | ResendのAPIキー（[Resend](https://resend.com/)から取得） |
| `RECEIVER_EMAIL` | お問い合わせを受け取るメールアドレス |

4. フレームワークプリセットとして「Vite」を選択します。
5. ビルドコマンドは自動的に`npm run build`が設定されますが、必要に応じて`npm run vercel-build`に変更できます。
6. 出力ディレクトリは`dist`のままにします。
7. デプロイを実行します。

### お問い合わせフォームの設定

Vercelでお問い合わせフォームを動作させるには：

1. [Resend](https://resend.com/)にサインアップしてAPIキーを取得します。
2. Vercelダッシュボードで環境変数`RESEND_API_KEY`と`RECEIVER_EMAIL`を設定します。
3. （推奨）Resendでドメインを検証し、`api/send.js`の`from`アドレスを検証済みドメインのメールアドレスに更新します。

```js
// api/send.js内のfromアドレスを変更
from: 'contact@yourdomain.com', // 検証済みドメインのアドレス
```

注意：
- Resendの無料プランでは、検証済みドメインからのメール送信のみが許可されています。
- Vercelで警告メッセージ「WARN! Due to `builds` existing in your configuration file...」が表示される場合は、最新の`vercel.json`を使用していることを確認してください。このプロジェクトでは、`builds`セクションの代わりに`rewrites`を使用する簡素化された設定を採用しています。