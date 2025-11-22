import { useState, useEffect } from 'react';

/**
 * 環境変数デバッグ表示コンポーネント
 * EmailJSの設定状況を確認するためのデバッグ用コンポーネント
 */
const EnvDebug = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [envVars, setEnvVars] = useState({
    serviceId: { value: '', exists: false },
    smtpServiceId: { value: '', exists: false },
    templateId: { value: '', exists: false },
    publicKey: { value: '', exists: false },
    environment: import.meta.env.MODE || 'unknown'
  });

  useEffect(() => {
    // 環境変数の存在確認
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const smtpServiceId = import.meta.env.VITE_EMAILJS_SMTP_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    setEnvVars({
      serviceId: {
        value: serviceId ? `${serviceId.substring(0, 3)}...${serviceId.substring(serviceId.length - 3)}` : '未設定',
        exists: !!serviceId
      },
      smtpServiceId: {
        value: smtpServiceId ? `${smtpServiceId.substring(0, 3)}...${smtpServiceId.substring(smtpServiceId.length - 3)}` : '未設定',
        exists: !!smtpServiceId
      },
      templateId: {
        value: templateId ? `${templateId.substring(0, 3)}...${templateId.substring(templateId.length - 3)}` : '未設定',
        exists: !!templateId
      },
      publicKey: {
        value: publicKey ? `${publicKey.substring(0, 3)}...${publicKey.substring(publicKey.length - 3)}` : '未設定',
        exists: !!publicKey
      },
      environment: import.meta.env.MODE || 'unknown'
    });
  }, []);

  return (
    <div className="env-debug">
      <div className="env-debug-header" onClick={() => setShowDetails(!showDetails)}>
        <span>環境変数デバッグ</span>
        <span>{showDetails ? '▼' : '▶'}</span>
      </div>
      
      {showDetails && (
        <div className="env-debug-content">
          <div className="env-debug-item">
            <span>環境:</span>
            <span className={envVars.environment === 'production' ? 'env-production' : 'env-development'}>
              {envVars.environment === 'production' ? '本番環境' : '開発環境'}
            </span>
          </div>
          
          <div className="env-debug-item">
            <span>Service ID:</span>
            <span className={envVars.serviceId.exists ? 'env-success' : 'env-error'}>
              {envVars.serviceId.exists ? envVars.serviceId.value : '未設定'}
            </span>
          </div>
          
          <div className="env-debug-item">
            <span>SMTP Service ID:</span>
            <span className={envVars.smtpServiceId.exists ? 'env-success' : 'env-error'}>
              {envVars.smtpServiceId.exists ? envVars.smtpServiceId.value : '未設定'}
            </span>
          </div>
          
          <div className="env-debug-item">
            <span>Template ID:</span>
            <span className={envVars.templateId.exists ? 'env-success' : 'env-error'}>
              {envVars.templateId.exists ? envVars.templateId.value : '未設定'}
            </span>
          </div>
          
          <div className="env-debug-item">
            <span>Public Key:</span>
            <span className={envVars.publicKey.exists ? 'env-success' : 'env-error'}>
              {envVars.publicKey.exists ? envVars.publicKey.value : '未設定'}
            </span>
          </div>
          
          <div className="env-debug-note">
            <p>
              <strong>注意:</strong> 本番環境では、Vercelダッシュボードで環境変数を設定してください。
              開発環境では、.envファイルに環境変数を設定してください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvDebug;
