import { CustomOscillator } from './CustomOscillator.js';
export class PhoneOscillator {
    constructor(btn, type) {
        this.btn = btn;
        this.type = type;
        this.frequencies = [
            [[697, 1209], [697, 1336], [697, 1477]],
            [[770, 1209], [770, 1336], [770, 1477]],
            [[852, 1209], [852, 1336], [852, 1477]],
            [[941, 1209], [941, 1336], [941, 1477]],
        ];
        let [frequency1, frequency2] = this.getFrequencies();
        this.oscillator1 = new CustomOscillator(frequency1, type);
        this.oscillator2 = new CustomOscillator(frequency2, type);
    }
    getFrequencies() {
        let frequency1 = null;
        let frequency2 = null;
        if (this.btn === '*') {
            frequency1 = this.frequencies[3][0][0];
            frequency2 = this.frequencies[3][0][1];
        }
        else if (this.btn === '0') {
            frequency1 = this.frequencies[3][1][0];
            frequency2 = this.frequencies[3][1][1];
        }
        else if (this.btn === '#') {
            frequency1 = this.frequencies[3][2][0];
            frequency2 = this.frequencies[3][2][1];
        }
        else {
            let number = parseInt(this.btn);
            let y = Math.floor((number - 1) / 3);
            let x = (number - 1) % 3;
            frequency1 = this.frequencies[y][x][0];
            frequency2 = this.frequencies[y][x][1];
        }
        return [frequency1, frequency2];
    }
    static isBtn(btn) {
        return /^(#|\*|\d)$/.test(btn);
    }
    start() {
        this.oscillator1.start();
        this.oscillator2.start();
    }
    stop() {
        this.oscillator1.stop();
        this.oscillator2.stop();
    }
}
