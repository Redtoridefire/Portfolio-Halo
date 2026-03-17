import { trackEvent } from '../../utils/analytics';
import '../ironman.css';

const DOCUMENTS = [
  {
    id: 'resume',
    title: 'OPERATIVE RESUME',
    subtitle: 'Michael Czarnecki — Full CV',
    description: 'Complete career record including all positions, achievements, and technical credentials. Updated 2025.',
    icon: '📋',
    type: 'PDF',
    href: '/Michael_Czarnecki_Resume.pdf',
    label: 'DOWNLOAD RESUME',
    category: 'PERSONNEL',
    color: 'var(--iron-blue)',
  },
  {
    id: 'advisory',
    title: 'ADVISORY BRIEF',
    subtitle: 'Fractional CISO Engagement',
    description: 'Overview of advisory and fractional CISO services offered to startups and growth-stage companies.',
    icon: '🤝',
    type: 'PDF',
    href: '/briefs/advisory-engagement-brief.pdf',
    label: 'DOWNLOAD BRIEF',
    category: 'ADVISORY',
    color: 'var(--iron-gold)',
  },
  {
    id: 'ai-governance',
    title: 'AI GOVERNANCE BRIEF',
    subtitle: 'Enterprise LLM Governance Framework',
    description: 'Executive brief on building AI governance for LLM deployments aligned to NIST AI RMF and ISO 42001.',
    icon: '🤖',
    type: 'PDF',
    href: '/briefs/ai-governance-playbook-brief.pdf',
    label: 'VIEW BRIEF',
    category: 'AI SECURITY',
    color: 'var(--iron-blue)',
  },
  {
    id: 'agentic-ai',
    title: 'AGENTIC AI SECURITY',
    subtitle: 'Autonomous Agent Controls Framework',
    description: 'Framework for securing autonomous AI agents — action gating, memory governance, and runtime isolation.',
    icon: '🧠',
    type: 'PDF',
    href: '/briefs/agentic-ai-security-brief.pdf',
    label: 'VIEW BRIEF',
    category: 'AI SECURITY',
    color: 'var(--iron-blue)',
  },
  {
    id: 'devsecops',
    title: 'DEVSECOPS BRIEF',
    subtitle: 'Security-First Development Pipeline',
    description: 'Case study on integrating security controls into the development lifecycle at Capital One.',
    icon: '⚙️',
    type: 'PDF',
    href: '/briefs/devsecops-transformation-brief.pdf',
    label: 'VIEW BRIEF',
    category: 'ENGINEERING',
    color: 'var(--iron-green)',
  },
  {
    id: 'zero-trust-paper',
    title: 'ZERO TRUST LLM PAPER',
    subtitle: 'Architecture Framework',
    description: 'Working paper on Zero Trust architecture principles applied to LLM inference pipelines and AI systems.',
    icon: '🔐',
    type: 'PDF',
    href: '/papers/zero-trust-llm-architecture.pdf',
    label: 'READ PAPER',
    category: 'AI SECURITY',
    color: 'var(--iron-blue)',
  },
];

export default function ArchivesPanel() {
  const categories = [...new Set(DOCUMENTS.map((d) => d.category))];

  return (
    <div>
      <div className="panel-section-title">SECURE ARCHIVES — DOCUMENT VAULT</div>

      <div className="panel-metrics-row">
        <div className="panel-metric">
          <div className="panel-metric-value">{DOCUMENTS.length}</div>
          <div className="panel-metric-label">Documents</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-gold">{categories.length}</div>
          <div className="panel-metric-label">Categories</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-green">SECURED</div>
          <div className="panel-metric-label">Vault Status</div>
        </div>
      </div>

      <p className="panel-text">
        All documents are available for download. Select any file to access or download.
      </p>

      <div className="hud-divider" />

      {DOCUMENTS.map((doc) => (
        <div
          key={doc.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            border: '1px solid var(--iron-panel-border)',
            background: 'var(--iron-blue-ghost)',
            marginBottom: '0.5rem',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = doc.color;
            e.currentTarget.style.background = `rgba(0,212,255,0.1)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--iron-panel-border)';
            e.currentTarget.style.background = 'var(--iron-blue-ghost)';
          }}
          onClick={() => {
            trackEvent('archive_download', { id: doc.id });
            window.open(doc.href, '_blank');
          }}
        >
          <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{doc.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-hud)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--iron-text)',
              marginBottom: '0.15rem',
            }}>
              {doc.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: doc.color,
            }}>
              {doc.subtitle}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--iron-text-muted)',
              marginTop: '0.2rem',
              lineHeight: 1.4,
            }}>
              {doc.description}
            </div>
          </div>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--iron-text-muted)',
              background: 'rgba(0,0,0,0.3)',
              padding: '0.1rem 0.3rem',
            }}>
              {doc.type}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.05em',
              color: doc.color,
            }}>
              {doc.category}
            </span>
          </div>
        </div>
      ))}

      <div className="hud-divider" />

      {/* All briefs link */}
      <div
        style={{
          padding: '0.75rem',
          border: '1px dashed rgba(0,212,255,0.2)',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => window.open('/Michael_Czarnecki_Resume.pdf', '_blank')}
      >
        <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--iron-text-dim)', marginBottom: '0.2rem' }}>
          NEED SOMETHING SPECIFIC?
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--iron-text-muted)' }}>
          Contact via COMMS channel for additional documentation
        </div>
      </div>
    </div>
  );
}
