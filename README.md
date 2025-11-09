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

```bash
npm run build
```

`dist`ディレクトリに生成されたファイルをホスティングサービス（Netlify、Vercel、GitHub Pagesなど）にデプロイします。