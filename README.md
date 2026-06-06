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


## v6 Güncellemesi

- Cevap sonrası “Doğru Cevap” başlığı ve kalan/yanan özet satırları tamamen kaldırıldı.
- Oyuncu Para Dağılımları tablosunda “Sonuç” sütunu yoktur.
- Yayın ekranı için özel compact CSS eklendi; tam ekranda 4 oyunculu tabloda kaydırma ihtiyacını azaltacak şekilde küçültüldü.


## v7 Güncellemesi

- Yayın ekranının sol alt boşluğuna 4 yarışmacının küçük portre kartları eklendi.
- Görseller yüklenen kaynaklardan kırpılarak hazırlandı.
- Portreler dekoratif amaçlıdır ve yayın görüntüsünü zenginleştirir.


## v8 Fotoğraf Düzeltmesi

- Yarışmacı portreleri artık ayrı dosya yolundan değil, doğrudan `display.html` içine gömülü (base64 data URI) olarak gelir.
- Böylece GitHub’a `assets/contestants` klasörü eksik yüklense bile fotoğraflar görünür.
- Güncellemeden sonra tarayıcı eski sürümü tutarsa `Ctrl+F5` ile sert yenileme önerilir.


## v9 Güncellemesi

- Oyuncu giriş ekranına fotoğraf seçme alanı eklendi.
- Oyuncu seçtiği fotoğrafla odaya katılır.
- Canlı sıralama panelinde ismin yanında seçilen fotoğraf görünür.
- Sol alttaki sabit portre paneli kaldırıldı; artık fotoğraflar oyuncu seçimine bağlıdır.


## v10 Güncellemesi

- Avatar fotoğrafları artık game.js içinde base64 olarak gömülüdür; oyuncu, moderatör ve yayın ekranlarında dosya yolu bozulsa bile görünür.
- Oyuncu ekranındaki fotoğraf seçme alanı JavaScript ile avatarOptions listesinden otomatik oluşturulur.
- Fotoğraflar daha yakın kırpıldı; yüzler daha belirgin hale getirildi.
- Canlı sıralama satırları avatar + isim + para düzenine göre tekrar hizalandı.


## v11 Güncellemesi

- display.html yeniden kuruldu.
- Yayın ekranında sağdaki Canlı Sıralama paneli tekrar sabitlendi.
- Eski sol alt portre panelinden kalan yazı/görsel kalıntıları tamamen kaldırıldı.
- Canlı sıralamada avatar + isim + para görünümü yayın ekranında garanti olacak şekilde CSS ile sabitlendi.


## v12 Güncellemesi

- Görselli soru görselleri artık `game.js` içine base64 olarak gömüldü; assets yolu bozulsa bile görünür.
- Demo ses dosyası da gömüldü.
- Oyuncu ekranı tam ekran kullanım için daha kompakt hale getirildi.
- Para kutuları, şık kartları ve görsel/ses medya alanları küçültüldü.
- Yayın ekranında görsel soru medya alanı ekranı şişirmeyecek şekilde sınırlandı.


## v13 Güncellemesi

- Oyuncu ekranının maksimum genişliği artırıldı; artık koyu mavi arka plandaki boş alan daha iyi kullanılır.
- Oyuncu ekranında şıklar geniş ekranda 4 sütun halinde yayılır.
- Görselli sorulardaki görsel oyuncu ekranında daha büyük görünür.
- Alt oyun butonları tam ekranda taşmaması için kompaktlaştırıldı.


## v14 Güncellemesi

- 10 soruluk gerçek Demode TV Canlı Kasa soru seti eklendi.
- Kullanıcının gönderdiği/geliştirilen görseller ilgili sorulara gömüldü.
- 9. ve 10. sorular 3 şıklı yapıldı.
- Şık gösterimleri, mümkün olduğunca mevcut sorudaki seçenek sayısına göre dinamikleştirildi.
- 5. soru şimdilik görselsiz bırakıldı.


## v16 Hata Düzeltmesi

- v15te Oyunu Başlatı bozan correctIndexForQuestion hatası temizlendi.
- v14teki sağlam sürümden tekrar üretildi.
- answer ve correct alanları birlikte destekleniyor.
- Cevabı Aç sırasında Firebasee undefined yazma hatası düzeltildi.
- 9. ve 10. sorularda 3 şık sistemi oyuncu, moderatör ve yayın ekranında güvenli hale getirildi.


## v18 Güncellemesi

- Süre göstergesi sağ üst durum satırından tamamen çıkarıldı.
- Süre artık header'ın tam orta kısmında büyük bir rozet olarak görünür.
- Tam ekran butonuyla çakışmaması için ayrı konumlandırıldı.
- 5. soru kesin olarak değiştirildi:
  “Güneş Sistemi’nin en sıcak gezegeni hangisidir?”
  A) Merkür, B) Venüs, C) Mars, D) Jüpiter
  Doğru cevap: B) Venüs


## v19 Güncellemesi

