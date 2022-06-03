let audioCtx: AudioContext = new window.AudioContext();

export class CustomOscillator {
  public state = 0;
  private oscillator: OscillatorNode;
  private gain: GainNode;
  private frequency: number;
  private type: OscillatorType;

  constructor(frequency: number, type: OscillatorType) {
    this.frequency = frequency;
    this.type = type;
    this.oscillator = audioCtx.createOscillator();
    this.gain = audioCtx.createGain();
    this.oscillator.connect(this.gain);
    this.gain.connect(audioCtx.destination);
    this.oscillator.type = this.type;
    this.oscillator.frequency.value = this.frequency;
  }

  public start() {
    if (this.state == 0) {
      this.oscillator.start();
      this.state = 1;
    }
  }

  public stop() {
    if (this.state == 1) {
      this.oscillator.stop();
      this.state = 0;
    }
  }
}