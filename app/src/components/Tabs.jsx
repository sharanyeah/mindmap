import React, { useEffect, useRef } from 'react';
import { Tlaloc } from '../UI/Tlaloc';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  const tabsRef = useRef(null);
  const tabsInstance = useRef(null);

  useEffect(() => {
    if (tabsRef.current && !tabsInstance.current) {
      tabsInstance.current = Tlaloc.tabs('tabs');
    }
  }, []);

  return (
    <div id="tabs" ref={tabsRef}>
    </div>
  );
};

export default Tabs;
