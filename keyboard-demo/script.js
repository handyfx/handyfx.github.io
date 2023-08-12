const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input"),
    octavesCheckbox = document.querySelector(".octaves-checkbox input"),
    notationSelection = document.querySelector(".notation-selection"),
    tonicSelection = document.querySelector(".tonic-selection");

const notations = {
    'letters': ['C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B', 'C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B'],
    'scale-degree': ['1', '&sharp;1<br>&flat;2', '2', '&sharp;2<br>&flat;3', '3', '4', '&sharp;4<br>&flat;5', '5', '&sharp;5<br>&flat;6', '6', '&sharp;6<br>&flat;7', '7', '8', '&sharp;8<br>&flat;9', '9', '&sharp;9<br>&flat;10', '10', '11', '&sharp;11<br>&flat;12', '12', '&sharp;12<br>&flat;13', '13', '&sharp;13<br>&flat;14', '14'],
    'solfege': ['do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti', 'do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti'],
},
    keys = {
        'C': {
            'letters': ['C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B', 'C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B'],
            'solfege': ['do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti', 'do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti'],
            'scale-degree': ['1', '&sharp;1<br>&flat;2', '2', '&sharp;2<br>&flat;3', '3', '4', '&sharp;4<br>&flat;5', '5', '&sharp;5<br>&flat;6', '6', '&sharp;6<br>&flat;7', '7', '8', '&sharp;8<br>&flat;9', '9', '&sharp;9<br>&flat;10', '10', '11', '&sharp;11<br>&flat;12', '12', '&sharp;12<br>&flat;13', '13', '&sharp;13<br>&flat;14', '14'],
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
    }

let allKeys = [],
    currentTonic = 'C',
    currentNotation = 'letters';

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
    applyNotation();
}

const applyNotation = () => {
    if (currentNotation === 'letters') {
        let counter = 1;
        for (let notation of notations[currentNotation]) {
            let keyId = "#key" + counter + " span";
            document.querySelector(keyId).innerHTML = notation;
            counter++;
        }
    }
    else {
        let counter = 0;
        for (let index=keys[currentTonic].start; index<keys[currentTonic].end + 1; index++) {
            let keyId = "#key" + index + " span";
            document.querySelector(keyId).innerHTML = notations[currentNotation][counter];
            counter++;
        }
    }
}

const handleTonicChange = (event) => {
    currentTonic = event.target.value;

    let start = keys[event.target.value].start,
        end = keys[event.target.value].end;

    for (let index = 1; index < 36; index++) {
        let keyId = "#key" + index;
        if (index < start || index > end) {
            document.querySelector(keyId).classList.add("remove");
        }
        else {
            document.querySelector(keyId).classList.remove("remove");
        }
    }

    applyNotation();
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
document.addEventListener("keydown", pressedKey);