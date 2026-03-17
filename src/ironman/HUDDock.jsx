import { soundEngine } from './SoundEngine';
import './ironman.css';

const DOCK_ITEMS = [
  {
    id: 'personnel',
    label: 'PERSONNEL',
    sublabel: 'FILE',
    emoji: '👤',
    title: 'Personnel File',
  },
  {
    id: 'missions',
    label: 'MISSION',
    sublabel: 'DOSSIER',
    emoji: '🎯',
    title: 'Mission Dossier',
  },
  {
    id: 'capabilities',
    label: 'CAPABILITY',
    sublabel: 'MATRIX',
    emoji: '⚡',
    title: 'Capability Matrix',
  },
  {
    id: 'intel',
    label: 'INTEL',
    sublabel: 'REPORTS',
    emoji: '📡',
    title: 'Intel Reports',
  },
  {
    id: 'comms',
    label: 'COMMS',
    sublabel: 'CHANNEL',
    emoji: '📡',
    title: 'Open Channel',
  },
  {
    id: 'archives',
    label: 'ARCHIVES',
    sublabel: 'VAULT',
    emoji: '🗄️',
    title: 'Secure Archives',
  },
];

export { DOCK_ITEMS };

export default function HUDDock({ openPanels, onOpenPanel }) {
  return (
    <div className="hud-dock">
      {DOCK_ITEMS.map((item, idx) => {
        const isOpen = openPanels.includes(item.id);
        return (
          <div key={item.id}>
            {idx === 4 && <div className="hud-dock-sep" />}
            <DockItem
              item={item}
              isOpen={isOpen}
              onOpen={() => {
                soundEngine.playPanelOpen();
                onOpenPanel(item.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function DockItem({ item, isOpen, onOpen }) {
  return (
    <div
      className={`hud-dock-item${isOpen ? ' active' : ''}`}
      onClick={onOpen}
      title={item.title}
      onMouseEnter={() => soundEngine.playHover()}
    >
      <div className="hud-dock-icon">
        <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
      </div>
      <div className="hud-dock-label">{item.label}</div>
      <div className="hud-dock-label" style={{ marginTop: '-2px', opacity: 0.6 }}>
        {item.sublabel}
      </div>
    </div>
  );
}
