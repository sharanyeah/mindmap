import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Tabs from './Tabs';
import Dialogs from './Dialogs';
import ContextMenus from './ContextMenus';
import Footer from './Footer';
import AuthModal from './AuthModal';

import { MindFile, MindMap } from '../MindMap/MindMap';
import { Loader } from '../UI/Loader';
import { $, openLink, showNotification, tsToDateTime } from '../Utils';
import { getCurrentUser, logout as apiLogout } from '../api/auth';
import { 
  insertRemoteFile, 
  getRemoteFile, 
  deleteRemoteFile, 
  subscribeToRemoteFile, 
  unsubscribeFromRemoteFile, 
  getRemoteFilesList, 
  logout, 
  login, 
  register, 
  ping, 
  getRemoteFileEvents 
} from '../Net';

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mindFiles, setMindFiles] = useState({});
  const [mindFilesRemote, setMindFilesRemote] = useState({});
  const [mindFileCur, setMindFileCur] = useState(null);
  const [mindMap, setMindMap] = useState(null);
  const [user, setUser] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const canvasRef = useRef(null);
  const workLoaderRef = useRef(null);

  useEffect(() => {
    // Initialize the app
    init();
  }, []);

  const init = async () => {
    const currentUrl = new URL(window.location.href);
    
    // Help map init
    const systemFilesList = {
      'menu': { name: 'Menu', path: 'static/system/Menu.json', version: 0, editable: false },
      'help': { name: 'Help', path: 'static/system/Help.json', version: 0, editable: false },
    };
    
    const helpFile = new MindFile(systemFilesList['help'], 'system_help');
    const menuFile = new MindFile(systemFilesList['menu'], 'system_menu', true);
    
    setMindFiles(prev => ({
      ...prev,
      'help': helpFile,
      'menu': menuFile
    }));

    // Load temp user
    loadTempUser();
  };

  const loadTempUser = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showNotification(`Welcome, ${userData.username}!`);
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    showNotification('Logged out successfully');
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  return (
    <div id="cont">
      <Header 
        toggleSidebar={toggleSidebar}
        user={user}
        onLogin={openAuthModal}
        onLogout={handleLogout}
      />
      
      <div id="work">
        <Sidebar 
          collapsed={sidebarCollapsed}
          mindFiles={mindFiles}
          setMindFileCur={setMindFileCur}
        />
        
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <Canvas 
          ref={canvasRef}
          mindMap={mindMap}
          setMindMap={setMindMap}
        />
        
        <div id="work__loading-animation" className="cssload-container hidden">
          <div className="cssload-speeding-wheel"></div>
        </div>
      </div>

      <Dialogs 
        mindFileCur={mindFileCur}
        mindFiles={mindFiles}
        mindFilesRemote={mindFilesRemote}
      />
      
      <ContextMenus 
        mindMap={mindMap}
      />
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default App;
