import { useState } from 'react';
import { useCases } from '../../data/useCases';
import '../ironman.css';

const CATEGORIES = ['All', 'AI Security', 'Cloud Security', 'Security Engineering', 'GRC & Compliance'];

export default function MissionsPanel() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMission, setSelectedMission] = useState(null);

  const filtered = useCases.filter(
    (uc) => selectedCategory === 'All' || uc.category === selectedCategory
  );

  if (selectedMission) {
    return <MissionDetail mission={selectedMission} onBack={() => setSelectedMission(null)} />;
  }

  return (
    <div>
      <div className="panel-section-title">MISSION DOSSIER</div>

      <div className="panel-metrics-row">
        <div className="panel-metric">
          <div className="panel-metric-value">{useCases.length}</div>
          <div className="panel-metric-label">Classified Ops</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-gold">{useCases.filter((u) => u.featured).length}</div>
          <div className="panel-metric-label">Featured Missions</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-green">ACTIVE</div>
          <div className="panel-metric-label">Status</div>
        </div>
      </div>

      {/* Category filter */}
      <div className="panel-tags-row" style={{ marginBottom: '1rem' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className="panel-tag"
            onClick={() => setSelectedCategory(cat)}
            style={{
              cursor: 'pointer',
              background: selectedCategory === cat ? 'rgba(0, 212, 255, 0.18)' : undefined,
              borderColor: selectedCategory === cat ? 'var(--iron-blue)' : undefined,
              color: selectedCategory === cat ? 'var(--iron-blue)' : undefined,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mission cards */}
      {filtered.map((uc) => (
        <div
          key={uc.id}
          className="mission-card"
          onClick={() => setSelectedMission(uc)}
        >
          {uc.featured && (
            <div style={{
              position: 'absolute',
              top: '0.4rem',
              right: '0.5rem',
              fontFamily: 'var(--font-hud)',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: 'var(--iron-gold)',
              background: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              padding: '0.1rem 0.35rem',
            }}>
              FEATURED
            </div>
          )}
          <div className="mission-card-title">{uc.title}</div>
          <div className="mission-card-meta">
            <span className="mission-card-company">{uc.company}</span>
            <span className="mission-card-year">{uc.year}</span>
            <span className="mission-card-cat">{uc.category}</span>
          </div>
          <div className="mission-card-summary">{uc.summary}</div>
          {uc.metrics && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              {uc.metrics.map((m) => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                  <span style={{ fontFamily: 'var(--font-hud)', fontSize: '0.75rem', color: 'var(--iron-blue)' }}>{m.value}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--iron-text-muted)' }}>{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MissionDetail({ mission, onBack }) {
  return (
    <div className="mission-detail">
      <button className="panel-back-btn" onClick={onBack}>
        ← BACK TO DOSSIER
      </button>

      <div className="panel-section-title">{mission.title}</div>

      <div className="mission-card-meta" style={{ marginBottom: '1rem' }}>
        <span className="mission-card-company">{mission.company}</span>
        <span className="mission-card-year">{mission.year}</span>
        <span className="mission-card-cat">{mission.category}</span>
      </div>

      {/* Metrics */}
      {mission.metrics && (
        <div className="panel-metrics-row" style={{ marginBottom: '1.25rem' }}>
          {mission.metrics.map((m) => (
            <div key={m.label} className="panel-metric">
              <div className="panel-metric-value">{m.value}</div>
              <div className="panel-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mission-detail-section">
        <div className="mission-detail-label">THREAT ASSESSMENT</div>
        <div className="mission-detail-text">{mission.challenge}</div>
      </div>

      <div className="mission-detail-section">
        <div className="mission-detail-label">TACTICAL SOLUTION</div>
        <div className="mission-detail-text">{mission.solution}</div>
      </div>

      <div className="mission-detail-section">
        <div className="mission-detail-label">MISSION OUTCOME</div>
        <div className="mission-detail-text">{mission.outcome}</div>
      </div>

      {/* Technologies */}
      <div className="mission-detail-section">
        <div className="mission-detail-label">SYSTEMS DEPLOYED</div>
        <div className="panel-tags-row">
          {mission.technologies.map((t) => (
            <span key={t} className="panel-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Brief download */}
      <a
        href={`/briefs/${mission.id}-brief.pdf`}
        download
        style={{ textDecoration: 'none' }}
      >
        <button className="comms-submit" style={{ marginTop: '0.5rem' }}>
          ⤓ DOWNLOAD MISSION BRIEF
        </button>
      </a>
    </div>
  );
}
