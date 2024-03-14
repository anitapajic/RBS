
RBS – ZADATAK 1
# A. HEŠOVANJE LOZINKI 
Dizajnirati mehanizam hešovanje sa ciljem da se zaštiti poverljivost (confidentiality) korisničkih lozinki.
## REŠENJE
1. Najbezbedniji i najpopularniji algoritmi za heširanje lozinki su trenutno: bcrypt, argon2 i scrypt. Argon2Id je odličan hard-memory algoritam i koristi se za high security i velike projekte, međutim dosta je vremenski zahtevan pa za web aplikacije nije idealan. Bcrypt algoritam je brz i hešuje podatke ispod 1 sekunde, međutim ne uključuje parametre za niti, CPU i tvrdoću memorije. Scrypt je odličan protiv brute-force napada i brži je od Argon2, ali nije toliko memory hard kao on.  Takođe, scrypt prvenstveno nije bio namenjen samom heširanju pa se oko toga ima dosta diskusije. Koji algoritam ćemo koristiti zavisi od potreba našeg projekta, mi ćemo izabrati bycript jer je najpogodniji za Spring Boot aplikacije i za potrebe naših projekata pruža zadovoljavajuću zaštitu.
1.
1. Bcrypt treba koristiti sa sledećim parametrima:
   1. 1) Work factor – **minimalno 16**
   1. 1) Salt – **minimalno 32 bita**
1. Za pouzdanog provider-a izabraćemo Spring Security koji implementira PasswordEncoder interfejs i u okviru njega imamo BCryptPasswordEncoder
1. Da bi korsitili BCryptPasswordEncoder potrebno je ubaciti Spring Security dependecy – najnovija verzija **6.2.2**
1. Verzija 6.2.2 nema trenutne ranjivosti
1. Poslednja verzija koja je imala ranjivost je 6.1.3 (CVE-2023-34042)
1. Da bi bezbedno implementirali heš mehanizam, nakon istraživanja odgovarajućeg algoritma sa heširanje treba ga konfigurisati i implementirati:
   1. 1) Za BCryptPasswordEncoder postavićemo work strength na minimalno 16 i izgenerisati salt vrednost pomoću SecureRandom klase
   1. 1) Prilikom čuvanja šifre (ili nekog drugog podatka koji želimo da hešujemo), pozvaćemo encode metodu passwordEncoder-a i proslediti mu šifru u plain tekstu.
   1. 1) Šifra će biti sačuvana u sličnom obliku: **$2a$10$EzbrJCN8wj8M8B5aQiRmiuWqVvnxna73Ccvm38aoneiJb88kkwlH2**
   1. 1) Tako smo uspešno implementirali heš mehanizam i od sada treba uvek pratiti nove bezbednosne standarde i potencijalne ranjivosti.
1.
1.
# B. MEHANIZAM REVIZIJE (AUDITING)
Zadatak je istražiti kako se svaki od ovih zahteva može ispuniti, i specificirati konkretne korake implementacije za dizajnirani mehanizam. Korišćenje konkretnih rešenja je dozvoljeno, ako dato rešenje ispunjava sve zahteve, ili se može proširiti tako da ispunjava.
## REŠENJE
1. Izbor najboljeg mehanizma za logovanje zavisi od potreba i složenosti aplikacije koju razvijamo, a najpopularniji i najefikasniji su Logback ili Log4j2. Logback je odličan izbor ako želimo mehanizam koji se brzo implementira, uz to sadrži mehanizam rotacije log fajlova i automatsko uklanjanje starih log arhiva. Log4j2 je mehanizam koji je pogodno koristiti, ako zelimo sisteme sa niskim kašnjenjem ili gde je potrebno brže logovanje, zbog svojih mogućnosti filtriranja i arhitekture dodataka. 
1. Nakon detaljnog istraživanja različitih mehanizama za logovanje odabrali smo Log4j2 kao najpogodnije rešenje zbog performansi koje ispunjavaju sve navedene zahteve. U nastavku slede koraci implementacije:
1) Na samom pocetku neophodno je konfigurisati Log4j2 biblioteke u projektu putem Mavena, Gradlea ili nekog drugog alata.
1) Zatim je potreno definisati format log zapisa u “log4j2.xml” fajlu, koji sadrži sve potrebne informacije uključujući i vreme izvršavanja događaja. 
1) Pre generisanja log zapisa neophodno je odrediti nivoe logovanja u “log4j2.xml” fajlu, koji nam omogućavaju da se loguju samo relevantni događaji.
1) Da bismo omogućili non- repudiation, sledeći korak je identifikacija aktera u log zapisima gde možemo dodati informacije o akterima kao sto su identifikacioni broj, korisničko ime itd.
1) Kako bismo sprečili pretrpanost i očuvali dostupnost logova potrebno je izvršiti rotiranje log datoteka, gde se starije log datoteke arhiviraju ili brišu, čime se oslobađa prostor za nove logove.
1) Privatnost i bezbednost korisnika očuvaćemo tako što izbegavamo unošenje osetljivih podataka poput lozinki ili ličnih informacija u log zapise.
1) Na kraju treba da proverimo da li logovanje funkcionise kako smo očekivali. Ovo postižemo testiranjem aplikacije i proverom integriteta log zapisa.

