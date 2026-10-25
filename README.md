# 3 Yapay Zekânın Yaptığı 3D Araba Yarışı Oyunları

Kısayol kanalındaki "3 Yapay Zekâya Aynı Cümleyle Araba Yarışı Oyunu Yaptırdım" videosunun oyunları. Üç yapay zekâya aynı istem verildi, hiçbir düzeltme yapılmadı. Dosyalar yapay zekâların bıraktığı hâliyle duruyor.

| Klasör | Yapan | Oyun | Not |
|---|---|---|---|
| `chatgpt/` | ChatGPT (GPT-6.1-Sol, Codex) | Solstis · Kıyı Pisti | Kütüphanesiz WebGL, internetsiz çalışır |
| `gemini/` | Gemini (Gemini 4 Argon, Antigravity) | Anadolu GP | Tek dosya, kütüphanesiz WebGL, internetsiz çalışır |
| `claude/` | Claude (Opus 5.5, Claude Code) | 3D Araba Yarışı | Tek dosya, three.js'i internetten yükler |

## Nasıl oynanır

Klasördeki `index.html` dosyasına çift tıkla, tarayıcıda açılır. Ok tuşları ya da WASD ile sür. Üç tur at, sonuç ekranından yeniden başla.

## Kullanılan istem

```
Bu klasörde tarayıcıda oynanan 3D bir araba yarışı oyunu yap.

- Oyuncu klavyeyle (ok tuşları ya da WASD) bir arabayı sürer: gaz, fren/geri, sağa ve sola dönüş.
- Kapalı bir pist olsun. Araba pistin dışına çıkamasın ya da çıkınca belirgin biçimde yavaşlasın.
- Başlangıç/bitiş çizgisi görünsün. Yarış 3 tur sürsün. Tur sayısı, toplam süre ve tur süreleri ekranda görünsün. Pisti kesip kısa yoldan geçilen tur sayılmasın.
- 3 tur bitince sonuç ekranı çıksın ve yarış yeniden başlatılabilsin.
- Kamera arabayı arkadan takip etsin.
- Ekrandaki bütün yazılar Türkçe olsun.
- Oyun, index.html dosyası tarayıcıda açılarak oynanabilsin. İstediğin kütüphaneyi kullanabilirsin.

Bitirince oyunun nasıl açılıp oynandığını tek paragrafta yaz.
```

## Sonuç

Üçü de 12 maddelik kontrol listesinin 12'sini geçti. Kör görünüş sıralamasıyla Kısayol Puanı: Gemini 10, Claude 9, ChatGPT 8.
