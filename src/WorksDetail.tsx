import React, { useEffect } from 'react';
import './WorksDetail.css';
import Header from './components/Header';
import Footer from './components/Footer';
import weatherlyImage from './assets/images/weatherly.jpg';
import homeChefImage from './assets/images/homechef.jpg';

interface WorksDetailProps {
  onBack?: () => void;
}

const WorksDetail: React.FC<WorksDetailProps> = ({ onBack }) => {
  // コンポーネントがマウントされたときにページトップにスクロールとタイトルアニメーション
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    
    // タイトルに少し遅れてvisibleクラスを追加
    setTimeout(() => {
      const titleElement = document.querySelector('.works-hero .section-header h2');
      if (titleElement) {
        titleElement.classList.add('visible');
      }
    }, 300);
  }, []);

  return (
    <div className="portfolio">
      <Header onBack={onBack} />

      <main className="main">
        <div className="container">
          <section className="works-hero">
            <div className="section-header">
              <h2>WORKS</h2>
              <p>これまでリリースした実績をご覧ください。</p>
            </div>
          </section>

          <section className="works-grid">
            <div className="works-item">
              <div className="works-image" style={{backgroundImage: `url(${weatherlyImage})`}}></div>
              <div className="works-overlay"></div>
              <div className="works-content">
                <p className="works-category">Mobile App</p>
                <h3>Weatherly</h3>
                <p>天気予報を確認できるアプリです。</p>
              </div>
            </div>

            <div className="works-item">
              <div className="works-image" style={{backgroundImage: `url(${homeChefImage})`}}></div>
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

      <Footer />
    </div>
  );
};

export default WorksDetail;
