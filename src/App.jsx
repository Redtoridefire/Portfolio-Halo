import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './ironman/BootSequence';
import HUDDesktop from './ironman/HUDDesktop';
import './ironman/ironman.css';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', background: '#000814' }}>
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <HUDDesktop key="desktop" />
        )}
      </AnimatePresence>
    </div>
  );
}
