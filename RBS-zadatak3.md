RBS – ZADATAK 3
# Broken Authentication
- Neispravna autentifikacija odnosi se na slabosti u procesima autentifikacije i upravljanja sesijama koje omogućavaju napadačima da kompromituju korisničke naloge, presreću sesije ili izvrše neautorizovane akcije.
- **Uticaj Exploita:** Eksploatacija ove ranjivosti može rezultirati neautorizovanim pristupom osetljivim podacima, preuzimanjem korisničkih naloga, i potencijalnim pristupom administrativnim funkcijama.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Slabe ili predvidljive lozinke.
  - Nedostatak višefaktorske autentifikacije.

- **Kontramere:**
  - **Implementacija jakih politika lozinki:** Zahtevanje složenih lozinki koje su teške za pogoditi.
  - **Višefaktorska autentifikacija:** Dodavanje dodatnih slojeva sigurnosti, poput biometrije ili OTP (One Time Password) tokena.

- **IZAZOVI:**
1. ***Password Strength***  

   Log in with the administrator's user credentials without previously changing them or applying SQL Injection.

   Rešenje: 

   - Na recenzijama smo pronašle adminov email, a za šifru smo pokušale: admin, Admin, admin123, ...

2. ***Bjoern’s Favorite Pet (Tamara)***

   Reset the password of Bjoern's OWASP account via the Forgot Password mechanism with the original answer to his security question.

   Rešenje:

   - Na <http://localhost:3000/#/administration> sam našla <bjoern@owasp.org> mail, a na twitter-u <https://twitter.com/bkimminich> sam pronašla sliku mačke i njeno ime- Zaya
# Broken Anti-Automation
- Neispravna protivautomatizacija odnosi se na nedostatak ili slabosti u mehanizmima koji sprečavaju automatizovane napade, kao što su brute force napadi, automatizovano popunjavanje formulara, scraping, ili drugi robotizovani procesi koji mogu zloupotrebljavati web aplikacije.

- **Uticaj Exploita:** Napadi mogu uključivati prekomernu upotrebu resursa (DoS), krađu podataka, kreiranje lažnih korisničkih naloga, spamovanje, i druge oblike zloupotrebe. Ovo može dovesti do smanjenja performansi, degradacije usluge, ili direktnih finansijskih i reputacijskih šteta.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Slabe ili predvidljive mere za ograničavanje brzine pristupa (rate limiting).
  - Nedostatak provjere i validacije korisničkih akcija na serverskoj strani.

- **Kontramere:**
  - **Ograničavanje brzine**: Primena politika ograničavanja brzine za sprečavanje prekomernog broja zahteva sa istih IP adresa ili korisničkih naloga u kratkom vremenskom periodu.
  - **Poboljšana serverska validacija:** Stroga serverska provera svih korisničkih akcija kako bi se osiguralo da su legitimne i u skladu sa očekivanim ponašanjem.

- **IZAZOVI:**
1. ***CAPTCHA Bypass***    

   Submit 10 or more customer feedbacks within 20 seconds.

   Rešenje:
   
    - <a name="_int_trzrjoee"></a>otvorile smo 10 tabova, i submitovale formu u manje od 20 sekundi.
# Broken Access Control
- Neispravna kontrola pristupa odnosi se na slabosti u politikama i mehanizmima koji regulišu ko može pristupiti kojim resursima i operacijama unutar aplikacije. Ovo uključuje neadekvatne restrikcije na ono što autentifikovani korisnici mogu videti ili raditi.

- **Uticaj Exploita:** Eksploatacija može dovesti do neautorizovanog pristupa osetljivim funkcijama, podacima ili čak kompletnom preuzimanju sistema. Može rezultirati kompromitovanjem privatnosti, gubitkom integriteta podataka ili servisnih poremećaja.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Neadekvatne provere dozvola ili restrikcije za korisničke akcije.
  - Neispravno konfigurisani pristupni kontrolni mehanizmi.
  - Odsustvo horizontalne i vertikalne kontrole pristupa.

