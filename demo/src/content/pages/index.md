---
head:
  title: Lorem ipsum
  description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
  image:
sections.items:
  - frame: screen
    size: 4
    align: center
    direction: row
    title: The Gym Haren
    composite.display.writeup.title.html: Maak kennis met The Gym in Haren
    composite.display.writeup.description.html: Dé sportschool voor echte persoonlijke begeleiding!
    _composite.display.writeup.description.contrast: true
    __composite.action.button:
      contrast: true
      color: lorem
    composite.action.buttons.items:
      - html: Gratis proefles
        href: /forms/gratis-proefles
      - html: Lidmaatschapstest
        href: /forms/lidmaatschapstest
        icon: 
          name: arrow-right
          color: base
          _color: accent
    image.src: https://picsum.photos/800/600
    _image:
      position: background
      mask: true
  - align: start
    composite.display.writeup.title.html: Onze 4 beloftes
    # _button:
    #   color: accent
    # composite:
    #   direction: row
    # buttons:
    #   - button: Bekijk alle beloftes
    #     href: /beloftes
    # _cards:
    #   layout: row
    # _card:
    #   _icon:
    #     color: accent
    cards.items:
      - composite.display.writeup.title.html: Een club waar je ook kunt sporten
        composite.display.writeup.description.html: We zijn een club waar persoonlijk contact en plezier net zo belangrijk zijn als de oefeningen zelf.
        composite.display.icon.name: friends
        _composite.display.icon.color: accent
        # _icon:
        #   color: accent
        # composite.display.writeup.title: Een club waar je ook kunt sporten
        # description: >-
        #   We zijn een club waar persoonlijk contact en plezier net zo belangrijk
        #   zijn als de oefeningen zelf.
      # - icon: friends
      #   _icon:
      #     color: accent
      #   title: Bij ons word je gezien
      #   description: >-
      #     Onze trainers kennen je naam en helpen jou je welkom te voelen. Of je
      #     nou 1 keer per week of 1 keer per dag komt sporten, of je sporten leuk
      #     vindt of niet: wij zijn er voor je.
      # - icon: friends
      #   _icon:
      #     color: accent
      #   title: We maken er wat van
      #   description: >-
      #     Niks is perfect, wij ook niet. Met ons enthousiasme en onze passie om
      #     jou te helpen, proberen we uit iedere situatie het beste te halen.
      # - icon: friends
      #   _icon:
      #     color: accent
      #   title: Iedere dag 1% beter
      #   description: >-
      #     Bij ons geloven we in elke dag een beetje beter worden. Niet alleen
      #     voor jou, maar voor ons allemaal.
  # - title: Ons aanbod
  #   _card: # TODO werkend maken, wordt niet toegepast. Geldt ook voor button. Het komt omdat button en _button niet worden opgenomen in action. Action import nameljk allen meervoud. Zie Action.astro
  #     frame: panel
  #     look: soft
  #   _cards:
  #     layout: grid
  #   cards: services
  # - collection: forms
  #   slug: contact
  #   look: soft
  # - direction: row
  #   align: center
  #   title: The Gym plaats een ijsbaan in Haren!
  #   description: >-
  #     Lorem ipsum dolor sit amet consectetur. Ac turpis euismod pellentesque
  #     tempor sed augue. Nam tellus id diam suspendisse vulputate. Lorem ipsum
  #     dolor sit amet consectetur. Ac turpis euismod pellentesque tempor sed
  #     augue. Nam tellus id diam suspendisse vulputate.
  #   buttons:
  #     - button: Kom kennismaken
  #       href: /forms/kennismaken
  #     - button: Over ons team
  #       href: /over-ons
  #   image: https://picsum.photos/800/600
  # - align: start
  #   _composite:
  #     direction: row
  #   title: Wat onze leden zeggen
  #   buttons:
  #     - button: Past het ook bij jou?
  #       href: /forms/lidmaatschapstest
  #   cards: reviews
  #   _cards:
  #     layout: masonry
  #     frame: panel
  # - direction: row
  #   align: center
  #   title: Over The Gym Haren
  #   description: >-
  #     The Gym Haren helpt leden weer fitter, gezonder en/of slanker te worden.
  #     En te blijven. Onze trainers staan garant voor 100% persoonlijke
  #     begeleiding. Of het nou gaat over weer fit worden, afvallen of meer in
  #     balans leven. Interesse? Start dan nu met een Gratis Proefles. Of wil je
  #     eerst ontdekken wat bij je past? Doe dan de lidmaatschapstest. Stel in
  #     ieder geval niet langer uit, want heel eerlijk, je bent al best een tijd
  #     bezig met uitstellen… Toch? Daarom, vandaag start jouw gezondere
  #     leefstijl! The Gym in Haren is de plek waar we je helpen je doelen te
  #     behalen.
  #   image: https://picsum.photos/800/600
---
