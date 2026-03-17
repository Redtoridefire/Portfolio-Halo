import { useState } from 'react';
import { trackEvent } from '../../utils/analytics';
import '../ironman.css';

const CATEGORIES = {
  'PERSONNEL': { color: 'var(--iron-blue)', emoji: '📋' },
  'AI SECURITY': { color: 'var(--iron-blue)', emoji: '🤖' },
  'CLOUD SECURITY': { color: 'var(--iron-blue)', emoji: '☁️' },
  'ENGINEERING': { color: 'var(--iron-green)', emoji: '⚙️' },
  'GRC & COMPLIANCE': { color: 'var(--iron-gold)', emoji: '⚖️' },
  'RISK': { color: 'var(--iron-gold)', emoji: '📊' },
  'THREAT OPS': { color: 'var(--iron-red)', emoji: '🎯' },
  'ADVISORY': { color: 'var(--iron-gold)', emoji: '🤝' },
};

const DOCUMENTS = [
  // ─── Primary ───────────────────────────────────────────
  {
    id: 'resume',
    title: 'OPERATIVE RESUME',
    subtitle: 'Michael Czarnecki — Full CV (2025)',
    description: 'Complete career record — all positions, achievements, certifications, and technical credentials.',
    href: '/Michael_Czarnecki_Resume.pdf',
    label: 'DOWNLOAD RESUME',
    category: 'PERSONNEL',
  },
  {
    id: 'advisory-engagement',
    title: 'ADVISORY ENGAGEMENT BRIEF',
    subtitle: 'Fractional CISO & Advisory Services',
    description: 'Overview of advisory and fractional CISO services available to startups and growth-stage companies.',
    href: '/briefs/advisory-engagement-brief.pdf',
    category: 'ADVISORY',
  },

  // ─── AI Security ───────────────────────────────────────
  {
    id: 'ai-governance-playbook',
    title: 'AI GOVERNANCE PLAYBOOK',
    subtitle: 'Enterprise LLM Governance Framework',
    description: 'Built an enterprise AI governance operating model — NIST AI RMF, ISO 42001, ServiceNow GRC integration.',
    href: '/briefs/ai-governance-playbook-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'agentic-ai-security',
    title: 'AGENTIC AI SECURITY FRAMEWORK',
    subtitle: 'Autonomous Agent Controls',
    description: 'Controls for securing autonomous AI agents — action gating, memory governance, runtime isolation.',
    href: '/briefs/agentic-ai-security-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'ai-auto-misconfig',
    title: 'AI-POWERED AUTO-REMEDIATION',
    subtitle: 'Cloud Misconfiguration Pipeline',
    description: 'AI-assisted remediation pipeline — converted cloud misconfig backlogs to near-real-time policy correction.',
    href: '/briefs/ai-auto-misconfig-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'ai-triage-automation',
    title: 'INTELLIGENT SECURITY TRIAGE',
    subtitle: 'AI-Driven SOC Automation',
    description: 'AI-driven SOC triage — high-fidelity incident prioritization, reduced analyst fatigue at enterprise scale.',
    href: '/briefs/ai-triage-automation-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'ai-threat-intel',
    title: 'AI-ENHANCED THREAT INTELLIGENCE',
    subtitle: 'Threat Intel Fusion Platform',
    description: 'AI fusion of threat intelligence streams — cross-source correlation, IOC enrichment, and analyst delivery.',
    href: '/briefs/ai-threat-intel-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'ai-vuln-matching',
    title: 'ML-BASED VULNERABILITY MATCHING',
    subtitle: 'Intelligent Vuln Prioritization',
    description: 'ML model matching CVEs to business context, asset criticality, and exploitability for risk-based prioritization.',
    href: '/briefs/ai-vuln-matching-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'ai-framework-mapping',
    title: 'AUTOMATED COMPLIANCE MAPPING',
    subtitle: 'AI Control Framework Coverage',
    description: 'Automated mapping of controls across NIST, ISO, SOC2 using AI — eliminated manual cross-framework work.',
    href: '/briefs/ai-framework-mapping-brief.pdf',
    category: 'AI SECURITY',
  },
  {
    id: 'ai-policy-search',
    title: 'INTELLIGENT POLICY SEARCH',
    subtitle: 'NLP-Powered Policy Navigation',
    description: 'NLP-powered policy search engine enabling users to query the full policy library in natural language.',
    href: '/briefs/ai-policy-search-brief.pdf',
    category: 'AI SECURITY',
  },

  // ─── Cloud & Engineering ──────────────────────────────
  {
    id: 'cloud-security-transformation',
    title: 'CLOUD SECURITY TRANSFORMATION',
    subtitle: 'Enterprise Cloud Security Program',
    description: 'Enterprise-wide cloud security transformation — posture management, DevSecOps, and zero trust enablement.',
    href: '/briefs/cloud-security-transformation-brief.pdf',
    category: 'CLOUD SECURITY',
  },
  {
    id: 'devsecops-transformation',
    title: 'DEVSECOPS TRANSFORMATION',
    subtitle: 'Security-First Dev Pipeline',
    description: '$3M savings via DevSecOps-driven onboarding process. Security embedded in CI/CD at Capital One.',
    href: '/briefs/devsecops-transformation-brief.pdf',
    category: 'ENGINEERING',
  },
  {
    id: 'siem-mitre-integration',
    title: 'SIEM + MITRE ATT&CK INTEGRATION',
    subtitle: 'Detection Engineering Framework',
    description: '40% increase in SIEM adoption via structured MITRE ATT&CK integration at Capital One.',
    href: '/briefs/siem-mitre-integration-brief.pdf',
    category: 'ENGINEERING',
  },
  {
    id: 'soar-implementation',
    title: 'SOAR IMPLEMENTATION',
    subtitle: 'Incident Response Automation',
    description: 'SOAR deployment at Norges Bank — 30% faster IR, 60% improved threat detection via Demisto.',
    href: '/briefs/soar-implementation-brief.pdf',
    category: 'ENGINEERING',
  },
  {
    id: 'threat-modeling-framework',
    title: 'THREAT MODELING FRAMEWORK',
    subtitle: 'Enterprise Threat Model Program',
    description: 'Dedicated threat modeling team and framework — all Capital One applications evaluated against threat scenarios.',
    href: '/briefs/threat-modeling-framework-brief.pdf',
    category: 'THREAT OPS',
  },
  {
    id: 'incident-response-optimization',
    title: 'INCIDENT RESPONSE OPTIMIZATION',
    subtitle: '70% IR Time Reduction',
    description: '70% reduction in incident response time via open-source threat intelligence and proactive detection playbooks.',
    href: '/briefs/incident-response-optimization-brief.pdf',
    category: 'THREAT OPS',
  },

  // ─── GRC ──────────────────────────────────────────────
  {
    id: 'fedramp-compliance',
    title: 'FEDRAMP COMPLIANCE PROGRAM',
    subtitle: 'VA Regulatory Compliance',
    description: '100% audit success rate — RSA Archer, NIST, CIS, FEDRAMP, and PCI-DSS controls at the VA.',
    href: '/briefs/fedramp-compliance-brief.pdf',
    category: 'GRC & COMPLIANCE',
  },
  {
    id: 'grc-platform-migration',
    title: 'GRC PLATFORM MIGRATION',
    subtitle: 'Archer → Target Platform',
    description: 'Led enterprise migration off Archer with zero continuity gaps in policy mapping and exception workflows.',
    href: '/briefs/grc-platform-migration-brief.pdf',
    category: 'GRC & COMPLIANCE',
  },
  {
    id: 'quantitative-risk-scoring',
    title: 'QUANTITATIVE RISK SCORING',
    subtitle: 'Risk Prioritization Model',
    description: 'Quantitative risk scoring system — 25% improved risk prioritization accuracy at Norges Bank.',
    href: '/briefs/quantitative-risk-scoring-brief.pdf',
    category: 'RISK',
  },
];

