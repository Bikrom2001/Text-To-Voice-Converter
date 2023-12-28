let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");
let listenButton = document.getElementById("listenButton");
let saveButton = document.getElementById("saveButton");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

listenButton.addEventListener("click", () => {
  speech.text = document.getElementById("textInput").value;
  window.speechSynthesis.speak(speech);
});

saveButton.addEventListener("click", () => {
  const textToSave = document.getElementById("textInput").value;
  const blob = new Blob([textToSave], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "textToSpeech.txt";
  a.click();
});