- **Kontramere:**
  - Princip najmanjih privilegija: Dodeljivanje korisnicima minimalnih dozvola neophodnih za obavljanje njihovih zadataka.
  - Redovno ažuriranje i revizija politika pristupa: Proveravanje i prilagođavanje pristupnih politika kako bi se osiguralo da su adekvatne i efikasne.
  - Implementacija robustnih mehanizama autentifikacije i autorizacije: Koristiti sigurne metode za verifikaciju identiteta i granice pristupa.

- **IZAZOVI:**
1. ***Easter Egg***

   Finding hidden easter egg

   Rešenje: 

    - Kada pratimo link "Check out our boring terms of use if you are interested in such lame stuff" na About Us stranici otvori se sledeći URL   <http://localhost:3000/ftp/legal.md>, od kog možemo lako doći do ostalih dokumenata na  <http://localhost:3000/ftp> putanji.

2. ***View basket  (Aleksandra)***

   View another user's shopping basket	

   Rešenje: 

    - Kao ulogovani user, dodali smo u korpu proizvod. Zatim smo uz pomoć inspect pronašli Session storage sa naseg localhost:3000 i promijenili vrednost bid u neki drugi broj, i na taj nacin neovlašćeno pristupili korpi  nekog drugog user-a.

3. ***Admin section (Tamara)***

   Access the administration section of the store.

   Rešenje: 

    - U browseru smo otvorili inspect stranice i u Sources delu pronašli main.js fajl. Pretražili smo sva mesta gde se pojavljuje reč 	*“administration”*  i utvrdili da se na putanji <http://localhost:3000/#/administration> nalazi pristup administraciji, a kako već znamo šifru administratora iz njegovog naloga pretrazujemo ovu putanju.
# XSS (Cross-Site Scripting)  
- Ova ranjivost omogućava napadačima da unesu zlonamerne skripte u prikazani sadržaj, koji se potom izvršavaju unutar browsera korisnika kada pregledaju određenu web stranicu ili aplikaciju.

- **Uticaj Exploita:** Iskorišćavanje ove ranjivosti može imati različite posledice:
    - Krađa kredencijala i osetljivih podataka (npr. kolačića, tokena sesije)
    - Izmena sadržaja web stranice koju žrtva vidi
    - Automatizovano slanje zahteva iz browsera žrtve koji mogu izgledati kao legitimne aktivnosti
    - Instalacija malware-a na uređaje žrtve

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Nedovoljna zaštita korisničkih unosa.
  - Ignorisanje strogih pravila Content Security Policy (CSP) može dozvoliti izvršavanje zlonamernih skripti.

- **Kontramere:**
  - Sanitacija korisničkog unosa: Filtriranje korisničkih unosa sprječava napade.
  - Content Security Policy (CSP): Definisanje izvora resursa smanjuje rizik od napada.
  - Kolačići s HTTPOnly i Secure zastavicama: Sprječavaju pristup kolačićima preko skripti, štiteći sesiju korisnika.
  - Obuka programera: Edukacija o sigurnosnim praksama smanjuje ranjivost na XSS.
  - Automatsko testiranje: Redovno skeniranje otkriva i ispravlja slabosti.

- **IZAZOVI:**
1. ***DOM XSS (Aleksandra)***

   Perform a DOM XSS attack with <iframe src="javascript:alert(`xss`)">.

   Rešenje: 

    - U pretraživaču unesemo kod umesto reči i prikaze nam se neadekvatan odgovor stranice u vidu frama.
# Improper Input Validation  
- Nepravilna validacija ulaza odnosi se na propust u web aplikaciji ili softveru da adekvatno proveri ili odbaci ulazne podatke. To omogućava napadačima da iskoriste ove slabosti za izvođenje hakerskih akcija.

