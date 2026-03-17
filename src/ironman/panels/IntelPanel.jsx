import { useState } from 'react';
import { workingPapers } from '../../data/workingPapers';
import '../ironman.css';

export default function IntelPanel() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <IntelDetail paper={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <div className="panel-section-title">INTELLIGENCE REPORTS</div>

      <div className="panel-metrics-row">
        <div className="panel-metric">
          <div className="panel-metric-value">{workingPapers.length}</div>
          <div className="panel-metric-label">Published Papers</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-gold">CLASSIFIED</div>
          <div className="panel-metric-label">Access Level</div>
        </div>
      </div>

      <p className="panel-text">
        Frameworks, working papers, and field intelligence developed from first-hand execution at enterprise scale. Topics span AI security governance, zero trust LLM architecture, agentic systems, and board-level cyber risk communication.
      </p>

      <div className="hud-divider" />

      {workingPapers.map((paper) => (
        <div
          key={paper.id}
          className="intel-card"
          onClick={() => setSelected(paper)}
        >
          <div className="intel-card-title">{paper.title}</div>
          <div className="intel-card-summary">{paper.abstract || paper.summary}</div>
          <div className="intel-card-meta">
            <span className="intel-category">{paper.category}</span>
            {paper.date && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--iron-text-muted)' }}>
                {paper.date}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function IntelDetail({ paper, onBack }) {
  return (
    <div>
      <button className="panel-back-btn" onClick={onBack}>
        ← BACK TO INTEL
      </button>

      <div className="panel-section-title">{paper.title}</div>

      <div style={{ marginBottom: '0.75rem' }}>
        <span className="intel-category">{paper.category}</span>
        {paper.date && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--iron-text-muted)',
            marginLeft: '1rem',
          }}>
            {paper.date}
          </span>
        )}
      </div>

      <p className="panel-text">{paper.abstract || paper.summary}</p>

      {paper.pages && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--iron-text-muted)', marginBottom: '0.75rem' }}>
          {paper.pages} pages · {paper.category}
        </div>
      )}

      {(paper.topics || paper.tags) && (
        <div className="panel-tags-row">
          {(paper.topics || paper.tags).map((t) => (
            <span key={t} className="panel-tag">{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <a
          href={paper.downloadUrl || `/papers/${paper.id}.pdf`}
          download
          style={{ textDecoration: 'none' }}
        >
          <button className="comms-submit">⤓ DOWNLOAD PDF</button>
        </a>
      </div>
    </div>
  );
}
