// Iron Man HUD Sound Engine
// Uses Web Audio API to generate UI sounds programmatically - no external files needed

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.enabled = false;
    this._initialized = false;
  }

  init() {
    if (this._initialized) return;
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = 0.35;
      this.masterGain.connect(this.audioCtx.destination);
      this._initialized = true;
      this.enabled = true;
    } catch (e) {
      // Audio not supported, silently fail
    }
  }

  _resume() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  _playTone({ freq = 440, duration = 0.1, volume = 0.3, type = 'sine', delay = 0, rampFreq = null }) {
    if (!this.audioCtx || !this.enabled) return;
    this._resume();
    const t = this.audioCtx.currentTime + delay;

    const osc = this.audioCtx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (rampFreq !== null) {
      osc.frequency.linearRampToValueAtTime(rampFreq, t + duration);
    }

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  toggle() {
    if (!this._initialized) this.init();
    this.enabled = !this.enabled;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.enabled ? 0.35 : 0, this.audioCtx.currentTime, 0.1);
    }
    return this.enabled;
  }

  enable() {
    if (!this._initialized) this.init();
    this.enabled = true;
  }

  // === UI Sounds ===

  playClick() {
    this._playTone({ freq: 1400, duration: 0.06, volume: 0.25, type: 'square' });
    this._playTone({ freq: 900, duration: 0.04, volume: 0.15, type: 'square', delay: 0.04 });
  }

  playHover() {
    this._playTone({ freq: 800, duration: 0.05, volume: 0.1, type: 'sine' });
  }

  playPanelOpen() {
    [0, 0.07, 0.14, 0.21].forEach((delay, i) => {
      this._playTone({ freq: 300 + i * 150, duration: 0.12, volume: 0.2, type: 'sine', delay });
    });
  }

  playPanelClose() {
    [0, 0.07, 0.14].forEach((delay, i) => {
      this._playTone({ freq: 750 - i * 150, duration: 0.12, volume: 0.2, type: 'sine', delay });
    });
  }

  playBoot() {
    const notes = [200, 280, 360, 480, 600, 750, 920, 1100, 1350];
    notes.forEach((freq, i) => {
      this._playTone({ freq, duration: 0.18, volume: 0.25, type: 'sine', delay: i * 0.22 });
    });
  }

  playBootComplete() {
    const chord = [523, 659, 784, 1047];
    chord.forEach((freq, i) => {
      this._playTone({ freq, duration: 0.6, volume: 0.2, type: 'sine', delay: i * 0.05 });
    });
  }

  playScan() {
    this._playTone({ freq: 200, duration: 0.6, volume: 0.18, type: 'sine', rampFreq: 1200 });
  }

  playAlert() {
    this._playTone({ freq: 880, duration: 0.15, volume: 0.35, type: 'square' });
    this._playTone({ freq: 880, duration: 0.15, volume: 0.35, type: 'square', delay: 0.25 });
  }

  playSuccess() {
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      this._playTone({ freq, duration: 0.25, volume: 0.22, type: 'sine', delay: i * 0.12 });
    });
  }

  playDataStream() {
    for (let i = 0; i < 5; i++) {
      const freq = 600 + Math.random() * 400;
      this._playTone({ freq, duration: 0.04, volume: 0.1, type: 'square', delay: i * 0.06 });
    }
  }

  playPowerUp() {
    this._playTone({ freq: 80, duration: 1.5, volume: 0.3, type: 'sine', rampFreq: 800 });
    this._playTone({ freq: 120, duration: 1.2, volume: 0.2, type: 'sine', rampFreq: 600, delay: 0.2 });
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
