RBS – ZADATAK 4
# Opis projekta 
UberApp je kompleksna aplikacija koja omogućava korisnicima da jednostavno rezervišu i upravljaju vožnjama. Projekat se sastoji od tri glavne komponente: 

- **Backend** (Java, Spring Boot): Server komponenta UberApp-a je implementirana korišćenjem Java programskog jezika i Spring Boot framework-a. Ova komponenta obezbeđuje osnovnu funkcionalnost serverske logike, kao što su autentikacija korisnika, upravljanje zahtevima za vožnje, alokacija vozača i upravljanje podacima. 
- **Frontend** (Angular, TypeScript): Klijentska strana UberApp-a je implementirana korišćenjem Angular framework-a i TypeScript programskog jezika. Ova komponenta omogućava korisnicima da jednostavno rezervišu vožnje, prate svoje putovanje i upravljaju svojim korisničkim nalozima. 
- **Mobilna aplikacija** (Java): Mobilna aplikacija UberApp-a je dizajnirana za Android platformu. Ona pruža korisnicima mogućnost da jednostavno pristupe funkcijama UberApp-a putem svojih pametnih telefona. 
 
Aplikacija ima 4 vrste korisnika: 
- **Administrator:** 
  - Ima uvid u sve vozače, njihovu trenutnu lokaciju i status. 
  - Ima uvid u sve aktivne vožnje. 
  - Može da registruje nove vozače. 
  - Vidi istoriju svih vožnji i može da generiše izveštaje. 
  - Reaguje na PANIC notifikacije. 
  - Pruža korisničku podršku u vidu live chat-a. 
  - Može blokirati korisnike i vozače. 
- **Vozač:**
  - Može da prihvati/odbije/započne/završi vožnju. 
  - Pregled i izmena informacija na profilu. 
  - Vidi kompletnu istoriju svojih vožnji. 
  - Može da izgeneriše izveštaje na osnovu istorije vožnji. 
  - Ima pristup PANIC dugmetu – koje označava da postoji problem sa trenutnom vožnjom. 
- **Korisnik:** 
  - Može da zatraži vožnju. 
  - Ostavi recenziju nakon što se vožnja završi. 
  - Vidi kompletnu istoriju svojih vožnji. 
  - Zatraži korisničku pomoć tokom vožnje (PANIC). 
  - Pregled i izmena informacija na profilu. 
  - Neregistrovani korisnik: 
  - Ima uvid u osnovne informacije. 
  - Može da se informiše o vremenu i ceni za željenu vožnju. 
 
# Lista članova 
Anita Pajić, Aleksandra Filipić, Tamara Džambić 

# Backend 
1. ***Cross-Site Request Forgery (CSRF)***

Onemogućavanje CSRF zaštite može biti opasno jer otvara vrata za CSRF napade, gde napadač može da primora korisnike da izvrše neželjene akcije na njihovim nalozima. Preporučuje se da se CSRF zaštita ne isključuje osim ako postoji dobar razlog i ako se preduzimaju odgovarajuće mere zaštite, kao što su korišćenje drugih mehanizama zaštite ili ograničenje pristupa određenim rutama.

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika1.1.png?raw=true)

**Preporučene prakse sigurnog kodiranja** 

Zaštita protiv CSRF napada se snažno preporučuje: 
  - da bude automatski aktivirana za sve nesigurne HTTP metode. 
  - da bude implementirana, na primer, sa tokenom za CSRF koji nije moguće naslutiti. 

Naravno, sve osetljive operacije ne bi trebalo da se izvršavaju sa sigurnim HTTP metodama kao što su GET, koje su dizajnirane samo za preuzimanje informacija. 


2. ***Weak Cryptography***

Korišćenje pseudoslučajnih generatora brojeva (PRNGs) je osetljivo na bezbednost. Na primer, u prošlosti je dovelo do sledećih ranjivosti: CVE-2013-6386, CVE-2006-3419, CVE-2008-4102 

Kada softver generiše predvidive vrednosti u kontekstu koji zahteva nepredvidljivost, moguće je da napadač pogodi sledeću vrednost koja će biti generisana, i da koristi ovu pretpostavku da se predstavi kao drugi korisnik ili da pristupi osetljivim informacijama. 

Pošto java.util.Random klasa zavisi od pseudoslučajnog generatora brojeva, ova klasa i povezana java.lang.Math.random() metoda ne bi trebalo da se koriste za aplikacije koje su kritične po pitanju bezbednosti ili za zaštitu osetljivih podataka. U takvim kontekstima, trebalo bi koristiti java.security.SecureRandom klasu koja se oslanja na kriptografski snažan generator slučajnih brojeva (RNG). 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika1.2.png?raw=true)

**Preporučene prakse sigurnog kodiranja:**

