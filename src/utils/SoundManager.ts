export class SoundManager {
  private context: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    try {
      // Support both standard AudioContext and webkit-prefixed version
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.context = new AudioContextClass();
    } catch {
      console.warn("Web Audio API not supported");
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled && this.context?.state === "suspended") {
      this.context.resume();
    }
  }

  // Create a noise buffer for realistic keyboard sounds
  private createNoiseBuffer(duration: number): AudioBuffer | null {
    if (!this.context) return null;

    const bufferSize = this.context.sampleRate * duration;
    const buffer = this.context.createBuffer(
      1,
      bufferSize,
      this.context.sampleRate
    );
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  public playClick() {
    if (!this.enabled || !this.context) return;

    const t = this.context.currentTime;

    // Create a realistic mechanical keyboard click sound
    // Layer 1: High-frequency click (key hitting bottom)
    const osc1 = this.context.createOscillator();
    const gain1 = this.context.createGain();

    osc1.type = "square";
    osc1.frequency.setValueAtTime(1200, t);
    osc1.frequency.exponentialRampToValueAtTime(800, t + 0.01);

    gain1.gain.setValueAtTime(0.15, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc1.connect(gain1);
    gain1.connect(this.context.destination);

    osc1.start(t);
    osc1.stop(t + 0.02);

    // Layer 2: Mid-frequency thunk (key mechanism)
    const osc2 = this.context.createOscillator();
    const gain2 = this.context.createGain();

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(400, t);
    osc2.frequency.exponentialRampToValueAtTime(200, t + 0.03);

    gain2.gain.setValueAtTime(0.1, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc2.connect(gain2);
    gain2.connect(this.context.destination);

    osc2.start(t);
    osc2.stop(t + 0.03);

    // Layer 3: Noise burst (plastic/metal contact)
    const noiseBuffer = this.createNoiseBuffer(0.015);
    if (noiseBuffer) {
      const noise = this.context.createBufferSource();
      const noiseGain = this.context.createGain();
      const noiseFilter = this.context.createBiquadFilter();

      noise.buffer = noiseBuffer;
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(3000, t);
      noiseFilter.Q.setValueAtTime(1, t);

      noiseGain.gain.setValueAtTime(0.08, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.context.destination);

      noise.start(t);
      noise.stop(t + 0.015);
    }
  }

  public playError() {
    if (!this.enabled || !this.context) return;

    const t = this.context.currentTime;

    // Create a harsh, dissonant mistype sound
    // Layer 1: Dissonant low frequency (wrong key)
    const osc1 = this.context.createOscillator();
    const gain1 = this.context.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(180, t);
    osc1.frequency.exponentialRampToValueAtTime(80, t + 0.08);

    gain1.gain.setValueAtTime(0.2, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc1.connect(gain1);
    gain1.connect(this.context.destination);

    osc1.start(t);
    osc1.stop(t + 0.08);

    // Layer 2: Harsh high frequency (error indication)
    const osc2 = this.context.createOscillator();
    const gain2 = this.context.createGain();

    osc2.type = "square";
    osc2.frequency.setValueAtTime(850, t);
    osc2.frequency.exponentialRampToValueAtTime(400, t + 0.05);

    gain2.gain.setValueAtTime(0.15, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc2.connect(gain2);
    gain2.connect(this.context.destination);

    osc2.start(t);
    osc2.stop(t + 0.05);

    // Layer 3: Noise burst (harsh impact)
    const noiseBuffer = this.createNoiseBuffer(0.04);
    if (noiseBuffer) {
      const noise = this.context.createBufferSource();
      const noiseGain = this.context.createGain();
      const noiseFilter = this.context.createBiquadFilter();

      noise.buffer = noiseBuffer;
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(2000, t);
      noiseFilter.Q.setValueAtTime(0.5, t);

      noiseGain.gain.setValueAtTime(0.12, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.context.destination);

      noise.start(t);
      noise.stop(t + 0.04);
    }
  }
}

export const soundManager = new SoundManager();
