<script>
  document.addEventListener("DOMContentLoaded", function () {
    let speech = new SpeechSynthesisUtterance();
    let voices = [];
    let voiceSelect = document.querySelector("select");

    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      speech.voice = voices[0];

      voices.forEach(
        (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
      );
    };

    voiceSelect.addEventListener("change", () => {
      speech.voice = voices[voiceSelect.value];
    });

    document.getElementById("listenButton").addEventListener("click", () => {
      let text = document.getElementById("text").value;
      speech.text = text;
      window.speechSynthesis.speak(speech);
    });

    document.getElementById("downloadButton").addEventListener("click", () => {
      let text = document.getElementById("text").value;
      let blob = new Blob([text], { type: "text/plain" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "audio.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
</script>
