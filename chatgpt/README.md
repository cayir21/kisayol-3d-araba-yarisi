# Solstis — Kıyı Pisti

`index.html` dosyasını modern bir tarayıcıda aç ve **Motora Hayat Ver** düğmesine bas. İnternet, paket kurulumu veya sunucu gerekmez; WebGL açık olmalıdır.

- **W / ↑:** Gaz
- **S / ↓:** Fren; durduktan sonra geri
- **A, D / ←, →:** Direksiyon
- **P:** Duraklat / devam et
- **F:** Tam ekran
- **Enter:** Başlangıç veya sonuç ekranından yarışa başla

Saat yönündeki kapalı pistte 3 tur tamamla. Virajdan önce frenle; çim hızını düşürür, bariyerler pist dışına çıkmayı önler. Tur sayımı sıralı kontrol noktaları ve yönlü ilerleme ile doğrulanır. Tur ve toplam süreler sağ üstte görünür. Yarış sonunda **Bir Daha Yarış** ile yeniden başlayabilirsin.

## Kontrol

`node tests/game.test.cjs` sürüş ve yarış mantığını, çizim API'si için bir test taklidi kullanarak çalıştırır. Testte üç tur gerçek fizik ve klavye olayları ile sürülür; ayrıca geri geçiş, bariyer, çim, duraklatma ve sıfırlama kontrol edilir. `output/test-results.json` sonuçları içerir. Bu test gerçek tarayıcı/GPU doğrulaması değildir. Tarayıcı çalıştırma kısıtları ve görsel önizlemenin kapsamı `progress.md` içinde kayıtlıdır.
