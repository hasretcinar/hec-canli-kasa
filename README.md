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