- **Uticaj Exploita:** Eksploatacija može dovesti do različitih napada, uključujući izvršavanje proizvoljnog koda, otkrivanje informacija, i poricanje usluge (DoS).

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Neadekvatna filtracija ulaznih podataka.
  - Nedostatak verifikacije formata i granica ulaznih podataka.
  - Slabo upravljanje greškama koje omogućuju detalje o internoj implementaciji.

- **Kontramere:**
  - Validacija: Primena stroge validacije na svim ulazima, uključujući tip, dužinu, format i granice.
  - Sanitacija ulaza: Korištenje biblioteka za sanitaciju da bi se ulazi očistili pre njihove upotrebe.
  - Sigurno upravljanje greškama: Konfigurisanje aplikacije da pravilno upravlja greškama bez otkrivanja osetljivih informacija.

- **IZAZOVI:**
1. ***Payback Time (Aleksandra)***

   Place an order that makes you rich.

   Rešenje:

    - Kao ulogovani user dodali smo jedan artikal u korpu. Zatim smo u inspect networks panelu videli zahtev i na osnovu njega dobili id tacno tog artikla. Poslali smo PUT zahtev preko insomnie kom smo prosledili novu vrednost količine artikla (-100). Nakon toga smo izvršili transakciju i ostvarili dodatnu sumu novca.



2. ***Admin Registration (Tamara)***

   Register as a user with administrator privileges.

   Rešenje:

    - Prvo smo otvorili inspect stranice kako bismo pratili zahteve koji se šalju prilikom registracije. U Network sekciji primecujemo da se poslao POST zahtev koji ima putanju <http://localhost:3000/api/Users/>. Sada mozemo manipulisati podacima iz insomnije tako sto POST zahtevom pošaljemo informacije {"email":"admin","password":"admin","role":"admin"} i na taj način smo registrovali admina.
# Sensitive Data Exposure
- Izlaganje osetljivih podataka odnosi se na osetljive podatke (kao što su lozinke, kreditne kartice, lični identifikatori itd.) koji nisu adekvatno zaštićeni i postaju dostupni neovlašćenim licima. Ovaj tip ranjivosti može nastati zbog niza problema u sigurnosnim politikama, konfiguraciji ili nedostatku sigurnosnih mera.
- **Uticaj Exploita:** Eksploatacija ove vrste ranjivosti može dovesti do krađe identiteta, financijske štete za pojedince čiji su podaci kompromitovani, ili pravne i reputacijske štete za organizaciju koja je dozvolila takvo izlaganje.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Lozinke, tokeni ili kreditne kartice koji se čuvaju u nešifrovanom formatu.
  - Upotreba HTTP umesto HTTPS može omogućiti presretanje osetljivih podataka.
  - Neadekvatne kontrole koje dozvoljavaju neovlašćenim licima pristup osetljivim podacima.
  - Slabo konfigurisani sistemi koji izlažu osetljive podatke.

- **Kontramere:**
    - Osetljivi podaci treba da budu šifrovani prilikom skladištenja i prenosa (TLS/SSL).
    - Implementacija višefaktorske autentifikacije, jake politike lozinki, i minimalnih privilegija za pristup podacima.
    - Korišćenje sigurnih mehanizama za upravljanje sesijama, uključujući sigurne kolačiće, i redovno ažuriranje i poništavanje sesija.
    - Redovno pregledanje i ažuriranje konfiguracija servera, aplikacija i baza podataka.
    - Implementacija rešenja za praćenje i reviziju pristupa podacima.

- **IZAZOVI:**
1. ***Access Log (Aleksandra)***

    Gain access to any access log file of the server.

    Rešenje:

      - Pronasli smo log fajl datoteku korišćenjem resenja zadatka gde smo pristupili poverljivom dokumentu na  <http://localhost:3000/ftp>. Uvidjamo jednu datoteku incident-support.kdbx koja nam govori da postoji support tim, pa koristimo <http://localhost:3000/support/logs> kako bismo dosli do log fajlova.

