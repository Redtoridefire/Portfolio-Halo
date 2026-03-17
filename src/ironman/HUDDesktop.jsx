import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ArcReactor from './ArcReactor';
import HUDPanel from './HUDPanel';
import HUDDock from './HUDDock';
import JarvisChat from './JarvisChat';
import { soundEngine } from './SoundEngine';
import PersonnelPanel from './panels/PersonnelPanel';
import MissionsPanel from './panels/MissionsPanel';
import CapabilitiesPanel from './panels/CapabilitiesPanel';
import IntelPanel from './panels/IntelPanel';
import CommsPanel from './panels/CommsPanel';
import ArchivesPanel from './panels/ArchivesPanel';
import './ironman.css';

// Panel registry
const PANELS = {
  personnel: {
    title: 'PERSONNEL FILE',
    subtitle: 'M. CZARNECKI // SECURITY EXECUTIVE',
    icon: '👤',
    component: PersonnelPanel,
    defaultPos: { x: 80, y: 60 },
    defaultSize: { w: 560, h: 520 },
  },
  missions: {
    title: 'MISSION DOSSIER',
    subtitle: 'CLASSIFIED OPERATIONS // 10 ACTIVE',
    icon: '🎯',
    component: MissionsPanel,
    defaultPos: { x: 160, y: 80 },
    defaultSize: { w: 580, h: 520 },
  },
  capabilities: {
    title: 'CAPABILITY MATRIX',
    subtitle: 'SKILLS // CERTS // TOOLS',
    icon: '⚡',
    component: CapabilitiesPanel,
    defaultPos: { x: 200, y: 70 },
    defaultSize: { w: 540, h: 560 },
  },
  intel: {
    title: 'INTEL REPORTS',
    subtitle: 'WORKING PAPERS // THOUGHT LEADERSHIP',
    icon: '📡',
    component: IntelPanel,
    defaultPos: { x: 240, y: 60 },
    defaultSize: { w: 520, h: 480 },
  },
  comms: {
    title: 'COMMS CHANNEL',
    subtitle: 'OPEN CHANNEL // ENCRYPTED',
    icon: '📡',
    component: CommsPanel,
    defaultPos: { x: 280, y: 80 },
    defaultSize: { w: 480, h: 520 },
  },
  archives: {
    title: 'SECURE ARCHIVES',
    subtitle: 'DOCUMENT VAULT // CLASSIFIED',
    icon: '🗄️',
    component: ArchivesPanel,
    defaultPos: { x: 300, y: 70 },
    defaultSize: { w: 500, h: 480 },
  },
};

// JARVIS status messages that cycle
const JARVIS_MESSAGES = [
  'All systems nominal. Portfolio loaded.',
  'Arc Reactor output: 94.7%. Optimal.',
  'No threats detected. Security protocols active.',
  'Good day, sir. Ready to assist.',
  'Quantum encryption: ENABLED.',
  'Neural interface: SYNCHRONIZED.',
  'Suit systems: OFFLINE. Portfolio systems: ONLINE.',
  'Mr. Czarnecki\'s credentials are on record.',
  'Scanning for new mission objectives...',
];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="hud-clock">
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </span>
  );
}

function JarvisStatusBar() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx((i) => (i + 1) % JARVIS_MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="hud-jarvis-status">
      <span className="hud-jarvis-prefix">JARVIS &gt;</span>
      <span style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
        {JARVIS_MESSAGES[msgIdx]}
      </span>
      <span className="hud-jarvis-cursor" />
    </div>
  );
}

