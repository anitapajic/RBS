# Analiza i bezbednosni zahtevi

## 1. Authentication (ASVS 2.1)

### Naš sistem:
- Koristi se autentifikacija putem HTTP sesija.
- Autentifikacija korisnika vrši se prilikom svakog zahteva za kreiranje/izmenu ACL ili namespace konfiguracije.

### Moguća unapređenja:
- Implementacija JWT ili OAuth autentifikacije.

## 2. Session Management (ASVS 2.2)

### Naš sistem:
- Sesije korisnika se ne čuvaju na serveru, već se autentifikacija vrši prilikom svakog zahteva.

### Moguća unapređenja:
- Implementacija secure cookies i mehanizama zaštite sesija na strani servera.

## 3. Access Control (ASVS 2.3)

### Naš sistem:
- Implementirane su funkcije za kreiranje, izmenu i proveru ACL zapisa za objekte i korisnike.
- Koristi se LevelDB za skladištenje ACL zapisa.

### Moguća unapređenja:
- Princip najmanjih privilegija.

## 4. Data Protection (ASVS 2.4)

### Naš sistem:
- Podaci se čuvaju u JSON formatu u ConsulDB i LevelDB, ali nisu enkriptovani.
- Komunikacija između klijenta i servera se odvija preko HTTP protokola bez dodatne enkripcije.

### Moguća unapređenja:
- Implementirati SSL/TLS enkripciju za komunikaciju između klijenta i servera radi zaštite osetljivih podataka.
- Razmotriti enkripciju osetljivih podataka u bazi kako bi se osigurala zaštita podataka u mirovanju.

## 5. Configuration Management (ASVS 2.5)

### Naš sistem:
- Konfiguracioni podaci se čuvaju u ConsulDB-u.

### Moguća unapređenja:
- Vršiti redovne provere konzistentnosti i bezbednosti kofiguracije.

## 6. Error Handling and Logging (ASVS 2.6)

### Naš sistem:
- Implementirano osnovno vođenje logova za greške i zahteve.

### Moguća unapređenja:
- Implementirati detaljnije vođenje logova sa sigurnosnim informacijama..

## 7. Secure Communication (ASVS 2.7)

### Naš sistem:
- Komunikacija između klijenta i servera se odvija preko HTTP protokola bez dodatne enkripcije.

### Moguća unapređenja:
- Uvesti obaveznu upotrebu SSL/TLS protokola za sve komunikacije između klijenta i servera..
---

# Threat Model
![alt text](https://github.com/anitapajic/RBS/blob/main/images/ThreatModelProjekat.png?raw=true)
---

