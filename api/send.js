import { Resend } from 'resend';

// Resend APIキーを環境変数から取得
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { from, to, subject, name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    // Resendを使用してメールを送信
    const data = await resend.emails.send({
      from: from || 'onboarding@resend.dev',
      to: to || 'your-email@example.com',
      subject: subject || `お問い合わせ: ${name}様より`,
      html: `
        <div>
          <h2>新しいお問い合わせ</h2>
          <p><strong>名前:</strong> ${name}</p>
          <p><strong>メールアドレス:</strong> ${email}</p>
          <p><strong>メッセージ:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message });
  }
}
