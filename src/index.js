import React from 'react';
import ReactDOM from 'react-dom';
import HlsPlayer from './components/HlsPlayer';
import './index.css';
import Hls from 'hls.js';
import ShakaPlayer from "./components/ShakaPlayer";

ReactDOM.render(
    Hls.isSupported() ? <HlsPlayer /> : <ShakaPlayer />,
  document.getElementById('root')
);