2. ***Confidential Document (Tamara)***

    Access a confidential document.

    Rešenje: 

      - Na stranici About us pronašli smo link *Check out our boring terms of use if you are interested in such lame stuff,* koji nas redirektuje na stranicu <http://localhost:3000/ftp/legal.md.> Istraživanjem ovog linka pronalazimo jos fajlova na putanji http://localhost:3000/ftp od kojih je acquisitions.md poverljiv dokument.

3. ***Meta Geo Stalking (Anita)***
   
    Determine the answer to John's security question by looking at an upload of him to the Photo Wall and use it to reset his password via the Forgot Password mechanism.
   
    Rešenje:
      - U photo-wall smo pronašli johnovu sliku i preuzeli je. Uz pomoć alata metadata2go smo pročitali metadata te slike. Našli smo tačnu poziciju gde je slika uslikana i pokušali da se ulogujemo kao john ali sa zaboravljenom šifrom gde smo na security pitanje odgovorili sa lokacijom gde je uslikana ta slika.
# Unvalidated Redirects  
- Nevalidirani preusmeravanja javljaju se kada web aplikacija prihvata neovlašćene ulazne parametre koji mogu uzrokovati preusmeravanje korisnika na nepouzdane web stranice. To omogućava napadačima da korisnike preusmere na rizične stranice.  
- **Uticaj Exploita:** Ova ranjivost može dovesti do phishing napada, krađe osetljivih informacija, i instalacije malvera. Napadači koriste ovo za manipulisanje korisničkim poverenjem i legitimnošću originalne stranice.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Aplikacije koje koriste korisnički unos za upravljanje URL destinacijama bez adekvatne validacije.
  - Nedostatak mehanizama za proveru validnostiURL adresa pre nego što se korisnici preusmere.

- **Kontramere:**
  - Ograničavanje mogućnosti preusmeravanja samo na utvrđene, pouzdane URL adrese.
  - Izbegavati slanje korisnika direktno na spoljne stranice.
  - Informisanje korisnika o preusmeravanju i pružanje detalja o destinaciji pre nego što se preusmeravanje dogodi.

- **IZAZOVI:**
1. ***Allowlist Bypass (Aleksandra)***

    Enforce a redirect to a page you are not supposed to redirect to.

    Rešenje:

      - Koristimo link <http://localhost:3000/redirect?to=http://youtube.com?pwned=https://github.com/juice-shop/juice-shop> kako bismo redirektovali na željenu stranicu.
# Security through Obscurity
- Security through Obscurity odnosi se na praksu oslanjanja na tajnost dizajna ili implementacije kao glavni sigurnosni mehanizam. Ovaj pristup pokušava da sakrije važne detalje o softverskim sistemima, poput algoritama, protokola ili ključeva, pretpostavljajući da ako napadač ne zna strukturu sistema, neće moći efikasno da ga napadne.

- **Uticaj Exploita:** Ako detalji ove skrivene implementacije budu otkriveni, što je često samo pitanje vremena, sistem postaje izuzetno ranjiv jer se ne oslanja na dokazane metode zaštite, već na tajnost.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Oslanjanje na neobjavljene ili neproverene metode zaštite.
  - Nedostatak transparentnosti u sigurnosnim mehanizmima koji mogu skrivati slabosti.

- **Kontramere:**
  - Primena standardizovanih i otvoreno proverenih sigurnosnih praksi: Koristiti dobro dokumentovane i zajednicom podržane sigurnosne protokole i metode.
  - Redovna sigurnosna provera i revizija: Održavanje sistema prozirnim kroz redovne revizije i testiranje probojnosti koje mogu identifikovati i ispraviti potencijalne slabosti.
  - Slojevita sigurnost: Implementacija više nezavisnih sigurnosnih slojeva koji ne zavise isključivo na nejasnosti ili tajnosti komponenti.

