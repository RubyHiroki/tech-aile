# Tech Aile

モダンなWebテクノロジーを駆使したポートフォリオサイトです。

## 機能

- アニメーションとスクロール効果
- レスポンシブデザイン
- ダークモード対応
- Resendを使用したお問い合わせフォーム

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
VITE_RESEND_API_KEY=re_YOUR_API_KEY_HERE
```

4. 開発サーバーの起動
```bash
npm run dev
```

## Resendの設定

1. [Resend](https://resend.com)でアカウントを作成
2. APIキーを取得
3. `.env`ファイルにAPIキーを設定
4. 必要に応じて、検証済みドメインを設定

## APIエンドポイントについて

このプロジェクトでは、お問い合わせフォームからのデータを処理するためのAPIエンドポイントが必要です。Viteはフロントエンドのみのツールであるため、以下のいずれかの方法でAPIを設定する必要があります：

1. Express.jsなどを使用したバックエンドサーバーの構築
2. Netlify FunctionsやVercel Serverless Functionsなどのサーバーレス関数の使用
3. Firebase Functionsなどのクラウドサービスの利用

## デプロイ

```bash
npm run build
```

`dist`ディレクトリに生成されたファイルをホスティングサービス（Netlify、Vercel、GitHub Pagesなど）にデプロイします。