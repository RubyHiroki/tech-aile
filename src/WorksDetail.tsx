import React, { useEffect } from 'react';
import './WorksDetail.css';

interface WorksDetailProps {
  onBack?: () => void;
}

const WorksDetail: React.FC<WorksDetailProps> = ({ onBack }) => {
  // コンポーネントがマウントされたときにページトップにスクロール
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }, []);

  return (
    <div className="portfolio">
      <header className="header">
        <div className="container">
          <a className="logo" href="#" onClick={(e) => {
            e.preventDefault();
            if (onBack) onBack();
          }}>
            <span className="icon">terminal</span>
            <h2>Tech Aile</h2>
          </a>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <section className="works-hero">
            <h1>My Works</h1>
            <p>これまで開発した実績をご覧ください。</p>
          </section>

          <section className="works-grid">
            <div className="works-item">
              <div className="works-image" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCsYykj6jrkwZlVOwxZtQQFE5GeGbC4mu8VHKAfWOtJKgPZu9uGsQhaG-lAETPTeYfkULZgR0ExnayI7UoBHo7NezAOPTsqxmsodNDu_dXMXhjRgq3EofFjH9ggIwW8dVbvb5PZvWO2SoFUbTfFYRbKc8lAxHQ3dm1D7kq04Kv6R6VTotU1Is61dIvyM04RBcFwzpl3iHvzkpaywz9pj2KM7h7J8eLoh0zMm408CNb9L9aM976YyIuSwm0AWUyMKlibt0VK9Hdmyiw")`}}></div>
              <div className="works-overlay"></div>
              <div className="works-content">
                <p className="works-category">Mobile App</p>
                <h3>Wetherly</h3>
                <p>天気予報を確認できるアプリです。</p>
              </div>
            </div>

            <div className="works-item">
              <div className="works-image" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcyC01WrgVVMR8tFm27tDxG_fsf11b68vnzateyz430FS7NcSJgEs3BU1zb4IUGch1eF34CZHRmOsiT3cdqB6BypebmrtjSnH3e3Z080n4F6Lquo4Hdr74InPt-oCAZWUlDD6NqtBUhszSg0t3-hxc4N4xdBgCQvtcrJ8-U9EwMFCBJYseW9M0XvO0rWNu1zRf65_0PPGU-HSpf2sFhP6k2xpO9M6BYKLwrioaT45DG3Ar5EMfrwIweZ94U-1j8n3zpMucasiKoqM")`}}></div>
              <div className="works-overlay"></div>
              <div className="works-content">
                <p className="works-category">Mobile App</p>
                <h3>Home Chef</h3>
                <p>家庭にある食材からAIが献立を提案してくれるアプリです。</p>
              </div>
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
  );
};

export default WorksDetail;
