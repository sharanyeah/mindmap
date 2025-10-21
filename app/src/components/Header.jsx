import React from 'react';

const Header = ({ toggleSidebar, user, onLogin, onLogout }) => {
  return (
    <header id="header" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
      <div id="header-left" style={{ display: 'flex', visibility: 'visible' }}>
        <button id="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 id="app-title">MindEditor</h1>
      </div>
      <div id="header-right" style={{ display: 'flex', visibility: 'visible' }}>
        <div id="users" style={{ display: 'flex', visibility: 'visible' }}>
          {user ? (
            <div className="user-badge">
              <span>{user.username}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="auth-login-btn" 
              onClick={onLogin}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
