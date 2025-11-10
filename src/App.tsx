import { useEffect, useState, useCallback } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import ServiceDetail from './ServiceDetail'

function App() {
  // サービス詳細表示状態
  const [showServiceDetail, setShowServiceDetail] = useState(false);
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

  // Form input handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      console.log('フォーム送信中...', formData);
      
      // 開発環境では開発用メールサーバーのエンドポイントを使用
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/send' 
        : '/api/send';
      
      console.log('API URL:', apiUrl);
      
      const requestData = {
        from: 'onboarding@resend.dev',
        to: import.meta.env.VITE_RECEIVER_EMAIL,
        subject: `お問い合わせ: ${formData.name}様より`,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      
      // API endpoint would be created separately
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
        // 開発環境ではCORSモードを設定
        ...(import.meta.env.DEV ? { mode: 'cors' } : {})
      });

      console.log('レスポンス受信:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('エラーレスポンス:', errorText);
        throw new Error('送信に失敗しました。後ほど再度お試しください。');
      }
      
      // レスポンスのJSONパースを試みる
      try {
        const responseData = await response.json();
        console.log('レスポンスデータ:', responseData);
      } catch (parseError) {
        console.warn('JSONパースエラー:', parseError);
        // JSONパースに失敗しても処理を続行
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      
      // エラーメッセージの詳細化
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('ネットワークエラー: 開発用メールサーバーに接続できません');
        setErrorMessage('開発用メールサーバーに接続できません。サーバーが起動しているか確認してください。');
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('送信に失敗しました。後ほど再度お試しください。');
      }
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
  }, [showServiceDetail]); // showServiceDetailが変更されたときにエフェクトを再実行
  
  // サービス詳細ページから戻る処理
  const handleBackToMain = () => {
    setShowServiceDetail(false);
    
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
      ) : (
        <div className="portfolio">
          <header className="header">
            <div className="container">
              <a className="logo" href="#">
                <span className="icon">terminal</span>
                <h2>Tech Aile</h2>
              </a>
            </div>
          </header>

      <main className="main">
        <div className="container">
          <section className="hero">
            <div className="grid-bg"></div>
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="gradient">CODE</span> THE FUTURE.
              </h1>
              <p className="hero-text">
                最新のWebテクノロジーを駆使し、ビジネスの成長を加速させるソリューションを提供します。
              </p>
              <div className="btn-group">
                <a className="btn primary" href="#works" onClick={(e) => scrollToSection(e, 'works')}>実績を見る</a>
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">お名前</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">メールアドレス</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>©Tech Aile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
      )}
    </>
  )
}

export default App