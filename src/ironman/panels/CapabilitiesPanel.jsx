import { useEffect, useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import '../ironman.css';

const radarData = [
  { subject: 'AI Security', value: 97 },
  { subject: 'Cloud Sec', value: 93 },
  { subject: 'Risk Gov', value: 96 },
  { subject: 'DevSecOps', value: 88 },
  { subject: 'Threat Intel', value: 91 },
  { subject: 'GRC', value: 94 },
  { subject: 'Leadership', value: 95 },
];

const skillCategories = [
  {
    label: 'AI & LLM SECURITY',
    skills: [
      { name: 'AI Governance / NIST AI RMF', level: 97 },
      { name: 'Agentic AI Security', level: 95 },
      { name: 'LLM Red Teaming', level: 90 },
      { name: 'Prompt Injection Defense', level: 93 },
    ],
  },
  {
    label: 'CLOUD & INFRASTRUCTURE',
    skills: [
      { name: 'AWS Security', level: 92 },
      { name: 'GCP / Azure Security', level: 88 },
      { name: 'Cloud Posture (Prisma, Wiz)', level: 90 },
      { name: 'Zero Trust Architecture', level: 89 },
    ],
  },
  {
    label: 'SECURITY ENGINEERING',
    skills: [
      { name: 'SIEM (Splunk, QRadar)', level: 92 },
      { name: 'SOAR (Demisto, XSOAR)', level: 88 },
      { name: 'EDR (CrowdStrike, Carbon Black)', level: 90 },
      { name: 'DevSecOps / CI-CD Security', level: 87 },
    ],
  },
  {
    label: 'RISK & COMPLIANCE',
    skills: [
      { name: 'NIST 800-53 / CSF', level: 96 },
      { name: 'MITRE ATT&CK', level: 93 },
      { name: 'SOC2 / ISO 27001', level: 91 },
      { name: 'FEDRAMP / PCI-DSS', level: 89 },
    ],
  },
];

const certifications = [
  { name: 'CISSP', issuer: 'ISC²', year: '2018', icon: '🛡' },
  { name: 'CISM', issuer: 'ISACA', year: '2019', icon: '🏛' },
  { name: 'AWS Security Specialty', issuer: 'Amazon Web Services', year: '2021', icon: '☁' },
  { name: 'CCSP', issuer: 'ISC²', year: '2020', icon: '🌐' },
  { name: 'CEH', issuer: 'EC-Council', year: '2017', icon: '⚡' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2015', icon: '🔒' },
];

function SkillBar({ name, level, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 100 + delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="skill-bar-container">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-value">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function CapabilitiesPanel() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div>
      <div className="panel-section-title">CAPABILITY MATRIX</div>

      {/* Radar chart */}
      <div style={{ height: 220, marginBottom: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(0,212,255,0.2)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'rgba(200,238,255,0.6)', fontSize: 10, fontFamily: 'Share Tech Mono' }}
            />
            <Radar
              name="Capability"
              dataKey="value"
              stroke="#00d4ff"
              fill="rgba(0,212,255,0.15)"
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="hud-divider" />

      {/* Category tabs */}
      <div className="panel-tags-row" style={{ marginBottom: '0.75rem' }}>
        {skillCategories.map((cat, i) => (
          <button
            key={cat.label}
            className="panel-tag"
            onClick={() => setActiveCategory(i)}
            style={{
              cursor: 'pointer',
              background: activeCategory === i ? 'rgba(0, 212, 255, 0.18)' : undefined,
              borderColor: activeCategory === i ? 'var(--iron-blue)' : undefined,
              color: activeCategory === i ? 'var(--iron-blue)' : undefined,
              fontSize: '0.55rem',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <div style={{ marginBottom: '1rem' }}>
        {skillCategories[activeCategory].skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 80} />
        ))}
      </div>

      <div className="hud-divider" />

      {/* Certifications */}
      <div className="panel-section-title">SECURITY CLEARANCES & CERTIFICATIONS</div>
      {certifications.map((cert) => (
        <div key={cert.name} className="cert-card">
          <span className="cert-icon">{cert.icon}</span>
          <div>
            <div className="cert-name">{cert.name}</div>
            <div className="cert-issuer">{cert.issuer} · {cert.year}</div>
          </div>
        </div>
      ))}

      <div className="hud-divider" />

      {/* Tools grid */}
      <div className="panel-section-title">ARSENAL — KEY TOOLS</div>
      <div className="panel-tags-row">
        {[
          'CrowdStrike', 'Splunk', 'ServiceNow GRC', 'Wiz', 'Prisma Cloud',
          'Palo Alto', 'AWS', 'Azure', 'GCP', 'Terraform',
          'Python', 'Power BI', 'Tenable', 'Qualys', 'XSOAR',
          'Recorded Future', 'Azure OpenAI', 'MS Copilot', 'Carbon Black',
        ].map((tool) => (
          <span key={tool} className="panel-tag">{tool}</span>
        ))}
      </div>
    </div>
  );
}
