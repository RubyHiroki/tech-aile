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

  // 環境変数の確認（APIキーは部分的に隠す）
  const apiKeyExists = process.env.RESEND_API_KEY ? true : false;
  const apiKeyHint = process.env.RESEND_API_KEY 
    ? `${process.env.RESEND_API_KEY.substring(0, 3)}...${process.env.RESEND_API_KEY.substring(process.env.RESEND_API_KEY.length - 3)}` 
    : 'not set';
  
  const receiverEmailExists = process.env.RECEIVER_EMAIL ? true : false;
  
  // レスポンスを返す
  return res.status(200).json({
    success: true,
    message: 'Debug endpoint is working',
    environment: process.env.NODE_ENV || 'unknown',
    config: {
      resendApiKey: {
        exists: apiKeyExists,
        hint: apiKeyHint
      },
      receiverEmail: {
        exists: receiverEmailExists,
        value: process.env.RECEIVER_EMAIL || 'not set'
      }
    }
  });
}