- Koristite kriptografski snažan generator slučajnih brojeva (RNG) poput "java.security.SecureRandom" umesto ovog PRNG. 
- Koristite generisane slučajne vrednosti samo jednom. 
- Ne biste trebali da izlažete generisanu slučajnu vrednost. Ako je morate čuvati, pobrinite se da je baza podataka ili datoteka sigurna. 

3. ***Insecure Configuration***

Imati dozvoljavajuću politiku deljenja resursa preko različitih domena (Cross-Origin Resource Sharing - CORS) je osetljivo na bezbednost. U prošlosti je dovelo do sledećih ranjivosti: CVE-2018-0269, CVE-2017-14460  

Same origin policy  u pregledačima podrazumevano, iz sigurnosnih razloga, sprečava JavaScript frontend da izvrši cross-origin HTTP zahtev ka resursu koji ima drugo poreklo (domen, protokol ili port) od svog. 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika1.3.png?raw=true)

**Preporučene prakse sigurnog kodiranja:**

- Zaglavlje Access-Control-Allow-Origin treba postaviti samo za pouzdano poreklo i za određene resurse. 
- Dozvolite samo odabrane, pouzdane domene u zaglavlju Access-Control-Allow-rigin. Preporučuje se bela lista domena umesto crne liste ili dozvoljavanja bilo kog domena (ne koristite * zamenski znak niti slepo vraćajte sadržaj zaglavlja Origin bez ikakvih provera). 

4. ***DTO***

Prihvatanjem perzistentnih entiteta kao argumenata metoda, aplikacija omogućava klijentima da direktno manipulišu svojstvima objekata. 

Napadači bi mogli da falsifikuju zlonamerne HTTP zahteve koji će promeniti neočekivana svojstva perzistentnih objekata. To može dovesti do neovlašćenih modifikacija stanja entiteta. Ovo je poznato kao napad masovnog dodeljivanja (mass assignment attack). 

Zbog toga što su perzistentni objekti modifikovani direktno bez prethodne logike, napadači bi mogli da iskoriste ovaj problem da bi zaobišli bezbednosne mere koje inače sprovodi aplikacija.

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika1.4.png?raw=true)

**Preporučene prakse sigurnog kodiranja:**
- Zameniti ovaj perzistentni entitet jednostavnim POJO ili DTO objektom.  
 
   
# Mobilna aplikacija
1) ***Enkripcija osetljivih podataka***

1.1) ***"usesCleartextTraffic" je implicitno omogućen za starije verzije Androida. Pazite da je dozvoljavanje saobraćaja u čistom tekstu sigurno u ovom kontekstu***

Jasno-tekstualni protokoli poput ftp-a, telnet-a ili http-a nedostaju šifrovanje prenetih podataka, kao i mogućnost izgradnje autentifikovane veze. To znači da napadač koji može da špijunira saobraćaj sa mreže može čitati, menjati ili oštetiti preneti sadržaj. Ovi protokoli nisu bezbedni jer izlažu aplikacije širokom spektru rizika: 
- izlaganje osetljivih podataka 
- preusmeravanje saobraćaja ka zlonamernoj tački 
- zaraženi softverski update ili instalater 
- izvršavanje klijentskog koda 
- oštećenje kritičnih informacija  

Čak i u kontekstu izolovanih mreža poput offline okruženja ili segmentiranih cloud okruženja, pretnja iznutra postoji. Dakle, napadi koji uključuju špijuniranje ili manipulaciju komunikacija i dalje mogu da se dese. 

Na primer, napadači bi uspešno mogli kompromitovati prethodne slojeve bezbednosti tako što bi: 
- zaobišli mehanizme izolacije 
- kompromitovali komponentu mreže 
- dobili pristup legitimnim pristupnim podacima internog IAM naloga (bilo od servisnog naloga ili stvarne osobe)  

U takvim slučajevima, šifrovanje komunikacija bi smanjilo šanse napadača da uspešno procure podatke ili ukradu pristupne podatke sa drugih mrežnih komponenti. Slojevito primenjivanje različitih praksi bezbednosti (kao što su segmentacija i šifrovanje) će pratiti princip odbrane u dubini. 
Napomena da korišćenje http protokola postaje zastarelo od strane glavnih web pregledača. 

U prošlosti, to je dovelo do sledećih ranjivosti: CVE-2019-6169, CVE-2019-12327, CVE-2019-11065 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika1.png?raw=true)

**Preporučene prakse za sigurno programiranje:** 

- Koristite siguran, autentifikovan i šifrovan protokol poput TLS-a ili SSH-a za prenos aplikacionih podataka. 
Evo nekoliko alternativa za najčešće korišćene protokole u čistom tekstu: 
- Koristite ssh umesto telnet-a. 
- Koristite sftp, scp ili ftps umesto ftp-a. 
- Koristite https umesto http-a. 
- Koristite SMTP preko SSL/TLS-a ili SMTP sa STARTTLS-om umesto SMTP-a u čistom tekstu. 

Omogućite šifrovanje komunikacije između komponenti u cloud okruženjima kada god je to moguće. 