const ALL_CATS = ['ALL', ...Object.keys(CATEGORIES)];

export default function ArchivesPanel() {
  const [filter, setFilter] = useState('ALL');

  const filtered = DOCUMENTS.filter(
    (d) => filter === 'ALL' || d.category === filter
  );

  return (
    <div>
      <div className="panel-section-title">SECURE ARCHIVES — DOCUMENT VAULT</div>

      <div className="panel-metrics-row">
        <div className="panel-metric">
          <div className="panel-metric-value">{DOCUMENTS.length}</div>
          <div className="panel-metric-label">Documents</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-gold">{Object.keys(CATEGORIES).length}</div>
          <div className="panel-metric-label">Categories</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-green">SECURED</div>
          <div className="panel-metric-label">Vault Status</div>
        </div>
      </div>

      {/* Category filter */}
      <div className="panel-tags-row" style={{ marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            className="panel-tag"
            onClick={() => setFilter(cat)}
            style={{
              cursor: 'pointer',
              fontSize: '0.55rem',
              background: filter === cat ? 'rgba(0, 212, 255, 0.18)' : undefined,
              borderColor: filter === cat ? 'var(--iron-blue)' : undefined,
              color: filter === cat ? 'var(--iron-blue)' : undefined,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="hud-divider" />

      {filtered.map((doc) => {
        const catInfo = CATEGORIES[doc.category] || { color: 'var(--iron-blue)', emoji: '📄' };
        return (
          <div
            key={doc.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.65rem 0.75rem',
              border: '1px solid var(--iron-panel-border)',
              background: 'var(--iron-blue-ghost)',
              marginBottom: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = catInfo.color;
              e.currentTarget.style.background = 'rgba(0,212,255,0.09)';
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
            <span style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1.2 }}>{catInfo.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-hud)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                color: 'var(--iron-text)',
                marginBottom: '0.1rem',
              }}>
                {doc.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: catInfo.color,
                marginBottom: '0.2rem',
              }}>
                {doc.subtitle}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--iron-text-muted)',
                lineHeight: 1.35,
              }}>
                {doc.description}
              </div>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'var(--iron-text-muted)',
                background: 'rgba(0,0,0,0.3)',
                padding: '0.1rem 0.3rem',
              }}>
                PDF
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.04em',
                color: catInfo.color,
                maxWidth: '70px',
                textAlign: 'right',
              }}>
                {doc.category}
              </span>
            </div>
          </div>
        );
      })}

      <div className="hud-divider" />
      <div style={{
        padding: '0.6rem 0.75rem',
        border: '1px dashed rgba(0,212,255,0.15)',
        textAlign: 'center',
        cursor: 'pointer',
      }}
        onClick={() => window.open('mailto:michael@czarnecki.co', '_blank')}
      >
        <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--iron-text-dim)', marginBottom: '0.15rem' }}>
          NEED A SPECIFIC DOCUMENT?
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--iron-text-muted)' }}>
          Contact via COMMS channel · michael@czarnecki.co
        </div>
      </div>
    </div>
  );
}
