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
    emoji: '📨',
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
  // Use flatMap so the separator is a direct flex sibling — not nested inside
  // a wrapper div (which was causing the COMMS icon to be pushed down)
  const items = DOCK_ITEMS.flatMap((item, idx) => {
    const elements = [];

    if (idx === 4) {
      elements.push(
        <div key="sep-comms" className="hud-dock-sep" />
      );
    }

    const isOpen = openPanels.includes(item.id);
    elements.push(
      <DockItem
        key={item.id}
        item={item}
        isOpen={isOpen}
        onOpen={() => {
          soundEngine.playPanelOpen();
          onOpenPanel(item.id);
        }}
      />
    );

    return elements;
  });

  return (
    <div className="hud-dock">
      {items}
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
