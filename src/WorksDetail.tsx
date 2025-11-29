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
  // コンポーネントがマウントされたときにページトップにスクロールとアニメーション
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    
    // ヒーローセクションのみ最初から表示
    setTimeout(() => {
      const titleElement = document.querySelector('.works-hero .section-header h2');
      if (titleElement) {
        titleElement.classList.add('visible');
      }
    }, 300);
    
    // スクロールに応じて要素を表示するための設定
    const worksItems = document.querySelectorAll('.works-item');
    const worksGrid = document.querySelector('.works-grid');
    
    // スクロールイベント最適化のための変数
    let ticking = false;
    
    // スクロール位置をチェックして要素を表示する関数
    const checkScroll = () => {
      // 作品グリッドのチェック
      if (worksGrid) {
        const gridTop = worksGrid.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (gridTop < windowHeight * 0.85) {
          // グリッドが表示範囲に入ったら、作品アイテムを順番に表示
          worksItems.forEach((item, index) => {
            if (!item.classList.contains('visible')) {
              setTimeout(() => {
                item.classList.add('visible');
              }, 200 * (index + 1)); // 200msずつ遅延
            }
          });
        }
      }
      
      ticking = false;
    };
    
    // スクロールイベントハンドラ（パフォーマンス最適化）
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
        });
        ticking = true;
      }
    };
    
    // 初回チェック
    setTimeout(checkScroll, 200);
    
    // スクロールイベントリスナーを追加（パッシブモードで最適化）
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // クリーンアップ
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="portfolio">
      <div className="grid-bg"></div>
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
                <p>天気予報を確認.</p>
              </div>
            </div>

            <div className="works-item">
              <div className="works-image" style={{backgroundImage: `url(${homeChefImage})`}}></div>
              <div className="works-overlay"></div>
              <div className="works-content">
                <p className="works-category">Mobile App</p>
                <h3>Home Chef</h3>
                <p>家庭にある食材からAIが献立を提案.</p>
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
