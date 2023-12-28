let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button.listen").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.cancel(); // Önceki konuşmayı iptal et
  window.speechSynthesis.speak(speech);
});

document.querySelector("button.save").addEventListener("click", () => {
  let textToSave = document.querySelector("textarea").value;
  let blob = new Blob([textToSave], { type: "text/plain" });
  let anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = "text_to_speech.txt";
  anchor.click();
});
