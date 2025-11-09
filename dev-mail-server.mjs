import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// 環境変数の読み込み
dotenv.config();

// __dirname の設定 (ESモジュールでは直接使えないため)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// メール履歴保存用ディレクトリ
const MAIL_DIR = join(__dirname, 'sent-mails');
if (!fs.existsSync(MAIL_DIR)) {
  fs.mkdirSync(MAIL_DIR, { recursive: true });
}

// サーバー設定
const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:4173',
    'http://127.0.0.1:4173'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

// すべてのリクエストにCORSヘッダーを追加
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailerトランスポート設定
// 開発環境では、実際のSMTPサーバーを使用するか、エセロールトランスポートを使用
let transporter;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  // 実際のSMTPサーバーを使用
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log('実際のSMTPサーバーを使用します');
} else {
  // エセロールトランスポート（ファイルに保存するだけ）
  transporter = {
    sendMail: async (mailOptions) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${timestamp}-${mailOptions.subject.replace(/[^a-z0-9]/gi, '-')}.json`;
      const filepath = join(MAIL_DIR, filename);
      
      fs.writeFileSync(filepath, JSON.stringify(mailOptions, null, 2));
      
      console.log(`メールをファイルに保存しました: ${filepath}`);
      return { messageId: `mock-${timestamp}` };
    }
  };
  console.log('エセロールトランスポートを使用します（メールはファイルに保存されます）');
}

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// OPTIONSリクエストに対応（プリフライトリクエスト用）
app.options('/api/send', (req, res) => {
  console.log('OPTIONS リクエストを受信');
  res.status(200).end();
});

// メール送信エンドポイント
app.post('/api/send', async (req, res) => {
  console.log('メール送信リクエストを受信:', req.body);
  console.log('リクエストヘッダー:', req.headers);
  
  try {
    const { from, to, subject, name, email, message } = req.body;
    
    console.log('フォームデータ:', { name, email, message });
    
    if (!name || !email || !message) {
      console.warn('必須フィールドが不足しています');
      return res.status(400).json({ 
        success: false, 
        error: '名前、メールアドレス、メッセージは必須です' 
      });
    }
    
    // メールオプションの設定
    const mailOptions = {
      from: from || 'noreply@example.com',
      to: to || process.env.RECEIVER_EMAIL || 'recipient@example.com',
      subject: subject || `お問い合わせ: ${name}様より`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>新しいお問い合わせ</h2>
          <p><strong>名前:</strong> ${name}</p>
          <p><strong>メールアドレス:</strong> ${email}</p>
          <p><strong>メッセージ:</strong></p>
          <div style="border-left: 4px solid #38BDF8; padding-left: 1rem; margin: 1rem 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #64748B; font-size: 0.875rem;">このメールはTech Aileのお問い合わせフォームから送信されました。</p>
        </div>
      `,
      text: `
        新しいお問い合わせ
        
        名前: ${name}
        メールアドレス: ${email}
        メッセージ:
        
        ${message}
        
        このメールはTech Aileのお問い合わせフォームから送信されました。
      `
    };
    
    // メール送信
    const info = await transporter.sendMail(mailOptions);
    
    console.log('メール送信成功:', info);
    
    // 成功レスポンス
    res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: 'メールが送信されました'
    });
  } catch (error) {
    console.error('メール送信エラー:', error);
    
    // エラーレスポンス
    res.status(500).json({
      success: false,
      error: 'メール送信に失敗しました',
      details: error.message
    });
  }
});

// 送信済みメール一覧の取得（開発用）
app.get('/api/sent-mails', (req, res) => {
  try {
    const files = fs.readdirSync(MAIL_DIR);
    const mails = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(join(MAIL_DIR, file), 'utf8');
        try {
          return JSON.parse(content);
        } catch (e) {
          return { error: 'JSONパースエラー', file };
        }
      });
    
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({
    error: 'エンドポイントが見つかりません',
    path: req.url
  });
});

// エラーハンドラー
app.use((err, req, res, next) => {
  console.error('サーバーエラー:', err);
  res.status(500).json({
    error: 'サーバー内部エラー',
    message: err.message
  });
});

// サーバー起動
const server = app.listen(PORT, () => {
  console.log(`開発用メールサーバーが起動しました: http://localhost:${PORT}`);
  console.log(`ヘルスチェック: http://localhost:${PORT}/health`);
  console.log(`メール送信エンドポイント: http://localhost:${PORT}/api/send`);
  console.log(`送信済みメール一覧: http://localhost:${PORT}/api/sent-mails`);
  console.log(`メールはディレクトリに保存されます: ${MAIL_DIR}`);
});

// エラーハンドリング
server.on('error', (error) => {
  console.error('サーバーエラー:', error);
  
  if (error.code === 'EADDRINUSE') {
    console.error(`ポート ${PORT} は既に使用されています。別のポートを使用するか、既存のプロセスを終了してください。`);
    process.exit(1);
  }
});
