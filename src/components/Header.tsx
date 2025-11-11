import React from 'react';

interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
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
  );
};

export default Header;
