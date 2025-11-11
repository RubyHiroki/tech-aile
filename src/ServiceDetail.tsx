import React, { useEffect } from 'react';
import './ServiceDetail.css';
import Header from './components/Header';
import Footer from './components/Footer';

interface ServiceDetailProps {
  onBack?: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ onBack }) => {
  // コンポーネントがマウントされたときのアニメーション処理
  useEffect(() => {
    // ページトップにスクロール
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    
    // 最初のヒーローセクションだけ自動的に表示
    const heroSection = document.querySelector('.sd-hero');
    setTimeout(() => {
      if (heroSection) heroSection.classList.add('visible');
    }, 100);
    
    // スクロールに応じて要素を表示するための処理
    const sections = document.querySelectorAll('.sd-section');
    const serviceItems = document.querySelectorAll('.sd-service-item');
    const steps = document.querySelectorAll('.sd-step');
    
    // スクロールイベント最適化のための変数
    let ticking = false;
    
    // スクロール位置をチェックして要素を表示する関数
    const checkScroll = () => {
      // セクションのチェック
      sections.forEach((section) => {
        // すでに表示済みの場合はスキップ
        if (section.classList.contains('visible')) return;
        
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('visible');
          
          // サービスセクション内のアイテムを順番に表示
          if (section.classList.contains('sd-services')) {
            serviceItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('visible');
              }, 200 * (index + 1));
            });
          }
          
          // フローセクション内のステップを順番に表示
          if (section.classList.contains('sd-flow')) {
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('visible');
              }, 200 * (index + 1));
            });
          }
        }
      });
      
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
      <Header onBack={onBack} />

      <main className="main">
        <div className="container">
          <section className="sd-hero sd-section" id="services">
            <div className="section-header">
              <h2>SERVICES</h2>
              <p>Webサイト制作からシステムやアプリの開発、運用保守まで。<br />高品質なソリューションをご提供します。</p>
            </div>
          </section>

          <section className="sd-services sd-section">
            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="icon">devices</span>
              </div>
              <div className="sd-service-content">
                <h3>Webサイト制作</h3>
                <p>モダンな技術スタックを用いて、ウェブサイトやホームページを制作します。</p>
              </div>
            </div>

            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="icon">data_object</span>
              </div>
              <div className="sd-service-content">
                <h3>システム開発</h3>
                <p>業務効率化のためのカスタムシステムやアプリの開発など、要件に応じた開発を行います。</p>
              </div>
            </div>

            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="icon">support_agent</span>
              </div>
              <div className="sd-service-content">
                <h3>システム運用・保守</h3>
                <p>導入後のシステムの運用・保守を行います。</p>
              </div>
            </div>
          </section>

          <section className="sd-flow sd-section" id="flow">
            <h2>ご依頼からの流れ</h2>
            <div className="sd-timeline">
              <div className="sd-timeline-line"></div>
              
              <div className="sd-step">
                <div className="sd-step-inner">
                  <div className="sd-step-content">
                    <p className="sd-step-num">Step 01</p>
                    <h3>お問い合わせ・ヒアリング</h3>
                    <p>まずは本サイトのお問い合わせフォームよりご連絡ください。その後、オンライン会議で詳細なヒアリングを行い、目的やご要望を伺います。</p>
                  </div>
                  <div className="sd-step-icon">
                    <span className="icon">rate_review</span>
                  </div>
                </div>
              </div>
              
              <div className="sd-step">
                <div className="sd-step-inner">
                  <div className="sd-step-content">
                    <p className="sd-step-num">Step 02</p>
                    <h3>ご提案・お見積もり</h3>
                    <p>ヒアリング内容に基づき、最適な開発プラン、技術選定、スケジュール、お見積もりをご提案します。</p>
                  </div>
                  <div className="sd-step-icon">
                    <span className="icon">request_quote</span>
                  </div>
                </div>
              </div>
              
              <div className="sd-step">
                <div className="sd-step-inner">
                  <div className="sd-step-content">
                    <p className="sd-step-num">Step 03</p>
                    <h3>設計・開発</h3>
                    <p>ご契約後、要件定義や設計を進めます。定期的な進捗報告を行いながら、透明性高く開発プロセスを推進します。</p>
                  </div>
                  <div className="sd-step-icon">
                    <span className="icon">code_blocks</span>
                  </div>
                </div>
              </div>
              
              <div className="sd-step">
                <div className="sd-step-inner">
                  <div className="sd-step-content">
                    <p className="sd-step-num">Step 04</p>
                    <h3>納品・運用</h3>
                    <p>最終テストを経て、システムを納品します。納品後の保守・運用サポートもご提供し、ご支援いたします。</p>
                  </div>
                  <div className="sd-step-icon">
                    <span className="icon">rocket_launch</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
