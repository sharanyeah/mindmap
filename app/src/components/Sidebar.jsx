import React from 'react';
import '../style/ui.css';

const Sidebar = ({ collapsed }) => {
  return (
    <div id="menu" className={collapsed ? 'collapsed' : ''}>
    </div>
  );
};

export default Sidebar;
