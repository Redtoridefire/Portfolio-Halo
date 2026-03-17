import { useState } from 'react';
import '../ironman.css';

const experiences = [
  {
    date: 'Feb 2025 — Present',
    company: 'American Express',
    role: 'Senior Director, Cyber Security Risk Oversight & AI',
    summary: 'Leading second-line cybersecurity risk governance with unified control taxonomy aligned to NIST 800-53 and ISO 27001.',
    highlights: [
      'Built AI Governance Playbook for LLM tools — prompt injection safeguards, access controls, classification rules',
      'Delivered quarterly board risk memos with automated dashboards covering AI usage, vulnerability aging, and EUC governance',
      'Executed credible challenge reviews across cloud posture, encryption lifecycle, and LLM integration',
      'Led enterprise GRC migration off Archer to target platform with zero continuity gaps',
    ],
    tags: ['Risk Governance', 'AI/LLM Security', 'NIST 800-53', 'Board Reporting'],
    metrics: { 'Applications': '50+', 'Compliance': '98%', 'Team': '6' },
  },
  {
    date: 'Feb 2025 — Present',
    company: 'Independent',
    role: 'Fractional CISO & Cybersecurity Advisor',
    summary: 'Advising startups and growth-stage companies — building security programs aligned to real business risk.',
    highlights: [
      'Executive security strategy, board reporting, and risk governance for early-stage companies',
      'Cloud security (AWS, GCP), Zero Trust implementation, and vendor risk management',
      'Readiness consulting for SOC2, ISO 27001, NIST CSF, and financial compliance frameworks',
    ],
    tags: ['vCISO', 'Zero Trust', 'SOC2', 'Startup Security'],
    metrics: { 'Clients': '8+', 'Frameworks': '4', 'Avg Engagement': '6mo' },
  },
  {
    date: 'Nov 2020 — Jan 2025',
    company: 'Capital One',
    role: 'Director, Security Engineering & Operations',
    summary: 'Pioneered Splunk SIEM + MITRE ATT&CK integration. Led DevSecOps transformation saving $3M.',
    highlights: [
      '40% increase in SIEM technology adoption, aligning to ISO 27001 and NIST',
      'Secured 70+ global applications, reducing exceptions via Tenable.io, Qualys, and CrowdStrike',
      'DevSecOps onboarding process — $3M cost savings, 25% productivity increase',
      'Built dedicated threat modeling team across all Capital One tech',
    ],
    tags: ['SIEM', 'MITRE ATT&CK', 'DevSecOps', 'Threat Modeling'],
    metrics: { 'Cost Savings': '$3M', 'Productivity': '+25%', 'Apps': '70+' },
  },
  {
    date: 'May 2019 — Oct 2020',
    company: 'Norges Bank Investment Management',
    role: 'Senior Manager, Cyber Security',
    summary: 'Directed security ops for one of the world\'s largest sovereign wealth funds.',
    highlights: [
      'SOAR deployment with Demisto — 30% faster incident response, 60% better threat detection',
      'CrowdStrike Falcon EDR deployment with NIST-aligned playbooks',
      'Quantitative risk scoring system improving risk prioritization by 25%',
    ],
    tags: ['SOAR', 'EDR', 'Risk Quantification', 'Sovereign Wealth'],
    metrics: { 'IR Improvement': '30%', 'Threat Detection': '+60%', 'Risk Reduction': '30%' },
  },
  {
    date: 'Mar 2019 — Oct 2020',
    company: 'U.S. Department of Veterans Affairs',
    role: 'Senior Manager, Cyber Security',
    summary: 'Led cybersecurity for the VA — 100% audit success rate, advanced security controls.',
    highlights: [
      '100% audit success in GRC via RSA Archer, NIST, CIS, FEDRAMP, and PCI-DSS controls',
      'Deployed Palo Alto Next-Gen Firewalls + CrowdStrike Falcon — 55% reduction in data loss',
      'Automated regulatory compliance — 30% reduction in manual workload',
    ],
    tags: ['FEDRAMP', 'GRC', 'Government', 'PCI-DSS'],
    metrics: { 'Audit Rate': '100%', 'Data Loss': '-55%', 'Compliance': '95%' },
  },
  {
    date: 'Nov 2017 — May 2019',
    company: 'Prudential Financial',
    role: 'Cyber Security Threat Intelligence Analyst',
    summary: 'Enhanced cloud security 30%, reduced incident response time 70% via open-source threat intelligence.',
    highlights: [
      'CrowdStrike + Carbon Black CB Defense deployment across AWS, Azure, GCP',
      'Reduced IR time by 70% via Recorded Future, Wireshark, Bro IDS',
      'Developed gamified security training — 20% improvement in employee engagement',
    ],
    tags: ['Threat Intelligence', 'Cloud Security', 'EDR', 'Training'],
    metrics: { 'Cloud Security': '+30%', 'IR Time': '-70%', 'Engagement': '+20%' },
  },
];

