import { useState } from 'react';
import { trackEvent } from '../../utils/analytics';
import '../ironman.css';

export default function CommsPanel() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', message: ''
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    trackEvent('comms_panel_submit', { email: form.email });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          challenge: form.message,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <div className="panel-section-title">OPEN CHANNEL — COMMUNICATIONS</div>

      <p className="panel-text">
        Ready to discuss AI security strategy, a fractional CISO engagement, or advisory work? All channels are monitored and encrypted.
      </p>

      {/* Quick links */}
      <div className="comms-grid" style={{ marginBottom: '1.25rem' }}>
        <a
          href="mailto:michael@czarnecki.co"
          className="comms-btn"
          onClick={() => trackEvent('comms_email_click')}
        >
          <span className="comms-btn-icon">📧</span>
          <span className="comms-btn-label">ENCRYPTED MAIL</span>
          <span className="comms-btn-detail">michael@czarnecki.co</span>
        </a>
        <a
          href="https://www.linkedin.com/in/michaelczarnecki/"
          target="_blank"
          rel="noopener noreferrer"
          className="comms-btn"
          onClick={() => trackEvent('comms_linkedin_click')}
        >
          <span className="comms-btn-icon">🔗</span>
          <span className="comms-btn-label">NETWORK LINK</span>
          <span className="comms-btn-detail">LinkedIn Profile</span>
        </a>
        <a
          href="/Michael_Czarnecki_Resume.pdf"
          download
          className="comms-btn"
          onClick={() => trackEvent('comms_resume_download')}
        >
          <span className="comms-btn-icon">📄</span>
          <span className="comms-btn-label">MISSION BRIEF</span>
          <span className="comms-btn-detail">Download Resume</span>
        </a>
        <a
          href="https://calendly.com/michael-czarnecki"
          target="_blank"
          rel="noopener noreferrer"
          className="comms-btn"
          onClick={() => trackEvent('comms_calendly_click')}
        >
          <span className="comms-btn-icon">📅</span>
          <span className="comms-btn-label">SCHEDULE BRIEF</span>
          <span className="comms-btn-detail">Book 30 min</span>
        </a>
      </div>

      <div className="hud-divider" />
      <div className="panel-section-title">SECURE TRANSMISSION</div>

      {status === 'sent' ? (
        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--iron-green)',
          background: 'rgba(0, 255, 136, 0.05)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-hud)',
            fontSize: '1rem',
            color: 'var(--iron-green)',
            marginBottom: '0.5rem',
          }}>
            TRANSMISSION SENT ✓
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--iron-text-dim)',
          }}>
            Message received. Response incoming within 24 hours.
          </div>
          <button
            className="comms-submit"
            style={{ marginTop: '1rem', borderColor: 'var(--iron-green)', color: 'var(--iron-green)' }}
            onClick={() => setStatus(null)}
          >
            SEND ANOTHER
          </button>
        </div>
      ) : (
        <form className="comms-form" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <div className="comms-field">
              <label className="comms-label">OPERATIVE NAME *</label>
              <input
                className="comms-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>
            <div className="comms-field">
              <label className="comms-label">SECURE EMAIL *</label>
              <input
                className="comms-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="comms-field">
            <label className="comms-label">ORGANIZATION</label>
            <input
              className="comms-input"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company or project"
            />
          </div>

          <div className="comms-field">
            <label className="comms-label">MISSION OBJECTIVE *</label>
            <textarea
              className="comms-textarea"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your security challenge or engagement need..."
              required
            />
          </div>

          {status === 'error' && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--iron-red)',
              padding: '0.4rem',
              border: '1px solid rgba(255,61,0,0.3)',
            }}>
              ⚠ TRANSMISSION FAILED — please try direct email
            </div>
          )}

          <button
            className="comms-submit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
          </button>
        </form>
      )}
    </div>
  );
}
