import { PhoneOscillator } from './PhoneOscillator.js';
const main = () => {
    const buttons = document.querySelectorAll('.button');
    // Apply handler
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('mousedown', startSound);
        buttons[i].addEventListener('touchstart', startSound);
    }
    document.addEventListener('keydown', keyboardHandler);
};
const keyboardHandler = (e) => {
    if (e.repeat) {
        return;
    }
    if (!PhoneOscillator.isBtn(e.key)) {
        return;
    }
    let oscillator = new PhoneOscillator(e.key, 'triangle');
    oscillator.start();
    const target = e.target;
    if (!(target instanceof HTMLElement)) {
        return;
    }
    target.addEventListener('keyup', (e2) => {
        if (e2.code === e.code) {
            oscillator.stop();
        }
    });
};
const startSound = (e) => {
    var _a;
    let target = e.target;
    // check if target is a span
    if (target instanceof HTMLSpanElement) {
        if (target.parentElement instanceof HTMLDivElement) {
            target = target.parentElement;
        }
        else {
            return;
        }
    }
    const id = target.getAttribute('id');
    if (typeof id !== 'string' || !id.startsWith('btn-')) {
        return;
    }
    const phoneBtn = id.split('-')[1];
    if (!PhoneOscillator.isBtn(phoneBtn)) {
        return;
    }
    let oscillator = new PhoneOscillator(phoneBtn, 'triangle');
    oscillator.start();
    if (e instanceof MouseEvent) {
        (_a = e.target) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseup', () => {
            oscillator.stop();
        }, true);
    }
    if (e instanceof TouchEvent) {
        ['touchcancel', 'touchend'].forEach((eventName) => {
            var _a;
            (_a = e.target) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, () => {
                setTimeout(() => {
                    oscillator.stop();
                }, 100);
            }, true);
        });
    }
};
window.addEventListener('load', main);