export default function PersonnelPanel() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      {/* Header metrics */}
      <div className="panel-section-title">OPERATIVE PROFILE</div>
      <div className="panel-metrics-row" style={{ marginBottom: '1.25rem' }}>
        <div className="panel-metric">
          <div className="panel-metric-value">15+</div>
          <div className="panel-metric-label">Years Experience</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value">$3M+</div>
          <div className="panel-metric-label">Cost Savings Delivered</div>
        </div>
        <div className="panel-metric">
          <div className="panel-metric-value hud-gold">VP</div>
          <div className="panel-metric-label">Executive Level</div>
        </div>
      </div>

      {/* Bio */}
      <div className="panel-section-title">MISSION BRIEF</div>
      <p className="panel-text">
        <strong>Michael Czarnecki</strong> is a Cybersecurity Executive and AI Security leader with 15+ years at the intersection of enterprise risk, security engineering, and emerging AI governance. Currently Senior Director at <strong>American Express</strong> and Fractional CISO for growth-stage companies.
      </p>
      <p className="panel-text">
        Specializes in transforming reactive security programs into proactive, board-visible risk management platforms — with a track record at American Express, Capital One, Prudential, the VA, and Norges Bank.
      </p>

      <div className="hud-divider" />

      {/* Experience */}
      <div className="panel-section-title">FIELD RECORD</div>
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="exp-card"
          onClick={() => setExpanded(expanded === idx ? null : idx)}
        >
          <div className="exp-card-header">
            <div>
              <div className="exp-card-role">{exp.role}</div>
              <div className="exp-card-company">{exp.company}</div>
            </div>
            <div className="exp-card-date">{exp.date}</div>
          </div>
          <div className="exp-card-summary">{exp.summary}</div>

          {/* Metrics row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.4rem' }}>
            {Object.entries(exp.metrics).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-hud)', fontSize: '0.75rem', color: 'var(--iron-blue)' }}>{val}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--iron-text-muted)', letterSpacing: '0.05em' }}>{key}</span>
              </div>
            ))}
          </div>

          {/* Expanded highlights */}
          {expanded === idx && (
            <div className="exp-card-body" style={{ marginTop: '0.5rem' }}>
              {exp.highlights.map((h, i) => (
                <div key={i} className="panel-highlight">{h}</div>
              ))}
              <div className="panel-tags-row" style={{ marginTop: '0.5rem' }}>
                {exp.tags.map((t) => (
                  <span key={t} className="panel-tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--iron-text-muted)',
            marginTop: '0.25rem',
            textAlign: 'right',
          }}>
            {expanded === idx ? '▲ COLLAPSE' : '▼ EXPAND RECORD'}
          </div>
        </div>
      ))}

      {/* Education */}
      <div className="hud-divider" />
      <div className="panel-section-title">ACADEMIC CREDENTIALS</div>
      <div className="exp-card">
        <div className="exp-card-header">
          <div>
            <div className="exp-card-role">B.S. Information Systems & Technology</div>
            <div className="exp-card-company">University at Albany, SUNY</div>
          </div>
          <div className="exp-card-date">Graduated 2014</div>
        </div>
        <p className="exp-card-summary">Concentration in Cybersecurity and Data Analytics</p>
      </div>

      {/* Testimonials */}
      <div className="hud-divider" />
      <div className="panel-section-title">FIELD TESTIMONIALS</div>
      {[
        {
          quote: "Mike's ability to translate complex security risks into business terms is unmatched. He makes the board understand cyber risk without dumbing it down.",
          author: 'Former Colleague',
          role: 'VP of Technology',
          company: 'Capital One',
        },
        {
          quote: "When Mike steps in, the situation gets calmer and smarter. He has this rare ability to reduce noise and drive towards solutions during high-pressure incidents.",
          author: 'Team Member',
          role: 'Security Engineer',
          company: 'American Express',
        },
        {
          quote: "A coach, not a critic. Mike builds teams that trust him because he invests in their growth while holding everyone to high standards.",
          author: 'Direct Report',
          role: 'Senior Analyst',
          company: 'Norges Bank',
        },
      ].map((t, i) => (
        <div
          key={i}
          style={{
            border: '1px solid var(--iron-panel-border)',
            background: 'var(--iron-gold-ghost)',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '0.4rem',
            left: '0.6rem',
            fontFamily: 'var(--font-hud)',
            fontSize: '1.5rem',
            color: 'var(--iron-gold)',
            opacity: 0.3,
            lineHeight: 1,
          }}>
            "
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--iron-text-dim)',
            lineHeight: 1.55,
            fontStyle: 'italic',
            paddingLeft: '1rem',
            marginBottom: '0.5rem',
          }}>
            {t.quote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem' }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(255, 193, 7, 0.15)',
              border: '1px solid var(--iron-gold-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-hud)',
              fontSize: '0.6rem',
              color: 'var(--iron-gold)',
              flexShrink: 0,
            }}>
              {t.author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--iron-text)' }}>
                {t.author}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--iron-gold)' }}>
                {t.role} · {t.company}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
