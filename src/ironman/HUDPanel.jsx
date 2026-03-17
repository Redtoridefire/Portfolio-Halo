import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from './SoundEngine';
import './ironman.css';

export default function HUDPanel({
  id,
  title,
  subtitle,
  icon,
  children,
  onClose,
  onFocus,
  zIndex = 10,
  isFocused = false,
  defaultPos = null,
  defaultSize = null,
}) {
  const [pos, setPos] = useState(
    defaultPos || {
      x: 80 + Math.random() * 120,
      y: 60 + Math.random() * 80,
    }
  );
  const [size, setSize] = useState(
    defaultSize || { w: 520, h: 440 }
  );
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [prevState, setPrevState] = useState(null);

  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Drag handlers
  const handleDragStart = useCallback((e) => {
    if (maximized) return;
    e.preventDefault();
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    onFocus?.(id);
  }, [pos, maximized, onFocus, id]);

  const handleMouseMove = useCallback((e) => {
    if (dragging.current) {
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.current.x, window.innerWidth - size.w));
      const newY = Math.max(44, Math.min(e.clientY - dragOffset.current.y, window.innerHeight - 120));
      setPos({ x: newX, y: newY });
    }
    if (resizing.current) {
      const dw = e.clientX - resizeStart.current.x;
      const dh = e.clientY - resizeStart.current.y;
      setSize({
        w: Math.max(320, resizeStart.current.w + dw),
        h: Math.max(200, resizeStart.current.h + dh),
      });
    }
  }, [size.w]);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
    resizing.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };
  }, [size]);

  const handleMinimize = () => {
    soundEngine.playClick();
    setMinimized(!minimized);
  };

  const handleMaximize = () => {
    soundEngine.playClick();
    if (maximized) {
      // Restore
      setMaximized(false);
      if (prevState) {
        setPos(prevState.pos);
        setSize(prevState.size);
      }
    } else {
      setPrevState({ pos: { ...pos }, size: { ...size } });
      setMaximized(true);
    }
  };

  const handleClose = () => {
    soundEngine.playPanelClose();
    onClose?.(id);
  };

  // Compute panel position/size
  const panelStyle = maximized
    ? {
        left: 0,
        top: 44,
        width: '100vw',
        height: 'calc(100vh - 44px - 36px)',
        zIndex,
      }
    : {
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: minimized ? 38 : size.h,
        zIndex,
      };

  return (
    <motion.div
      className={`hud-panel${isFocused ? ' focused' : ''}`}
      style={panelStyle}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      onMouseDown={() => onFocus?.(id)}
    >
      {/* Corner decorations */}
      <div className="hud-panel-corner hud-panel-corner-tl" />
      <div className="hud-panel-corner hud-panel-corner-tr" />
      <div className="hud-panel-corner hud-panel-corner-bl" />
      <div className="hud-panel-corner hud-panel-corner-br" />

      {/* Header */}
      <div
        className="hud-panel-header"
        onMouseDown={handleDragStart}
      >
        <div className="hud-panel-title-group">
          {icon && <span className="hud-panel-icon">{icon}</span>}
          <div>
            <div className="hud-panel-title">{title}</div>
            {subtitle && <div className="hud-panel-subtitle">{subtitle}</div>}
          </div>
        </div>
        <div className="hud-panel-controls">
          <button
            className="hud-panel-btn"
            onClick={handleMinimize}
            title={minimized ? 'Restore' : 'Minimize'}
          >
            {minimized ? '▲' : '−'}
          </button>
          <button
            className="hud-panel-btn"
            onClick={handleMaximize}
            title={maximized ? 'Restore' : 'Maximize'}
          >
            {maximized ? '⊡' : '□'}
          </button>
          <button
            className="hud-panel-btn close"
            onClick={handleClose}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!minimized && (
          <motion.div
            className="hud-panel-content iron-panel-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resize handle */}
      {!maximized && !minimized && (
        <div
          className="hud-panel-resize"
          onMouseDown={handleResizeStart}
        />
      )}
    </motion.div>
  );
}