// Animated data stream columns
function DataStream({ side }) {
  const lines = [
    '0x7F4A2B', '1337_CERT', 'NIST_OK', '0xDEAD', 'TLS_1.3',
    'AES-256', 'SHA3-512', 'RSA_4096', 'FIPS_OK', '0x5EC',
    'MITRE_T1', 'CVE_NONE', 'SOC2_OK', 'ISO_27K1', 'API_KEY',
    '0x404', 'THREAT_0', 'RISK_LOW', 'AUDIT_OK', '0xFF_OK',
  ];
  return (
    <div className="hud-readout">
      <div className="hud-readout-title">DATA STREAM</div>
      <div className="hud-data-stream">
        <div className="hud-data-stream-inner">
          {[...lines, ...lines].map((l, i) => (
            <div key={i} style={{ opacity: 0.3 + (i % 5) * 0.08 }}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// System metrics readout
function SystemMetrics() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  // Simulated fluctuating values
  const arc = (94 + Math.sin(tick * 0.7) * 1.5).toFixed(1);
  const threat = (0.2 + Math.abs(Math.sin(tick * 1.3)) * 0.3).toFixed(1);
  const uptime = (99.8 + Math.sin(tick * 0.3) * 0.1).toFixed(1);
  const intel = Math.round(95 + Math.sin(tick * 0.9) * 2);

  return (
    <div className="hud-readout">
      <div className="hud-readout-title">SYS STATUS</div>
      <div className="hud-meter">
        <div className="hud-meter-header">
          <span className="hud-meter-label">ARC OUTPUT</span>
          <span className="hud-meter-val">{arc}%</span>
        </div>
        <div className="hud-meter-track">
          <div className="hud-meter-fill" style={{ width: `${arc}%` }} />
        </div>
      </div>
      <div className="hud-meter">
        <div className="hud-meter-header">
          <span className="hud-meter-label">THREAT LVL</span>
          <span className="hud-meter-val" style={{ color: 'var(--iron-green)' }}>{threat}%</span>
        </div>
        <div className="hud-meter-track">
          <div className="hud-meter-fill green" style={{ width: `${threat * 10}%` }} />
        </div>
      </div>
      <div className="hud-meter">
        <div className="hud-meter-header">
          <span className="hud-meter-label">SYS UPTIME</span>
          <span className="hud-meter-val">{uptime}%</span>
        </div>
        <div className="hud-meter-track">
          <div className="hud-meter-fill" style={{ width: `${uptime}%` }} />
        </div>
      </div>
      <div className="hud-meter">
        <div className="hud-meter-header">
          <span className="hud-meter-label">INTEL QUAL</span>
          <span className="hud-meter-val">{intel}%</span>
        </div>
        <div className="hud-meter-track">
          <div className="hud-meter-fill gold" style={{ width: `${intel}%` }} />
        </div>
      </div>
    </div>
  );
}

function NetworkReadout() {
  return (
    <div className="hud-readout">
      <div className="hud-readout-title">NETWORK</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {[
          { label: 'ENCRYPTION', value: 'AES-256', color: 'var(--iron-green)' },
          { label: 'PROTOCOL', value: 'TLS 1.3', color: 'var(--iron-blue)' },
          { label: 'FIREWALL', value: 'ACTIVE', color: 'var(--iron-green)' },
          { label: 'VPN', value: 'ENABLED', color: 'var(--iron-blue)' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--iron-text-muted)', letterSpacing: '0.05em' }}>
              {item.label}
            </span>
            <span style={{ fontFamily: 'var(--font-hud)', fontSize: '0.6rem', color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HUDDesktop() {
  const [openPanelIds, setOpenPanelIds] = useState([]);
  const [zIndices, setZIndices] = useState({});
  const [topZ, setTopZ] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleOpenPanel = useCallback((id) => {
    setOpenPanelIds((prev) => {
      if (prev.includes(id)) {
        handleFocusPanel(id);
        return prev;
      }
      return [...prev, id];
    });
    setTopZ((z) => {
      const newZ = z + 1;
      setZIndices((prev) => ({ ...prev, [id]: newZ }));
      return newZ;
    });
  }, []); // eslint-disable-line

  const handleClosePanel = useCallback((id) => {
    setOpenPanelIds((prev) => prev.filter((p) => p !== id));
  }, []);

  const handleFocusPanel = useCallback((id) => {
    setTopZ((z) => {
      const newZ = z + 1;
      setZIndices((prev) => ({ ...prev, [id]: newZ }));
      return newZ;
    });
  }, []);

  const handleSoundToggle = () => {
    const enabled = soundEngine.toggle();
    setSoundEnabled(enabled);
  };

  // Open personnel panel on first load after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpenPanel('personnel');
    }, 600);
    return () => clearTimeout(timer);
  }, [handleOpenPanel]);

  return (
    <div className="hud-desktop">
      {/* Animated background */}
      <div className="hud-grid-bg" />
      <div className="hud-vignette" />
      <div className="hud-scan-line" />

      {/* Corner decorations */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />

      {/* TOP BAR */}
      <div className="hud-topbar">
        <div className="hud-logo">
          <div className="hud-logo-dot" />
          STARK INDUSTRIES // JARVIS INTERFACE
        </div>
        <div className="hud-topbar-center">
          <div className="hud-status-item">
            <div className="hud-status-dot" />
            ALL SYSTEMS NOMINAL
          </div>
          <div className="hud-status-item">
            <div className="hud-status-dot warning" />
            ACTIVE MISSIONS: {openPanelIds.length}
          </div>
          <div className="hud-status-item">
            CLEARANCE: EXECUTIVE
          </div>
        </div>
        <div className="hud-topbar-right">
          <Clock />
          <button
            className={`hud-sound-toggle${soundEnabled ? ' active' : ''}`}
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? '🔊 SFX ON' : '🔇 SFX OFF'}
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="hud-main">
        {/* Side readouts */}
        <div className="hud-side-left">
          <SystemMetrics />
          <NetworkReadout />
        </div>

        <div className="hud-side-right">
          <DataStream side="right" />
          <div className="hud-readout">
            <div className="hud-readout-title">OPERATIVE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { label: 'NAME', value: 'M. CZARNECKI' },
                { label: 'RANK', value: 'SR. DIRECTOR' },
                { label: 'COMPANY', value: 'AMEX' },
                { label: 'CLEARANCE', value: 'EXEC' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--iron-text-muted)' }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-hud)', fontSize: '0.6rem', color: 'var(--iron-blue)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center display */}
        <div className="hud-center-display">
          <div className="hud-center-reactor">
            <ArcReactor
              size={140}
              showPower={false}
              onClick={() => handleOpenPanel('personnel')}
            />
          </div>
          <div className="hud-center-name">MICHAEL CZARNECKI</div>
          <div className="hud-center-role">
            Senior Director, Cyber Security & AI · Fractional CISO
          </div>
          <div className="hud-center-tagline">
            15+ years securing enterprise at scale · American Express · Capital One · Norges Bank
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--iron-text-muted)',
            letterSpacing: '0.15em',
            marginTop: '0.25rem',
          }}>
            ▼ SELECT A MODULE BELOW TO BEGIN ▼
          </div>
        </div>

        {/* Open panels */}
        <AnimatePresence>
          {openPanelIds.map((id) => {
            const panelConfig = PANELS[id];
            if (!panelConfig) return null;
            const PanelContent = panelConfig.component;
            return (
              <HUDPanel
                key={id}
                id={id}
                title={panelConfig.title}
                subtitle={panelConfig.subtitle}
                icon={panelConfig.icon}
                onClose={handleClosePanel}
                onFocus={handleFocusPanel}
                zIndex={zIndices[id] || 10}
                isFocused={zIndices[id] === topZ}
                defaultPos={panelConfig.defaultPos}
                defaultSize={panelConfig.defaultSize}
              >
                <PanelContent />
              </HUDPanel>
            );
          })}
        </AnimatePresence>

        {/* Dock */}
        <HUDDock openPanels={openPanelIds} onOpenPanel={handleOpenPanel} />
      </div>

      {/* BOTTOM BAR */}
      <div className="hud-bottombar">
        <JarvisStatusBar />
        <div className="hud-bottombar-right">
          <div className="hud-ministat">
            <span>PANELS OPEN:</span>
            <span className="hud-ministat-value">{openPanelIds.length}</span>
          </div>
          <div className="hud-ministat">
            <span>SECURITY:</span>
            <span className="hud-ministat-value hud-green">ACTIVE</span>
          </div>
          <div className="hud-ministat">
            <span>BUILD:</span>
            <span className="hud-ministat-value">v3.0.0</span>
          </div>
        </div>
      </div>

      {/* JARVIS Chat */}
      <JarvisChat />
    </div>
  );
}
