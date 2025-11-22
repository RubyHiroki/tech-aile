import React, { useState } from 'react';

const EmailJSDebug: React.FC = () => {
  const [showDebug, setShowDebug] = useState(false);
  
  // 環境変数の確認
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  // 環境変数のステータスを確認
  const serviceIdStatus = serviceId ? '設定済み' : '未設定';
  const templateIdStatus = templateId ? '設定済み' : '未設定';
  const publicKeyStatus = publicKey ? '設定済み' : '未設定';
  
  // 公開キーの一部を表示（セキュリティのため）
  const publicKeyHint = publicKey 
    ? `${publicKey.substring(0, 3)}...${publicKey.substring(publicKey.length - 3)}` 
    : 'なし';
  
  return (
    <div style={{ marginTop: '1rem' }}>
      <button 
        onClick={() => setShowDebug(!showDebug)}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#666', 
          textDecoration: 'underline', 
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        {showDebug ? 'デバッグ情報を隠す' : 'デバッグ情報を表示'}
      </button>
      
      {showDebug && (
        <div style={{ 
          marginTop: '0.5rem', 
          padding: '0.5rem', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          fontSize: '0.8rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>EmailJS設定状況</h4>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ padding: '0.25rem', borderBottom: '1px solid #ddd' }}>環境:</td>
                <td style={{ padding: '0.25rem', borderBottom: '1px solid #ddd' }}>
                  {import.meta.env.DEV ? '開発環境' : '本番環境'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.25rem', borderBottom: '1px solid #ddd' }}>Service ID:</td>
                <td style={{ padding: '0.25rem', borderBottom: '1px solid #ddd' }}>
                  <span style={{ 
                    color: serviceId ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}>
                    {serviceIdStatus}
                  </span>
                  {serviceId && <span style={{ marginLeft: '0.5rem', color: '#666' }}>{serviceId}</span>}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.25rem', borderBottom: '1px solid #ddd' }}>Template ID:</td>
                <td style={{ padding: '0.25rem', borderBottom: '1px solid #ddd' }}>
                  <span style={{ 
                    color: templateId ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}>
                    {templateIdStatus}
                  </span>
                  {templateId && <span style={{ marginLeft: '0.5rem', color: '#666' }}>{templateId}</span>}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.25rem' }}>Public Key:</td>
                <td style={{ padding: '0.25rem' }}>
                  <span style={{ 
                    color: publicKey ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}>
                    {publicKeyStatus}
                  </span>
                  {publicKey && <span style={{ marginLeft: '0.5rem', color: '#666' }}>{publicKeyHint}</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmailJSDebug;
