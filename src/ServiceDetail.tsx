import React, { useEffect } from 'react';
import './ServiceDetail.css';

interface ServiceDetailProps {
  onBack?: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ onBack }) => {
  // コンポーネントがマウントされたときにページトップにスクロール
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }, []);
  
  // スクロールに応じてセクションを表示する
  useEffect(() => {
    const sections = document.querySelectorAll('.sd-section');
    
    const checkScroll = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };
    
    // 初回ロード時にチェック
    setTimeout(checkScroll, 100);
    
    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', checkScroll);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
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
          <section className="sd-hero sd-section" id="services">
            <div className="section-header">
              <h2>SERVICES</h2>
              <p>Webサイト制作からシステム開発、運用保守まで。高品質なソリューションをご提供します。</p>
            </div>
          </section>

          <section className="sd-services sd-section">
            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="icon">devices</span>
              </div>
              <div className="sd-service-content">
                <h3>Webサイト制作</h3>
                <p>モダンなデザインと最新技術を駆使し、ビジネスの顔となる魅力的で使いやすいWebサイトを制作します。集客やブランディングに貢献します。</p>
              </div>
              <div className="sd-service-arrow">
                <span className="icon">arrow_forward</span>
              </div>
            </div>

            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="icon">data_object</span>
              </div>
              <div className="sd-service-content">
                <h3>システム開発</h3>
                <p>業務効率化や新規事業の実現に向け、要件定義から設計、開発まで一貫してサポート。スケーラブルで堅牢なシステムを構築します。</p>
              </div>
              <div className="sd-service-arrow">
                <span className="icon">arrow_forward</span>
              </div>
            </div>

            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="icon">support_agent</span>
              </div>
              <div className="sd-service-content">
                <h3>システム運用・保守</h3>
                <p>システムの安定稼働を支えるため、サーバー監視、定期メンテナンス、障害対応などを提供。ビジネスの継続性を確保します。</p>
              </div>
              <div className="sd-service-arrow">
                <span className="icon">arrow_forward</span>
              </div>
            </div>
          </section>

          <section className="sd-flow sd-section" id="flow">
            <h2>ご依頼からの流れ</h2>
            <div className="sd-timeline">
              <div className="sd-timeline-line"></div>
              
              <div className="sd-step">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 01</p>
                  <h3>お問い合わせ・ヒアリング</h3>
                  <p>プロジェクトの概要や課題についてお聞かせください。オンラインで詳細なヒアリングを行い、目的やご要望を深く理解します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="icon">rate_review</span>
                </div>
              </div>
              
              <div className="sd-step reverse">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 02</p>
                  <h3>ご提案・お見積もり</h3>
                  <p>ヒアリング内容に基づき、最適な開発プラン、技術選定、スケジュール、詳細なお見積もりをご提案します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="icon">request_quote</span>
                </div>
              </div>
              
              <div className="sd-step">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 03</p>
                  <h3>設計・開発</h3>
                  <p>ご契約後、要件定義や設計を進めます。定期的な進捗報告とレビューを行いながら、透明性の高い開発プロセスで推進します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="icon">code_blocks</span>
                </div>
              </div>
              
              <div className="sd-step reverse">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 04</p>
                  <h3>納品・運用</h3>
                  <p>最終テストを経て、システムを納品します。公開後の保守・運用サポートもご提供し、ビジネスの成長を継続的にご支援します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="icon">rocket_launch</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer sd-section">
        <div className="container">
          <p>©Tech Aile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetail;
