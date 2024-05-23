RBS – ZADATAK 7

# Zip Slip vulnerability (CVE-2007-4559)


# Test okruženje
1. **Python aplikacija sa '/upload' endpointom:** 
   * Endpoint ***@app.route('/upload', methods=['POST'])*** prima tar fajl i ekstraktuje ga u 'extracted' direktorijum
3. **React aplikacija sa formom za upload fajla:**
   * Jednostavna forma koristi 'POST' metodu za slanje fajla na Python backend.
  
5. **Burp Suite instalacija:**
   * Burp Suite je postavljen da sluša na **127.0.0.1:8080** i proxy je pravilno podešen.
   * React aplikacija je otvorena u Burp embedded Chrome browseru.  


# Testiranje Zip Slip ranjivosti
Presretanje requesta i izmena u Burp Suite-u:

1. Prvo smo submitovale legitiman tar fajl.

![alt text](https://github.com/anitapajic/RBS/blob/main/images/presretnut_request.png?raw=true)
   
2. Presrele smo request i izmenile ga u Burp Suite-u.

![alt text](https://github.com/anitapajic/RBS/blob/main/images/izmenjen_request.png?raw=true)

3. Dobijen response

![alt text](https://github.com/anitapajic/RBS/blob/main/images/dobijen_response.png?raw=true)




