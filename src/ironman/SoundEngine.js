/**
 * Iron Man / J.A.R.V.I.S. Sound Engine
 * ─────────────────────────────────────
 * Supports both real audio files (dropped into /public/sounds/) AND
 * fully synthesized fallbacks via Web Audio API.
 *
 * Expected files in /public/sounds/ (all optional — synth fallback if missing):
 *   jarvis-online.mp3   — plays when user clicks ENTER SYSTEM on boot screen
 *   pulser-blast.mp3    — plays when the HUD desktop first appears
 *
 * All other sounds are synthesized (no files needed).
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.enabled = false;
    this._initialized = false;
    this._audioCache = {}; // keyed by filename stem → HTMLAudioElement
  }

  // ── Init ──────────────────────────────────────────────────────────────────

  init() {
    if (this._initialized) return;
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.audioCtx.destination);
      this._initialized = true;
      this.enabled = true;
      // Pre-load the known audio files so they're ready instantly
      this._preload('jarvis-online');
      this._preload('pulser-blast');
    } catch {
      // Audio not supported
    }
  }

  _resume() {
    if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();
  }

  enable() {
    if (!this._initialized) this.init();
    this.enabled = true;
  }

  // ── Audio file player ─────────────────────────────────────────────────────

  /**
   * Pre-fetch an audio file into cache. Called automatically on init.
   * Silently ignores 404s so missing files never break anything.
   * Marks the entry as 'failed' on error so playFile knows not to use it.
   */
  _preload(name) {
    if (this._audioCache[name]) return;
    const audio = new Audio(`/sounds/${name}.mp3`);
    audio.preload = 'auto';
    audio._failed = false;
    audio.addEventListener('error', () => {
      audio._failed = true;
    }, { once: true });
    this._audioCache[name] = audio;
  }

  /**
   * Play a file from /public/sounds/<name>.mp3
   * Falls back to `fallback()` only if the file is genuinely missing/errored.
   * Does NOT require readyState >= 2 — the browser buffers and plays fine.
   *
   * @param {string}   name     — filename without extension
   * @param {Function} fallback — called if file unavailable
   * @param {number}   volume   — 0.0 – 1.0, default 1.0
   */
  playFile(name, fallback, volume = 1.0) {
    if (!this.enabled) return;
    const audio = this._audioCache[name];

    if (audio && !audio._failed) {
      audio.volume = Math.min(1, volume);
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Only run fallback if file genuinely errored, not just slow to load
        if (audio._failed && fallback) fallback();
      });
    } else if (fallback) {
      fallback();
    }
  }

  toggle() {
    if (!this._initialized) this.init();
    this.enabled = !this.enabled;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(
        this.enabled ? 0.5 : 0,
        this.audioCtx.currentTime,
        0.1
      );
    }
    if (!this.enabled && this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.3);
    }
    return this.enabled;
  }

  // ── Primitive builders ────────────────────────────────────────────────────

  /** Create an oscillator connected to destination via a gain node */
  _osc({ freq, type = 'sine', startFreq = null, endFreq = null,
    vol, attack = 0.01, decay, delay = 0, dest }) {
    if (!this.audioCtx || !this.enabled) return null;
    this._resume();
    const ctx = this.audioCtx;
    const t = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq ?? freq, t);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 1), t + decay);
    }

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    osc.connect(gain);
    gain.connect(dest || this.masterGain);
    osc.start(t);
    osc.stop(t + decay + 0.05);
    return { osc, gain };
  }

  /** White noise burst through a bandpass filter */
  _noise({ centerFreq, Q = 8, vol, attack = 0.005, decay, delay = 0 }) {
    if (!this.audioCtx || !this.enabled) return;
    this._resume();
    const ctx = this.audioCtx;
    const t = ctx.currentTime + delay;

    const bufferSize = ctx.sampleRate * Math.max(decay + 0.1, 0.2);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = centerFreq;
    filter.Q.value = Q;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(t);
    source.stop(t + decay + 0.1);
  }

  /** Simple delay/reverb-lite (comb filter effect) */
  _addDelay({ inputNode, time = 0.05, feedback = 0.25, wet = 0.3 }) {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = time;
    const fbGain = ctx.createGain();
    fbGain.gain.value = feedback;
    const wetGain = ctx.createGain();
    wetGain.gain.value = wet;

    inputNode.connect(delay);
    delay.connect(fbGain);
    fbGain.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(this.masterGain);
  }

  // ── Public sounds ─────────────────────────────────────────────────────────

  /** Subtle hover — tiny metallic ping */
  playHover() {
    this._osc({ freq: 1800, type: 'sine', vol: 0.06, attack: 0.003, decay: 0.08 });
  }

  /** UI click — crisp double-tap */
  playClick() {
    this._osc({ freq: 1400, type: 'square', vol: 0.15, attack: 0.003, decay: 0.06 });
    this._osc({ freq: 900,  type: 'sine',   vol: 0.10, attack: 0.003, decay: 0.05, delay: 0.04 });
  }

  /**
   * Panel open — holographic "materialize" effect
   * Quick noise burst → rising harmonic sweep → settling chord
   */
  playPanelOpen() {
    if (!this.audioCtx || !this.enabled) return;
    // Noise crack (hologram appears)
    this._noise({ centerFreq: 800, Q: 4, vol: 0.18, decay: 0.08 });
    // Rising tone sweep
    this._osc({ startFreq: 200, endFreq: 900, freq: 200, type: 'sine',
      vol: 0.22, attack: 0.01, decay: 0.28, delay: 0.02 });
    // Settle into a chord
    this._osc({ freq: 600, type: 'sine', vol: 0.12, attack: 0.05, decay: 0.3, delay: 0.25 });
    this._osc({ freq: 900, type: 'sine', vol: 0.08, attack: 0.05, decay: 0.25, delay: 0.3 });
  }

  /**
   * Panel close — holographic "dissolve"
   * Descending sweep → noise burst fade
   */
  playPanelClose() {
    this._osc({ startFreq: 800, endFreq: 150, freq: 800, type: 'sine',
      vol: 0.2, attack: 0.01, decay: 0.25 });
    this._noise({ centerFreq: 600, Q: 5, vol: 0.12, attack: 0.01, decay: 0.15, delay: 0.15 });
  }

  /**
   * Boot sequence — played during JARVIS initialization
   * Builds up note by note, building tension
   */
  playBoot() {
    if (!this.audioCtx || !this.enabled) return;
    // Low sub-bass rumble building
    this._osc({ freq: 55, type: 'sawtooth', vol: 0.08, attack: 0.2, decay: 3.5 });
    this._osc({ freq: 110, type: 'sine',    vol: 0.05, attack: 0.5, decay: 3.0, delay: 0.3 });

    // Ascending electronic beep sequence
    const steps = [220, 277, 330, 392, 494, 587, 698, 831, 988, 1175];
    steps.forEach((freq, i) => {
      this._osc({ freq, type: 'square', vol: 0.12, attack: 0.01, decay: 0.18, delay: 0.5 + i * 0.28 });
      // Sub-harmonics for richness
      this._osc({ freq: freq / 2, type: 'sine', vol: 0.06, attack: 0.02, decay: 0.2, delay: 0.5 + i * 0.28 });
    });

    // Electrical crackle bursts mid-way
    [1.8, 2.2, 2.7].forEach((d) => {
      this._noise({ centerFreq: 3000, Q: 2, vol: 0.15, decay: 0.06, delay: d });
    });
  }

  /**
   * Boot complete / JARVIS online — triumphant ascending major chord
   * Inspired by the Iron Man arc reactor power-up sound
   */
  playBootComplete() {
    if (!this.audioCtx || !this.enabled) return;
    // Power surge noise
    this._noise({ centerFreq: 800, Q: 3, vol: 0.2, decay: 0.3 });

    // Triumphant rising chord — C major arpeggio
    const chord = [261, 329, 392, 523, 659, 784, 1047];
    chord.forEach((freq, i) => {
      this._osc({ freq, type: 'sine', vol: 0.18, attack: 0.02, decay: 0.8, delay: i * 0.06 });
    });

    // Add sparkle high notes
    this._osc({ freq: 2093, type: 'sine', vol: 0.08, attack: 0.05, decay: 0.6, delay: 0.3 });
    this._osc({ freq: 2637, type: 'sine', vol: 0.05, attack: 0.05, decay: 0.5, delay: 0.45 });

    // Low bass thud
    this._osc({ freq: 65, type: 'sine', vol: 0.25, attack: 0.005, decay: 0.5 });
    this._noise({ centerFreq: 120, Q: 2, vol: 0.15, decay: 0.4 });
  }

  /**
   * Arc reactor power-up — the iconic Iron Man suit startup sound
   * Deep rumble → electric build → power surge → chord
   */
  playReactorPowerUp() {
    if (!this.audioCtx || !this.enabled) return;
    // Sub-bass power hum building from zero
    this._osc({ startFreq: 40, endFreq: 80, freq: 40, type: 'sawtooth',
      vol: 0.3, attack: 0.5, decay: 2.5 });
    this._osc({ startFreq: 80, endFreq: 160, freq: 80, type: 'sine',
      vol: 0.15, attack: 0.8, decay: 2.0, delay: 0.3 });

    // Electrical interference crackles
    [0.6, 0.9, 1.2, 1.5, 1.7].forEach((d) => {
      this._noise({ centerFreq: 2000 + Math.random() * 2000, Q: 3,
        vol: 0.12, decay: 0.05, delay: d });
    });

    // Harmonic stack building
    [1.0, 1.3, 1.6].forEach((d, i) => {
      this._osc({ freq: 110 * (i + 1), type: 'square',
        vol: 0.1, attack: 0.1, decay: 1.0, delay: d });
    });

    // Power surge — rising sweep
    this._osc({ startFreq: 100, endFreq: 1800, freq: 100, type: 'sawtooth',
      vol: 0.2, attack: 0.05, decay: 1.2, delay: 1.8 });

    // Final chord — the "online" confirmation
    const chord = [261, 329, 392, 523];
    chord.forEach((freq, i) => {
      this._osc({ freq, type: 'sine', vol: 0.2, attack: 0.02, decay: 1.0, delay: 2.8 + i * 0.04 });
    });
    this._noise({ centerFreq: 600, Q: 4, vol: 0.15, decay: 0.3, delay: 2.8 });
  }

  /**
   * HUD scan — ascending frequency sweep with metallic resonance
   * Used for scanning effects and transitions
   */
  playScan() {
    this._osc({ startFreq: 180, endFreq: 2200, freq: 180, type: 'sine',
      vol: 0.18, attack: 0.01, decay: 0.65 });
    // Harmonics make it feel more electronic
    this._osc({ startFreq: 360, endFreq: 4400, freq: 360, type: 'sine',
      vol: 0.08, attack: 0.01, decay: 0.55, delay: 0.02 });
    this._noise({ centerFreq: 1200, Q: 10, vol: 0.1, decay: 0.5, delay: 0.1 });
  }

  /**
   * Alert / warning — sharp double-pulse
   * Like the Iron Man HUD alert system
   */
  playAlert() {
    this._osc({ freq: 880, type: 'square', vol: 0.25, attack: 0.005, decay: 0.14 });
    this._osc({ freq: 660, type: 'square', vol: 0.2,  attack: 0.005, decay: 0.12, delay: 0.02 });
    this._osc({ freq: 880, type: 'square', vol: 0.25, attack: 0.005, decay: 0.14, delay: 0.28 });
    this._osc({ freq: 660, type: 'square', vol: 0.2,  attack: 0.005, decay: 0.12, delay: 0.30 });
  }

  /**
   * Success confirmation — clean ascending three-note chime
   */
  playSuccess() {
    this._osc({ freq: 523, type: 'sine', vol: 0.2, attack: 0.01, decay: 0.3 });
    this._osc({ freq: 659, type: 'sine', vol: 0.2, attack: 0.01, decay: 0.3, delay: 0.12 });
    this._osc({ freq: 784, type: 'sine', vol: 0.2, attack: 0.01, decay: 0.4, delay: 0.24 });
    this._noise({ centerFreq: 3000, Q: 8, vol: 0.06, decay: 0.1, delay: 0.35 });
  }

  /**
   * Data transmission — rapid electronic chatter
   */
  playDataStream() {
    for (let i = 0; i < 6; i++) {
      const freq = 800 + Math.random() * 1200;
      this._osc({ freq, type: 'square', vol: 0.07, attack: 0.002, decay: 0.04, delay: i * 0.05 });
    }
  }

  /**
   * JARVIS activation — three rising resonant tones
   * Plays when the JARVIS chat opens
   */
  playJarvisActivate() {
    this._osc({ freq: 440, type: 'sine', vol: 0.15, attack: 0.02, decay: 0.25 });
    this._osc({ freq: 587, type: 'sine', vol: 0.15, attack: 0.02, decay: 0.25, delay: 0.15 });
    this._osc({ freq: 784, type: 'sine', vol: 0.15, attack: 0.02, decay: 0.35, delay: 0.30 });
    this._noise({ centerFreq: 2000, Q: 6, vol: 0.08, decay: 0.15, delay: 0.4 });
  }

  /**
   * Start arc reactor ambient hum — subtle continuous background tone
   * Very quiet; gives the HUD an "alive" feeling
   */
  startAmbientHum() {
    if (!this.audioCtx || !this.enabled || this.ambientOsc) return;
    this._resume();
    const ctx = this.audioCtx;

    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.value = 0;
    this.ambientGain.connect(this.masterGain);

    // 40 Hz sine — sub-bass reactor drone
    this.ambientOsc = ctx.createOscillator();
    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.value = 40;

    // LFO for slow pulse (0.2 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.2;
    lfoGain.gain.value = 0.008;
    lfo.connect(lfoGain);
    lfoGain.connect(this.ambientGain.gain);

    this.ambientOsc.connect(this.ambientGain);
    this.ambientOsc.start();
    lfo.start();

    // Fade in gently
    this.ambientGain.gain.setTargetAtTime(0.04, ctx.currentTime, 2.0);
  }

  stopAmbientHum() {
    if (!this.ambientOsc || !this.audioCtx) return;
    this.ambientGain?.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.5);
    setTimeout(() => {
      try { this.ambientOsc?.stop(); } catch { /* already stopped */ }
      this.ambientOsc = null;
    }, 1500);
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
