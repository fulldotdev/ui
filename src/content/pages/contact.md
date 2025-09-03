---
blocks:
  - block: contact-1
    html: |
      <h1>Meld je nu aan</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    items:
      - title: Mailen
        description: "info@bolsward.nl"
        href: "mailto:info@bolsward.nl"
      - title: Telefoon
        description: "+316 12345678"
        href: "tel:+31612345678"
    form:
      submit: Verstuur aanmelding
      action: /bedankt
      fields:
        - name: naam
          type: text
          label: Name
          required: true
        - name: email
          type: email
          label: E-Mail
          required: false
        - name: telefoon
          type: tel
          label: Telefonnummer
          required: false
        - name: bericht
          type: textarea
          label: Bericht
---
