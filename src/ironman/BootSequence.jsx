import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcReactor from './ArcReactor';
import { soundEngine } from './SoundEngine';
import './ironman.css';

const BOOT_LINES = [
  { id: 1, text: 'Initializing core systems...', type: 'normal', delay: 600, progress: 15 },
  { id: 2, text: 'Loading neural interface modules... [OK]', type: 'success', delay: 1300, progress: 28 },
  { id: 3, text: 'Establishing encrypted network link... [OK]', type: 'success', delay: 2000, progress: 42 },
  { id: 4, text: 'Calibrating HUD display parameters... [OK]', type: 'success', delay: 2600, progress: 56 },
  { id: 5, text: 'Running biometric identity scan...', type: 'normal', delay: 3200, progress: 68 },
  { id: 6, text: 'Cross-referencing security clearance...', type: 'normal', delay: 3800, progress: 78 },
  { id: 7, text: 'IDENTITY CONFIRMED: MICHAEL CZARNECKI', type: 'identity', delay: 4500, progress: 90 },
  { id: 8, text: 'Clearance Level: EXECUTIVE // AI + CYBER OPS', type: 'highlight', delay: 5000, progress: 96 },
  { id: 9, text: 'All systems nominal. Portfolio ready.', type: 'success', delay: 5600, progress: 100 },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleEnter = useCallback(() => {
    if (!showCTA || exiting) return;
    soundEngine.enable();
    // Play jarvis-online.mp3 if uploaded, otherwise fall back to synthesized power-up
    soundEngine.playFile('jarvis-online', () => soundEngine.playReactorPowerUp(), 0.85);
    setExiting(true);
    setTimeout(onComplete, 1000);
  }, [showCTA, exiting, onComplete]);

  // Keyboard listener
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleEnter]);

  // Boot sequence progression
  useEffect(() => {
    // Initialize audio on user interaction (first page load — browser policy)
    soundEngine.init();
    // Small delay so AudioContext can spin up before we play
    setTimeout(() => soundEngine.playBoot(), 200);

    const timers = BOOT_LINES.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setProgress(line.progress);
        // Play a small beep on each boot line
        if (soundEngine.enabled) soundEngine.playClick();
      }, line.delay)
    );

    const ctaTimer = setTimeout(() => setShowCTA(true), 6200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(ctaTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div className="boot-grid" />
          <div className="boot-scan-line" />

          {/* Arc Reactor */}
          <motion.div
            className="boot-reactor-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ArcReactor size={100} />
          </motion.div>

          {/* JARVIS Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="boot-title">J.A.R.V.I.S.</div>
            <div className="boot-subtitle">Just A Rather Very Intelligent System · v4.7.2</div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            className="boot-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Progress bar */}
            <div className="boot-progress-bar" style={{ marginBottom: '1rem' }}>
              <div
                className="boot-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Lines */}
            {visibleLines.map((line) => (
              <motion.div
                key={line.id}
                className={`boot-line ${line.type}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="boot-line-prefix">&gt;</span>
                <span>{line.text}</span>
              </motion.div>
            ))}

            {/* Blinking cursor */}
            {!showCTA && (
              <div className="boot-line">
                <span className="boot-line-prefix">&gt;</span>
                <span className="hud-jarvis-cursor" />
              </div>
            )}
          </motion.div>

          {/* CTA Button */}
          <AnimatePresence>
            {showCTA && (
              <motion.button
                className="boot-cta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleEnter}
              >
                ENTER SYSTEM
              </motion.button>
            )}
          </AnimatePresence>

          {showCTA && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--iron-text-muted)',
                letterSpacing: '0.1em',
                marginTop: '0.5rem',
              }}
            >
              PRESS ENTER OR CLICK TO AUTHENTICATE
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
