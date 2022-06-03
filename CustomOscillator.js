let audioCtx = new window.AudioContext();
export class CustomOscillator {
    constructor(frequency, type) {
        this.state = 0;
        this.frequency = frequency;
        this.type = type;
        this.oscillator = audioCtx.createOscillator();
        this.gain = audioCtx.createGain();
        this.oscillator.connect(this.gain);
        this.gain.connect(audioCtx.destination);
        this.oscillator.type = this.type;
        this.oscillator.frequency.value = this.frequency;
    }
    start() {
        if (this.state == 0) {
            this.oscillator.start();
            this.state = 1;
        }
    }
    stop() {
        if (this.state == 1) {
            this.oscillator.stop();
            this.state = 0;
        }
    }
}
