# Demode TV Canlı Kasa - Firebase Sürümü

Bu sürüm Node.js gerektirmez. Dosyaları Netlify Drop veya Firebase Hosting gibi statik site yayınına yükleyebilirsin.

## Dosyalar

- moderator.html: oda oluşturan ve oyunu yöneten ekran
- player.html: oyuncuların gizli para yatırma ekranı
- display.html: OBS/yayın için temiz ekran
- firebase-config.js: Firebase bağlantı ayarları
- game.js: oyun mantığı
- style.css: tasarım

## Kullanım

1. Firebase Realtime Database test mode/rules açık olmalı.
2. Bu klasörü Netlify Drop'a sürükle.
3. Çıkan linkten moderator.html aç.
4. Oda oluştur.
5. Oyuncu linkini oyunculara gönder.
6. Display linkini OBS'ye ver.

## Önemli Güvenlik Notu

Bu prototip hızlı test içindir. Firebase Rules şu an açık bırakıldıysa herkes yazabilir.
Yayına çıkmadan önce kuralları sıkılaştırmak gerekir.


## v2 Güncellemesi

- Oyuncu ekranında para girişleri şık kutularının içine alındı.
- Lobi ekranında soru artık erken görünmez.
- Yayın ve moderatör ekranında toplam kasa kartı kaldırıldı.
- Sağ panel canlı sıralama olarak çalışır.
- Finalde herkesin ekranında madalyalı liderboard görünür.

Aynı GitHub Pages linkinde güncelleme için dosyaları aynı repository’ye tekrar yükleyip commit etmek yeterlidir.


## v3 Güncellemesi

- Oyuncu para yazdıkça ilgili şık kutusunda para destesi oluşur.
- Cevap açıklandığında yayın/moderatör ekranında doğru şıktaki para kalır, yanlış şıklardaki para düşme/yok olma animasyonu gösterir.
- Sesli sorular için yayın ekranında audio player görünür. Tarayıcı otomatik ses çalmayı engelleyebileceği için yayıncı/operatörün player üzerinden sesi başlatması gerekebilir.


## v4 Güncellemesi

- Cevap açıldıktan sonra yayın/moderatör/oyuncu ekranında oyuncu bazlı A-B-C-D para dağılım tablosu görünür.
- Her oyuncunun A, B, C ve D şıklarına kaç TL koyduğu aynı hizalı sütunlarda gösterilir.
- Doğru sütun yeşil, yanlış sütunlar sönük/kırmızı görünür.


## v5 Güncellemesi

- Cevap sonrası “Kalan/Yanan” özet satırları kaldırıldı.
- Dağılım tablosundaki “Sonuç” sütunu kaldırıldı.
- Sadece oyuncu ve A/B/C/D para dağılımları gösterilir.
- Yayın ekranında 4 oyunculu kullanım için tablo ve şıklar daha kompakt hale getirildi.
