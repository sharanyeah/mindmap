import React from 'react';
import { createRoot } from 'react-dom/client';
import AppComplete from './components/AppComplete';
import '../style/main.css';
import '../style/ui.css';
import '../style/auth.css';
import '../favicon.ico';

const root = createRoot(document.getElementById('root'));
root.render(<AppComplete />);