Konfigurišite vašu aplikaciju da blokira mešoviti sadržaj prilikom prikazivanja web stranica. 

Ako je dostupno, obavezno deaktivirajte svaki saobraćaj u čistom tekstu na nivou operativnog sistema. 

Preporučuje se osigurati sve kanale prenosa, čak i na lokalnim mrežama, jer je dovoljna jedna nesigurna veza da kompromituje celu aplikaciju ili sistem. 
   
1.2) ***Pobrinite se da je korišćenje nešifrovane baze podataka sigurno u ovom slučaju***

Čuvanje podataka lokalno je uobičajeni zadatak za mobilne aplikacije. Takvi podaci uključuju postavke ili autentifikacione tokene za spoljne usluge, između ostalog. Postoji mnogo praktičnih rešenja koja omogućavaju trajno čuvanje podataka, na primer SQLiteDatabase, SharedPreferences i Realm. Podrazumevano, ovi sistemi čuvaju podatke nešifrovano, tako da napadač sa fizičkim pristupom uređaju može lako da ih pročita. Pristup osetljivim podacima može biti štetan za korisnika aplikacije, na primer kada uređaj bude ukraden. 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika2.png?raw=true)

**Preporučene prakse za sigurno programiranje:**
- Preporučuje se šifrovanje lozinke lokalnih baza podataka koje sadrže osetljive informacije. Većina sistema pruža sigurne alternative za čuvanje podataka u obliku čistog teksta koje bi trebalo koristiti. Ako nema dostupne sigurne alternative, podaci mogu biti šifrovani ručno pre nego što budu sačuvani. 
- Šifra za šifrovanje ne sme biti hardkodirana u aplikaciji. Postoje različiti pristupi kako se šifra može obezbediti za šifrovanje i dešifrovanje baze podataka. U slučaju EncryptedSharedPreferences, Android Keystore može se koristiti za čuvanje lozinke. Ostale baze podataka mogu se osloniti na EncryptedSharedPreferences za čuvanje lozinki. Lozinka takođe može biti dinamički obezbeđena od strane korisnika aplikacije ili se može preuzeti sa udaljenog servera ako druge metode nisu izvodljive. 
  
2) ***Nesigurna konfiguracija***

2.1) ***Pobrinite se da ova opcija za debagovanje bude deaktivirana pre isporuke koda u produkciju***

Alatke i okviri za razvoj obično imaju opcije koje olakšavaju debagovanje razvojnim timovima. Iako su ove funkcije korisne tokom razvoja, nikada ne bi trebalo da budu omogućene za aplikacije koje su puštene u produkciju. Debag instrukcije ili poruke o grešci mogu otkriti detaljne informacije o sistemu, poput putanje aplikacije ili naziva datoteka. 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika3.png?raw=true)

**Preporučene prakse za sigurno programiranje:**
- Ne omogućavajte debagovanje na proizvodnim serverima ili aplikacijama distribuiranim korisnicima. 
- Treba koristiti Loger umesto printStackTrace. 
   
3) ***Others***

3.1) ***Pobrinite se da je korišćenje dozvole "ACCESS_FINE_LOCATION" neophodno***
   
Dozvole koje mogu imati veliki uticaj na privatnost korisnika, označene kao opasne ili "nije za upotrebu od strane aplikacija trećih strana" od strane Androida, trebalo bi tražiti samo ako su zaista neophodne za implementaciju ključnih funkcija aplikacije. 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika4.png?raw=true)

**Preporučene prakse za sigurno programiranje:**
- Preporučuje se pažljivo pregledati sve dozvole i koristiti opasne samo ako su zaista neophodne. 

3.2) ***Pobrinite se da je emitovanje namera (broadcasting intents)  sigurno u ovom kontekstu***

U Android aplikacijama, slanje namera je osetljivo na bezbednost. Na primer, to je u prošlosti dovelo do sledeće ranjivosti: CVE-2018-9489 

Podrazumevano, emitovane namere su vidljive svakoj aplikaciji, izlažući sve osetljive informacije koje sadrže.  

Ova praksa postavlja problem kada se namera emituje bez navođenja bilo koje "dozvole primaoca". 

![alt text](https://github.com/anitapajic/RBS/blob/main/images/slika5.png?raw=true)

**Preporučene prakse za sigurno programiranje:**
- Preporučuje se ograničavanje pristupa emitovanim namerama (broadcasted intents). 

# Frontend
  Za Angular aplikaciju ne postoje skenirani Security Hotspots.

  Za Reliability postoji 61 medium issue-a i 50 low. Svi su vezani za duplirana polja u css-u i da svaka labela u formi mora biti povezana sa odgovarajućom kontrolom.
  
  Za Maintainbility postoje 14 high issue-a, 22 medium i 117 low. Vezani su za praznu metodu ngOnInit i korišćene var-a na nekim mestima umesto let-a i const-a. 
