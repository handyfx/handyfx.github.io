const keySignatures = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
const modes = ['Ionian'];
const chordLibrary = {
    'Ionian': ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
}

function generateProgression() {
    const key = keySignatures[Math.floor(Math.random() * keySignatures.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    const modalChords = chordLibrary[mode];
    const chordOne = modalChords[Math.floor(Math.random() * modalChords.length)];
    const chordTwo = modalChords[Math.floor(Math.random() * modalChords.length)];
    const chordThree = modalChords[Math.floor(Math.random() * modalChords.length)];
    const chordFour = modalChords[Math.floor(Math.random() * modalChords.length)];
    
    $('#key').text(key);
    $('#mode').text(mode);
    $('#progression').text(chordOne + ' - ' + chordTwo + ' - ' + chordThree + ' - ' + chordFour);
}