-  **IZAZOVI:**
1. ***Privacy Policy Inspection (Tamara)***
   
   Prove that you actually read our privacy policy.
   
   Rešenje:
      - Nakon pažljivog čitanja politike sigurnosti i prevlačenjem miša preko reči, otrkili smo da na neke fraze se pojavljuje neko osvetljenje. Kada spojimo te fraze one formiraju rečenicu: We may also, instruct you, to refuse all, reasonably necessary and responsibility. Ako se vodimo zadatkom Nested Easter egg i formiramo link od ovih reči: <http://localhost:3000/we/may/also/instruct/you/to/refuse/all/reasonably/necessary/responsibility> , kada ga posetimo rešićemo izazov.
# Miscellaneous
- Kategorija "Miscellaneous" obuhvata različite sigurnosne slabosti koje ne spadaju nužno u konvencionalne kategorije napada. Ove slabosti mogu uključivati specifične konfiguracijske greške, rijetke sigurnosne propuste, ili zanemarene aspekte sigurnosti koji mogu biti specifični za određenu implementaciju ili okruženje.

- **Uticaj Exploita:** Zbog raznolikosti ranjivosti koje spadaju u ovu kategoriju, uticaj može varirati od manjih poremećaja do ozbiljnih sigurnosnih incidenata, uključujući gubitak podataka, neautorizovani pristup, ili potpunu kompromitaciju sistema.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Nesigurne ili neadekvatne konfiguracije sistema.
  - Zanemarivanje sigurnosnih patcheva ili ažuriranja.
  - Specifični propusti u dizajnu ili arhitekturi koji nisu široko poznati ili dokumentovani.

- **Kontramere:**
  - Temeljna sigurnosna analiza i revizija: Redovno pregledanje i analiziranje svih aspekata sistema kako bi se identifikovali i ispravili nekonvencionalni sigurnosni propusti.
  - Kontinuirano obrazovanje i osposobljavanje: Održavanje tehničkog tima informisanim o najnovijim sigurnosnim praksama i potencijalnim neobičnim ranjivostima.
  - Prilagođene sigurnosne politike: Razvoj i implementacija sigurnosnih politika koje su specifične za okruženje i tehnologiju koje se koriste, uzimajući u obzir jedinstvene aspekte svakog sistema.

-  **IZAZOVI:**
1. ***Security Policy (Anita)***
   
   Behave like any "white-hat" should before getting into the action.
   
   Rešenje:
      - Da bi bili etički haker prvo treba da se konsultujemo sa vlasnikom sajta, pa smo poslali mejl na donotreply@owasp-juice.shop

# Injection
- Injekcija se odnosi na sigurnosni propust koji se javlja kada napadač unese (injektuje) štetni kod u program koji se zatim interpretira ili izvršava od strane aplikacije. Ovo može biti SQL injekcija, skriptna injekcija (kao što je XSS), ili injekcija komandne linije, među ostalima.

- **Uticaj Exploita:** Injekcija može dovesti do neautorizovanog pristupa podacima, manipulacije ili uništavanja podataka, preuzimanja kontrole nad sistemima, i drugih štetnih posledica.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Neadekvatno sanitiranje, filtriranje ili validacija korisničkog unosa.
  - Upotreba dinamički sastavljenih upita ili komandi koje uključuju nevalidirane ulaze.
  - Nedostatak upotrebe parametrizovanih upita ili drugih sigurnih metodologija kod pristupa bazama podataka.

- **Kontramere:**
  - Koristiti parametrizovane upite: Za SQL baze podataka, koristiti parametrizovane upite ili ORM (Object-Relational Mapping) alate koji automatski primenjuju ovu praksu.
  - Sanitacija i validacija ulaza: Rigorozno sanitiranje i validacija svih korisničkih ulaza pre njihove obrade ili uključivanja u upite ili komande.
  - Minimalne privilegije: Ograničavanje prava i privilegija za aplikacije i baze podataka tako da čak i ako dođe do injekcije, šteta može biti minimizirana.