#
# C. DODATNE BEZBEDNOSNE KONTROLE
Analizirati bezbednosne kontrole implementirane na projektu iz predmeta Informaciona bezbednost (2023) i zaključiti do koje mere implementirane konfiguracije kontrola se razlikuju od preporučenih bezbednosnih konfiguracija.
# REŠENJE
1. U našem projektu iz informacione bezbednosti su korišćeni zastareli dependency-ji poput same verzije Spring Boot-a i Spring Security-ja (6.0.2) i sadrze dve ranjivosti:

1\.  **CVE-2023-34034** – WebFlux bezbednosni zaobilaz sa dvostrukim 		džoker šablonom bez prefiksa

` `- **Rešenje** je ažurirati verzije.

2\.  **CVE-2023-34035** - Pravila autorizacije mogu biti pogrešno 		konfigurisana kada se koristi više servleta

` `- **Rešenje** je ažurirati verzije i ukoliko nam je endpoint MVC endpoint, onda treba koristiti: `requestMatchers(MvcRequestMatcher)`; ili inače: `requestMatchers(AntPathRequestMatcher)`

1. Two-factor autentifikacija je bila implementirana, ali je zahtevala od korisnika da unese bezbednosni kod koji je poslat, prilikom svakog prijavljivanja. Iako je to dobra praksa za povećanje sigurnosti, zahtevanje od korisnika da je svaki put koristi može biti neprijatno i može negativno uticati na korisničko iskustvo. Možda bi bilo bolje implementirati dvofaktorsku autentifikaciju samo pri prvom prijavljivanju ili pri sumnjivim aktivnostima.
1. Logovanje je važan deo bezbednosne strategije, ali treba voditi računa o njegovoj efikasnosti i efektivnosti. Čuvanjem logova u više datoteka smo mogle olakšati njihovo upravljanje i analizu, posebno u slučaju povećanog broja događaja.
1. Osetljivi posadi poput lozinki korisnika, su bili hesirani upotrebom BCryptPasswordEncoder. Od korisnika smo zahtevali jake lozinke, sa minimum 8 karaktera, od kojih mora biti bar jedno malo slovo, jedno veliko slovo, broj i specijalan karakter. Nismo ogranicile maksimalan broj karaktera, a praksa je da se predugačke šifre odbiju. Moguće je resetovanje i menjanje lozinke ukoliko to korisnik zahteva. Nova lozinka nije mogla da bude identična postojećoj, kao ni poslednje tri lozinke.
1. Sertifikate i privatne ključeve smo enkodirali pre čuvanja, takođe smo ih čuvali u odvojenim direktorijumima.
1. Za OAuth implementirali smo Google OAuth, odnosno logovanje preko Google-a. Na klijentskoj aplikaciji smo koristile abacritt/angularx-social-login verzija 2.0 biblioteku u kombinaciji sa angular 15. Sada bi trebalo unaprediti verzije i angulara i biblioteke. 
1. Da bismo sprečile stranicu od spam napada koristile smo Recaptcha v2 servis pre svakog zahteva za novi sertifikat.
1. Značajnija mana našeg projekta je nedostatak HTTPS protokola. Takođe nismo koristile nikakav alat za analizu ranjivosti kojim bismo identifikovale dodatne nedostatke.
3
