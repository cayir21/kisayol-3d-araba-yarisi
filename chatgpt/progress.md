Original prompt: Bu klasörde tarayıcıda oynanan 3D bir araba yarışı oyunu yap. Klavye ok/WASD, gaz/fren/geri/dönüş, kapalı pist, sınır/yavaşlama, başlangıç çizgisi, kestirmesiz 3 tur, toplam ve tur süreleri, sonuç ve yeniden başlatma, takip kamera, tamamen Türkçe, index.html ile açılış. Sonunda tek paragraf kullanım anlatımı.

- Boş klasör. Dış bağımlılıksız WebGL motoru seçildi; file:// ile çevrimdışı çalışacak.
- Plan: geometrik kıyı pisti, fiziksel sınırlar ve sıralı kontrol noktaları; deterministik test kancaları ve Playwright kontrolleri.
- İlk uygulama: dış bağımlılıksız WebGL, 3D araba/pist/palmiye/tribünler, Türkçe arayüz, geri sayım, duraklatma, toplam/tur süreleri, sonuç, yeniden yarış, mini harita.
- Bariyer konum düzeltmesi 11.25 m ile koridor içinde tutuyor; 9.15 m sonrası çim direnci. İmzalı mesafe ve 24 sıralı kontrol noktası ters geçişte tur sayılmasını engelliyor.

- Doğrulama: `node --check game.js` ve `node tests/game.test.cjs` başarılı.
- Gerçek fizik güncellemelerine klavye olayları gönderilerek 3 tur tamamlandı: 19.850 / 18.267 / 18.283 sn, toplam 56.400 sn; merkezden en büyük uzaklık 1.738 m altında.
- Testler: WASD gaz/direksiyon/fren/geri, oklarla üç tur, geri ve tekrarlı çizgi geçişinde tur reddi, çim yavaşlaması/bariyer, duraklatmada süre/konum sabitliği, 3 tur sonunda süre sabitliği/sonuç, yeniden başlatmada sıfırlama, odak kaybında duraklatma.
- Tarayıcı doğrulaması tamamlanamadı: yerel HTTP sunucu bind EPERM; beceri Playwright istemcisi çalıştırıldı fakat standart tarayıcı paketi bulunamadı, kurulu Chrome sandbox içinde SIGABRT ile kapandı. CUA browser yerel file:// adresini URL politikası nedeniyle engelledi. Bu sınır aşılmaya çalışılmadı.
- `output/geometry-preview.png` gerçek tarayıcı ekran görüntüsü DEĞİLDİR: WebGL tamponlarının test ortamında CPU ile perspektif/depth render edilmiş görüntüsü. Görselde pist/araba/kamera kontrol edildi; kamera yaklaştırıldı ve bakış yüksekliği ayarlandı. Gerçek DOM/CSS ve GPU görsel doğrulaması açık sınır olarak kalıyor.
- Tüm oyun dosyaları yerel, ağ isteği/fetch/module/asset bağımlılığı yok. index.html çift tıklanarak açılır.
- Son kullanım: oklar/WASD sürüş, P duraklat/devam, F tam ekran, sonuçta Bir Daha Yarış. Ek kurulum veya build yok.