- **IZAZOVI:**
1. ***Login Jim (Anita)***
   
    Log in with Jim's user account.
   
    Rešenje:
      - U recenzijama smo našli Jimov mejl i na njegov mejl dodali ‘--,  a u šifru upisali bilo šta
# Security Misconfiguration 
- Pogrešna konfiguracija sigurnosti javlja se kada sigurnosne postavke nisu pravilno postavljene ili su zadržane podrazumevane opcije, što ostavlja sistem ranjivim. To može uključivati nesigurne postavke u aplikacijama, serverima, bazama podataka, i drugoj infrastrukturi.

- **Uticaj Exploita:** Ove slabosti mogu omogućiti neautorizovan pristup, izlaganje osetljivih podataka, ili manipulaciju sistemom. Pogrešna konfiguracija može dovesti do raznih sigurnosnih incidenata, uključujući krađu podataka, izvršavanje neautorizovanog koda, i servisne napade (DoS).

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
- Nepotrebno omogućene funkcije ili portovi.
- Nedostatak redovnih sigurnosnih ažuriranja i patcheva.

- **Kontramere:**
  - Redovno ažuriranje i održavanje: Primena najnovijih sigurnosnih patcheva i ažuriranja za sve komponente sistema.
  - Minimalan pristup i funkcionalnost: Deaktiviranje nepotrebnih usluga, portova, i funkcija koje mogu predstavljati sigurnosni rizik.
- **IZAZOVI:**
1. ***Deprecated Interface (Anita)***
   
    Use a deprecated B2B interface that was not properly shut down.
   
    Rešenje:
    - Ušli smo na formu za žalbe. Kada želimo da izaberemo dokument, dozvoljeni tipovi su samo pdf i zip fajlovi. Medjutim ukoliko se u imenu datoteke stavi \*.xml ili neki drugi tp, može se izabrati i datoteka tog tipa. Kada se pred takva datoteka dolazi do željene greške.

# Cryptographic Issues
- ` `Kriptografski problemi nastaju kada implementacija kriptografskih funkcija u softveru nije izvršena ispravno, što može uključivati korišćenje slabih algoritama, neadekvatno upravljanje ključevima, ili nepravilnu primenu kriptografskih protokola.

- **Uticaj Exploita:** Slabe ili pogrešno implementirane kriptografske metode mogu dovesti do otkrivanja ili manipulacije osetljivim podacima, što može rezultirati gubitkom privatnosti, finansijskim gubicima, ili drugim sigurnosnim incidentima.

- **Ranjivosti u Softveru Koje Dozvoljavaju Napad:**
  - Korišćenje zastarelih ili kompromitovanih kriptografskih algoritama.
  - Implementacija kriptografskih protokola bez pridržavanja najboljih praksi, kao što su nedovoljno slučajni generatori brojeva za kriptografiju.

- **Kontramere:**
  - Korišćenje jakih, modernih kriptografskih algoritama: Oslanjanje na industrijske standarde i preporučene kriptografske algoritme koji su provereno otporni na napade.
  - Redovna revizija i testiranje: Sprovođenje redovnih sigurnosnih revizija i testiranja penetracije kako bi se osiguralo da kriptografske mere ostaju sigurne i efikasne.

- **IZAZOVI:**
1. ***Nested Easter egg (Anita)***
   
    Apply some advanced cryptanalysis to find the real easter egg.
   
    Rešenje:
      - Kada smo pronašli kriptoavan string, prvo smo dekodovali pomoću Base 64 i dobili: /gur/qrif/ner/fb/shaal/gurl/uvq/na/rnfgre/rtt/jvguva/gur/rnfgre/rtt. Medjutim ovo nije rešenje, pa smo uvideli izraze koji se ponavljaju - znači da oni predstavljaju učestale reči. Pretpostavili smo da su slova pomerena za nekoliko mesta i dekodovali smo pomoću ROT-13 i dobili na kraju: /the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg.

