RBS - ZADATAK2
# A. Motivacija napadača
Razmatrajući potencijalne napadače MegaTravel-a, moguće je identifikovati nekoliko klasa napadača, njihove nivoe veštine, pristupe sistemu i krajnje ciljeve:

1) **KONKURENCIJA:**
- **Nivo veštine**: Visok
- **Pristup sistemu**: Moguće je da imaju određeno znanje o sistemu i sigurnosnim ranjivostima.
- **Krajnji cilj**: Želja za oštećenjem ili narušavanjem poslovanja MegaTravel-a radi sticanja konkurentske prednosti ili uništavanja reputacije.

2) **NEZADOVOLJNI KORISNICI:**
- **Nivo veštine**: Nizak do srednji
- **Pristup sistemu**: Moguće je da imaju ograničen pristup ili znanje o sistemu, ali mogu koristiti socijalni inženjering ili jednostavne tehnike hakovanja.
- **Krajnji cilj**: Želja za osvetom ili oštećenjem sistema kako bi privukli pažnju na svoje nezadovoljstvo ili prouzrokovali štetu.

3) **HAKERSKE GRUPE:**
- **Nivo veštine**: Visok
- **Pristup sistemu**: Mogu imati napredno znanje o sigurnosnim ranjivostima i metodama hakovanja.
- **Krajnji cilj**: Finansijska dobit, krađa podataka ili sabotaža sistema radi sticanja reputacije ili ispunjenja političkih ciljeva.

4) **INSAJDERI:**
- **Nivo veštine**: Zavisi od insajdera, ali može biti visok
- **Pristup sistemu**: Imaju legitimni pristup i mogu imati detaljno znanje o sistemu.
- **Krajnji cilj**: Oštećenje sistema iznutra, krađa osetljivih informacija ili sabotaža iznutra.

# B. Imovina (Assets)
U cilju efikasne zaštite vitalnih resursa MegaTravel korporacije, identifikovali smo ključne assete analizom motiva napadača, poslovnih potreba naše korporacije
i važećih zakonskih propisa:

1) **PODACI KORISNIKA:**
- **Inherentna izloženost**: Administratori agencije.
- **Bezbednosni ciljevi sredstva**:
  - Poverljivost je ključna kako bi se očuvao pristup korisničkim informacijama.
  - Integritet očuvava tačnosti i pouzdanosti tih informacija.
  - Dostupnost omogućava korisnicima konstantan pristup njihovim podacima.
- **Uticaj oštećenja bezbednosnih ciljeva na korporaciju**: Gubitak poverenja, reputacijska šteta, finansijski gubitak.
  
2) **PODACI O REZERVACIJAMA:**
- **Inherentna izloženost**: Administratori agencije.
- **Bezbednosni ciljevi sredstva**:
  - Poverljivost je ključna kako bi se očuvali podaci o korisnickim rezervacijama i putovanjima.
  - Integritet očuvava tačnosti i pouzdanosti tih informacija.
  - Dostupnost omogućava korisnicima konstantan pristup informacijama o putovanju kada su im neophodne.
- **Uticaj oštećenja bezbednosnih ciljeva na korporaciju**: Gubitak poverenja, reputacijska šteta, finansijski gubitak.
  
3) **NAŠ SERVER:**
- **Inherentna izloženost**: Svi zaposleni.
- **Bezbednosni ciljevi sredstva**:
  - Dostupnost servera je ključna kako bi se osiguralo nesmetano poslovanje MegaTravel-a.
  - Integritet podataka koji se nalaze na serveru sprečava neovlašćene manipulacije nad podacima.
  - Poverljivost se odnosi na baze podataka sa osetljivim informacijama .
- **Uticaj oštećenja bezbednosnih ciljeva na korporaciju**: Prekid poslovanja, reputacijska šteta, finansijski gubitak.
  
# C. Površina napada (Attack surface)
Napadači, bilo da je reč o korisnicima, zaposlenima, konkurenciji ili hakerskim grupama, u zavisnosti od nivoa veština mogu izvršiti različite vrste napada. Ispitujući korisnike koji komuniciraju sa MegaTravel sistemom, mapirali smo nekoliko ulaznih tačaka sa kojih mogu da sprovedu svoje napade.

1) **BROWSER (BUSINESS WEBSITE)** 
- **Phishing** napadi kako bi prevarili korisnike da otkriju svoje informacije.
- **DDoS (Distributed Denial of Service)**  napad na veb sajt kako bi ga onesposobili ili narušili njegovu dostupnost.
- **XSS (Cross-Site Scripting)** napadi koji mogu dovesti do krađe kolačića sa sesijom, manipulacije sadržajem stranice ili preusmeravanjem korisnika na zlonamerne sajtove
- **CSRF (Cross-Site Request Forgery)** napad kako bi izvršili neželjenu akciju na veb aplikaciji. Na primer, ako korisnik ima otvorenu sesiju sa MegaTravel-om, napadač može da iskoristi tu sesiju da bi izvršio transakciju bez znanja korisnika.

2) **BAZA PODATAKA**
- **Injection Attacks (SQL injection)** napadi kako bi dobili neovlašćen pristup bazi, radi krađe ili izmene podataka.

3) **WIRELESS NETWORKS**
- **Rogue Access Points**
</br>Napadači mogu postaviti rogue access points na Wi-Fi mreži MegaTravel-a kako bi pratili komunikaciju ili dobili pristup internim sistemima.

4) **ZAPOSLENI (INSAJDERI)** 
</BR>Zaposleni su često zanemarena ulazna tačka napada. Oni mogu slučajno ili namerno otkriti osetljive informacije. Da bi se smanjio rizik od ovakvih napada, neophodno je obučavati zaposlene o sigurnosnim merama i praksama, kao i ograničiti prava pristupa osetljivim informacijama.

5) **THIRD-PARTY PROVIDERS**
</BR>Kao i zaposleni, third-party provajderi mogu postati ulazna tačka za napade. To je uglavnom zato što je teško direktno kontrolistati njihovu sigurnost. Ne samo da nemampo uticaj na to kako oni upravljaju našim podacima, već određeni provajderi mogu dalje prodavati te podatke.

# D. Data flow diagrams
# E. Analiza pretnji i migracije (Threat and migration)
