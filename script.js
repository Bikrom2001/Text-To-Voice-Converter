let speech = new SpeechSynthesisUtterance();
let voices = window.speechSynthesis.getVoices();

// Ses seçimi için bir <select> elementi
let voiceSelect = document.getElementById("voiceSelect");

// Textarea elementi
let textArea = document.getElementById("text");

// Ses değiştirildiğinde event listener
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  voiceSelect.innerHTML = ""; // Mevcut seçenekleri temizle

  voices.forEach((voice, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
  });

  // Default sesi ayarla
  speech.voice = voices[0];
};

// Ses seçimi değiştiğinde event listener
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Listen butonu için event listener
document.getElementById("listenButton").addEventListener("click", () => {
  speech.text = textArea.value;
  window.speechSynthesis.speak(speech);
});

// Save butonu için event listener
document.getElementById("saveButton").addEventListener("click", () => {
  const textToSave = textArea.value;
  const blob = new Blob([textToSave], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "textToSpeech.txt";
  a.click();
});
