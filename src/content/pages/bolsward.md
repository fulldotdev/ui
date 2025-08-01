---
layout: /src/content/layouts/base.yaml
title: Home
image:
  src: /bolsward.jpg
  alt: "Hero 1"
blocks:
  - block: hero-1
    html: >-
      <h1>Het leukste <b>evenement</b> in <b>Bolsward</b> deze zomer</h1> <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    links:
      - text: Meld je nu aan
        href: /docs/
      - text: "Bekijk deelnemers"
        href: "#"
    image:
      src: /bolsward.jpg
      alt: "Hero 1"
  - block: features-1
    items:
      - icon: "check"
        title: Lorem ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      - icon: "check"
        title: Lorem ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      - icon: "check"
        title: Lorem ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  - block: tiles-2
    html: |
      <h2>Wie er al deelnemen</h2>
    items:
      - image:
          src: /bolsward.jpg
          alt: "Hero 1"
        title: Lorem ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      - image:
          src: /bolsward.jpg
          alt: "Hero 1"
        title: Lorem ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      - image:
          src: /bolsward.jpg
          alt: "Hero 1"
        title: Lorem ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  - block: contact-1
    html: |
      <h2>Meld je nu aan</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    links:
      - text: "info@bolsward.nl"
        href: "mailto:info@bolsward.nl"
      - text: "+316 12345678"
        href: "tel:+31612345678"
    socials:
      - "https://www.facebook.com/bolsward"
      - "https://www.instagram.com/bolsward"
    form:
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
      submit: Verstuur aanmelding
---
