import React, { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import Header from './Header';
import { getCurrentUser, logout as apiLogout } from '../api/auth';
import { showNotification } from '../Utils';

const AppComplete = () => {
  // Initialize user state immediately from localStorage to prevent flash
  const [user, setUser] = useState(() => getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const legacyInit = async () => {
      const { init } = await import('../indexLegacy');
      await init();

      // Prevent legacy code from touching the header
      const usersDiv = document.getElementById('users');
      if (usersDiv) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && usersDiv.children.length === 0) {
              // Legacy code cleared it, restore React content
              setUser(getCurrentUser());
            }
          });
        });

        observer.observe(usersDiv, { childList: true });

        return () => observer.disconnect();
      }
    };

    legacyInit();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showNotification(`Welcome, ${userData.username}!`);
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    showNotification('Logged out successfully');
  };

  const handleToggleSidebar = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  return (
    <div id="cont">
      <Header
        toggleSidebar={handleToggleSidebar}
        user={user}
        onLogin={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <div id="work">
        <div id="menu"></div>
        <div id="info"></div>
        <div id="tabs"></div>

        <canvas id="canvas"></canvas>

        <div id="work__loading-animation" className="cssload-container hidden">
          <div className="cssload-speeding-wheel"></div>
        </div>

        <input id="rename-area" type="text" autoComplete="off" />

        <div id="context-branch" className="context-menu hidden">
          <div>
            <button id="context-branch__set-color">Set color</button>
            <button id="context-branch__rename">Rename</button>
            <button id="context-branch__delete">Delete</button>
          </div>
        </div>

        <div id="context-color-picker" className="context-menu hidden">
          <div id="colors-cont">
            <button id="context-color-picker__color-picker__button">
              <input id="color-picker" type="color" />
            </button>
          </div>
        </div>

        <div id="context-canvas" className="context-menu hidden">
          <div>
            <button id="context-canvas__add-root">Add node</button>
            <button id="context-canvas__save">Save mind map</button>
            <button id="context-canvas__rename">Rename mind map</button>
            <button id="context-canvas__share">Share</button>
            <button id="context-canvas__delete">Delete</button>
          </div>
        </div>

        <form className="none">
          <input type="file" id="uploader" accept=".json" multiple />
        </form>
      </div>

      <div id="dialogs-cont">
        <div id="dialog-rename" className="top">
          <form>
            <input id="input-name" type="text" autoComplete="off" />
            <button id="button-name" type="button">Rename</button>
          </form>
        </div>

        <div id="dialog-save" className="top">
          <form>
            <a href="" id="downloader">mind.json</a>
            <div>
              <input id="input-save" type="text" autoComplete="off" />
              <button id="button-save" type="button">Download</button>
              <button id="button-save-remote" type="button">Save remote</button>
            </div>
            <div><a id="button-image" href="">Download image</a></div>
          </form>
        </div>

        <div id="dialog-open">
          <form>
            <div id="dialog-open__loading-animation" className="loader hidden">
              <div className="cssload-speeding-wheel"></div>
            </div>
            <div id="file-list-samples"></div>
          </form>
        </div>

        <div id="dialog-share" className="top">
          <form>
            <input id="input-share" type="text" readOnly />
            <button id="button-share" type="button">Copy link</button>
          </form>
        </div>

        <div id="dialog-open-remote">
          <div id="file-list" className="file-list">
            <div id="file-list-head">Remote files</div>
            <div id="file-list-body"></div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <footer id="footer">
        <div id="footer-content">
          <p>&copy; 2024 MindEditor - Professional Mind Mapping Tool</p>
        </div>
      </footer>
    </div>
  );
};

export default AppComplete;