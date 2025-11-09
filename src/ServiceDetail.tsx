import React from 'react';
import './ServiceDetail.css';

interface ServiceDetailProps {
  onBack?: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ onBack }) => {
  return (
    <div className="sd-container">
      <div className="sd-wrapper">
        <div className="sd-content">
          <header className="sd-header">
            <div className="sd-logo">
              <div className="sd-icon">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </div>
              <h2>Engineer's Portfolio</h2>
            </div>
            <div className="sd-nav">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                if (onBack) onBack();
              }}>Back to Home</a>
              <a href="#services">Services</a>
              <a href="#works">Works</a>
              <a href="#contact">Contact</a>
              <a className="sd-btn" href="#contact">Get a Quote</a>
            </div>
          </header>

          <section className="sd-hero" id="services">
            <h1>SERVICES</h1>
            <p>Webサイト制作からシステム開発、運用保守まで。高品質なソリューションをご提供します。</p>
          </section>

          <section className="sd-services">
            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="material-symbols-outlined">language</span>
              </div>
              <div className="sd-service-content">
                <h3>Webサイト制作</h3>
                <p>モダンなデザインと最新技術を駆使し、ビジネスの顔となる魅力的で使いやすいWebサイトを制作します。集客やブランディングに貢献します。</p>
              </div>
              <div className="sd-service-arrow">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>

            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="material-symbols-outlined">terminal</span>
              </div>
              <div className="sd-service-content">
                <h3>システム開発</h3>
                <p>業務効率化や新規事業の実現に向け、要件定義から設計、開発まで一貫してサポート。スケーラブルで堅牢なシステムを構築します。</p>
              </div>
              <div className="sd-service-arrow">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>

            <div className="sd-service-item">
              <div className="sd-service-icon">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
              <div className="sd-service-content">
                <h3>システム運用・保守</h3>
                <p>システムの安定稼働を支えるため、サーバー監視、定期メンテナンス、障害対応などを提供。ビジネスの継続性を確保します。</p>
              </div>
              <div className="sd-service-arrow">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </section>

          <section className="sd-flow" id="flow">
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
                  <span className="material-symbols-outlined">rate_review</span>
                </div>
              </div>
              
              <div className="sd-step reverse">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 02</p>
                  <h3>ご提案・お見積もり</h3>
                  <p>ヒアリング内容に基づき、最適な開発プラン、技術選定、スケジュール、詳細なお見積もりをご提案します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="material-symbols-outlined">request_quote</span>
                </div>
              </div>
              
              <div className="sd-step">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 03</p>
                  <h3>設計・開発</h3>
                  <p>ご契約後、要件定義や設計を進めます。定期的な進捗報告とレビューを行いながら、透明性の高い開発プロセスで推進します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="material-symbols-outlined">code_blocks</span>
                </div>
              </div>
              
              <div className="sd-step reverse">
                <div className="sd-step-content">
                  <p className="sd-step-num">Step 04</p>
                  <h3>納品・運用</h3>
                  <p>最終テストを経て、システムを納品します。公開後の保守・運用サポートもご提供し、ビジネスの成長を継続的にご支援します。</p>
                </div>
                <div className="sd-step-icon">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
              </div>
            </div>
          </section>

          <footer className="sd-footer">
            <div className="sd-footer-links">
              <a href="#services">Services</a>
              <a href="#works">Works</a>
              <a href="#contact">Contact</a>
            </div>
            <p>© 2024 Engineer's Portfolio. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
