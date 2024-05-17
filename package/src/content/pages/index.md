---
_: $layouts.pages
head:
  title: Maak kennis met fitness bij sportschool The Gym in Haren
  description: >-
    Wil jij nu eindelijk écht (weer) fit worden? Start met fitness met een
    Gratis Proefles bij The Gym Haren, de sportschool voor echt resultaat in
    Haren e.o..

body.main:
  hero_section:
    _: $sections/main-hero
    image.src: /assets/thegymharen-hero.jpg
    content_stack.heading.html: Maak kennis met <br> <span>The Gym</span> in Haren
    content_stack.paragraph.html: Dé sportschool voor en met echte persoonlijke begeleiding!
    button_stack.buttons:
      - html: Gratis proefles
        href: /contact/gratis-proefles/
      - _color: secondary
        html: Lidmaatschapstest
        href: /contact/lidmaatschapstest/

  beloftes_section:
    stack.heading.html: Onze 4 beloftes
    stack.button:
      html: Bekijk alle beloftes
      href: /beloftes/
    deck.cards:
      - icon.name: coffee
        heading.html: Een club waar je ook kunt sporten
        paragraph.html: >-
          We zijn een club waar persoonlijk contact en plezier net zo belangrijk
          zijn als de oefeningen zelf.
      - icon.name: eye-bolt
        heading.html: Goed dat je er bent!
        paragraph.html: >-
          Onze trainers kennen je naam en helpen jou je welkom te voelen. Of je
          nou 1 keer per week of 1 keer per dag komt sporten, of je sporten leuk
          vindt of niet: wij zijn er voor je.
      - icon.name: mood-heart
        heading.html: We maken er wat van
        paragraph.html: >-
          Niks is perfect, wij ook niet. Met ons enthousiasme en onze passie om
          jou te helpen, proberen we uit iedere situatie het beste te halen.
      - icon.name: ease-in-control-point
        heading.html: Iedere dag 1% beter
        paragraph.html: >-
          Bij ons geloven we in elke dag een beetje beter worden. Niet alleen
          voor jou, maar voor ons allemaal.
    _: $sections/features
---