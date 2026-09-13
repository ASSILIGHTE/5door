// Audio Manager supporting both HTML5 Audio (/music.mp3) and Web Audio API Synthesizer fallback
class AudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.audioContext = null;
    this.synthGainNode = null;
    this.isSynthPlaying = false;
    this.synthOscillators = [];
  }

  init(src = '/music.mp3') {
    if (this.audio) return;
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0.5;
    
    // Handle error by switching to Web Audio API synthesizer fallback
    this.audio.addEventListener('error', () => {
      console.warn('Audio file failed to load, using romantic synth fallback.');
    });
  }

  play() {
    if (this.isPlaying) return;
    
    if (!this.audio) {
      this.init();
    }

    // Try HTML5 Audio first
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((err) => {
        console.warn('HTML5 audio play blocked or failed. Starting romantic synth sound generator.', err);
        this.startSynth();
        this.isPlaying = true;
      });
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynth();
    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    if (this.audio) {
      this.audio.volume = val;
    }
    if (this.synthGainNode) {
      this.synthGainNode.gain.setValueAtTime(val * 0.15, this.audioContext?.currentTime || 0);
    }
  }

  // Web Audio API romantic ambient generator for backup
  startSynth() {
    if (this.isSynthPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      this.audioContext = new AudioCtx();
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.synthGainNode = this.audioContext.createGain();
      this.synthGainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      this.synthGainNode.connect(this.audioContext.destination);

      // Warm romantic chord (F#m7 / Dmaj7 notes: C#4, F#4, A4, C#5)
      const freqs = [277.18, 369.99, 440.00, 554.37];
      this.synthOscillators = freqs.map((f, i) => {
        const osc = this.audioContext.createOscillator();
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = f;

        // Gentle pitch vibrato for warmth
        lfo.frequency.value = 0.2 + i * 0.05;
        lfoGain.gain.value = 1.5;
        lfo.connect(osc.frequency);
        lfo.start();

        osc.connect(this.synthGainNode);
        osc.start();
        return osc;
      });

      this.isSynthPlaying = true;
    } catch (e) {
      console.error('Web Audio Synth failed:', e);
    }
  }

  stopSynth() {
    if (!this.isSynthPlaying) return;
    try {
      this.synthOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      this.synthOscillators = [];
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }
      this.isSynthPlaying = false;
    } catch (e) {
      console.error('Error stopping synth:', e);
    }
  }
}

export const audioManager = new AudioManager();
