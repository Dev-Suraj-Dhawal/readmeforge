// Futuristic Web Audio Synthesizer for ReadmeForge
// Zero external audio files, 0ms latency, 100% lightweight procedural sound synthesis

class CyberAudioEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    try {
      const saved = localStorage.getItem('readmeforge_sound_enabled');
      if (saved !== null) {
        this.isEnabled = saved === 'true';
      }
    } catch (e) {
      this.isEnabled = true;
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    try {
      localStorage.setItem('readmeforge_sound_enabled', String(this.isEnabled));
    } catch (e) {}
    if (this.isEnabled) {
      this.playSuccess();
    }
    return this.isEnabled;
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  // Snappy sci-fi click blip
  public playClick() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch (e) {}
  }

  // Futuristic tab switch laser
  public playSwitch() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.065);
    } catch (e) {}
  }

  // Celebratory triad chime (C5 -> E5 -> G5)
  public playSuccess() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.07, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.19);
      });
    } catch (e) {}
  }

  // Cyber aesthetic chord harmonizer
  public playHarmonize() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const chord = [330, 440, 554.37, 660]; // A major 9th sci-fi stack
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      });
    } catch (e) {}
  }
}

export const cyberAudio = new CyberAudioEngine();

