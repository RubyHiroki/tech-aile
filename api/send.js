import { Resend } from 'resend';

// Resend APIキーの初期化（APIキーが存在しない場合はエラーログを出力）
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error('RESEND_API_KEY environment variable is not set');
}
const resend = new Resend(resendApiKey);

export default async function handler(req, res) {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONSリクエスト（プリフライト）の処理
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POSTリクエスト以外は許可しない
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;
    
    // 必須フィールドのバリデーション
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: '名前、メールアドレス、メッセージは必須です' 
      });
    }

    // 受信者メールアドレスの確認
    const receiverEmail = process.env.RECEIVER_EMAIL;
    if (!receiverEmail) {
      console.error('RECEIVER_EMAIL environment variable is not set');
      return res.status(500).json({ 
        success: false, 
        error: '受信者メールアドレスが設定されていません。環境変数を確認してください。'
      });
    }

    console.log('Sending email to:', receiverEmail);
    
    // Resend APIを使用してメール送信
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // 検証済みドメインに変更することをお勧めします
      to: receiverEmail,
      subject: `お問い合わせ: ${name}様より`,
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
    });

    // エラーがある場合
    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    // 成功レスポンス
    return res.status(200).json({ 
      success: true, 
      messageId: data.id,
      message: 'メールが送信されました'
    });
    
  } catch (error) {
    console.error('メール送信エラー:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'メール送信に失敗しました',
      details: error.message,
      env: {
        apiKeyExists: !!process.env.RESEND_API_KEY,
        receiverEmailExists: !!process.env.RECEIVER_EMAIL
      }
    });
  }
}