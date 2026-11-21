// Service page copy (moved from the individual page files). No runtime imports (unit-tested with node --test).
import type { ServiceSlug } from "./services";

export interface ServiceContent {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** qualifier shown after the live price range (the numbers come from admin prices) */
  priceNote: string;
  features: string[];
  process: { step: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICE_CONTENT: Record<ServiceSlug, ServiceContent> = {
  pavaje: {
    "metaTitle": "Pavaje și Alei Timișoara",
    "metaDescription": "Montaj pavaje, alei și terase din pavele în Timișoara. Pregătire bază și compactare incluse. Ofertă personalizată. Sună: 0747 469 681",
    "intro": "Alei, terase, intrări auto și borduri din pavele, montate pe bază compactată și pat de nisip. Lucrăm curat, cu pantă pentru scurgerea apei, ca pavajul să rămână drept ani la rând.",
    "priceNote": "Ofertă personalizată, în funcție de suprafață, tipul pavelei și pregătirea bazei",
    "features": [
      "Alei, terase și intrări auto",
      "Bază din piatră spartă, compactată în straturi",
      "Pat de nisip nivelat și pantă pentru scurgerea apei",
      "Borduri și margini fixate",
      "Compactare finală și rosturi umplute cu nisip",
      "Transport și evacuarea pământului excavat"
    ],
    "process": [
      {
        "step": "Măsurare",
        "desc": "Măsurăm suprafața, stabilim cotele și tipul de pavele."
      },
      {
        "step": "Excavare",
        "desc": "Săpăm la adâncimea potrivită și așezăm bordurile."
      },
      {
        "step": "Bază",
        "desc": "Compactăm straturile de piatră și nivelăm patul de nisip."
      },
      {
        "step": "Montaj",
        "desc": "Așezăm pavelele, compactăm și umplem rosturile."
      }
    ],
    "faq": [
      {
        "q": "Cât costă montajul pavajului?",
        "a": "Prețul depinde de suprafață, tipul pavelei și cât de multă pregătire are nevoie terenul. Venim gratuit la evaluare și îți dăm oferta exactă."
      },
      {
        "q": "Cât durează lucrarea?",
        "a": "O alee sau o terasă obișnuită se finalizează de regulă în câteva zile, în funcție de suprafață și de pregătirea bazei."
      },
      {
        "q": "Furnizați și pavelele?",
        "a": "Da, putem aduce noi materialele sau putem lucra cu pavelele alese de tine."
      }
    ]
  },
  "tuns-gazon": {
    "metaTitle": "Tuns Gazon Profesional Timișoara",
    "metaDescription": "Servicii profesionale de tuns gazon în Timișoara. Echipamente moderne, rezultate impecabile. De la 0.50 lei/mp. Sună: 0747 469 681",
    "intro": "Gazon impecabil, tuns cu echipamente profesionale de ultimă generație. Oferim servicii regulate de întreținere sau intervenții punctuale, cu colectarea completă a resturilor vegetale.",
    "priceNote": "Prețul minim se aplică suprafețelor mari.",
    "features": [
      "Echipament ride-on profesional Viking/Stihl",
      "Tundere cu efect de dungi (striping)",
      "Colectare completă a resturilor vegetale",
      "Contur curat la margini cu trimmer",
      "Abonamente lunare cu preț redus",
      "Intervenții rapide — programare în 2-3 zile"
    ],
    "process": [
      {
        "step": "Evaluare",
        "desc": "Măsurăm suprafața și evaluăm starea gazonului."
      },
      {
        "step": "Pregătire",
        "desc": "Curățăm zona de obiecte și verificăm echipamentul."
      },
      {
        "step": "Tundere",
        "desc": "Tundem la înălțimea optimă cu echipament profesional."
      },
      {
        "step": "Finisare",
        "desc": "Conturăm marginile, colectăm resturile și curățăm."
      }
    ],
    "faq": [
      {
        "q": "Cât de des trebuie tuns gazonul?",
        "a": "În sezon (aprilie-octombrie), ideal o dată pe săptămână sau la 10-14 zile. Iarna, gazonul nu necesită tundere."
      },
      {
        "q": "La ce înălțime tundeți?",
        "a": "Recomandăm 3-5 cm în funcție de tipul gazonului și anotimp. Vara menținem mai înalt (5 cm) pentru a proteja rădăcinile."
      },
      {
        "q": "Oferiți abonamente?",
        "a": "Da! Abonamentele lunare includ 2-4 tunderi pe lună la preț preferențial. Contactați-ne pentru o ofertă personalizată."
      }
    ]
  },
  scarificare: {
    "metaTitle": "Scarificare & Aerisire Gazon Timișoara",
    "metaDescription": "Scarificare și aerisire profesională a gazonului în Timișoara. Eliminăm mușchiul și regenerăm gazonul. De la 1 leu/mp. Sună: 0747 469 681",
    "intro": "Regenerăm gazonul prin eliminarea mușchiului, a feltru-lui și a resturilor vegetale acumulate. Aerisirea permite rădăcinilor să respire și să absoarbă nutrienții eficient.",
    "priceNote": "",
    "features": [
      "Scarificare mecanică profesională",
      "Aerisire prin perforare la adâncime",
      "Eliminare completă a mușchiului",
      "Îndepărtare strat de feltru acumulat",
      "Recomandări pentru supraînsămânțare",
      "Rezultate vizibile în 2-3 săptămâni"
    ],
    "process": [
      {
        "step": "Diagnostic",
        "desc": "Evaluăm starea gazonului și gradul de compactare."
      },
      {
        "step": "Scarificare",
        "desc": "Trecem cu scarificatorul pentru a elimina mușchiul și feltru-l."
      },
      {
        "step": "Aerisire",
        "desc": "Perforăm solul pentru a permite circulația aerului."
      },
      {
        "step": "Finalizare",
        "desc": "Colectăm deșeurile și recomandăm pașii următori."
      }
    ],
    "faq": [
      {
        "q": "Când este cel mai bun moment pentru scarificare?",
        "a": "Primăvara (martie-aprilie) și toamna (septembrie-octombrie) sunt perioadele ideale, când gazonul crește activ."
      },
      {
        "q": "Cât durează recuperarea gazonului?",
        "a": "Gazonul poate arăta mai rău în primele 7-10 zile, dar se regenerează complet în 2-4 săptămâni cu udare regulată."
      },
      {
        "q": "Trebuie să supraînsămânțez după scarificare?",
        "a": "Recomandăm supraînsămânțarea pentru a umple zonele rare. Putem face acest lucru ca serviciu adițional."
      }
    ]
  },
  "gazon-rulou": {
    "metaTitle": "Montaj Gazon Rulou Timișoara",
    "metaDescription": "Montaj gazon rulou natural în Timișoara. Pregătire teren inclusă. De la 20 lei/mp. Sună: 0747 469 681",
    "intro": "Montaj profesional de gazon rulou natural. Pregătirea terenului este inclusă: nivelare, substrat, compactare. Rezultat instant — gazon verde din prima zi.",
    "priceNote": "Pregătirea terenului este inclusă.",
    "features": [
      "Gazon rulou natural — soi rezistent, grosime uniformă",
      "Pregătire completă a terenului (nivelare, substrat, compactare)",
      "Montaj profesional fără rosturi vizibile",
      "Transport inclus în Timișoara și împrejurimi"
    ],
    "process": [
      {
        "step": "Măsurare",
        "desc": "Venim la fața locului, măsurăm suprafața și evaluăm terenul."
      },
      {
        "step": "Pregătire",
        "desc": "Săpăm, nivelăm, adăugăm substrat și compactăm."
      },
      {
        "step": "Montaj",
        "desc": "Montăm gazonul rulou/artificial cu precizie, fără rosturi."
      },
      {
        "step": "Predare",
        "desc": "Udăm abundent (rulou) și oferim instrucțiuni de îngrijire."
      }
    ],
    "faq": [
      {
        "q": "Cât durează montajul?",
        "a": "Pentru 100-200 mp, lucrarea se finalizează în 1-2 zile, inclusiv pregătirea terenului."
      },
      {
        "q": "Gazonul rulou prinde ușor?",
        "a": "Da, cu udare corectă (de 2 ori pe zi în primele 2 săptămâni), gazonul se înrădăcinează complet în 2-3 săptămâni."
      },
      {
        "q": "Când este cel mai bun moment pentru montaj?",
        "a": "Primăvara (martie–mai) și toamna (septembrie–octombrie) sunt ideale. Vara se poate monta, cu udare mai intensă în primele săptămâni."
      }
    ]
  },
  "gazon-artificial": {
    "metaTitle": "Montaj Gazon Artificial Timișoara",
    "metaDescription": "Montaj gazon artificial premium în Timișoara, cu drenaj și pregătire teren. De la 40 lei/mp. Sună: 0747 469 681",
    "intro": "Gazon artificial premium pentru terase, curți și locuri de joacă: verde tot anul, fără udare și fără tuns. Pregătim baza, montăm cu drenaj și fixăm îmbinările la milimetru.",
    "priceNote": "În funcție de tipul gazonului și de bază.",
    "features": [
      "Gazon artificial premium — UV rezistent, 10+ ani durabilitate",
      "Sistem drenaj integrat (gazon artificial)",
      "Bază din piatră compactată și membrană anti-buruieni",
      "Îmbinări lipite și margini fixate, fără rosturi vizibile",
      "Potrivit pentru terase, balcoane și locuri de joacă",
      "Transport inclus în Timișoara și împrejurimi"
    ],
    "process": [
      {
        "step": "Măsurare",
        "desc": "Măsurăm suprafața și alegem împreună tipul de gazon."
      },
      {
        "step": "Pregătire",
        "desc": "Săpăm, așezăm baza de piatră, compactăm și punem membrana."
      },
      {
        "step": "Montaj",
        "desc": "Întindem gazonul, lipim îmbinările și fixăm marginile."
      },
      {
        "step": "Finisare",
        "desc": "Periem firele, adăugăm nisip de umplere și curățăm zona."
      }
    ],
    "faq": [
      {
        "q": "Ce avantaje are gazonul artificial?",
        "a": "Zero întreținere, fără udare, aspect verde tot anul, durabilitate 10+ ani. Ideal pentru zone cu umbră sau trafic intens."
      },
      {
        "q": "Cât rezistă gazonul artificial?",
        "a": "Gazonul premium pe care îl montăm este rezistent la UV și are o durabilitate de peste 10 ani."
      },
      {
        "q": "Se poate monta peste beton sau pavaj?",
        "a": "Da, pe suprafețe dure folosim un strat de amortizare și asigurăm scurgerea apei prin drenaj."
      }
    ]
  },
  "gard-viu": {
    "metaTitle": "Tuns Gard Viu Timișoara",
    "metaDescription": "Tuns și modelare gard viu profesional în Timișoara. Forme geometrice perfecte. De la 5 lei/ml. Sună: 0747 469 681",
    "intro": "Modelare precisă a gardurilor vii, de la forme simple la geometrice complexe. Menținem înălțimea uniformă și densitatea optimă pentru un aspect impecabil tot anul.",
    "priceNote": "În funcție de înălțimea gardului viu.",
    "features": [
      "Modelare geometrică precisă",
      "Tundere la înălțime uniformă",
      "Echipament profesional (foarfece de gard viu motorizate)",
      "Lucru la înălțime cu scări profesionale",
      "Curățare completă după tundere",
      "Întreținere periodică cu abonament"
    ],
    "process": [
      {
        "step": "Măsurare",
        "desc": "Evaluăm lungimea, înălțimea și starea gardului viu."
      },
      {
        "step": "Pregătire",
        "desc": "Protejăm zonele adiacente și pregătim echipamentul."
      },
      {
        "step": "Tundere",
        "desc": "Modelăm gardul viu la forma și înălțimea dorită."
      },
      {
        "step": "Finisare",
        "desc": "Curățăm resturile și verificăm uniformitatea."
      }
    ],
    "faq": [
      {
        "q": "Cât de des trebuie tuns gardul viu?",
        "a": "De 2-3 ori pe an: primăvara (aprilie-mai), vara (iulie) și opțional toamna (septembrie). Speciile viguroase pot necesita tunderi mai frecvente."
      },
      {
        "q": "Ce specii de gard viu tăiați?",
        "a": "Toate speciile: tuia, leyland cypress, laur, buxus, ligustrum, carpinus și multe altele."
      },
      {
        "q": "Puteți tunde garduri vii foarte înalte?",
        "a": "Da, avem echipament telescopic și scări profesionale pentru garduri de până la 5-6 metri."
      }
    ]
  },
  "toaletare-pomi": {
    "metaTitle": "Toaletare Pomi și Arbuști Timișoara",
    "metaDescription": "Toaletare profesională a pomilor și arbuștilor în Timișoara. Tăiere de formare, eliminare ramuri uscate. De la 50 lei/buc. Sună: 0747 469 681",
    "intro": "Tăiere profesională, modelare și întreținere a pomilor și arbuștilor pentru un aspect sănătos și estetic. Lucrăm cu echipament specializat și respectăm perioadele optime de tăiere.",
    "priceNote": "În funcție de dimensiunea pomului.",
    "features": [
      "Tăiere de formare și întreținere",
      "Eliminare ramuri uscate sau bolnave",
      "Modelare estetică a coroanei",
      "Echipament profesional (drujbe, foarfece telescopice)",
      "Curățare completă după lucrare",
      "Consultanță pentru îngrijire ulterioară"
    ],
    "process": [
      {
        "step": "Inspecție",
        "desc": "Evaluăm starea pomilor și stabilim tipul de tăiere necesar."
      },
      {
        "step": "Planificare",
        "desc": "Discutăm cu clientul forma dorită și securizăm zona."
      },
      {
        "step": "Tăiere",
        "desc": "Efectuăm tăierile cu echipament profesional, respectând tehnica corectă."
      },
      {
        "step": "Curățenie",
        "desc": "Colectăm toate ramurile tăiate și lăsăm zona curată."
      }
    ],
    "faq": [
      {
        "q": "Când este cel mai bun moment pentru toaletare?",
        "a": "Pomii fructiferi se taie iarna (ianuarie-martie). Arbuștii ornamentali se pot tăia primăvara sau toamna."
      },
      {
        "q": "Puteți tăia pomi foarte înalți?",
        "a": "Da, avem echipament pentru lucru la înălțime (scări, platforme, echipament de alpinism). Contactați-ne pentru evaluare."
      },
      {
        "q": "Colectați și ramurile tăiate?",
        "a": "Da, colectarea și evacuarea resturilor vegetale sunt incluse în preț."
      }
    ]
  },
  plantari: {
    "metaTitle": "Plantări Profesionale Timișoara",
    "metaDescription": "Plantări profesionale de flori, arbuști și copaci în Timișoara. Design peisagistic complet. De la 15 lei/mp. Sună: 0747 469 681",
    "intro": "Serviciu complet de plantare: de la design peisagistic până la plantarea efectivă de flori, arbuști, copaci și plante ornamentale. Creăm grădina visurilor tale cu plante selectate pentru clima Timișoarei.",
    "priceNote": "Include plante și manoperă.",
    "features": [
      "Design peisagistic personalizat",
      "Selecție plante adaptate climei locale",
      "Pregătire teren și substrat nutritiv",
      "Plantare profesională cu fixare",
      "Mulcire cu scoarță decorativă",
      "Sfaturi detaliate pentru întreținere"
    ],
    "process": [
      {
        "step": "Consultanță",
        "desc": "Discutăm preferințele, evaluăm terenul și expunerea la soare."
      },
      {
        "step": "Design",
        "desc": "Propunem un plan de plantare cu specii și aranjament."
      },
      {
        "step": "Plantare",
        "desc": "Pregătim solul, plantăm și fixăm fiecare plantă."
      },
      {
        "step": "Finisare",
        "desc": "Aplicăm mulci, udăm și oferim instrucțiuni de îngrijire."
      }
    ],
    "faq": [
      {
        "q": "Ce plante recomandați pentru Timișoara?",
        "a": "Lavandă, rozmarin, tuia, buxus, hortensie, ierburi ornamentale — toate rezistente la clima continentală."
      },
      {
        "q": "Includeți și plantele în preț?",
        "a": "Da, prețul include plantele, substratul și manopera. Putem lucra și cu plante cumpărate de client."
      },
      {
        "q": "Oferiți garanție pentru plante?",
        "a": "Oferim garanție pentru plantele achiziționate de noi, cu condiția respectării instrucțiunilor de îngrijire."
      }
    ]
  },
  irigatii: {
    "metaTitle": "Sisteme de Irigații Timișoara",
    "metaDescription": "Proiectare și montaj sisteme de irigații automate în Timișoara. Aspersoare, picurare, programatoare smart. De la 8 lei/mp. Sună: 0747 469 681",
    "intro": "Proiectare, montaj și întreținere sisteme automate de irigații. De la aspersoare pop-up până la sisteme de picurare inteligente cu senzori de umiditate. Economisești apă și timp.",
    "priceNote": "În funcție de complexitate.",
    "features": [
      "Proiectare personalizată pe zone de udare",
      "Aspersoare pop-up și rotative",
      "Sisteme de picurare pentru straturi",
      "Programatoare automate cu mai multe zone",
      "Senzori de umiditate și ploaie",
      "Garanție și service post-montaj"
    ],
    "process": [
      {
        "step": "Proiectare",
        "desc": "Analizăm grădina, zonele de soare/umbră și tipul plantelor."
      },
      {
        "step": "Instalare",
        "desc": "Săpăm tranșee, montăm conducte, aspersoare și programator."
      },
      {
        "step": "Programare",
        "desc": "Configurăm zonele de udare, durata și frecvența."
      },
      {
        "step": "Testare",
        "desc": "Testăm fiecare zonă și instruim clientul pentru utilizare."
      }
    ],
    "faq": [
      {
        "q": "Cât durează montajul?",
        "a": "Pentru o grădină de 200-500 mp, montajul durează 2-4 zile, în funcție de complexitate și numărul de zone."
      },
      {
        "q": "Ce marcă de echipamente folosiți?",
        "a": "Lucrăm cu branduri de top: Hunter, Rain Bird, Gardena. Toate componentele vin cu garanție."
      },
      {
        "q": "Pot controla irigația de pe telefon?",
        "a": "Da, putem instala programatoare smart WiFi (Hunter HC, Rain Bird ESP-TM2) controlabile din aplicație."
      }
    ]
  },
};
