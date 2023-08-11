const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input"),
    octavesCheckbox = document.querySelector(".octaves-checkbox input"),
    notationSelection = document.querySelector(".notation-selection");

const keys = {
    'c-major': {
        'letters': ['C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B', 'C', 'C&sharp;<br>D&flat;', 'D', 'D&sharp;<br>E&flat;', 'E', 'F', 'F&sharp;<br>G&flat;', 'G', 'G&sharp;<br>A&flat;', 'A', 'A&sharp;<br>B&flat;', 'B'],
        'solfege': ['do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti', 'do', 'di<br>ra', 're', 'ri<br>me', 'mi', 'fa', 'fi<br>re', 'sol', 'si<br>le', 'la', 'li<br>te', 'ti'],
        'scale-degree': ['1', '&sharp;1<br>&flat;2', '2', '&sharp;2<br>&flat;3', '3', '4', '&sharp;4<br>&flat;5', '5', '&sharp;5<br>&flat;6', '6', '&sharp;6<br>&flat;7', '7', '8', '&sharp;8<br>&flat;9', '9', '&sharp;9<br>&flat;10', '10', '11', '&sharp;11<br>&flat;12', '12', '&sharp;12<br>&flat;13', '13', '&sharp;13<br>&flat;14', '14']
    }
}

let allKeys = [];

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
    for (let index=13; index<25; index++) {
        let keyId = "#key" + index;
        document.querySelector(keyId).classList.toggle("remove");
    }
}

const handleNotationChange = (event) => {
    let counter = 1;
    for (let notation of keys['c-major'][event.target.value]) {
        let keyId = "#key" + counter + " span";
        document.querySelector(keyId).innerHTML = notation;
        counter++;
    }
}

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if (allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
octavesCheckbox.addEventListener("click", toggleSecondOctave);
//volumeSlider.addEventListener("input", handleVolume);
notationSelection.addEventListener("change", handleNotationChange);
document.addEventListener("keydown", pressedKey);