---
# TODO @lenard hieronder een voorbeeld van hoe de pagina structuur er denk ik uit moet komen te zien
# Ik heb er nog niet veel uren in gestoken, dus denk ook vooral na of dingen beter zijn en of we nog dingen over het hoofd zien

# Een uitdaging met obejct is bijvoorbeeld dat je maar max 1 dezelfde key kan. Stel je wilt een section aan het begin en aan het eimd, hoe doe je dat dan?
# Een oplossing kan zijn dat een section wordt genereate voor elke key die EINIGT in section, dus bijboorbeeld hero_section, cta_section,
# Een andere oplossing kan zijn een key "component" toevoegen, waarin je aangeeft welk component gerenderd moet wroden
# Best is denk ik een combinatie. By default wordt gekeken naar de keyname, overwritable door "component"

# Bovenstaande geldt niet alleen voor sections, maar voor elk component

# Misschien moeten we ook een Div component maken. Wanneer er dan geen component wordt gevonden, zowel bij object name als bij "component", dan wordt er een div gerenderd

# Hieronder staan 2 cobject: head en body. head rendert letterijk de <head> eelement
head:
  title: $this.title
  description:
  image: 

# body rendert letterijk de <body> eelement. Aleen wat in de body staat wordt als component gerenderd! 
body:
  header: 
    logo:
    links:
      - html: Home
        href: /
      - html: About
        href: /about
      - html: Contact
        href: /contact
    buttons:
      - html: Sign Up
        href: /signup
      - html: Log In
        href: /login

  main:
    hero:
      component: Section # hero is geen component, daarom moet je een component toevoegen
      tagline: 
      heading:
      text:
      image:
        src:
        alt:
    sections:
      - tagline:
        heading:
        text:
        image:
          src:
          alt:
      - tagline:
        heading:
        text:
        image:
          src:
          alt:
    cta: # cta is ook geen component, daarom moet je een component toevoegen
      component: Section # hero is geen component, daarom moet je een component toevoegen
      tagline: 
      image:
        src:
        alt:
    blocks:
      - component: Section # blocks is is een onbekende key, dus ook hier component toevoegen
        tagline:
        heading:
        text:
        image:
          src:
          alt:
    more_sections: # more_sections eindigt in sections, dus we weten dat dit dezelfde structuur heeft als sections. Component naam toevoegen is dus niet nodig
      - tagline:
        heading:
        text:
        image:
          src:
          alt:
---
