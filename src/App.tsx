import { useEffect, useState, useCallback, useRef } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import ServiceDetail from './ServiceDetail'
import WorksDetail from './WorksDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import EmailJSDebug from './components/EmailJSDebug'
import emailjs from '@emailjs/browser'

function App() {
  // 画面表示状態
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [showWorksDetail, setShowWorksDetail] = useState(false);
  // スムーズスクロール関数
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // ヘッダーの高さ分を引く
        behavior: 'smooth'
      });
    }
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // フォームのref
  const form = useRef<HTMLFormElement>(null);

  // Form input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // フォームのname属性とformDataのプロパティ名のマッピング
    const fieldMapping: Record<string, string> = {
      'user_name': 'name',
      'user_email': 'email',
      'message': 'message'
    };
    
    // マッピングに基づいてformDataを更新
    const fieldName = fieldMapping[name] || name;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    console.log('Input changed:', name, value, fieldName);
  };

  // Form submission handler - EmailJSを使用
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    if (!form.current) {
      setFormStatus('error');
      setErrorMessage('フォームの参照エラーが発生しました。');
      return;
    }

    try {
      console.log('EmailJSでフォーム送信中...');
      
      // EmailJSのサービスID、テンプレートID、公開キーを環境変数から取得
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // 環境変数の値をコンソールに出力（デバッグ用）
      console.log('環境変数:', {
        isDev: import.meta.env.DEV,
        serviceId,
        templateId,
        publicKeyExists: !!publicKey,
        publicKeyHint: publicKey ? `${publicKey.substring(0, 3)}...` : 'not set'
      });
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJSの設定が不足しています。環境変数を確認してください。');
      }

      // EmailJSの初期化（本番環境でのCORS問題対策として）
      emailjs.init(publicKey);
      
      // EmailJSを使用してメール送信
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current
      );

      console.log('EmailJS送信結果:', result.text);
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email with EmailJS:', error);
      setFormStatus('error');
      
      // エラーの詳細情報をコンソールに出力
      console.log('エラー詳細:', error);
      
      if (error instanceof Error) {
        const errorMsg = error.message;
        
        // エラーメッセージの詳細化
        if (errorMsg.includes('service_id') || errorMsg.includes('template_id')) {
          setErrorMessage(`EmailJSの設定エラー: サービスIDまたはテンプレートIDが無効です (${errorMsg})`);
        } 
        else if (errorMsg.includes('user_id') || errorMsg.includes('public_key')) {
          setErrorMessage(`EmailJSの認証エラー: 公開キーが無効です (${errorMsg})`);
        }
        else if (errorMsg.includes('network') || errorMsg.includes('NetworkError') || errorMsg.includes('Failed to fetch')) {
          setErrorMessage(`ネットワークエラー: インターネット接続を確認してください (${errorMsg})`);
        }
        else if (errorMsg.includes('CORS') || errorMsg.includes('cross-origin')) {
          setErrorMessage(`CORSエラー: オリジン間リクエストが拒否されました (${errorMsg})`);
        }
        else {
          setErrorMessage(`送信エラー: ${errorMsg}`);
        }
      } else {
        // エラーオブジェクトの詳細を文字列化して表示
        const errorString = String(error);
        console.log('エラー文字列化:', errorString);
        
        // エラーの種類に応じたメッセージを設定
        if (errorString.includes('NetworkError') || errorString.includes('network')) {
          setErrorMessage('ネットワークエラー: インターネット接続を確認してください');
        } else if (errorString.includes('timeout') || errorString.includes('timed out')) {
          setErrorMessage('タイムアウトエラー: サーバーの応答がありません');
        } else if (errorString.includes('CORS') || errorString.includes('cross-origin')) {
          setErrorMessage('CORSエラー: クロスオリジンリクエストが拒否されました');
        } else {
          // 詳細なエラー情報を含める
          setErrorMessage(`送信エラー: ${errorString}`);
        }
      }
      
      // 環境情報を出力
      console.log('環境情報:', {
        isDevelopment: import.meta.env.DEV,
        mode: import.meta.env.MODE,
        baseUrl: import.meta.env.BASE_URL,
      });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    
    const checkScroll = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };
    
    // Check on initial load
    setTimeout(checkScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [showServiceDetail, showWorksDetail]); // 詳細ページの表示状態が変更されたときにエフェクトを再実行
  
  // 詳細ページから戻る処理
  const handleBackToMain = () => {
    setShowServiceDetail(false);
    setShowWorksDetail(false);
    
    // セクションのvisibleクラスをリセットして、アニメーションを再実行できるようにする
    setTimeout(() => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section) => {
        section.classList.remove('visible');
      });
      
      // スクロール位置をトップに戻す
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      
      // 少し遅延させてからアニメーションをチェック
      setTimeout(() => {
        const checkScroll = () => {
          sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
              section.classList.add('visible');
            }
          });
        };
        checkScroll();
      }, 100);
    }, 0);
  };

  return (
    <>
      {showServiceDetail ? (
        <ServiceDetail onBack={handleBackToMain} />
      ) : showWorksDetail ? (
        <WorksDetail onBack={handleBackToMain} />
      ) : (
        <div className="portfolio">
          <Header />

      <main className="main">
        <div className="container">
          <section className="hero">
            <div className="grid-bg"></div>
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="gradient">CODING</span> THE FUTURE.
              </h1>
              <p className="hero-text">
                最新のWebテクノロジーを駆使し、ビジネスの成長を加速させるソリューションを提供します。
              </p>
              <div className="btn-group">
                <a className="btn primary" href="#works" onClick={(e) => {
                  e.preventDefault();
                  setShowWorksDetail(true);
                  window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                  });
                }}>実績を見る</a>
                <a className="btn secondary" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>問い合わせる</a>
              </div>
            </div>
          </section>

          <section className="section" id="services">
            <div className="section-header">
              <h2>SERVICES</h2>
              <p>ビジネス課題を解決するための最適なソリューションを提案します。</p>
            </div>
            <div className="card-grid">
              <div className="card">
                <div className="card-icon">
                  <span className="icon">devices</span>
                </div>
                <div className="card-content">
                  <h3>Webサイト制作</h3>
                  <p>モダンな技術スタックを用いて、ウェブサイトやホームページを制作します。</p>
                </div>
              </div>
              <div className="card">
                <div className="card-icon">
                  <span className="icon">data_object</span>
                </div>
                <div className="card-content">
                  <h3>システム開発</h3>
                  <p>業務効率化のためのカスタムシステムやアプリの開発など、要件に応じた開発を行います。</p>
                </div>
              </div>
              <div className="card">
                <div className="card-icon">
                  <span className="icon">support_agent</span>
                </div>
                <div className="card-content">
                  <h3>システム運用・保守</h3>
                  <p>導入後のシステムの運用・保守を行います。</p>
                </div>
              </div>
            </div>
            <div className="section-action">
              <a href="#" className="btn primary" onClick={(e) => {
                e.preventDefault();
                setShowServiceDetail(true);
                // ページトップにスクロール位置をリセット
                window.scrollTo({
                  top: 0,
                  behavior: 'auto'
                });
              }}>詳細を見る</a>
            </div>
          </section>

          <section className="section" id="skills">
            <div className="section-header">
              <h2>SKILLS</h2>
              <p>フロントエンドからバックエンドまで幅広く対応可能です。</p>
            </div>
            <div className="skill-grid">
              <div className="skill-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg"
                  alt="Ruby icon"
                  style={{ borderRadius: "5px" }}
                />
                <p>Ruby</p>
              </div>
              <div className="skill-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg"
                  alt="Ruby on Rails logo"
                  style={{ background: "white", borderRadius: "5px" }}
                />
                <p>Ruby on Rails</p>
              </div>
              <div className="skill-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  alt="TypeScript icon"
                  style={{ borderRadius: "5px" }}
                />
                <p>TypeScript</p>
              </div>
              <div className="skill-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React logo"
                  style={{ borderRadius: "5px" }}
                />
                <p>React</p>
              </div>
              <div className="skill-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React Native logo"
                  style={{ borderRadius: "5px" }}
                />
                <p>React Native</p>
              </div>
              <div className="skill-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                  alt="PostgreSQL icon"
                  style={{ borderRadius: "5px" }}
                />
                <p>PostgreSQL</p>
              </div>
            </div>
          </section>

          <section className="section" id="contact">
            <div className="section-header">
              <h2>CONTACT</h2>
              <p>
                システム・アプリ制作のご相談、お見積もりの依頼など、
                <br />
                お気軽にご連絡ください。
              </p>
            </div>
            <div className="contact-form">
              <form ref={form} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">お名前</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="user_name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">メールアドレス</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="user_email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">メッセージ</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus === 'submitting'}
                  ></textarea>
                </div>
                
                {formStatus === 'error' && (
                  <div className="form-error">
                    <p>{errorMessage}</p>
                  </div>
                )}
                
                {formStatus === 'success' && (
                  <div className="form-success">
                    <p>お問い合わせありがとうございます。メッセージが送信されました。</p>
                  </div>
                )}
                
                <div className="form-group">
                  <button 
                    type="submit" 
                    className="btn primary"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? '送信中...' : '送信する'}
                  </button>
                  
                  {/* EmailJS設定デバッグコンポーネント */}
                  <EmailJSDebug />
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
      )}
    </>
  )
}

export default App