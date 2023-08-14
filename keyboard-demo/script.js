const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input"),
    octavesCheckbox = document.querySelector(".octaves-checkbox input"),
    notationSelection = document.querySelector(".notation-selection"),
    scaleSelection = document.querySelector(".scale-selection"),
    tonicSelection = document.querySelector(".tonic-selection");

const notations = {
    'letters': ['C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B', 'C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B', 'C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;'],
    'scale-degree': ['1', '&sharp;1<br>&flat;2', '2', '&sharp;2<br>&flat;3', '3', '4', '&sharp;4<br>&flat;5', '5', '&sharp;5<br>&flat;6', '6', '&sharp;6<br>&flat;7', '7', '1', '&sharp;1<br>&flat;2', '2', '&sharp;2<br>&flat;3', '3', '4', '&sharp;4<br>&flat;5', '5', '&sharp;5<br>&flat;6', '6', '&sharp;6<br>&flat;7', '7'],
    'solfege': ['do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti', 'do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti'],
},
    keys = {
        'C': {
            'start': 1,
            'end': 24
        },
        'G': {
            'start': 8,
            'end': 31
        },
        'D': {
            'start': 3,
            'end': 26
        },
        'A': {
            'start': 10,
            'end': 33
        },
        'E': {
            'start': 5,
            'end': 28
        },
        'B': {
            'start': 12,
            'end': 35
        },
        'F#': {
            'start': 7,
            'end': 30
        },
        'F': {
            'start': 6,
            'end': 29
        },
        'Bb': {
            'start': 11,
            'end': 34
        },
        'Eb': {
            'start': 4,
            'end': 27
        },
        'Ab': {
            'start': 9,
            'end': 32
        },
        'Db': {
            'start': 2,
            'end': 25
        },
        'Gb': {
            'start': 7,
            'end': 30
        }
    },
    scales = {
        // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
        // 1   2   3 4   5   6    7  1     2     3  4     5     6     7  1
        'none': [],
        'major-pentatonic': [0, 2, 4, 7, 9, 12, 14, 16, 19, 21],
        'minor-pentatonic': [0, 3, 5, 7, 10, 12, 15, 17, 19, 22],
        'natural-minor': [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22],
        'harmonic-minor': [0, 2, 3, 5, 7, 8, 11, 12, 14, 15, 17, 19, 20, 23],
        'melodic-minor': [0, 2, 3, 5, 7, 9, 11, 12, 14, 15, 17, 19, 21, 23],
        'ionian': [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23],
        'dorian': [0, 2, 3, 5, 7, 9, 10, 12, 14, 15, 17, 19, 21, 22],
        'phrygian': [0, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22],
        'lydian': [0, 2, 4, 6, 7, 9, 11, 12, 14, 16, 18, 19, 21, 23],
        'mixolydian': [0, 2, 4, 5, 7, 9, 10, 12, 14, 16, 17, 19, 21, 22],
        'aeolian': [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22],
        'locrian': [0, 1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22],
        'blues': [0, 3, 5, 6, 7, 10, 12, 15, 17, 18, 19, 22],
        'bebop-major': [0, 2, 4, 5, 7, 8, 9, 11, 12, 14, 16, 17, 19, 20, 21, 23],
        'bebop-dominant': [0, 2, 4, 5, 7, 9, 10, 11, 12, 14, 16, 17, 19, 21, 22, 23],
        'diminished': [0, 2, 3, 5, 6, 8, 9, 10, 12, 14, 15, 17, 18, 20, 21, 22],
        'acoustic': [0, 2, 4, 6, 7, 9, 10, 12, 14, 16, 18, 19, 21, 22],
        'double-harmonic-major': [0, 1, 4, 5, 7, 8, 11, 12, 13, 16, 17, 19, 20, 23],
        'superlocrian': [0, 1, 3, 4, 6, 8, 10, 12, 13, 15, 16, 18, 20, 22],
    };

let allKeys = [],
    currentTonic = 'C',
    currentNotation = 'letters',
    currentScale = 'none';

const synth = new Tone.Synth().toDestination();

const playTune = (key) => {

    // trigger the attack immediately
    synth.triggerAttack(key);

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element

    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
        synth.triggerRelease();
    }, 250);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("mousedown", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    //audio.volume = e.target.value; // passing the range slider value as an audio volume
    // synth.volume = (-10 + (e.target.value * 10));
    console.log(-10 + e.target.value * 10);
    var vol = new Tone.Volume(-10 + (e.target.value * 10));
    synth.chain(vol, Tone.Master);
}

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const toggleSecondOctave = () => {
    for (let index = 13; index < 25; index++) {
        let keyId = "#key" + index;
        document.querySelector(keyId).classList.toggle("remove");
    }
}

const handleNotationChange = (event) => {
    currentNotation = event.target.value;
    refreshDisplay();
}

const applyNotation = () => {
    if (currentNotation === 'letters') {
        let counter = 1;
        for (let index = 0; index < notations['letters'].length; index++) {
            let keyId = "#key" + counter + " span";
            document.querySelector(keyId).innerHTML = notations['letters'][counter - 1];
            counter++;
        }
    }
    else {
        let counter = 0;
        for (let index = keys[currentTonic].start; index < keys[currentTonic].end + 1; index++) {
            let keyId = "#key" + index + " span";
            document.querySelector(keyId).innerHTML = notations[currentNotation][counter];
            counter++;
        }
    }
}

const handleTonicChange = (event) => {
    currentTonic = event.target.value;
    refreshDisplay();
}

const applyTonic = () => {
    let start = keys[currentTonic].start,
        end = keys[currentTonic].end;

    for (let index = 1; index < 36; index++) {
        let keyId = "#key" + index;
        if (index < start || index > end) {
            document.querySelector(keyId).classList.add("remove");
        }
        else {
            document.querySelector(keyId).classList.remove("remove");
        }
    }
}

const handleScaleChange = (event) => {
    currentScale = event.target.value;
    refreshDisplay();
}

const applyScale = () => {
    removeScale();
    for (let index = 0; index < scales[currentScale].length; index++) {
        let keyId = "#key" + (0 + keys[currentTonic].start + scales[currentScale][index]);
        document.querySelector(keyId).classList.add("scale-member");
    }
}

const removeScale = () => {
    pianoKeys.forEach(key => {
        key.classList.remove("scale-member");
    });
}

const refreshDisplay = () => {
    applyNotation();
    applyTonic();
    applyScale();
}

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if (allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
octavesCheckbox.addEventListener("click", toggleSecondOctave);
//volumeSlider.addEventListener("input", handleVolume);
notationSelection.addEventListener("change", handleNotationChange);
tonicSelection.addEventListener("change", handleTonicChange);
scaleSelection.addEventListener("change", handleScaleChange);
document.addEventListener("keydown", pressedKey);

refreshDisplay();