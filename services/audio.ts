// A simple synthesizer for retro sound effects without external assets

class AudioController {
  private ctx: AudioContext | null = null;
  private bgmNodes: AudioScheduledSourceNode[] = [];
  private isMuted: boolean = false;
  private isBGMDue: boolean = false;
  private nextNoteTime: number = 0;
  private tempo: number = 100; // BPM
  private timerID: number | null = null;
  // Simple relaxing pentatonic melody (C major ish)
  private melody = [
    523.25, // C5
    null,
    659.25, // E5
    null,
    783.99, // G5
    523.25, // C5
    587.33, // D5
    null,
    659.25, // E5
    null,
    523.25, // C5
    null,
    392.00, // G4
    null,
    440.00, // A4
    493.88  // B4
  ];
  private currentNoteIndex = 0;

  constructor() {
    try {
      // Defer initialization
    } catch (e) {
      console.error("Audio not supported");
    }
  }

  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private scheduleNote() {
    if (!this.ctx || this.isMuted) return;

    const secondsPerBeat = 60.0 / this.tempo;
    
    // Schedule ahead
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
        this.playNextNote(this.nextNoteTime);
        this.nextNoteTime += secondsPerBeat;
    }
    
    this.timerID = window.setTimeout(() => this.scheduleNote(), 25);
  }

  private playNextNote(time: number) {
      if (!this.ctx) return;

      const freq = this.melody[this.currentNoteIndex];
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

      if (freq) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          
          // Soft triangle wave for relaxing feel
          osc.type = 'triangle';
          osc.frequency.value = freq;
          
          // ADSR Envelope for soft pad/pluck
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.05, time + 0.05); // Attack
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5); // Decay
          
          osc.start(time);
          osc.stop(time + 0.6);
          
          this.bgmNodes.push(osc);
      }
  }

  public playBGM() {
    if (this.isMuted || this.timerID) return; // Already playing or muted
    this.init();
    if (!this.ctx) return;

    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.scheduleNote();
  }

  public stopBGM() {
     if (this.timerID) {
         window.clearTimeout(this.timerID);
         this.timerID = null;
     }
     this.bgmNodes.forEach(n => {
         try { n.stop(); } catch(e){}
     });
     this.bgmNodes = [];
  }

  public playSfx(type: 'click' | 'slurp' | 'jump' | 'error' | 'success' | 'fail' | 'fry' | 'phone') {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    switch (type) {
      case 'click':
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      
      case 'slurp': // Rising sine
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.linearRampToValueAtTime(800, t + 0.2);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
        break;

      case 'jump': // Quick slide up
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.linearRampToValueAtTime(300, t + 0.1);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
        break;

      case 'error': // Buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.linearRampToValueAtTime(80, t + 0.3);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
        break;

      case 'fry': // White noise approximation using random freq mod
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
        osc.start(t);
        osc.stop(t + 0.5);
        break;

      case 'success': // Major arpeggio
        this.playNote(523.25, t, 0.1);
        this.playNote(659.25, t + 0.1, 0.1);
        this.playNote(783.99, t + 0.2, 0.2);
        break;

      case 'fail': // Descending tritone
        this.playNote(400, t, 0.2);
        this.playNote(280, t + 0.2, 0.4);
        break;
      
      case 'phone': // Ringtone
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.setValueAtTime(800, t + 0.05);
        osc.frequency.setValueAtTime(0, t + 0.051); // Silence
        osc.frequency.setValueAtTime(800, t + 0.1);
        osc.frequency.setValueAtTime(800, t + 0.15);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.setValueAtTime(0.1, t + 0.4);
        osc.start(t);
        osc.stop(t + 0.4);
        break;
    }
  }

  private playNote(freq: number, time: number, duration: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
    
    osc.start(time);
    osc.stop(time + duration);
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
        this.stopBGM();
        if (this.ctx) this.ctx.suspend();
    } else {
        if (this.ctx) this.ctx.resume();
        this.playBGM();
    }
  }
}

export const audio = new AudioController();