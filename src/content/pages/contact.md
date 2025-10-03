---
sections:
  - variant: "1"
    html: <h1>!@ je nu aan</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua.</p>
    socials:
      - https://www.instagram.com/bolsward/
      - https://www.facebook.com/bolsward/
    form:
      action: /bedankt
      submit: Verstuur aanmelding
      fields:
        - type: text
          name: naam
          label: Name
          required: true
        - type: email
          name: email
          label: E-Mail
          required: false
        - type: tel
          name: telefoon
          label: Telefonnummer
          required: false
        - type: textarea
          name: bericht
          label: Bericht
    type: contact

---

