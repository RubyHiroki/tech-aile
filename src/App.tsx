import './App.css'

function App() {
  return (
    <div className="portfolio">
      <header className="header">
        <div className="container">
          <a className="logo" href="#">
            <span className="icon">terminal</span>
            <h2>Tech Aile</h2>
          </a>
          <nav className="nav">
            <a href="#services">SERVICES</a>
            <a href="#works">WORKS</a>
            <a href="#skills">SKILLS</a>
            <a href="#contact">CONTACT</a>
          </nav>
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
                <a className="btn primary" href="#works">実績を見る</a>
                <a className="btn secondary" href="#contact">問い合わせる</a>
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
                  <p>モダンな技術スタックを用いた、ウェブサイトやホームページを制作します。</p>
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
                  <h3>システム保守・運用</h3>
                  <p>導入後のシステムの保守・運用を行います。</p>
                </div>
              </div>
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
              <p>システム・アプリ制作のご相談、お見積もりの依頼など、お気軽にご連絡ください。</p>
            </div>
            <div className="contact-form">
              <form action="#" method="POST">
                <div className="form-group">
                  <label htmlFor="name">お名前</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">メールアドレス</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">メッセージ</label>
                  <textarea id="message" name="message" rows={4} required></textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn primary">送信する</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>©Tech Aile. All Rights Reserved.</p>
          <div className="social">
            <a href="#" aria-label="GitHub">
              <svg aria-hidden="true" className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg aria-hidden="true" className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.206v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.71zM5.337 7.433c-.81 0-1.47-.66-1.47-1.477s.66-1.477 1.47-1.477.1.47.66 1.47-.66 1.477-1.47 1.477zm1.338 8.905H4.002v-8.59h2.673v8.59zM17.67 2H6.33C4.002 2 2 4.002 2 6.33v11.34C2 19.998 4.002 22 6.33 22h11.34C19.998 22 22 19.998 22 17.67V6.33C22 4.002 19.998 2 17.67 2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App