- 5. soru yeniden kesin olarak Venüs sorusuna çevrildi.
- Eski soru görünmesin diye HTML dosyalarında `game.js?v=19` ve `style.css?v=19` cache kırıcı eklendi.
- Soru görselleri biraz büyütüldü ama 4 oyunculu ekranda alt alana yer kalacak şekilde sınırlandı.


## v20 Güncellemesi

- 5. soruya kullanıcı tarafından verilen Güneş Sistemi görseli eklendi.
- Yayın ekranındaki soru görselleri ortalandı.
- Yayın ekranındaki soru görselleri biraz büyütüldü.
- Görsel boyutu, 4 oyunculu yayın akışında alt alanı bozmayacak şekilde sınırlandı.
- Cache kırıcı sürümü `v=20` olarak güncellendi.


## v21 Güncellemesi

- Yayın ekranındaki soru görselleri daha büyük, tam ortalı ve daha belirgin hale getirildi.
- Moderatör ekranı tam ekranda sayfa kaydırmaya ihtiyaç duymayacak şekilde kompaktlaştırıldı.
- Süre son 5 saniyede kırmızı yanıp söner.
- Süre 0 olduğunda oyuncular artık para kilitleyemez.
- Oyuncu ekranında süre bittiği anda inputlar ve Gizli Kilitle pasif hale gelir.
- 5. sorudaki Güneş Sistemi görseli korunur.
- Cache kırıcı sürüm v=21 yapıldı.


## v22 Güncellemesi

- 3 şıklı sorularda D alanı/boşluk/kayma problemi düzeltildi.
- 3 ve 4 şıklı sorular için option-count sınıfları eklendi.
- Oyuncu ekranındaki para yazma, Hepsi ve Gizli Kilitle alanları 4 oyunculu kullanım için sıkıştırıldı.
- Yayın ekranında cevap açıklandıktan sonra 4 kişilik sonuç matrisi alta taşmayacak şekilde küçültüldü.
- Yayın ekranında reveal modunda soru kartı, görsel, şıklar ve sonuç tablosu birlikte sığacak şekilde ayarlandı.
- Moderatör ekranında 3 şıklı sorularda sonuç matrisi ve seçenek düzeni sıkıştırıldı.
- Cache kırıcı sürüm v=22 yapıldı.


## v23 Güncellemesi

- Final/kazanan ekranı eklendi.
- Oyun final fazına geçtiğinde kazananın avatarı ortaya büyüyerek gelir.
- Konfeti ve ışık/parıltı animasyonu eklendi.
- Kazanan adı ve kalan parası büyük gösterilir.
- Final sıralaması ekranda kompakt şekilde kalır.
- Moderatör paneline “Final Ekranını Göster” butonu eklendi.
- Cache kırıcı sürüm v=23 yapıldı.


## v25y1 Güvenli Güncelleme

- Çalışan v25 sürümü baz alınmıştır.
- Süre uyarısı 5 saniye yerine 10 saniye kala başlar.
- Moderatör paneline oyuncu yönetimi eklenmiştir:
  - Oyuncu silme
  - Oyuncu ismini düzeltme
  - Oyuncu parasını düzeltme
  - Oyuncu fotoğrafını değiştirme
  - Oyuncunun kilidini/dağıtımını temizleme
- Ses/geçiş denemeleri yoktur.
- Cache kırıcı sürüm `v=25y1` olarak ayarlanmıştır.


## v25y2 Güvenli Güncelleme

- Çalışan v25 yönetim sürümü baz alınmıştır.
- Para kuralı eklendi:
  - 0 TL serbesttir.
  - 0 dışındaki her değer en az 10.000 TL olmalıdır.
  - Tüm değerler 10.000 TL katı olmalıdır.
  - Kurala uymayan dağıtım kilitlenemez.
- Oyuncu ekranında hatalı para kutuları kırmızı görünür.
- Oyuncu kilitledikten sonra oyuncu ekranında net “Dağıtımın kilitlendi” bildirimi görünür.
- Elenen oyuncuya sağ panelde ELENDİ damgası gelir.
- Cevap açıklanınca lider kartı kısa süre parlar.
- Moderatör paneline “Tüm Oyuncuları Sil” ve “Elenenleri Sil” eklendi.
- Cache kırıcı sürüm `v=25y2` olarak ayarlanmıştır.

## v25y3 Güvenli Güncelleme

- Çalışan v25y2 sürümü baz alınmıştır.
- Oyuncu ekranındaki soru kartı sabit düzene alındı.
- Görsel alanı, soru yazısı alanı ve şık alanı her soruda aynı kalacak şekilde ayarlandı.
- Görsel oranı farklı olsa bile görsel sabit alan içinde ortalanır.
- Uzun soru metinleri sabit soru yazısı alanına göre sığdırılır.
- Şık kartlarının boyutu sabit tutulur.
- Cache kırıcı sürüm `v=25y3` olarak ayarlanmıştır.
