var frequencies = [
  [[697,1209],[697,1336],[697,1477]],
  [[770,1209],[770,1336],[770,1477]],
  [[852,1209],[852,1336],[852,1477]],
  [[941,1209],[941,1336],[941,1477]],
]

window.audioCtx1 = null;
window.audioCtx2 = null;

const playOscillator1 = async (frequency, type = 'triangle') => {
  if (window.audioCtx1) {
    await window.audioCtx1.close();
  }
  window.audioCtx1 = new(window.AudioContext || window.webkitAudioContext)();
  window.oscillator1 = window.audioCtx1.createOscillator();
  
  window.oscillator1.type = type;
  window.oscillator1.frequency.value = frequency; // value in hertz
  window.volume1 = window.audioCtx1.createGain();
  window.volume1.connect(window.audioCtx1.destination);
  window.volume1.gain.value = 1;
  window.oscillator1.connect(window.volume1);
  window.oscillator1.start();
}

const playOscillator2 = async (frequency, type = 'triangle') => {
  if (window.audioCtx2) {
    await window.audioCtx2.close();
  }
  
  window.audioCtx2 = new(window.AudioContext || window.webkitAudioContext)();
  window.oscillator2 = window.audioCtx2.createOscillator();

  window.oscillator2.type = type;
  window.oscillator2.frequency.value = frequency; // value in hertz
  window.volume2 = window.audioCtx2.createGain();
  window.volume2.connect(window.audioCtx2.destination);
  window.volume2.gain.value = 1;
  window.oscillator2.connect(window.volume2);
  window.oscillator2.start();
}

const stopOscillators = async () => {
  window.oscillator1.stop();
  await window.audioCtx1.close();
  window.audioCtx1 = null;
  window.volume1 = null;
  window.oscillator2.stop();
  await window.audioCtx2.close();
  window.audioCtx2 = null;
  window.volume2 = null;
}

const main = () => {
  const buttons = document.querySelectorAll('.button');
  
  // Apply handler
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mousedown', startSound, true);
    buttons[i].addEventListener('mouseup', stopSound, true);
  }
  
  document.addEventListener('keyup', () => {
    stopSound();
  }, true);
  
  document.addEventListener('keydown', (e) => {
    if (e.repeat) {
      return;
    }
    const isDigit = /Digit/.test(e.code);
    const isNumpad = /Numpad/.test(e.code);
    
    if (isDigit) {
      playSound(`btn-${e.code.split(/Digit/)[1]}`);
    } else if (isNumpad) {
      playSound(`btn-${e.code.split(/Numpad/)[1]}`);
    } else {
      console.log(e.code);
    }
  }, true);
};

const startSound = (e) => {
  const id = e.target.getAttribute('id');
  
  playSound(id);
}

const playSound = (id) => {
  let frequency1 = null;
  let frequency2 = null;
  
  if (id === 'btn-asterisk') {
    frequency1 = frequencies[3][0][0]
    frequency2 = frequencies[3][0][1]
  } else if (id === 'btn-0') {
    frequency1 = frequencies[3][1][0]
    frequency2 = frequencies[3][1][1]
  } else if (id === 'btn-hash') {
    frequency1 = frequencies[3][2][0]
    frequency2 = frequencies[3][2][1]    
  } else {
    let number = id.split('-')[1];
    let y = Math.floor((number - 1) / 3);
    let x = (number - 1) % 3;
    frequency1 = frequencies[y][x][0];
    frequency2 = frequencies[y][x][1];
  }
  
  playOscillator1(frequency1);
  playOscillator2(frequency2);
}

const stopSound = () => {
  stopOscillators();
}

window.addEventListener('load', main);