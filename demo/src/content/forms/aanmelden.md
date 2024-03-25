---
id: aanmelden-formulier
composite.display.writeup.title.html: Meld je nu aan
align: center
composite.display.writeup.description.html: We nemen binnen 1 werkdag persoonlijk contact met je op.
form:
  fields.items:
    - label.html: Voornaam
      input: voornaam
      required: true
    - label.html: Achternaam
      input: achternaam
      required: true
    - label.html: Email
      input: email
      type: email
      required: true  
    - label.html: Telefoonnummer
      input: telefoon
      type: tel
      required: true  
    - label.html: Woonplaats
      input: woonplaats
      required: true  
    - label.html: Postcode
      input: postcode
      required: true  
    - label.html: Straat + huisnummer
      input: straat
      required: true 
    - label.html: Gebooortedatum
      input: geboortedatum
      type: date
      required: true  
  button:
    html: Verstuur
    href: "#"
---
