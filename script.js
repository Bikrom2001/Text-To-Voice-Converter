const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');

const port = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
  const text = req.query.text || 'Hello, World!'; // Varsayılan metin

  // Google Cloud Text-to-Speech API'yi kullanarak metni MP3 dosyasına dönüştür
  const client = new textToSpeech.TextToSpeechClient();
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  });

  // MP3 dosyasını oluştur
  const filePath = path.join(__dirname, 'public', 'audio.mp3');
  fs.writeFileSync(filePath, response.audioContent, 'binary');

  // MP3 dosyasını kullanıcıya indirme seçeneği olarak gönder
  res.download(filePath, 'audio.mp3', (err) => {
    // Dosyayı sildikten sonra temizle
    fs.unlinkSync(filePath);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
