// Lingua e prenotazione guidata sono memorizzate nel browser (localStorage) per passare da una pagina all'altra
const LANG_KEY = 'cg_lang';
const BOOKING_KEY = 'cg_prenotazione';
const BOOKING_MAX_AGE_MS = 6 * 60 * 60 * 1000; // una richiesta non usata scade dopo 6 ore
let currentLang = (() => { try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'it'; } catch (e) { return 'it'; } })();

function saveBooking(data) {
    try { localStorage.setItem(BOOKING_KEY, JSON.stringify(Object.assign({ ts: Date.now() }, data))); } catch (e) { /* storage non disponibile */ }
}
function readBooking() {
    try {
        const d = JSON.parse(localStorage.getItem(BOOKING_KEY) || 'null');
        return d && d.tipo && Date.now() - d.ts < BOOKING_MAX_AGE_MS ? d : null;
    } catch (e) { return null; }
}
function clearBooking() {
    try { localStorage.removeItem(BOOKING_KEY); } catch (e) { /* ignora */ }
}

const translations = {
    it: {
        "nav-about": "Chi Siamo?",
        "nav-guides": "Schede Allevamento",
        "nav-available": "Disponibilità",
        "nav-shows": "Programma Fiere",
        "nav-contact": "Contatti",
        "hero-title": "Passione, Etica e <span class=\"title-green\">Selezione</span>",
        "hero-desc": "Specializzati nel settore dei rettili esotici. Focalizzati soprattutto sul genere <span class=\"text-brandYellow font-semibold\">Eublepharis</span>, in particolar modo nella selezione degli <span class=\"text-brandYellow font-semibold\">Eublepharis macularius</span> (Geco leopardino).",
        "hero-btn-available": "Vedi esemplari disponibili",
        "hero-btn-guides": "Schede guida",
        "follow-us": "Seguici su:",
        "feat-1-title": "Linee Selettive",
        "feat-1-desc": "Linee genetiche tracciate e selezionate negli anni.",
        "feat-2-title": "Supporto e Etica",
        "feat-2-desc": "Formazione completa e personalizzata pre e post-cessione per garantire la salute ottimale dell'animale.",
        "feat-3-title": "Consegne e Ritiri",
        "feat-3-desc": "Offriamo varie soluzioni tra cui il ritiro direttamente in allevamento o presso le <a href=\"fiere.html\" class=\"text-brandYellow underline hover:text-brandGreen font-semibold whitespace-nowrap inline-block align-baseline\">fiere di settore</a> a cui partecipiamo. È possibile trovare soluzioni per eventuali trasporti.",
        "feat-3-transport": "È possibile trovare soluzioni per eventuali trasporti",
        "resources-title": "Link e Risorse Utili",
        "resources-subtitle": "Approfondimenti, guide genetiche e associazioni di riferimento per gli appassionati di gechi e rettili.",
        "iga-main-desc": "L'associazione nazionale di riferimento per la tutela, lo studio e la divulgazione del mondo dei gechi in Italia.",
        "iga-site-title": "Sito Ufficiale",
        "iga-site-sub": "Home dell'Associazione",
        "iga-member-title": "Tesseramento Socio",
        "iga-member-sub": "Unisciti all'associazione",
        "iga-vet-title": "Elenco Veterinari",
        "iga-vet-sub": "Medici esperti nel territorio",
        "iga-5x1000-title": "Donazione 5x1000",
        "iga-5x1000-sub": "Sostieni i progetti IGA",
        "res-1-title": "Planet Morph",
        "res-1-desc": "La guida di riferimento completa e dettagliata alla genetica e ai morph del geco leopardino (Eublepharis macularius).",
        "visit-site": "Esplora la guida ai Morph",
        "about-title": "CHI SIAMO?",
        "about-sec1-title": "L'allevamento",
        "about-sec1-body": `<p><strong class="text-brandGreen">ChrisGeckos</strong> è un allevamento sorto nel 2020 in provincia di Treviso, da un'avventura iniziata qualche anno prima, divenuta subito una passione.</p><p>Con il nostro allevamento, siamo presenti durante l'anno alla maggior parte degli eventi espositivi del nord / centro-nord d'Italia, potete verificare la presenza consultando l'apposita sezione "Programma fiere", o venirci a trovare direttamente in sede.</p><p>L'allevamento è per la maggior parte incentrato sulla specie <em class="text-brandYellow">Eublepharis macularius</em> (Geco leopardino) con cui è partito il nostro viaggio nel mondo dei rettili. In allevamento abbiamo varie linee genetiche/selettive con le quali lavoriamo con buoni risultati, una su tutte il morph <strong class="text-brandGreen">Red&Green</strong>, selezione che da anni portiamo avanti.</p><p>Nel 2022 l'allevamento è stato implementato con altre specie di geco: <em class="text-brandYellow">Paroedura picta</em>, <em class="text-brandYellow">Correlophus ciliatus</em> (Geco crestato), <em class="text-brandYellow">Rhacodactylus auriculatus</em> (Geco gargoyle).</p><p>Nel corso del 2025/2026 entrano in allevamento diverse sottospecie del genere <span class="text-brandYellow font-semibold">Eublepharis</span> come <em class="text-brandYellow">montanus</em>, <em class="text-brandYellow">fuscus</em> e <em class="text-brandYellow">angramainyu</em> di diverse località.</p>`,
        "about-sec2-title": "La nostra etica",
        "about-sec2-body": `<p>In un mondo in cui l'animale non convenzionale viene visto con timore, in un ambiente dove spesso regnano i pregiudizi, crediamo che solo mettendo in campo competenze divulgative, si possa fare la differenza. Riteniamo che il rapporto umano sia fondamentale, pertanto ci siamo sempre impegnati per assicurarci di fornire ai nuovi proprietari il massimo del supporto.</p><p class="border-l-4 border-brandYellow pl-4 italic text-gray-300">"Viene fatta formazione pre-cessione a 360° e fornito supporto post-cessione, preparare bene l'acquirente significa garantire le cure ottimali per l'animale ceduto."</p>`,
        "about-sec3-title": "Un servizio completo",
        "about-sec3-body": `<p>L'allevamento conta varie specie di gechi, disponiamo di animali con genetiche e selezioni importanti, ma anche con genetiche più comuni, animali deserticoli o umidi, per poter accontentare tutti.</p><p>Il cliente finale riceve sempre il massimo del supporto, al fine di rendere l'esperienza positiva. Per facilitare il neofita offriamo tutto il necessario per una corretta stabulazione, dal terrario ai vari accessori e supplementi alimentari. Collaboriamo regolarmente con altri allevatori e artigiani per i clienti più esigenti.</p>`,
        "about-sec4-title": "ChrisGeckos... Le origini",
        "about-sec4-body": `<p>Da sempre appassionato dalla tecnologia, dagli animali e dal concetto di vita stessa. Dopo aver abbandonato nel 2015 con dispiacere, nonostante gli ottimi risultati, un percorso come allevatore di cani di razza Boxer, l'avvicinamento al mondo degli animali non convenzionali, avvenne per puro caso.</p><p>L'avventura nasce, a seguito di una curiosità sorta nel 2018, quando mia figlia di allora 4 anni, mi pose la fatidica domanda: <span class="text-brandYellow font-semibold">"papà cos'è un geco?"</span>, da lì iniziarono documentazioni video e cartacee, susseguite poi in ore di ricerche nel web in cui la curiosità e la voglia di sapere aumentarono.</p><p>Da lì in poi il passo fu breve, con l'acquisto dei primi esemplari di leopardino da gestire assieme a mia figlia. Con il passare delle settimane però, questi animali iniziarono a piacermi sempre di più e ne susseguì l'ingresso nei primi forum e pagine social, la scoperta delle fiere espositive, i primi contatti con gli allevatori e infine la scoperta dei morph...</p><p>Tutto questo portò nel breve periodo ad un graduale arrivo in casa di svariati esemplari e il conseguente bisogno di creare nuovi spazi, iniziò così verso la metà del 2019 la creazione delle prime strutture e sorse l'idea di iniziare a riprodruire questi fantastici animali. Iniziai quindi a contattare vari allevatori, che si dimostrarono fin da subito molto disponibili, iniziando così a reperire informazioni anche dal lato pratico, visitando vari allevamenti e imparando metodologies e scuole di pensiero diverse.</p><p>Nel 2020 iniziarono le prime schiuse e con il supporto di allevatori già rodati le spiegazioni per identificare i vari morph, le prime cessioni, le prime un po' timide spiegazioni e iniziai a partecipare alle fiere come supporto ad altri allevatori.</p><p>Dopo quindi un anno di gavetta, grazie all'esperienza accumulata, nel 2021 nacque l'allevamento di gechi "ChrisGeckos", vennero costruite nuove strutture e introdotte nuove specie, iniziarono le prime esposizioni. Dopo un primo anno entusiasmante, dove il riscontro del pubblico e i feedback risultarono positivi, dal 2022 ChrisGeckos cambiò sede per affrontare un carico di allevamento più elevato e divenne da attività personale a occupazione per tutta la famiglia.</p><p>Nel corso degli anni questa passione si è trasformato da piccolo hobby a qualcosa di molto più grande, sviluppo di idee, selezioni, studi e ricerche, ma l'obiettivo finale è sempre rimasto lo stesso, lavorare secondo il nostro principio dove la passione, l'etica, il benessere animale, la divulgazione e il supporto al cliente finale ci contraddistingue.</p><p>ChrisGeckos è per noi sinonimo di un progetto tutto in continua evoluzione, che nel corso degli anni ci ha fatto conoscere animali incredibili e persone fantastiche, dove noi mettiamo tutta l'esperienza accumulata al servizio di tutti quelli che vogliono approcciarsi a questo, come lo definiamo noi "strano mondo".</p><p class="pt-4 text-xl font-bold title-yellow text-right"><span>Grazie.</span><br><span class="text-2xl text-brandGreen font-black">Christian</span></p>`,
        "guides-title": "SCHEDE ALLEVAMENTO",
        "guides-subtitle": "Guide pratiche ed essenziali per la corretta stabulazione delle specie che alleviamo.",
        "filter-all": "Tutte le Specie",
        "tag-desert": "Deserticolo",
        "tag-arboreal": "Arboricolo / Umido",
        "tag-arboreal-humid": "Arboricolo / Umido",
        "tag-semitropical": "Semitropicale",
        "specie-1-sub": "Geco Leopardino",
        "specie-2-sub": "Geco Crestato",
        "specie-3-sub": "Geco Gargoyle",
        "specie-4-sub": "Geco ocelot / Geco pantera",
        "specie-5-sub": "Geco del lutto",
        "origin-label": "Origine:",
        "origin-leo": "Asia meridionale",
        "origin-nc": "Nuova Caledonia",
        "origin-picta": "Madagascar",
        "origin-lugubris": "Asia e Oceania",
        "temp-warm": "Temp. Calda:",
        "temp-ideal": "Temp. Ideale:",
        "humidity": "Umidità:",
        "size-label": "Dimensioni:",
        "habits-label": "Abitudini:",
        "habits-leo": "crepuscolare notturno",
        "habits-crepuscular": "crepuscolare notturno",
        "diet": "Dieta:",
        "diet-leo": "insetti",
        "diet-crest": "insetti, frutta",
        "diet-gargoyle": "insetti, frutta",
        "diet-picta": "insetti",
        "diet-lugubris": "insetti, frutta",
        "specie-1-desc": "Specie ideale per neofiti, animale resistente e tranquillo. Presenza di molteplici colorazioni.",
        "specie-2-desc": "Geco arboricolo originario della Nuova Caledonia di semplice gestione. Si adatta alle temperature domestiche e necessita di terrari sviluppati in altezza.",
        "specie-3-desc": "Geco arboricolo originario della Nuova Caledonia di semplice gestione. Si adatta alle temperature domestiche e necessita di terrari sviluppati in altezza.",
        "specie-4-desc": "Geco terrestre originario del Madagascar. Di indole tranquilla e abitudini prevalentemente notturne, apprezza un substrato leggermente umido e tane protette.",
        "specie-5-desc": "Piccolo geco arboricolo noto per la riproduzione partenogenetica, possono vivere in gruppo.",
        "btn-full-guide": "Scheda Completa IGA",
        "btn-care-sheet": "Scheda di Allevamento",
        "doc-back": "Torna alle schede",
        "doc-download": "Scarica la scheda (Word)",
        "avail-title": "ESEMPLARI DISPONIBILI",
        "avail-subtitle": "Qui sono riportati gli animali al momento disponibili.",
        "avail-seo": "ChrisGeckos è un allevamento di rettili e terraristica a Nervesa della Battaglia (Treviso, Veneto), specializzato in gechi leopardini (Eublepharis macularius) di diversi morph, con geco ocelot, geco crestato, geco gargoyle e geco del lutto. Qui trovi gli esemplari al momento disponibili: puoi prenotarli con ritiro in allevamento, in fiera o con trasporto.",
        "hero-seo": "Allevamento di rettili e terraristica a Treviso: geco leopardino, geco ocelot (Paroedura picta), geco crestato (Correlophus ciliatus), geco gargoyle (Rhacodactylus auriculatus) e geco del lutto (Lepidodactylus lugubris), con terrari e consigli pratici per chi ama l'herping e il mondo herp.",
        "guides-seo": "Guide pratiche di terraristica: come allestire il terrario, quali temperature e umidità mantenere e come alimentare gechi e altri rettili.",
        "filter-search-label": "Cerca Morph / Codice",
        "filter-reset": "Azzera filtri",
        "filter-sort-label": "Ordina per",
        "sort-default": "Predefinito",
        "sort-price-asc": "Prezzo: dal più basso",
        "sort-price-desc": "Prezzo: dal più alto",
        "search-info": "Inserendo i singoli geni la ricerca restituisce anche le combinazioni.",
        "leopard-notice-1": "il sesso del geco leopardino è determinato dalla temperatura di incubazione delle uova",
        "leopard-notice-2": "F = sicura femmina<br>M = sicuro maschio<br>TSF = incubato come femmina<br>TSM = incubato come maschio",
        "leopard-notice-3": "se al momento in cui vengono caricati nel sito non sono ancora sessabili, saranno identificati come TSF/TSM, potete contattarci per verificare se il soggetto desiderato è attuamente  sessabili con certezza.",
        "filter-specie-label": "Specie",
        "chip-sp-1": "Geco leopardino",
        "chip-sp-2": "Geco crestato",
        "chip-sp-3": "Geco gargoyle",
        "chip-sp-4": "Geco ocelot",
        "chip-sp-5": "Geco del lutto",
        "filter-all-species": "Tutte le Specie",
        "filter-sex-label": "Sesso",
        "filter-year-label": "Anno di nascita",
        "filter-year-all": "Tutti gli anni",
        "filter-all-sex": "Tutti i Sessi",
        "filter-status-label": "Stato Disponibilità",
        "filter-all-status": "Tutti gli Stati",
        "filter-status-all": "Tutti",
        "filter-status-available": "Solo disponibili",
        "status-available": "Disponibile",
        "status-on-hold": "Prenotato",
        "status-booked": "PRENOTATO",
        "btn-unavailable": "Non più disponibile",
        "filters-toggle": "Filtri",
        "show-tag-confirmed": "Confermato",
        "show-tables": "Tavoli:",
        "show-present": "PRESENTI",
        "show-pending": "Presenza da confermare",
        "show-absent": "Non presenti",
        "show-poster-alt": "Locandina della fiera",
        "show-website": "Sito della fiera",
        "shows-loading": "Caricamento fiere...",
        "shows-empty": "Nessuna fiera in programma al momento.",
        "opt-sp-1": "Eublepharis macularius (Geco leopardino)",
        "opt-sp-2": "Correlophus ciliatus (Geco crestato)",
        "opt-sp-3": "Rhacodactylus auriculatus (Geco gargoyle)",
        "opt-sp-5": "Lepidodactylus lugubris (Geco del lutto)",
        "opt-sp-4": "Paroedura picta (Geco ocelot)",
        "sex-label": "Sesso:",
        "sex-male": "Maschio",
        "sex-female": "Femmina",
        "sex-unsexed": "Non Sessato",
        "sex-tsm": "TSM - Incubato maschio",
        "sex-tsf": "TSF - Incubato femmina",
        "born-label": "Nato:",
        "code-label": "Codice:",
        "notes-label": "Note:",
        "weight-label": "Peso:",
        "btn-req-info": "Richiedi Informazioni",
        "btn-waitlist": "Info o Lista d'Attesa",
        "btn-book-request": "Richiedi prenotazione",
        "no-avail-msg": "Nessun esemplare trovato con i filtri selezionati.",
        "shows-title": "PROGRAMMA FIERE",
        "shows-subtitle": "Qui sotto sono riportati gli eventi ai quali saremo presenti, venite a trovarci!",
        "shows-seo": "ChrisGeckos partecipa a fiere di rettili e di terraristica in Italia, ritrovo di appassionati di herping e herp. Qui trovi il calendario aggiornato con date e luogo di ogni evento e puoi prenotare il ritiro del tuo geco direttamente in fiera.",
        "show-tag-next": "Prossimo Evento",
        "show-tag-pending": "In Conferma",
        "btn-book-show": "Prenota ritiro in fiera",
        "btn-stand-info": "Richiedi Info Stand",
        "contact-title": "CONTATTACI",
        "contact-subtitle": "Siamo a tua disposizione per informazioni sugli esemplari disponibili, consigli di stabulazione o appuntamenti in sede.",
        "contact-direct-title": "Recapiti",
        "contact-lbl-loc": "Sede Allevamento",
        "contact-social-title": "Pagine e contatti social",
        "form-first-name": "Nome",
        "form-last-name": "Cognome",
        "form-phone": "Numero di telefono",
        "form-subject-label": "Oggetto",
        "form-subject-info": "Informazioni",
        "form-subject-booking": "Prenotazione",
        "form-pickup-label": "Modalità di ritiro",
        "form-pickup-select": "Seleziona modalità...",
        "form-pickup-breeding": "In allevamento",
        "form-pickup-show": "In fiera",
        "form-pickup-transport": "Trasporto",
        "form-code-label": "Codice esemplare",
        "form-show-select-label": "Seleziona Fiera",
        "form-show-select-placeholder": "Seleziona fiera...",
        "form-prov-label": "Provincia Italiana o EE per Estero",
        "form-prov-placeholder": "Seleziona provincia o estero...",
        "form-message-label": "Messaggio",
        "form-btn-submit": "Invia Messaggio",
        "story-p1": "Da un'avventura inizia nel 2018, con il nostro allevamento mettiamo a disposizione, oltre ai nostri animali, tutte le competenze e esperienze acquisite nel corso degli anni.",
        "story-p2": "La nostra etica è basata sull'attenzione al benessere animale e sul contatto umano verso chi ci sta di fronte.",
        "story-p3": "ChrisGeckos negli anni ha basato i suoi principi sull'onestà e la disponibilità al supporto verso il cliente finale, grazie a questo, siamo riusciti a crescere e andare avanti nel tempo rafforzando la nostra struttura con ampliamenti e innovazioni.",
        "story-p4": "Nel corso del tempo anche a distanza di anni, grazie a questa nostra metodologia, continuiamo a restare in contatto con molte persone, a volte riuscendo anche a instaurare bellissimi legami di amicizia legati da questa passione.",
        "story-more": "continua... <span class=\"text-brandYellow\">La nostra storia</span>",
        "avail-loading": "Caricamento esemplari...",
        "badge-breeder": "RIPRODUTTORE",
        "terms-accept": "Accetto i termini e condizioni",
        "terms-view": "Visualizza termini di servizio",
        "terms-title": "Termini di servizio",
        "terms-back": "Torna al modulo",
        "terms-fallback": "Se il documento non si vede,",
        "terms-open": "aprilo in una nuova scheda",
        "ph-first-name": "Il tuo nome",
        "ph-last-name": "Il tuo cognome",
        "ph-phone": "es. 3331234567",
        "form-prefix-placeholder": "Prefisso",
        "form-prefix-error": "Seleziona il prefisso internazionale.",
        "form-prefix-invalid": "Il prefisso inserito non è valido.",
        "ph-prefix-search": "Cerca paese o prefisso...",
        "ph-email": "tua@email.com",
        "ph-code": "es. #CG-2024-01",
        "ph-message": "Scrivi qui il tuo messaggio...",
        "ph-avail-search": "es. emerine, tangerine eclipse…",
        "ph-guide-search": "Cerca per nome scientifico o comune (es. Leopardino, Eublepharis)...",
        "footer-copy": "© 2018 - 2026 ChrisGeckos. Tutti i diritti riservati. Allevamento Rettili Treviso."
    },
    en: {
        "nav-about": "About Us?",
        "nav-guides": "Care Sheets",
        "nav-available": "Availability",
        "nav-shows": "Show Schedule",
        "nav-contact": "Contact",
        "hero-title": "Passion, Ethics & <span class=\"title-green\">Selection</span>",
        "hero-desc": "Specialized in the exotic reptile sector. Focused mainly on the genus <span class=\"text-brandYellow font-semibold\">Eublepharis</span>, particularly in the selection of <span class=\"text-brandYellow font-semibold\">Eublepharis macularius</span> (Leopard Gecko).",
        "hero-btn-available": "View available specimens",
        "hero-btn-guides": "Care guides",
        "follow-us": "Follow us:",
        "feat-1-title": "Selective Lines",
        "feat-1-desc": "Genetic lines tracked and selected over the years.",
        "feat-2-title": "Support & Ethics",
        "feat-2-desc": "Complete and personalized pre- and post-transfer training to ensure the optimal health of the animal.",
        "feat-3-title": "Deliveries & Pickups",
        "feat-3-desc": "We offer various solutions including pickup directly at our facility or at the <a href=\"fiere.html\" class=\"text-brandYellow underline hover:text-brandGreen font-semibold whitespace-nowrap inline-block align-baseline\">reptile expos</a> we attend. It is possible to find solutions for any transport.",
        "feat-3-transport": "It is possible to find solutions for any transport",
        "resources-title": "Useful Links & Resources",
        "resources-subtitle": "Insights, morph guides, and reference associations for gecko and reptile enthusiasts.",
        "iga-main-desc": "The national reference association for the protection, study, and education of the gecko world in Italy.",
        "iga-site-title": "Official Website",
        "iga-site-sub": "Association Home",
        "iga-member-title": "Membership",
        "iga-member-sub": "Join the association",
        "iga-vet-title": "Veterinarian List",
        "iga-vet-sub": "Expert doctors in the territory",
        "iga-5x1000-title": "5x1000 Donation",
        "iga-5x1000-sub": "Support IGA projects",
        "res-1-title": "Planet Morph",
        "res-1-desc": "Comprehensive and detailed reference guide to leopard gecko genetics and morphs (Eublepharis macularius).",
        "visit-site": "Explore Morph Guide",
        "about-title": "ABOUT US?",
        "about-sec1-title": "The Breeding Facility",
        "about-sec1-body": `<p><strong class="text-brandGreen">ChrisGeckos</strong> is a breeding facility established in 2020 in the province of Treviso, from an adventure that began a few years earlier and immediately became a passion.</p><p>With our breeding facility, we are present throughout the year at most exhibition events in Northern / Central-Northern Italy; you can check our attendance by consulting the dedicated "Show Schedule" section, or come and visit us directly on site.</p><p>The breeding facility is mostly focused on the species <em class="text-brandYellow">Eublepharis macularius</em> (Leopard Gecko), with which our journey into the world of reptiles began. In our facility we have various genetic/selective lines with which we work with good results, above all the <strong class="text-brandGreen">Red&Green</strong> morph, a selection we have been carrying forward for years.</p><p>Since 2022, the breeding facility has been expanded with other gecko species: <em class="text-brandYellow">Paroedura picta</em>, <em class="text-brandYellow">Correlophus ciliatus</em> (Crested Gecko), <em class="text-brandYellow">Rhacodactylus auriculatus</em> (Gargoyle Gecko).</p><p>During 2025/2026, various subspecies of the genus <span class="text-brandYellow font-semibold">Eublepharis</span> such as <em class="text-brandYellow">montanus</em>, <em class="text-brandYellow">fuscus</em>, and <em class="text-brandYellow">angramainyu</em> from different localities entered the breeding facility.</p>`,
        "about-sec2-title": "Our Ethics",
        "about-sec2-body": `<p>In a world where unconventional animals are viewed with fear, in an environment where prejudices often reign, we believe that only by deploying educational skills can we make a difference. We believe that human relationships are fundamental, therefore we have always strived to ensure we provide new owners with maximum support.</p><p class="border-l-4 border-brandYellow pl-4 italic text-gray-300">"360° pre-transfer training is provided as well as post-transfer support; preparing the buyer well means guaranteeing optimal care for the transferred animal."</p>`,
        "about-sec3-title": "A Complete Service",
        "about-sec3-body": `<p>The breeding facility counts various species of geckos; we have animals with important genetics and selections, as well as more common genetics, desert or humid-dwelling animals, in order to satisfy everyone.</p><p>The end customer always receives maximum support in order to make the experience positive. To facilitate beginners, we offer everything necessary for proper husbandry, from the terrarium to various accessories and dietary supplements. We regularly collaborate with other breeders and artisans for the most demanding customers.</p>`,
        "about-sec4-title": "ChrisGeckos... The Origins",
        "about-sec4-body": `<p>Always passionate about technology, animals, and the very concept of life itself. After reluctantly abandoning in 2015, despite excellent results, a path as a breeder of purebred Boxer dogs, the approach to the world of unconventional animals happened purely by chance.</p><p>The adventure was born following a curiosity that arose in 2018, when my then 4-year-old daughter asked me the fateful question: <span class="text-brandYellow font-semibold">"Daddy, what is a gecko?"</span>. From there, video and paper documentation began, followed by hours of web searches in which curiosity and the desire to know increased.</p><p>From then on, it was a short step, with the purchase of the first leopard gecko specimens to manage together with my daughter. As the weeks passed, however, I began to like these animals more and more, leading to joining the first forums and social pages, discovering exhibition shows, making the first contacts with breeders, and finally discovering morphs...</p><p>All this led in a short time to the gradual arrival at home of several specimens and the consequent need to create new spaces; thus, around mid-2019, the creation of the first structures began and the idea of starting to reproduce these fantastic animals. I therefore began contacting various breeders, who immediately proved to be very helpful, thus beginning to gather information also from the practical side, visiting various breeding facilities and learning different methodologies and schools of thought.</p><p>In 2020, the first hatchlings began, and with the support of already experienced breeders came explanations for identifying the various morphs, the first transfers, the first slightly shy explanations, and I began participating in shows as support to other breeders.</p><p>So, after a year of apprenticeship, thanks to the accumulated experience, in 2021 the gecko breeding facility "ChrisGeckos" was born; new structures were built and new species were introduced, and the first exhibitions began. After an exciting first year, where public response and feedback were positive, from 2022 ChrisGeckos changed location to handle a higher breeding load and evolved from a personal activity into an occupation for the whole family.</p><p>Over the years, this passion has transformed from a small hobby into something much bigger—developing ideas, selections, studies, and research—but the ultimate goal has always remained the same: working according to our principle where passion, ethics, animal welfare, education, and support for the end customer set us apart.</p><p>ChrisGeckos is synonymous for us with a project in continuous evolution, which over the years has introduced us to incredible animals and fantastic people, where we put all our accumulated experience at the service of all those who want to approach what we call this "strange world".</p><p class="pt-4 text-xl font-bold title-yellow text-right"><span>Thank you.</span><br><span class="text-2xl text-brandGreen font-black">Christian</span></p>`,
        "guides-title": "CARE SHEETS",
        "guides-subtitle": "Practical and essential guides for the proper husbandry of the species we breed.",
        "filter-all": "All Species",
        "tag-desert": "Desert-dwelling",
        "tag-arboreal": "Arboreal / Humid",
        "tag-arboreal-humid": "Arboreal / Humid",
        "tag-semitropical": "Semitropical",
        "specie-1-sub": "Leopard Gecko",
        "specie-2-sub": "Crested Gecko",
        "specie-3-sub": "Gargoyle Gecko",
        "specie-4-sub": "Ocelot Gecko / Panther Gecko",
        "specie-5-sub": "Mourning Gecko",
        "origin-label": "Origin:",
        "origin-leo": "South Asia",
        "origin-nc": "New Caledonia",
        "origin-picta": "Madagascar",
        "origin-lugubris": "Asia and Oceania",
        "temp-warm": "Warm Temp.:",
        "temp-ideal": "Ideal Temp.:",
        "humidity": "Humidity:",
        "size-label": "Size:",
        "habits-label": "Habits:",
        "habits-leo": "crepuscular nocturnal",
        "habits-crepuscular": "crepuscular nocturnal",
        "diet": "Diet:",
        "diet-leo": "insects",
        "diet-crest": "insects, fruit",
        "diet-gargoyle": "insects, fruit",
        "diet-picta": "insects",
        "diet-lugubris": "insects, fruit",
        "specie-1-desc": "Ideal species for beginners, resistant and calm animal. Available in multiple colorations.",
        "specie-2-desc": "Arboreal gecko native to New Caledonia, easy to manage. Adapts well to room temperatures and requires vertically oriented terrariums.",
        "specie-3-desc": "Arboreal gecko native to New Caledonia, easy to manage. Adapts well to room temperatures and requires vertically oriented terrariums.",
        "specie-4-desc": "Terrestrial gecko native to Madagascar. Calm temperament and mostly nocturnal habits, appreciates slightly moist substrate and secure hides.",
        "specie-5-desc": "Small arboreal gecko known for parthenogenetic reproduction, they can live in groups.",
        "btn-full-guide": "Full IGA Care Sheet",
        "btn-care-sheet": "Care Sheet",
        "doc-back": "Back to care sheets",
        "doc-download": "Download the care sheet (Word)",
        "avail-title": "AVAILABLE SPECIMENS",
        "avail-subtitle": "Here are the animals currently available.",
        "avail-seo": "ChrisGeckos is a reptile and terrarium-keeping breeder in Nervesa della Battaglia (Treviso, Veneto, Italy), specialising in leopard geckos (Eublepharis macularius) in many morphs, with ocelot, crested, gargoyle and mourning geckos. Here you can see the animals currently available and reserve them for pickup at the breeder, at a reptile show or by transport.",
        "hero-seo": "Reptile breeding and terrarium keeping in Treviso: leopard gecko, ocelot gecko (Paroedura picta), crested gecko (Correlophus ciliatus), gargoyle gecko (Rhacodactylus auriculatus) and mourning gecko (Lepidodactylus lugubris), with terrariums and practical advice for anyone who loves herping and the herp world.",
        "guides-seo": "Practical terrarium-keeping guides: how to set up the enclosure, which temperatures and humidity to keep and how to feed geckos and other reptiles.",
        "filter-search-label": "Search Morph / Code",
        "filter-reset": "Reset filters",
        "filter-sort-label": "Sort by",
        "sort-default": "Default",
        "sort-price-asc": "Price: low to high",
        "sort-price-desc": "Price: high to low",
        "search-info": "Entering single genes, the search also returns the combinations.",
        "leopard-notice-1": "the sex of the leopard gecko is determined by the incubation temperature of the eggs",
        "leopard-notice-2": "F = proven female<br>M = proven male<br>TSF = incubated as female<br>TSM = incubated as male",
        "leopard-notice-3": "if they cannot yet be sexed at the time they are uploaded to the site, they will be listed as TSF/TSM; you can contact us to check whether the desired animal can currently be sexed with certainty.",
        "filter-specie-label": "Species",
        "chip-sp-1": "Leopard Gecko",
        "chip-sp-2": "Crested Gecko",
        "chip-sp-3": "Gargoyle Gecko",
        "chip-sp-4": "Ocelot Gecko",
        "chip-sp-5": "Mourning Gecko",
        "filter-all-species": "All Species",
        "filter-sex-label": "Sex",
        "filter-year-label": "Birth year",
        "filter-year-all": "All years",
        "filter-all-sex": "All Sexes",
        "filter-status-label": "Availability Status",
        "filter-all-status": "All Statuses",
        "filter-status-all": "All",
        "filter-status-available": "Available only",
        "status-available": "Available",
        "status-on-hold": "Reserved",
        "status-booked": "BOOKED",
        "btn-unavailable": "No longer available",
        "filters-toggle": "Filters",
        "show-tag-confirmed": "Confirmed",
        "show-tables": "Tables:",
        "show-present": "WE'LL BE THERE",
        "show-pending": "Attendance to be confirmed",
        "show-absent": "We won't be there",
        "show-poster-alt": "Show poster",
        "show-website": "Show website",
        "shows-loading": "Loading shows...",
        "shows-empty": "No shows scheduled at the moment.",
        "opt-sp-1": "Eublepharis macularius (Leopard Gecko)",
        "opt-sp-2": "Correlophus ciliatus (Crested Gecko)",
        "opt-sp-3": "Rhacodactylus auriculatus (Gargoyle Gecko)",
        "opt-sp-5": "Lepidodactylus lugubris (Mourning Gecko)",
        "opt-sp-4": "Paroedura picta (Ocelot Gecko)",
        "sex-label": "Sex:",
        "sex-male": "Male",
        "sex-female": "Female",
        "sex-unsexed": "Unsexed",
        "sex-tsm": "TSM - Incubated male",
        "sex-tsf": "TSF - Incubated female",
        "born-label": "Hatched:",
        "code-label": "Code:",
        "notes-label": "Notes:",
        "weight-label": "Weight:",
        "btn-req-info": "Request Information",
        "btn-waitlist": "Info or Waiting List",
        "btn-book-request": "Request booking",
        "no-avail-msg": "No specimens found with the selected filters.",
        "shows-title": "SHOW SCHEDULE",
        "shows-subtitle": "Below are the events where we will be present, come visit us!",
        "shows-seo": "ChrisGeckos takes part in reptile and terrarium-keeping shows in Italy, a meeting point for herping and herp enthusiasts. Here you can find the updated calendar with the date and place of each event, and reserve your gecko for pickup right at the show.",
        "show-tag-next": "Next Event",
        "show-tag-pending": "To Be Confirmed",
        "btn-book-show": "Book show pickup",
        "btn-stand-info": "Request Booth Info",
        "contact-title": "CONTACT US",
        "contact-subtitle": "We are at your disposal for information on available specimens, husbandry advice, or on-site appointments.",
        "contact-direct-title": "Contact Details",
        "contact-lbl-loc": "Breeding Location",
        "contact-social-title": "Social Media & Pages",
        "form-first-name": "First Name",
        "form-last-name": "Last Name",
        "form-phone": "Phone Number",
        "form-subject-label": "Subject",
        "form-subject-info": "Information",
        "form-subject-booking": "Booking",
        "form-pickup-label": "Pickup Mode",
        "form-pickup-select": "Select pickup method...",
        "form-pickup-breeding": "At facility",
        "form-pickup-show": "At show",
        "form-pickup-transport": "Transport",
        "form-code-label": "Specimen Code",
        "form-show-select-label": "Select Show",
        "form-show-select-placeholder": "Select show...",
        "form-prov-label": "Italian Province or EE for Foreign",
        "form-prov-placeholder": "Select province or foreign...",
        "form-message-label": "Message",
        "form-btn-submit": "Send Message",
        "story-p1": "An adventure that began in 2018: with our breeding facility we offer, besides our animals, all the skills and experience we have gained over the years.",
        "story-p2": "Our ethics are based on attention to animal welfare and on human contact with the person in front of us.",
        "story-p3": "Over the years ChrisGeckos has built its principles on honesty and on being available to support the final customer; thanks to this we have managed to grow and move forward, strengthening our structure with expansions and innovations.",
        "story-p4": "Over time, even years later, thanks to this approach we are still in touch with many people, sometimes even building lovely friendships born from this shared passion.",
        "story-more": "continue... <span class=\"text-brandYellow\">Our story</span>",
        "avail-loading": "Loading specimens...",
        "badge-breeder": "BREEDER",
        "terms-accept": "I accept the terms and conditions",
        "terms-view": "View terms of service",
        "terms-title": "Terms of Service",
        "terms-back": "Back to the form",
        "terms-fallback": "If the document does not show,",
        "terms-open": "open it in a new tab",
        "ph-first-name": "Your first name",
        "ph-last-name": "Your last name",
        "ph-phone": "eg. 3331234567",
        "form-prefix-placeholder": "Prefix",
        "form-prefix-error": "Please select the international dialing prefix.",
        "form-prefix-invalid": "The prefix you entered is not valid.",
        "ph-prefix-search": "Search country or code...",
        "ph-email": "your@email.com",
        "ph-code": "eg. #CG-2024-01",
        "ph-message": "Write your message here...",
        "ph-avail-search": "eg. emerine, tangerine eclipse…",
        "ph-guide-search": "Search by scientific or common name (e.g. Leopard, Eublepharis)...",
        "footer-copy": "© 2018 - 2026 ChrisGeckos. All rights reserved. Reptile Breeding Treviso."
    }
};

// Date di nascita: "10 maggio 2024" (IT) / "May 10, 2024" (EN)
function formatBornDates() {
    const loc = currentLang === 'it' ? 'it-IT' : 'en-US';
    document.querySelectorAll('.born-date').forEach(el => {
        const [y, m, d] = el.getAttribute('data-date').split('-').map(Number);
        const fmt = el.getAttribute('data-fmt') || 'dmy';
        const opts = fmt === 'y' ? { year: 'numeric' } : fmt === 'my' ? { month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' };
        el.textContent = new Date(y, m - 1, d).toLocaleDateString(loc, opts);
    });
}

function toggleLanguage() {
    setLanguage(currentLang === 'it' ? 'en' : 'it');
}

function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'it';
    try { localStorage.setItem(LANG_KEY, currentLang); } catch (e) { /* ignora */ }
    document.documentElement.lang = currentLang;

    const btn = document.getElementById('lang-toggle-btn');
    if (currentLang === 'it') {
        btn.innerHTML = `<span class="text-brandYellow">IT</span> | <span class="text-gray-400">EN</span>`;
    } else {
        btn.innerHTML = `<span class="text-gray-400">IT</span> | <span class="text-brandYellow">EN</span>`;
    }

    // Translate HTML elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    formatBornDates();
    renderFiere();

    // Translate Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[currentLang][key]) {
            el.setAttribute('placeholder', translations[currentLang][key]);
        }
    });

    // Re-apply dynamic filter texts if required
    if (document.getElementById('avail-grid')) applyAvailFilters();
}

// I termini sono il documento Google: ogni modifica al documento compare da sola nel sito
const TERMS_DOC_ID = '1N-GoObDoUXmH2QEHUy1280iFyTejUj_VwiEjtZxwmL0';
const TERMS_EMBED_URL = `https://docs.google.com/document/d/${TERMS_DOC_ID}/preview`;
const TERMS_OPEN_URL = `https://docs.google.com/document/d/${TERMS_DOC_ID}/edit?usp=sharing`;

function loadTerms() {
    const frame = document.getElementById('terms-frame');
    if (frame && !frame.getAttribute('src')) frame.setAttribute('src', TERMS_EMBED_URL);
    const link = document.getElementById('terms-open-link');
    if (link) link.setAttribute('href', TERMS_OPEN_URL);
}

// Dopo una prenotazione guidata: porta direttamente al modulo (utile su mobile, dove è sotto i recapiti)
function scrollToForm() {
    requestAnimationFrame(() => {
        const card = document.getElementById('form-contatto-card');
        if (!card) return;
        if (window.matchMedia('(min-width: 1024px)').matches) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function showNotification(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.innerText = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3500);
}

let currentGuideHabitat = 'all';

// Filtro Schede Allevamento per Habitat e Ricerca Testuale
function filterGuides(type) {
    if (type !== undefined) {
        currentGuideHabitat = type;
    }
    const buttons = document.querySelectorAll('.guide-filter-btn');
    buttons.forEach(b => {
        b.classList.remove('filter-btn-active');
        b.classList.add('bg-black/50', 'text-gray-300');
    });

    const activeBtn = document.getElementById(`filter-guide-${currentGuideHabitat}`);
    if (activeBtn) {
        activeBtn.classList.add('filter-btn-active');
        activeBtn.classList.remove('bg-black/50', 'text-gray-300');
    }

    const searchInput = document.getElementById('guide-search');
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const searchTokens = searchVal.split(/\s+/).filter(t => t.length > 0);

    const cards = document.querySelectorAll('.guide-card');
    cards.forEach(card => {
        const habitat = card.getAttribute('data-habitat');
        const dataSearch = (card.getAttribute('data-search') || '').toLowerCase();
        const cardText = card.innerText.toLowerCase();
        const fullCardContent = dataSearch + ' ' + cardText;

        const matchesHabitat = (currentGuideHabitat === 'all' || habitat === currentGuideHabitat);
        
        // Tutte le parole digitate devono essere presenti nel testo della card o nei suoi tag data-search
        const matchesSearch = searchTokens.every(token => fullCardContent.includes(token));

        if (matchesHabitat && matchesSearch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Filtri Dinamici Catalogo Disponibilità
const LEOPARD_SPECIES = 'Eublepharis macularius';

function getSelectedSpecies() {
    return Array.from(document.querySelectorAll('#avail-species-chips .species-chip.active'))
        .map(c => c.getAttribute('data-species'))
        .filter(v => v !== 'all');
}

// Selezione singola: un solo chip attivo alla volta (ricliccando quello attivo si torna a "Tutte")
function toggleSpeciesChip(btn) {
    const container = document.getElementById('avail-species-chips');
    const all = container.querySelector('[data-species="all"]');
    const wasActive = btn.classList.contains('active');
    container.querySelectorAll('.species-chip').forEach(c => c.classList.remove('active'));
    if (btn === all || wasActive) {
        all.classList.add('active');
    } else {
        btn.classList.add('active');
    }
    updateSexOptions();
    applyAvailFilters();
}

// TSM / TSF compaiono solo se la specie selezionata è il geco leopardino
function updateSexOptions() {
    const sel = document.getElementById('avail-filter-sex');
    const showTS = getSelectedSpecies().includes(LEOPARD_SPECIES);
    const hasTS = !!sel.querySelector('option[value="TSM"]');
    document.getElementById('leopard-notice').classList.toggle('hidden', !showTS);
    if (showTS && !hasTS) {
        // Ordine: Tutti, Maschio, Femmina, TSM, TSF, Non sessato
        const unsexed = sel.querySelector('option[value="Non Sessato"]');
        [['TSM', 'sex-tsm'], ['TSF', 'sex-tsf']].forEach(([val, key]) => {
            const o = document.createElement('option');
            o.value = val;
            o.setAttribute('data-i18n', key);
            o.innerHTML = translations[currentLang][key];
            sel.insertBefore(o, unsexed);
        });
    } else if (!showTS && hasTS) {
        if (sel.value === 'TSM' || sel.value === 'TSF') sel.value = 'all';
        sel.querySelectorAll('option[value="TSM"], option[value="TSF"]').forEach(o => o.remove());
    }
}

// ===== Esemplari disponibili: dati dal foglio Google + foto dalla cartella Drive =====
// Foglio: colonne SPECIE, COD, SESSO, M/F, NASCITA, MORPH, NOTE, RIPRODUTTORE, PREZZO, STATO (le colonne si riconoscono dal nome). La prima riga è l'intestazione.
const ANIMALI_SHEET_ID = '13MEM5y0usM3giikW9E2GTF2bNzbhJ1eM_9EBFbgZ5Ps';
const ANIMALI_CSV_URL = `https://docs.google.com/spreadsheets/d/${ANIMALI_SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
// Indirizzo dell'app web Google Apps Script che abbina le foto della cartella Drive ai codici del foglio.
// Se non risponde (o è vuoto), i dati si leggono direttamente dal foglio e le schede restano senza foto.
const ANIMALI_API_URL = 'https://script.google.com/macros/s/AKfycbzdkyKNjGa-nwdOid3cZEXq5MA5u4cowFNmelpje8W1LxxboSCAX77CADSUmHy12get/exec';
const ANIMALI_DEFAULT_SPECIES = 'Eublepharis macularius'; // usata se il foglio non ha la colonna SPECIE
const ANIMALI_TIMEOUT_MS = 10000;
const ANIMALI_FALLBACK_CSV = `SPECIE,COD,SESSO:,M/F,NASCITA:,MORPH:,NOTE:,RIPRODUTTORE,PREZZO,STATO
Eublepharis macularius,21CF84,TSF,F,30/08/21,WeY MANDARINE TANGERINE CROSS HET ECLIPSE PH TREMPER,PALPEBRE,,30,
Eublepharis macularius,22CF57,TSF,F,07/06/22,MANDARINE TANGERINE CROSS 66% PH RAPTOR PH NDBE,,X,40,
Eublepharis macularius,22CF289,TSF,,29/08/22,MACK SNOW RAPTOR,,X,50,
Paroedura picta,15,,F,12/03/26,axanthic,,X,100,`;
const SPECIES_ORDER = ['Eublepharis macularius', 'Paroedura picta', 'Lepidodactylus lugubris', 'Correlophus ciliatus', 'Rhacodactylus auriculatus'];
const SPECIES_I18N = { 'Eublepharis macularius': 'chip-sp-1', 'Correlophus ciliatus': 'chip-sp-2', 'Rhacodactylus auriculatus': 'chip-sp-3', 'Paroedura picta': 'chip-sp-4', 'Lepidodactylus lugubris': 'chip-sp-5' };
let animaliData = null;

function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function fetchTimeout(url, ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res;
    } finally {
        clearTimeout(timer);
    }
}

// Sesso: se M/F ha un valore (M o F) vale quello, altrimenti si usa la colonna SESSO (TSM, TSF...)
function resolveAnimalSex(sesso, mf) {
    const f = String(mf || '').trim().toUpperCase();
    if (f === 'M') return 'Maschio';
    if (f === 'F') return 'Femmina';
    const s = String(sesso || '').trim().toUpperCase();
    if (s === 'TSM' || s === 'TSF') return s;
    if (s === 'M' || s === 'MASCHIO') return 'Maschio';
    if (s === 'F' || s === 'FEMMINA') return 'Femmina';
    return 'Non Sessato';
}

function normalizeSpecies(v) {
    const t = String(v || '').trim();
    if (!t) return ANIMALI_DEFAULT_SPECIES;
    const known = SPECIES_ORDER.find(sp => sp.toLowerCase() === t.toLowerCase());
    return known || t;
}

// Casella di spunta del foglio (TRUE / VERO / SI / X / 1) oppure testo che contiene "prenot" = esemplare prenotato; vuoto o FALSE = disponibile
function isBookedFlag(v) {
    const t = String(v == null ? '' : v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!t) return false;
    if (['true', 'vero', 'si', 'yes', 'y', 'x', '1', 'v', 'ok', 'prenotato', 'prenotata'].includes(t)) return true;
    return /prenot/.test(t);
}

// Nascita: data completa (30/08/21), mese e anno (08/2022) oppure solo anno (2020)
function parseBirth(v) {
    const t = String(v == null ? '' : v).trim();
    if (!t) return null;
    let m = t.match(/^(\d{4})$/);
    if (m) return { fmt: 'y', y: +m[1], m: 1, d: 1 };
    m = t.match(/^(\d{1,2})[\/\-.](\d{4})$/);
    if (m && +m[1] >= 1 && +m[1] <= 12) return { fmt: 'my', y: +m[2], m: +m[1], d: 1 };
    const dm = parseDayMonth(t);
    if (dm && dm.y !== null) return { fmt: 'dmy', y: dm.y, m: dm.m, d: dm.d };
    return null;
}

function animalFromFields(f) {
    const cod = String(f.cod || '').trim();
    if (!cod) return null;
    const nasc = parseBirth(f.nascita);
    const proven = String(f.proven || '').trim().toLowerCase();
    const prezzoNum = parseFloat(String(f.prezzo || '').replace(/[^\d,.]/g, '').replace(',', '.'));
    return {
        cod,
        sex: resolveAnimalSex(f.sesso, f.mf),
        nascita: nasc ? { date: new Date(nasc.y, nasc.m - 1, nasc.d), fmt: nasc.fmt } : null,
        morph: String(f.morph || '').trim(),
        note: String(f.note || '').trim(),
        proven: !!proven && !['no', '0', '-', 'false'].includes(proven),
        specie: normalizeSpecies(f.specie),
        prezzo: isNaN(prezzoNum) ? null : prezzoNum,
        stato: isBookedFlag(f.stato) ? 'Prenotato' : 'Disponibile',
        foto: Array.isArray(f.foto) ? f.foto.filter(Boolean) : []
    };
}

// CSV del foglio -> elenco animali (le colonne si riconoscono dal nome, in qualsiasi ordine)
function parseAnimaliCsv(text) {
    const rows = parseCSV(text);
    if (!rows.length) return [];
    const norm = h => String(h || '').trim().toLowerCase().replace(/[:\s]+$/, '');
    const aliases = { cod: ['cod', 'codice'], sesso: ['sesso'], mf: ['m/f', 'mf'], nascita: ['nascita'], morph: ['morph'], note: ['note'], proven: ['riproduttore', 'proven'], specie: ['specie'], prezzo: ['prezzo'], stato: ['stato', 'prenotato', 'prenotata', 'prenotazione'] };
    const head = rows[0].map(norm);
    const col = {};
    Object.keys(aliases).forEach(k => { col[k] = head.findIndex(h => aliases[k].includes(h)); });
    return rows.slice(1).map(r => {
        const f = {};
        Object.keys(col).forEach(k => { f[k] = col[k] >= 0 ? r[col[k]] : ''; });
        return animalFromFields(f);
    }).filter(Boolean);
}

function animalPhotoUrl(id, size) { return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${size}`; }
// Foto delle schede: la miniatura grande ha due misure (schermi normali / ad alta densità) e lo sfondo sfocato ne usa una minuscola
const PHOTO_SIZES = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
let cardPhotoCount = 0;   // le prime foto si caricano subito, le altre quando si avvicinano allo schermo
function animalPhotoAlt(id, size) { return `https://lh3.googleusercontent.com/d/${encodeURIComponent(id)}=w${size}`; }

function sexI18nKey(sex) {
    return { 'Maschio': 'sex-male', 'Femmina': 'sex-female', 'Non Sessato': 'sex-unsexed', 'TSM': 'sex-tsm', 'TSF': 'sex-tsf' }[sex] || 'sex-unsexed';
}

// Comparsa graduale: le schede si dissolvono leggermente quando entrano nello schermo
let revealObserver = null;
function observeReveal(card) {
    if (!('IntersectionObserver' in window)) return;
    if (!revealObserver) {
        revealObserver = new IntersectionObserver(entries => {
            entries.filter(e => e.isIntersecting).forEach((e, i) => {
                e.target.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
                e.target.classList.add('in-view');
                revealObserver.unobserve(e.target);
            });
        }, { threshold: 0.08 });
    }
    card.classList.add('reveal');
    revealObserver.observe(card);
}

function buildAnimalCard(a) {
    const t = k => translations[currentLang][k];
    const card = document.createElement('div');
    card.className = 'avail-card glass-card rounded-2xl overflow-hidden border border-brandGreen/20 hover:border-brandGreen/60 transition-all';
    card.setAttribute('data-species', a.specie);
    card.setAttribute('data-sex', a.sex);
    card.setAttribute('data-status', a.stato);
    if (a.stato !== 'Disponibile') card.classList.add('is-booked');
    card.setAttribute('data-year', a.nascita ? a.nascita.date.getFullYear() : '');
    card.setAttribute('data-price', a.prezzo !== null ? a.prezzo : '');
    card.setAttribute('data-search', `${a.cod} ${a.morph} ${a.note}`.toLowerCase());

    const booked = a.stato !== 'Disponibile';
    const statusBadge = booked
        ? `<div class="absolute top-0 right-0 w-40 h-40 overflow-hidden pointer-events-none z-10"><span class="absolute top-7 -right-11 w-48 text-center rotate-45 bg-brandYellow text-black font-extrabold text-xs tracking-widest py-1.5 shadow-md" data-i18n="status-booked">${esc(t('status-booked'))}</span></div>`
        : `<span class="absolute top-4 right-4 bg-brandGreen text-black font-extrabold text-xs px-3 py-1 rounded-full badge-status" data-i18n="status-available">${esc(t('status-available'))}</span>`;
    const provenBadge = a.proven ? `<span class="absolute top-4 left-4 bg-black/70 border border-brandYellow text-brandYellow font-extrabold text-[11px] px-2.5 py-1 rounded-full" data-i18n="badge-breeder">${esc(t('badge-breeder'))}</span>` : '';
    const bd = a.nascita ? a.nascita.date : null;
    const bornStr = bd ? `<span class="born-date text-brandYellow font-semibold" data-fmt="${a.nascita.fmt}" data-date="${bd.getFullYear()}-${String(bd.getMonth() + 1).padStart(2, '0')}-${String(bd.getDate()).padStart(2, '0')}"></span>` : '<span class="text-brandYellow font-semibold">-</span>';
    const price = a.prezzo !== null ? `<span class="text-2xl font-black ${booked ? 'text-gray-500 line-through' : 'text-brandGreen'}">€${esc(a.prezzo % 1 ? a.prezzo.toFixed(2) : a.prezzo)}</span>` : '';

    card.innerHTML = `
        <div class="avail-photo aspect-[4/3] bg-white relative flex items-center justify-center overflow-hidden">
            <i class="fa-solid fa-dragon text-6xl text-gray-300"></i>
            ${booked ? '<div class="absolute inset-0 bg-black/60 pointer-events-none z-[5]"></div>' : ''}
            ${statusBadge}${provenBadge}
        </div>
        <div class="avail-head">
            <div class="flex justify-between items-start gap-3">
                <div class="min-w-0">
                    <h3 class="text-xl font-bold text-white card-species break-words">${esc(a.specie)}</h3>
                    ${a.morph ? `<p class="font-semibold text-sm break-words"><span class="text-white">Morph:</span> <span class="text-brandYellow">${esc(a.morph)}</span></p>` : ''}
                </div>
                ${price}
            </div>
        </div>
        <div class="avail-info">
            <div class="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-gray-300 border-y border-white/10 py-3">
                <div><strong data-i18n="code-label">${esc(t('code-label'))}</strong> <span class="font-extrabold text-brandYellow break-all">${esc(a.cod)}</span></div>
                <div><strong data-i18n="sex-label">${esc(t('sex-label'))}</strong> <span class="card-sex text-brandYellow font-semibold" data-i18n="${sexI18nKey(a.sex)}">${esc(t(sexI18nKey(a.sex)))}</span>${a.sex === 'Maschio' ? ' <i class="fa-solid fa-mars text-sky-400 text-sm align-middle" title="♂"></i>' : a.sex === 'Femmina' ? ' <i class="fa-solid fa-venus text-pink-400 text-sm align-middle" title="♀"></i>' : ''}</div>
                <div><strong data-i18n="born-label">${esc(t('born-label'))}</strong> ${bornStr}</div>
                <div><strong data-i18n="notes-label">${esc(t('notes-label'))}</strong> <span class="card-notes text-brandYellow font-semibold break-words">${esc(a.note || '-')}</span></div>
            </div>
        </div>
        <div class="avail-action"></div>`;

    // Foto (se la cartella Drive ne contiene una con il nome del codice)
    if (a.foto.length) {
        const box = card.querySelector('.avail-photo');
        const ph = box.querySelector('i');
        const id = a.foto[0];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'absolute inset-0 w-full h-full cursor-zoom-in overflow-hidden';
        btn.setAttribute('aria-label', a.cod);
        // Foto sempre intera nella casella 4:3; lo spazio libero è riempito dalla stessa foto sfocata e scurita
        const bg = document.createElement('img');
        bg.className = 'photo-bg';
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        const eager = cardPhotoCount++ < 3;
        bg.loading = eager ? 'eager' : 'lazy';
        bg.decoding = 'async';
        bg.src = animalPhotoUrl(id, 64);
        bg.onload = () => bg.classList.add('loaded');
        const img = document.createElement('img');
        img.srcset = `${animalPhotoUrl(id, 480)} 480w, ${animalPhotoUrl(id, 800)} 800w`;
        img.sizes = PHOTO_SIZES;
        img.src = animalPhotoUrl(id, 800);
        img.alt = a.cod;
        img.loading = eager ? 'eager' : 'lazy';
        img.decoding = 'async';
        if (cardPhotoCount === 1) img.setAttribute('fetchpriority', 'high');
        img.className = 'photo-fg relative w-full h-full object-contain';
        img.onload = () => { ph.classList.add('hidden'); img.classList.add('loaded'); };
        img.onerror = () => {
            if (!img.dataset.alt) {
                img.dataset.alt = '1';
                img.removeAttribute('srcset'); img.removeAttribute('sizes');
                img.src = animalPhotoAlt(id, 800); bg.src = animalPhotoAlt(id, 64);
            } else btn.remove();
        };
        btn.appendChild(bg);
        btn.appendChild(img);
        btn.addEventListener('click', () => openPoster(animalPhotoUrl(id, 1600), `${a.cod}${a.morph ? ' - ' + a.morph : ''}`));
        box.insertBefore(btn, box.firstChild.nextSibling);
    }

    // Pulsante di prenotazione; per gli esemplari già prenotati compare "Non più disponibile"
    const act = card.querySelector('.avail-action');
    if (booked) {
        const n = document.createElement('span');
        n.className = 'inline-block text-center border border-white/20 text-gray-400 font-bold text-xs px-4 py-2 rounded-lg';
        n.setAttribute('data-i18n', 'btn-unavailable');
        n.textContent = t('btn-unavailable');
        act.appendChild(n);
    } else {
        const b = document.createElement('a');
        b.href = 'contatti.html#form-contatto-card';
        b.className = 'inline-block text-center bg-brandYellow hover:bg-yellow-500 text-black font-extrabold text-xs px-4 py-2 rounded-lg transition-all';
        b.innerHTML = `<span data-i18n="btn-book-request">${esc(t('btn-book-request'))}</span>`;
        b.addEventListener('click', () => richiediInfo(a.cod));
        act.appendChild(b);
    }
    observeReveal(card);
    return card;
}

function renderAnimali() {
    const grid = document.getElementById('avail-grid');
    const chips = document.getElementById('avail-species-chips');
    const loading = document.getElementById('avail-loading');
    if (!grid) return;
    if (animaliData === null) { if (loading) loading.classList.remove('hidden'); return; }
    if (loading) loading.classList.add('hidden');

    // Chip delle sole specie presenti, nell'ordine delle schede guida
    const previous = getSelectedSpecies()[0] || null;
    const present = [...new Set(animaliData.map(a => a.specie))];
    present.sort((x, y) => {
        const ix = SPECIES_ORDER.indexOf(x), iy = SPECIES_ORDER.indexOf(y);
        return (ix < 0 ? 99 : ix) - (iy < 0 ? 99 : iy) || x.localeCompare(y);
    });
    chips.querySelectorAll('.species-chip:not([data-species="all"])').forEach(c => c.remove());
    present.forEach(sp => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'species-chip';
        b.setAttribute('data-species', sp);
        b.addEventListener('click', () => toggleSpeciesChip(b));
        const key = SPECIES_I18N[sp];
        b.innerHTML = `<i>${esc(sp)}</i>` + (key ? ` <span class="chip-common" data-i18n="${key}">${esc(translations[currentLang][key])}</span>` : '');
        chips.appendChild(b);
    });
    const all = chips.querySelector('[data-species="all"]');
    chips.querySelectorAll('.species-chip').forEach(c => c.classList.remove('active'));
    const keep = previous && present.includes(previous) ? chips.querySelector(`[data-species="${CSS.escape(previous)}"]`) : null;
    (keep || all).classList.add('active');

    grid.innerHTML = '';
    cardPhotoCount = 0;
    animaliData.forEach(a => grid.appendChild(buildAnimalCard(a)));
    formatBornDates();
    updateSexOptions();
    applyAvailFilters();
}

// L'ultimo elenco ricevuto dall'app web resta salvato nel browser: alla visita successiva schede e foto compaiono subito
// (le foto iniziano a caricarsi senza attendere la risposta del foglio) e poi si aggiornano solo se qualcosa è cambiato.
const ANIMALI_CACHE_KEY = 'cg_cache_animali';
const ANIMALI_CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
function readAnimaliCache() {
    try {
        const c = JSON.parse(localStorage.getItem(ANIMALI_CACHE_KEY) || 'null');
        return c && Array.isArray(c.animali) && Date.now() - c.ts < ANIMALI_CACHE_MAX_AGE_MS ? c.animali : null;
    } catch (e) { return null; }
}
function writeAnimaliCache(raw) {
    try { localStorage.setItem(ANIMALI_CACHE_KEY, JSON.stringify({ ts: Date.now(), animali: raw })); } catch (e) { /* ignora */ }
}

async function loadAnimali() {
    const cachedRaw = readAnimaliCache();
    animaliData = cachedRaw ? cachedRaw.map(animalFromFields).filter(Boolean) : null;
    renderAnimali();
    let list = null;
    if (ANIMALI_API_URL) {
        try {
            const res = await fetchTimeout(ANIMALI_API_URL, ANIMALI_TIMEOUT_MS);
            const json = await res.json();
            if (!json || !json.ok || !Array.isArray(json.animali)) throw new Error('Risposta non valida');
            writeAnimaliCache(json.animali);
            // elenco identico a quello già mostrato: niente da ridisegnare (le foto restano dove sono)
            if (cachedRaw && JSON.stringify(cachedRaw) === JSON.stringify(json.animali)) return;
            list = json.animali.map(animalFromFields).filter(Boolean);
            if (json.senzaFoto && json.senzaFoto.length) console.info('Esemplari senza foto in cartella:', json.senzaFoto);
            if (json.fotoOrfane && json.fotoOrfane.length) console.info('Foto senza esemplare nel foglio:', json.fotoOrfane);
        } catch (err) {
            console.warn('App web delle foto non raggiungibile, leggo solo il foglio:', err);
            if (cachedRaw) return;   // si resta con l'ultimo elenco noto
        }
    }
    if (!list) {
        try {
            const res = await fetchTimeout(ANIMALI_CSV_URL, ANIMALI_TIMEOUT_MS);
            const txt = await res.text();
            if (!txt || /<html/i.test(txt.slice(0, 200))) throw new Error('Risposta non valida');
            list = parseAnimaliCsv(txt);
        } catch (err) {
            console.warn('Foglio esemplari non raggiungibile, uso la copia di riserva:', err);
            list = parseAnimaliCsv(ANIMALI_FALLBACK_CSV);
        }
    }
    animaliData = list;
    renderAnimali();
}

// Anni del filtro: anno in corso, i due precedenti e "≤ (anno - 3)" per tutti gli altri.
// Compaiono solo le annate che hanno almeno un esemplare (rispetto a specie e stato scelti) e si aggiornano da sole al cambio d'anno.
function buildYearOptions() {
    const sel = document.getElementById('avail-filter-year');
    const wrap = document.getElementById('avail-year-wrap');
    if (!sel || !wrap || !animaliData) return;
    const y = new Date().getFullYear();
    const species = getSelectedSpecies();
    const statusVal = document.getElementById('avail-filter-status').value;
    const years = animaliData
        .filter(a => (species.length === 0 || species.includes(a.specie)) && (statusVal === 'all' || a.stato === statusVal) && a.nascita)
        .map(a => a.nascita.date.getFullYear());
    const wanted = [];
    [y, y - 1, y - 2].forEach(v => { if (years.includes(v)) wanted.push([String(v), String(v)]); });
    if (years.some(v => v <= y - 3)) wanted.push(['old', '≤ ' + (y - 3)]);

    const keep = sel.value;
    sel.querySelectorAll('option:not([value="all"])').forEach(o => o.remove());
    wanted.forEach(([val, label]) => {
        const o = document.createElement('option');
        o.value = val;
        o.textContent = label;
        sel.appendChild(o);
    });
    sel.value = wanted.some(([val]) => val === keep) ? keep : 'all';
    wrap.classList.toggle('hidden', wanted.length === 0); // nessuna annata disponibile: il filtro non serve
}

// ===== Dizionario morph -> geni (scheda "Dizionario" dello stesso foglio) =====
// Colonne: MORPH (nome del morph/combinazione) e GENI (geni separati da #). Se un esemplare ha quel morph nel nome,
// i suoi geni vengono aggiunti alla ricerca (non alla scheda). I geni dopo HET / PH / poss. non attivano il dizionario.
const DIZIONARIO_SHEET_NAME = 'Dizionario';
const DIZIONARIO_CSV_URL = `https://docs.google.com/spreadsheets/d/${ANIMALI_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(DIZIONARIO_SHEET_NAME)}`;
let dizionario = [];            // [{ morph: 'red green', geni: 'emerine tangerine ...' }]

function parseDizionario(txt) {
    const rows = parseCSV(txt);
    if (rows.length < 2) return [];
    const clean = h => String(h || '').toLowerCase().replace(/[#:_]/g, '').trim();
    const head = rows[0].map(clean);
    let iM = head.findIndex(h => h.includes('morph'));
    let iG = head.findIndex(h => h.includes('gen'));
    if (iM < 0 || iG < 0 || iM === iG) { iM = 0; iG = 1; }
    const out = [];
    rows.slice(1).forEach(r => {
        const morph = normSearch(r[iM]);
        const geni = String(r[iG] || '').split('#').map(normSearch).filter(Boolean).join(' ');
        if (morph && geni) out.push({ morph, geni });
    });
    return out;
}

async function loadDizionario() {
    try {
        const res = await fetchTimeout(DIZIONARIO_CSV_URL, ANIMALI_TIMEOUT_MS);
        const txt = await res.text();
        if (!txt || /<html/i.test(txt.slice(0, 200))) throw new Error('Risposta non valida');
        dizionario = parseDizionario(txt);
    } catch (err) {
        console.warn('Dizionario morph non raggiungibile, la ricerca usa solo il testo della scheda:', err);
        dizionario = [];
    }
    document.querySelectorAll('.avail-card').forEach(c => { delete c._searchFull; });
    applyAvailFilters();
}

// Testo di ricerca di una scheda: testo normale + geni dei morph presenti nel nome (esclusi het / ph / poss.)
function fullSearchText(card) {
    if (card._searchFull !== undefined) return card._searchFull;
    const base = normSearch(card.getAttribute('data-search'));
    const expressed = ' ' + base.replace(/\b(?:low\s+)?(?:het|ph|poss|pos|possible|possibile)\s+\S+/g, ' ') + ' ';
    const extra = dizionario.filter(d => expressed.includes(' ' + d.morph + ' ')).map(d => d.geni).join(' ');
    return card._searchFull = (base + ' ' + extra).trim();
}

// Ricerca libera: ogni parola digitata deve comparire (anche parziale, in qualsiasi ordine) in codice/morph/note.
// Maiuscole, accenti e punteggiatura sono ignorati; le percentuali (es. 66%) non vengono considerate.
function normSearch(v) {
    return String(v == null ? '' : v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\d+(?:[.,]\d+)?\s*%/g, ' ').replace(/%/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ').trim();
}

// Nota informativa: su dispositivi senza mouse si apre/chiude al tocco; un tocco fuori la chiude
function toggleInfoTip(btn) {
    if (window.matchMedia('(hover: hover)').matches) return;
    btn.parentElement.classList.toggle('open');
}
document.addEventListener('click', e => {
    document.querySelectorAll('.info-wrap.open').forEach(w => { if (!w.contains(e.target)) w.classList.remove('open'); });
});

// Azzera sesso, anno, stato, ricerca e ordinamento; la specie selezionata resta com'è
function toggleMobileFilters() {
    const box = document.getElementById('avail-filters-extra');
    const btn = document.getElementById('avail-filters-toggle');
    const open = box.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// Numero di filtri attivi (escluso il filtro specie, sempre visibile), mostrato sul pulsante "Filtri" su mobile
function updateFiltersCount() {
    const badge = document.getElementById('avail-filters-count');
    if (!badge) return;
    const n = ['avail-filter-sex', 'avail-filter-status', 'avail-filter-year'].filter(id => document.getElementById(id).value !== 'all').length
        + (document.getElementById('avail-search').value.trim() ? 1 : 0)
        + (document.getElementById('avail-sort').value !== 'default' ? 1 : 0);
    badge.textContent = n;
    badge.classList.toggle('hidden', n === 0);
}

function resetAvailFilters() {
    document.getElementById('avail-filter-sex').value = 'all';
    document.getElementById('avail-filter-status').value = 'all';
    document.getElementById('avail-filter-year').value = 'all';
    document.getElementById('avail-search').value = '';
    document.getElementById('avail-sort').value = 'default';
    applyAvailFilters();
}

// Ordinamento delle schede: predefinito (ordine del foglio), prezzo crescente o decrescente.
// Gli esemplari senza prezzo restano sempre in fondo.
function sortAvailCards(cards) {
    const grid = document.getElementById('avail-grid');
    const mode = document.getElementById('avail-sort').value;
    const list = [...cards];
    list.forEach((c, i) => { if (c.dataset.order === undefined) c.dataset.order = i; });   // ordine iniziale = ordine del foglio
    const price = c => { const p = parseFloat(c.getAttribute('data-price')); return isNaN(p) ? null : p; };
    list.sort((x, y) => {
        if (mode !== 'default') {
            const px = price(x), py = price(y);
            if (px === null && py !== null) return 1;
            if (px !== null && py === null) return -1;
            if (px !== null && py !== null && px !== py) return mode === 'price-asc' ? px - py : py - px;
        }
        return x.dataset.order - y.dataset.order;
    });
    list.forEach(c => grid.appendChild(c));
}

function applyAvailFilters() {
    buildYearOptions();
    const searchTokens = normSearch(document.getElementById('avail-search').value).split(' ').filter(Boolean);
    const selectedSpecies = getSelectedSpecies();
    const sexVal = document.getElementById('avail-filter-sex').value;
    const statusVal = document.getElementById('avail-filter-status').value;
    const yearVal = document.getElementById('avail-filter-year').value;
    const currentYear = new Date().getFullYear();

    const cards = document.querySelectorAll('.avail-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cSpecies = card.getAttribute('data-species');
        const cSex = card.getAttribute('data-sex');
        const cStatus = card.getAttribute('data-status');
        const cSearch = fullSearchText(card);
        const cYear = parseInt(card.getAttribute('data-year'), 10);

        const matchesYear = yearVal === 'all' || (!isNaN(cYear) && (yearVal === 'old' ? cYear <= currentYear - 3 : cYear === parseInt(yearVal, 10)));
        const matchesSearch = searchTokens.every(tok => cSearch.includes(tok));
        const matchesSpecies = selectedSpecies.length === 0 || selectedSpecies.includes(cSpecies);
        const matchesSex = sexVal === 'all' || cSex === sexVal;
        const matchesStatus = statusVal === 'all' || cStatus === statusVal;

        if (matchesSearch && matchesSpecies && matchesSex && matchesStatus && matchesYear) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    sortAvailCards(cards);
    updateFiltersCount();

    const noResults = document.getElementById('no-avail-results');
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

// Prenotazione guidata: i pulsanti "prenota" sono link verso contatti.html; prima del cambio pagina
// salvano la richiesta in localStorage, che il modulo legge e applica all'apertura.
function richiediInfo(codice) { saveBooking({ tipo: 'esemplare', codice: codice }); }
function prenotaFiera(nomeFiera) { saveBooking({ tipo: 'fiera', nome: nomeFiera }); }

function applyPendingBooking() {
    if (!document.getElementById('form-oggetto')) return; // solo nella pagina Contatti
    const d = readBooking();
    if (!d) return;
    const oggetto = document.getElementById('form-oggetto');
    oggetto.value = "Prenotazione";
    gestisciOggetto();
    const ritiro = document.getElementById('form-ritiro');

    if (d.tipo === 'esemplare') {
        // La modalità di ritiro resta da selezionare (evidenziata in rosso)
        ritiro.value = "";
        gestisciRitiro();
        // Il codice esemplare è già visibile e compilato, anche prima di scegliere il ritiro
        document.getElementById('campo-codice').classList.remove('hidden');
        const inputCodice = document.getElementById('input-codice');
        inputCodice.value = d.codice;
        inputCodice.setAttribute('required', 'required');
        setRitiroAlert(true);
        showNotification(currentLang === 'it' ? `Prenotazione per l'esemplare ${d.codice}: scegli la modalità di ritiro` : `Booking for specimen ${d.codice}: please choose the pickup method`);
        clearBooking();
    } else if (d.tipo === 'fiera') {
        ritiro.value = "In fiera";
        gestisciRitiro();
        showNotification(currentLang === 'it' ? `Compila la prenotazione per il ritiro alla fiera: ${d.nome}` : `Fill out the booking for pickup at the show: ${d.nome}`);
        // la fiera si seleziona quando l'elenco è caricato (vedi applyPendingFiera); la richiesta resta salvata fino ad allora
    } else {
        clearBooking();
    }
    scrollToForm();
}

// Seleziona nel modulo la fiera scelta, appena l'elenco delle fiere è disponibile
function applyPendingFiera() {
    const d = readBooking();
    const select = document.getElementById('select-fiera');
    if (!d || d.tipo !== 'fiera' || !select || fiereData === null) return;
    if ([...select.options].some(o => o.value === d.nome)) select.value = d.nome;
    clearBooking();
}

// ===== Programma fiere da Google Sheets =====
// Foglio: colonne CIRCUITO, LUOGO, DATA INIZIO, DATA FINE, PRESENZA, TAVOLI, SITO (la prima riga è l'intestazione e viene saltata)
const FIERE_SHEET_ID = '1zFinluv6joWRTBX4yHjEeIfQoFDrarVMDIBnnhAq8CI';
const FIERE_CSV_URL = `https://docs.google.com/spreadsheets/d/${FIERE_SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
const FIERE_TIMEOUT_MS = 8000;
// Copia di riserva, usata solo se il foglio non è raggiungibile
const FIERE_FALLBACK_CSV = `CIRCUITO,LUOGO,DATA INIZIO,DATA FINE,PRESENZA,TAVOLI,SITO,LOCANDINA
Squamata,Ozzano dell'Emilia,15/11,,SI,16-17-18-19,https://www.squamata.it/,https://drive.google.com/file/d/1i4X1WW0YYVO526cTtr0eDetUK7WxeJ7j/view?usp=sharing
Esotika pet show,Fermo,21/11,22/11,SI,,https://www.esotikapetshow.it/,https://drive.google.com/file/d/1Ge0IJu0t3ed2gDZGYPWAjSEZKakYoJhq/view?usp=sharing
Esotika pet show,Pordenone,28/11,29/11,da confermare,,https://www.esotikapetshow.it/,https://drive.google.com/file/d/1gCUmBDwStgQx-1WcIFv5_H_l1JGFb7X4/view?usp=sharing`;
let fiereData = null; // null = in caricamento; [] = nessuna fiera

function parseCSV(text) {
    const rows = []; let row = [], field = '', inQ = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQ) {
            if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
            else field += c;
        } else if (c === '"') inQ = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n' || c === '\r') {
            if (c === '\r' && text[i + 1] === '\n') i++;
            row.push(field); rows.push(row); row = []; field = '';
        } else field += c;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
}

function parseDayMonth(str) {
    const t = String(str || '').trim();
    let m = t.match(/^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?$/);
    if (m) { let y = m[3] ? Number(m[3]) : null; if (y !== null && y < 100) y += 2000; return { d: +m[1], m: +m[2], y }; }
    m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m) return { d: +m[3], m: +m[2], y: +m[1] };
    return null;
}

// Senza anno nel foglio si sceglie l'anno in cui la data cade più vicina a oggi
// (una fiera di gennaio inserita a dicembre è del prossimo anno; una fiera di poche settimane fa risulta conclusa)
function resolveFieraDates(startStr, endStr, today) {
    const s0 = parseDayMonth(startStr);
    if (!s0) return null;
    const e0 = parseDayMonth(endStr);
    const build = (yy) => {
        const start = new Date(yy, s0.m - 1, s0.d);
        let end = null;
        if (e0) {
            end = new Date(e0.y !== null ? e0.y : yy, e0.m - 1, e0.d);
            if (end < start && e0.y === null) end = new Date(yy + 1, e0.m - 1, e0.d);
            if (end < start) end = null;
        }
        return { start, end };
    };
    if (s0.y !== null) return build(s0.y);
    const y = today.getFullYear();
    let best = null, bestDist = Infinity;
    [y - 1, y, y + 1].forEach(yy => {
        const r = build(yy);
        const ref = r.end || r.start;
        const dist = (r.start <= today && today <= ref) ? 0 : Math.min(Math.abs(r.start - today), Math.abs(ref - today));
        if (dist <= bestDist) { best = r; bestDist = dist; }
    });
    return best;
}

// Locandina: indirizzo web, link di Google Drive oppure nome file (cartella "locandine/" accanto al sito)
function resolvePosterUrl(v, folder) {
    const t = String(v || '').trim();
    if (!t) return '';
    let m = t.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1200`;
    m = t.match(/https?:\/\/[^\s"')]+/);
    if (m) return m[0];
    if (/^[\w\-. %\/]+\.(png|jpe?g|webp|gif|avif)$/i.test(t)) {
        const clean = t.replace(/^\/+/, '');
        return clean.includes('/') ? clean : (folder || 'locandine') + '/' + clean; // percorso già indicato oppure solo il nome file
    }
    return '';
}

// Seconda possibilità per i file di Google Drive, se la miniatura principale non carica
function resolvePosterAlt(v) {
    const m = String(v || '').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    return m ? `https://lh3.googleusercontent.com/d/${m[1]}=w1200` : '';
}

function safeUrl(u) {
    const t = String(u || '').trim();
    return /^https?:\/\//i.test(t) ? t : '';
}

function buildFiere(csvText, today) {
    today = today || new Date();
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const rows = parseCSV(csvText).slice(1); // salta l'intestazione
    const out = [];
    rows.forEach(r => {
        const [circuito, luogo, dInizio, dFine, presenza, tavoli, sito, locandina] = r.map(x => (x || '').trim());
        if (!circuito || !dInizio) return;
        const pres = presenza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let stato = null; // 'si' = presenti, 'pending' = presenza da confermare
        if (['si', 's', 'yes', 'y', 'x', '1', 'true', 'presente', 'presenti'].includes(pres)) stato = 'si';
        else if (pres.includes('confermare') || pres.includes('conferma')) stato = 'pending';
        if (!stato) stato = 'no'; // fiera a cui non partecipiamo: mostrata come "Non presenti", senza prenotazione
        const dates = resolveFieraDates(dInizio, dFine, t0);
        if (!dates) return;
        if ((dates.end || dates.start) < t0) return; // già concluse
        out.push({
            nome: luogo ? `${circuito} - ${luogo}` : circuito,
            circuito, luogo, tavoli, sito: safeUrl(sito), stato, poster: resolvePosterUrl(locandina), posterAlt: resolvePosterAlt(locandina),
            start: dates.start, end: dates.end
        });
    });
    out.sort((a, b) => a.start - b.start);
    return out;
}

function formatFieraDate(f) {
    const loc = currentLang === 'it' ? 'it-IT' : 'en-US';
    const fmt = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric' });
    if (f.end && f.end.getTime() !== f.start.getTime() && typeof fmt.formatRange === 'function') return fmt.formatRange(f.start, f.end);
    return fmt.format(f.start);
}

// Un elemento per ogni giorno della fiera, con il giorno della settimana (es. "domenica 15 novembre 2026")
function formatFieraDays(f) {
    const loc = currentLang === 'it' ? 'it-IT' : 'en-US';
    const fmt = new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const days = [];
    const last = (f.end && f.end > f.start) ? f.end : f.start;
    for (let d = new Date(f.start); d <= last && days.length < 14; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
        days.push(fmt.format(d));
    }
    return days;
}

function renderFiere() {
    // La stessa funzione serve la pagina Fiere (elenco) e la pagina Contatti (menu del modulo): l'elemento assente è sostituito da uno scollegato
    const list = document.getElementById('fiere-list') || document.createElement('div');
    const select = document.getElementById('select-fiera') || document.createElement('select');
    const t = k => translations[currentLang][k];
    list.innerHTML = '';

    if (fiereData === null) {
        list.innerHTML = `<p class="text-center text-gray-400">${t('shows-loading')}</p>`;
        return;
    }

    const prev = select.value;
    select.querySelectorAll('option:not([value=""])').forEach(o => o.remove());

    if (fiereData.length === 0) {
        list.innerHTML = `<p class="text-center text-gray-400">${t('shows-empty')}</p>`;
    }

    const firstAttending = fiereData.findIndex(x => x.stato !== 'no');
    const multiYear = new Set(fiereData.map(x => x.start.getFullYear())).size > 1;
    let lastYear = null;
    fiereData.forEach((f, i) => {
        const yr = f.start.getFullYear();
        if (multiYear && yr !== lastYear) {
            const sep = document.createElement('div');
            sep.className = 'flex items-center gap-4 pt-2';
            sep.innerHTML = '<div class="flex-1 h-1.5 rounded-full bg-brandGreen/60"></div><span class="text-brandGreen font-black text-3xl sm:text-5xl tracking-widest"></span><div class="flex-1 h-1.5 rounded-full bg-brandGreen/60"></div>';
            sep.querySelector('span').textContent = yr;
            list.appendChild(sep);
        }
        lastYear = yr;
        const card = document.createElement('div');
        card.className = 'glass-card p-4 sm:p-6 rounded-2xl border-l-8 border-l-brandGreen flex flex-col sm:flex-row items-stretch';

        // Colonna sinistra: locandina centrata (si ingrandisce al clic) e, sotto, pulsante verso la pagina della fiera
        const posterCol = document.createElement('div');
        posterCol.className = 'poster-col flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-2 shrink-0 mb-4 sm:mb-0';
        if (f.poster) {
            const pb = document.createElement('button');
            pb.type = 'button';
            pb.className = 'rounded-lg overflow-hidden border border-white/20 hover:border-brandYellow transition-all';
            pb.setAttribute('aria-label', t('show-poster-alt'));
            const img = document.createElement('img');
            img.src = f.poster;
            img.alt = t('show-poster-alt');
            img.loading = 'lazy';
            img.className = 'block h-24 sm:h-32 w-auto max-w-[45vw] sm:max-w-[14rem] object-contain';
            img.onload = updatePosterColumn;
            img.onerror = () => {
                if (f.posterAlt && !img.dataset.alt) { img.dataset.alt = '1'; img.src = f.posterAlt; }
                else { pb.remove(); updatePosterColumn(); }
            };
            pb.appendChild(img);
            pb.addEventListener('click', () => openPoster(img.currentSrc || img.src, `${f.circuito}${f.luogo ? ' - ' + f.luogo : ''}`));
            posterCol.appendChild(pb);
        }
        if (f.sito) {
            const a = document.createElement('a');
            a.href = f.sito; a.target = '_blank'; a.rel = 'noopener noreferrer';
            a.className = 'site-btn hidden sm:inline-flex flex-1 min-w-0 sm:flex-none sm:w-full sm:mt-auto items-center justify-center gap-2 border border-brandGreen text-brandGreen hover:bg-brandGreen hover:text-black font-bold text-sm px-3 py-2 rounded-lg transition-all text-center';
            a.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>';
            a.appendChild(document.createTextNode(t('show-website')));
            posterCol.appendChild(a);
        }
        if (!posterCol.children.length) posterCol.className = 'poster-col hidden sm:flex shrink-0';
        card.appendChild(posterCol);

        const body = document.createElement('div');
        body.className = 'flex-1 min-w-0 flex flex-col gap-3';

        // Riga titolo + stato presenza + "Prossimo Evento"
        const head = document.createElement('div');
        head.className = 'flex flex-wrap items-center gap-x-3 gap-y-1';
        const h3 = document.createElement('h3');
        h3.className = 'text-xl sm:text-3xl font-bold text-white break-words min-w-0';
        h3.textContent = f.circuito;
        head.appendChild(h3);
        const status = document.createElement('span');
        if (f.stato === 'si') {
            status.className = 'bg-brandYellow/20 text-brandYellow font-extrabold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full';
            status.textContent = t('show-present');
        } else if (f.stato === 'no') {
            status.className = 'bg-red-500/20 text-red-500 font-extrabold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full';
            status.textContent = t('show-absent');
        } else {
            status.className = 'bg-orange-500/20 text-orange-500 font-extrabold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full';
            status.textContent = t('show-pending');
        }
        head.appendChild(status);
        if (i === firstAttending) {
            const tag = document.createElement('span');
            tag.className = 'bg-brandGreen/20 text-brandGreen font-bold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full';
            tag.textContent = t('show-tag-next');
            head.appendChild(tag);
        }

        // Riga luogo + tavoli (alla stessa altezza, sotto il nome del circuito)
        const placeRow = document.createElement('div');
        placeRow.className = 'flex flex-wrap items-center justify-between gap-x-4 sm:gap-x-6 gap-y-1 text-base sm:text-xl';
        if (f.luogo) {
            const loc = document.createElement('span');
            loc.className = 'text-brandYellow font-bold text-xl sm:text-3xl min-w-0 break-words';
            loc.innerHTML = '<i class="fa-solid fa-location-dot text-brandGreen"></i> ';
            loc.appendChild(document.createTextNode(f.luogo));
            placeRow.appendChild(loc);
        }
        if (f.tavoli) {
            const tv = document.createElement('span');
            tv.className = 'text-gray-200 font-semibold sm:ml-auto sm:text-right min-w-0 break-words';
            tv.innerHTML = '<i class="fa-solid fa-table-cells-large text-brandYellow"></i> ';
            tv.appendChild(document.createTextNode(`${t('show-tables')} ${f.tavoli}`));
            placeRow.appendChild(tv);
        }

        // Giorni (uno sotto l'altro) subito sotto il luogo
        const datesBlock = document.createElement('div');
        datesBlock.className = 'space-y-1 text-sm';
        formatFieraDays(f).forEach((giorno, k) => {
            const line = document.createElement('div');
            line.className = 'text-gray-400 flex items-center gap-2';
            const ic = document.createElement('i');
            ic.className = 'fa-regular fa-calendar text-brandGreen' + (k === 0 ? '' : ' invisible');
            line.appendChild(ic);
            line.appendChild(document.createTextNode(giorno));
            datesBlock.appendChild(line);
        });

        // Riga inferiore: pulsante di prenotazione in basso a destra
        const bottom = document.createElement('div');
        bottom.className = 'mt-auto hidden sm:flex justify-end';

        const btn = document.createElement('a');
        btn.href = 'contatti.html#form-contatto-card';
        btn.className = 'inline-block text-center bg-brandYellow hover:bg-yellow-500 border border-brandYellow text-black font-extrabold text-sm px-5 py-2 rounded-lg transition-all whitespace-nowrap';
        btn.textContent = t('btn-book-show');
        btn.addEventListener('click', () => prenotaFiera(f.nome));

        if (f.stato !== 'no') bottom.appendChild(btn);

        // Mobile: in alto, accanto alla locandina, "sito della fiera" e subito sotto "prenota ritiro in fiera"
        const mobileCol = document.createElement('div');
        mobileCol.className = 'sm:hidden flex flex-col gap-2 flex-1 min-w-0';
        if (f.sito) {
            const ma = document.createElement('a');
            ma.href = f.sito; ma.target = '_blank'; ma.rel = 'noopener noreferrer';
            ma.className = 'w-full inline-flex items-center justify-center gap-2 border border-brandGreen text-brandGreen hover:bg-brandGreen hover:text-black font-bold text-sm px-3 py-2 rounded-lg transition-all text-center';
            ma.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>';
            ma.appendChild(document.createTextNode(t('show-website')));
            mobileCol.appendChild(ma);
        }
        if (f.stato !== 'no') {
            const mb = document.createElement('a');
            mb.href = 'contatti.html#form-contatto-card';
            mb.className = 'block text-center w-full bg-brandYellow hover:bg-yellow-500 border border-brandYellow text-black font-extrabold text-sm px-3 py-2 rounded-lg transition-all';
            mb.textContent = t('btn-book-show');
            mb.addEventListener('click', () => prenotaFiera(f.nome));
            mobileCol.appendChild(mb);
        }
        if (mobileCol.children.length) {
            if (posterCol.classList.contains('hidden')) posterCol.className = 'poster-col flex sm:hidden shrink-0 mb-4';
            posterCol.appendChild(mobileCol);
        }
        body.appendChild(head);
        if (placeRow.children.length) body.appendChild(placeRow);
        body.appendChild(datesBlock);
        if (bottom.children.length) body.appendChild(bottom);
        card.appendChild(body);
        list.appendChild(card);

        if (f.stato === 'no') return; // nel modulo prenotazioni solo le fiere dove siamo presenti
        const opt = document.createElement('option');
        opt.value = f.nome;
        opt.textContent = `${f.nome} (${formatFieraDate(f)})`;
        select.appendChild(opt);
    });

    if (prev && fiereData.some(f => f.stato !== 'no' && f.nome === prev)) select.value = prev;

    updatePosterColumn();

    // Senza fiere in programma non si può scegliere il ritiro in fiera
    const optFiera = document.querySelector('#form-ritiro option[value="In fiera"]');
    if (optFiera) optFiera.disabled = !fiereData.some(f => f.stato !== 'no');

    applyPendingFiera();
    applyDraftFiera();
}

// Tutte le colonne locandina hanno la larghezza della locandina più larga (min. quanto serve al pulsante del sito)
function updatePosterColumn() {
    const list = document.getElementById('fiere-list');
    if (!list) return;
    let w = 0;
    list.querySelectorAll('.poster-col img').forEach(img => { w = Math.max(w, Math.ceil(img.getBoundingClientRect().width)); });
    if (list.querySelector('.poster-col .site-btn')) w = Math.max(w, 144);
    list.style.setProperty('--poster-w', w ? w + 'px' : '0px');
    list.style.setProperty('--poster-gap', w ? '1.25rem' : '0px');
}

let posterResizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(posterResizeTimer);
    posterResizeTimer = setTimeout(updatePosterColumn, 150);
});

// Ingrandimento locandina
function openPoster(src, title) {
    let box = document.getElementById('poster-lightbox');
    if (!box) {
        box = document.createElement('div');
        box.id = 'poster-lightbox';
        box.className = 'hidden fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 cursor-zoom-out';
        box.innerHTML = '<img alt="" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">';
        box.addEventListener('click', closePoster);
        document.body.appendChild(box);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closePoster(); });
    }
    const img = box.querySelector('img');
    img.src = src;
    img.alt = title || '';
    box.classList.remove('hidden');
}

function closePoster() {
    const box = document.getElementById('poster-lightbox');
    if (box) box.classList.add('hidden');
}

async function loadFiere() {
    fiereData = null;
    renderFiere();
    let csv = null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FIERE_TIMEOUT_MS);
    try {
        const res = await fetch(FIERE_CSV_URL, { signal: controller.signal });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        csv = await res.text();
        if (!csv || /<html/i.test(csv.slice(0, 200))) throw new Error('Risposta non valida');
    } catch (err) {
        console.warn('Foglio fiere non raggiungibile, uso la copia di riserva:', err);
        csv = FIERE_FALLBACK_CSV;
    } finally {
        clearTimeout(timer);
    }
    fiereData = buildFiere(csv);
    renderFiere();
}

// Funzioni di gestione dinamica del form di contatto
function gestisciOggetto() {
    const oggetto = document.getElementById('form-oggetto').value;
    const sezionePrenotazione = document.getElementById('sezione-prenotazione');
    const formRitiro = document.getElementById('form-ritiro');

    const termsBox = document.getElementById('terms-box');
    const termsCheck = document.getElementById('input-termini');

    if (oggetto === 'Prenotazione') {
        sezionePrenotazione.classList.remove('hidden');
        formRitiro.setAttribute('required', 'required');
        termsBox.classList.remove('hidden');
        termsCheck.setAttribute('required', 'required');
    } else {
        termsBox.classList.add('hidden');
        termsCheck.removeAttribute('required');
        termsCheck.checked = false;
        sezionePrenotazione.classList.add('hidden');
        formRitiro.removeAttribute('required');
        formRitiro.value = "";
        gestisciRitiro();
    }
}

// Evidenzia in rosso la modalità di ritiro quando va ancora scelta
function setRitiroAlert(on) {
    const label = document.getElementById('label-ritiro');
    const select = document.getElementById('form-ritiro');
    label.classList.toggle('text-red-500', on);
    label.classList.toggle('text-gray-300', !on);
    label.classList.toggle('font-bold', on);
    select.classList.toggle('border-red-500', on);
}

function gestisciRitiro() {
    setRitiroAlert(false);
    const ritiro = document.getElementById('form-ritiro').value;
    const campoCodice = document.getElementById('campo-codice');
    const inputCodice = document.getElementById('input-codice');
    const campoFiera = document.getElementById('campo-fiera');
    const selectFiera = document.getElementById('select-fiera');
    const campoTrasporto = document.getElementById('campo-trasporto');
    const selectProvincia = document.getElementById('select-provincia');

    // Reset visibilità e requisiti
    campoCodice.classList.add('hidden');
    inputCodice.removeAttribute('required');
    campoFiera.classList.add('hidden');
    selectFiera.removeAttribute('required');
    campoTrasporto.classList.add('hidden');
    selectProvincia.removeAttribute('required');

    // Prenotazione di un animale specifico: il codice resta visibile anche prima di scegliere la modalità di ritiro
    if (!ritiro && inputCodice.value.trim() && document.getElementById('form-oggetto').value === 'Prenotazione') {
        campoCodice.classList.remove('hidden');
    }

    if (ritiro === 'In allevamento') {
        campoCodice.classList.remove('hidden');
        inputCodice.setAttribute('required', 'required');
    } else if (ritiro === 'In fiera') {
        campoCodice.classList.remove('hidden');
        inputCodice.setAttribute('required', 'required');
        campoFiera.classList.remove('hidden');
        selectFiera.setAttribute('required', 'required');
    } else if (ritiro === 'Trasporto') {
        campoCodice.classList.remove('hidden');
        inputCodice.setAttribute('required', 'required');
        campoTrasporto.classList.remove('hidden');
        selectProvincia.setAttribute('required', 'required');
    }
}

// ===== Prefisso telefonico internazionale =====
const PHONE_PREFIXES = [['AF','93'],['AL','355'],['DZ','213'],['AS','1684'],['AD','376'],['AO','244'],['AI','1264'],['AG','1268'],['AR','54'],['AM','374'],['AW','297'],['AU','61'],['AT','43'],['AZ','994'],['BS','1242'],['BH','973'],['BD','880'],['BB','1246'],['BY','375'],['BE','32'],['BZ','501'],['BJ','229'],['BM','1441'],['BT','975'],['BO','591'],['BA','387'],['BW','267'],['BR','55'],['IO','246'],['VG','1284'],['BN','673'],['BG','359'],['BF','226'],['BI','257'],['KH','855'],['CM','237'],['CA','1'],['CV','238'],['BQ','599'],['KY','1345'],['CF','236'],['TD','235'],['CL','56'],['CN','86'],['CX','61'],['CC','61'],['CO','57'],['KM','269'],['CG','242'],['CD','243'],['CK','682'],['CR','506'],['CI','225'],['HR','385'],['CU','53'],['CW','599'],['CY','357'],['CZ','420'],['DK','45'],['DJ','253'],['DM','1767'],['DO','1809'],['EC','593'],['EG','20'],['SV','503'],['GQ','240'],['ER','291'],['EE','372'],['SZ','268'],['ET','251'],['FK','500'],['FO','298'],['FJ','679'],['FI','358'],['FR','33'],['GF','594'],['PF','689'],['GA','241'],['GM','220'],['GE','995'],['DE','49'],['GH','233'],['GI','350'],['GR','30'],['GL','299'],['GD','1473'],['GP','590'],['GU','1671'],['GT','502'],['GG','44'],['GN','224'],['GW','245'],['GY','592'],['HT','509'],['HN','504'],['HK','852'],['HU','36'],['IS','354'],['IN','91'],['ID','62'],['IR','98'],['IQ','964'],['IE','353'],['IM','44'],['IL','972'],['IT','39'],['JM','1876'],['JP','81'],['JE','44'],['JO','962'],['KZ','7'],['KE','254'],['KI','686'],['XK','383'],['KW','965'],['KG','996'],['LA','856'],['LV','371'],['LB','961'],['LS','266'],['LR','231'],['LY','218'],['LI','423'],['LT','370'],['LU','352'],['MO','853'],['MG','261'],['MW','265'],['MY','60'],['MV','960'],['ML','223'],['MT','356'],['MH','692'],['MQ','596'],['MR','222'],['MU','230'],['YT','262'],['MX','52'],['FM','691'],['MD','373'],['MC','377'],['MN','976'],['ME','382'],['MS','1664'],['MA','212'],['MZ','258'],['MM','95'],['NA','264'],['NR','674'],['NP','977'],['NL','31'],['NC','687'],['NZ','64'],['NI','505'],['NE','227'],['NG','234'],['NU','683'],['NF','672'],['KP','850'],['MK','389'],['MP','1670'],['NO','47'],['OM','968'],['PK','92'],['PW','680'],['PS','970'],['PA','507'],['PG','675'],['PY','595'],['PE','51'],['PH','63'],['PL','48'],['PT','351'],['PR','1787'],['QA','974'],['RE','262'],['RO','40'],['RU','7'],['RW','250'],['BL','590'],['SH','290'],['KN','1869'],['LC','1758'],['MF','590'],['PM','508'],['VC','1784'],['WS','685'],['SM','378'],['ST','239'],['SA','966'],['SN','221'],['RS','381'],['SC','248'],['SL','232'],['SG','65'],['SX','1721'],['SK','421'],['SI','386'],['SB','677'],['SO','252'],['ZA','27'],['KR','82'],['SS','211'],['ES','34'],['LK','94'],['SD','249'],['SR','597'],['SJ','47'],['SE','46'],['CH','41'],['SY','963'],['TW','886'],['TJ','992'],['TZ','255'],['TH','66'],['TL','670'],['TG','228'],['TK','690'],['TO','676'],['TT','1868'],['TN','216'],['TR','90'],['TM','993'],['TC','1649'],['TV','688'],['VI','1340'],['UG','256'],['UA','380'],['AE','971'],['GB','44'],['US','1'],['UY','598'],['UZ','998'],['VU','678'],['VA','379'],['VE','58'],['VN','84'],['WF','681'],['EH','212'],['YE','967'],['ZM','260'],['ZW','263'],['AX','358']];
let selectedPrefix = null; // { iso, dial }

function flagHtml(iso) {
    const c = iso.toLowerCase();
    return `<img src="https://flagcdn.com/w40/${c}.png" srcset="https://flagcdn.com/w80/${c}.png 2x" alt="" loading="lazy" style="width:24px;height:18px;object-fit:cover;border-radius:2px;flex-shrink:0" onerror="this.replaceWith(document.createTextNode('${iso}'))">`;
}

function normalizeText(t) {
    return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getPrefixCountries() {
    let dn = null;
    try { dn = new Intl.DisplayNames([currentLang === 'it' ? 'it' : 'en'], { type: 'region' }); } catch (e) {}
    const list = PHONE_PREFIXES.map(([iso, dial]) => {
        let name = iso;
        try { if (dn) name = dn.of(iso) || iso; } catch (e) {}
        return { iso, dial, name };
    });
    list.sort((a, b) => a.name.localeCompare(b.name, currentLang));
    const it = list.findIndex(c => c.iso === 'IT');
    if (it > 0) list.unshift(list.splice(it, 1)[0]); // Italia in cima
    return list;
}

function renderPrefixList(filter) {
    const q = normalizeText((filter || '').trim()).replace(/^\+/, '');
    const ul = document.getElementById('prefix-list');
    const items = getPrefixCountries().filter(c =>
        !q || normalizeText(c.name).includes(q) || c.iso.toLowerCase() === q || c.dial.startsWith(q));
    ul.innerHTML = items.map(c => `
        <li role="option" data-iso="${c.iso}" tabindex="-1" onclick="selectPrefix('${c.iso}')"
            class="flex items-center gap-3 px-3 py-2 text-sm text-white hover:bg-brandGreen/20 cursor-pointer ${selectedPrefix && selectedPrefix.iso === c.iso ? 'bg-brandGreen/10' : ''}">
            ${flagHtml(c.iso)}
            <span class="flex-1 truncate">${c.name}</span>
            <span class="text-gray-400 shrink-0">+${c.dial}</span>
        </li>`).join('');
}

function togglePrefixMenu() {
    const menu = document.getElementById('prefix-menu');
    if (menu.classList.contains('hidden')) {
        document.getElementById('prefix-search').value = '';
        renderPrefixList('');
        menu.classList.remove('hidden');
        document.getElementById('prefix-btn').setAttribute('aria-expanded', 'true');
        document.getElementById('prefix-search').focus();
        const sel = menu.querySelector('li.bg-brandGreen\\/10');
        if (sel) sel.scrollIntoView({ block: 'center' });
    } else {
        closePrefixMenu();
    }
}

function closePrefixMenu() {
    document.getElementById('prefix-menu').classList.add('hidden');
    document.getElementById('prefix-btn').setAttribute('aria-expanded', 'false');
}

function prefixSearchKey(e) {
    if (e.key === 'Escape') { closePrefixMenu(); document.getElementById('prefix-btn').focus(); }
    if (e.key === 'Enter') {
        e.preventDefault();
        const first = document.querySelector('#prefix-list li');
        if (first) selectPrefix(first.getAttribute('data-iso'));
    }
}

// Se più paesi condividono lo stesso prefisso, la bandiera mostrata è quella del paese principale
const PREFIX_PRIMARY = { '1': 'US', '7': 'RU', '39': 'IT', '44': 'GB', '47': 'NO', '61': 'AU', '212': 'MA', '262': 'RE', '358': 'FI', '590': 'GP', '599': 'CW' };

function dialToIso(dial) {
    if (PREFIX_PRIMARY[dial]) return PREFIX_PRIMARY[dial];
    const e = PHONE_PREFIXES.find(p => p[1] === dial);
    return e ? e[0] : null;
}

// kind: null = nessun errore, 'empty' = prefisso mancante, 'invalid' = prefisso scritto non valido
function setPrefixError(kind) {
    const f = document.getElementById('prefix-field');
    f.classList.toggle('border-red-500', !!kind);
    f.classList.toggle('border-white/20', !kind);
    document.getElementById('prefix-error').classList.toggle('hidden', kind !== 'empty');
    document.getElementById('prefix-invalid').classList.toggle('hidden', kind !== 'invalid');
}

function setPrefixFlag(iso) {
    document.getElementById('prefix-flag').innerHTML = iso ? flagHtml(iso) : '';
}

// Digitazione manuale: accetta "+39", "39" o "0039" e controlla che il prefisso esista
function onPrefixInput(input) {
    const raw = input.value;
    let digits = raw.replace(/\D/g, '');
    if (raw.replace(/^\s*\+/, '').startsWith('00')) digits = digits.slice(2); // 0039 -> 39
    digits = digits.slice(0, 4);
    input.value = digits ? '+' + digits : '';
    const iso = digits ? dialToIso(digits) : null;
    selectedPrefix = iso ? { iso, dial: digits } : null;
    setPrefixFlag(iso);
    setPrefixError(null); // l'errore compare quando si lascia il campo o si invia il modulo
}

function onPrefixBlur() {
    const val = document.getElementById('input-prefisso').value.trim();
    if (val && !selectedPrefix) setPrefixError('invalid');
}

function prefixFieldKey(e) {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('input-telefono').focus(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); const m = document.getElementById('prefix-menu'); if (m.classList.contains('hidden')) togglePrefixMenu(); }
    if (e.key === 'Escape') closePrefixMenu();
}

// Scelta dall'elenco a tendina
function selectPrefix(iso) {
    const entry = PHONE_PREFIXES.find(p => p[0] === iso);
    if (!entry) return;
    selectedPrefix = { iso: entry[0], dial: entry[1] };
    document.getElementById('input-prefisso').value = '+' + entry[1];
    setPrefixFlag(iso);
    setPrefixError(null);
    closePrefixMenu();
    document.getElementById('input-telefono').focus();
}

function resetPrefix() {
    selectedPrefix = null;
    document.getElementById('input-prefisso').value = '';
    setPrefixFlag(null);
    setPrefixError(null);
    document.getElementById('prefix-required-star').classList.add('hidden');
}

// Il prefisso diventa obbligatorio non appena si scrive il numero
function onPhoneInput(input) {
    const cleaned = input.value.replace(/[^0-9 ]/g, '');
    if (cleaned !== input.value) input.value = cleaned;
    const hasNumber = input.value.trim() !== '';
    document.getElementById('prefix-required-star').classList.toggle('hidden', !hasNumber);
    if ((!hasNumber || selectedPrefix) && !document.getElementById('prefix-error').classList.contains('hidden')) setPrefixError(null);
}

function validatePhonePrefix() {
    const field = document.getElementById('input-prefisso');
    const hasNumber = document.getElementById('input-telefono').value.trim() !== '';
    if (field.value.trim() && !selectedPrefix) { setPrefixError('invalid'); field.focus(); return false; }
    if (hasNumber && !selectedPrefix) { setPrefixError('empty'); field.focus(); return false; }
    return true;
}

function getFullPhone() {
    const n = document.getElementById('input-telefono').value.trim();
    return n && selectedPrefix ? `+${selectedPrefix.dial} ${n}` : '';
}

document.addEventListener('click', e => {
    const w = document.getElementById('prefix-wrapper');
    if (w && !w.contains(e.target)) closePrefixMenu();
});

// Destinatario dei messaggi del modulo contatti (invio tramite FormSubmit.co)
const CONTACT_EMAIL = 'chrisgeckostv@gmail.com';
const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;
let CONTACT_TIMEOUT_MS = 15000; // oltre questo tempo l'invio viene interrotto e il pulsante si sblocca

function isVisible(id) {
    const el = document.getElementById(id);
    return el && !el.classList.contains('hidden');
}

// Dati dell'esemplare prenotato (dal foglio) da aggiungere alla tabella della mail che ricevi
function buildSpecimenRows(codice) {
    const norm = c => String(c || '').replace(/\s+/g, '').toUpperCase();
    const rows = {};
    if (!codice) return rows;
    const a = (animaliData || []).find(x => norm(x.cod) === norm(codice));
    if (!a) {
        rows['Esemplare - verifica'] = 'ATTENZIONE: il codice "' + codice + '" non è presente nel foglio degli esemplari (controllare che sia scritto correttamente)';
        return rows;
    }
    const it = translations.it;
    const when = a.nascita ? a.nascita.date.toLocaleDateString('it-IT',
        a.nascita.fmt === 'y' ? { year: 'numeric' } : a.nascita.fmt === 'my' ? { month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
    rows['Esemplare - specie'] = a.specie;
    rows['Esemplare - morph'] = a.morph || '-';
    rows['Esemplare - sesso'] = it[sexI18nKey(a.sex)];
    rows['Esemplare - nascita'] = when;
    rows['Esemplare - prezzo'] = a.prezzo !== null ? '€' + a.prezzo : '-';
    if (a.proven) rows['Esemplare - riproduttore'] = 'Sì';
    if (a.note) rows['Esemplare - note'] = a.note;
    rows['Esemplare - stato nel foglio'] = a.stato === 'Prenotato' ? 'GIÀ PRENOTATO (casella spuntata nel foglio)' : 'Disponibile';
    rows['Esemplare - foto'] = a.foto.length
        ? a.foto.map(id => 'https://drive.google.com/file/d/' + id + '/view').join('   ')
        : 'Nessuna foto nella cartella';
    return rows;
}

// Testo della e-mail di conferma inviata automaticamente al cliente (FormSubmit: campo _autoresponse)
function buildAutoresponse(d, it) {
    const nome = d.nome ? ' ' + d.nome : '';
    const righe = [];
    const add = (label, value) => { if (value) righe.push(`- ${label}: ${value}`); };
    const isPren = d.oggetto === 'Prenotazione';

    if (it) {
        righe.push(`Ciao${nome},`);
        righe.push('');
        righe.push('grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.');
        if (isPren) righe.push("Questa e-mail conferma la ricezione della tua richiesta di prenotazione: non è ancora una conferma definitiva. Ti contatteremo per confermare i dettagli e la modalità di ritiro.");
        righe.push('');
        righe.push('Riepilogo della tua richiesta:');
        add('Oggetto', d.oggetto);
        add('Esemplare', d.codice);
        add('Modalità di ritiro', d.ritiro);
        add('Fiera', d.fiera);
        add('Provincia', d.provincia);
        add('Messaggio', d.messaggio);
        righe.push('');
        righe.push(`Se non vedi la nostra risposta entro qualche giorno, controlla la cartella spam oppure scrivici a ${CONTACT_EMAIL}.`);
        righe.push('');
        righe.push('A presto,');
        righe.push('ChrisGeckos');
    } else {
        const EN = { 'Informazioni': 'Information', 'Prenotazione': 'Booking', 'In allevamento': 'Pickup at the breeder', 'In fiera': 'Pickup at a show', 'Trasporto': 'Transport' };
        d = Object.assign({}, d, { oggetto: EN[d.oggetto] || d.oggetto, ritiro: EN[d.ritiro] || d.ritiro });
        righe.push(`Hello${nome},`);
        righe.push('');
        righe.push('thank you for contacting us! We have received your message and will reply as soon as possible.');
        if (isPren) righe.push('This email confirms we received your booking request: it is not a final confirmation yet. We will contact you to confirm the details and the pickup method.');
        righe.push('');
        righe.push('Summary of your request:');
        add('Subject', d.oggetto);
        add('Specimen', d.codice);
        add('Pickup method', d.ritiro);
        add('Show', d.fiera);
        add('Province', d.provincia);
        add('Message', d.messaggio);
        righe.push('');
        righe.push(`If you do not see our reply within a few days, please check your spam folder or write to us at ${CONTACT_EMAIL}.`);
        righe.push('');
        righe.push('See you soon,');
        righe.push('ChrisGeckos');
    }
    return righe.join('\n');
}

async function inviaMessaggio(event) {
    event.preventDefault();
    if (!validatePhonePrefix()) return;

    // Anti-spam: il campo nascosto deve restare vuoto
    if (document.getElementById('input-honey').value) return;

    const form = event.target;
    const btn = document.getElementById('btn-invia');
    const it = currentLang === 'it';
    const val = id => (document.getElementById(id).value || '').trim();

    const nome = val('input-nome');
    const cognome = val('input-cognome');
    const oggetto = val('form-oggetto');

    // Oggetto dell'e-mail in arrivo
    //  Informazioni:  "Richiesta informazioni - Nome Cognome"
    //  Prenotazione:  "Richiesta prenotazione #CODICE - (trasporto) | (ritiro in allevamento) | nome fiera - Nome Cognome"
    const nomeCompleto = [nome, cognome].filter(Boolean).join(' ');
    let oggettoMail;
    if (oggetto === 'Prenotazione') {
        const ritiro = val('form-ritiro');
        const codRaw = isVisible('campo-codice') ? val('input-codice') : '';
        const trovato = codRaw ? (animaliData || []).find(x => x.cod.replace(/\s+/g, '').toUpperCase() === codRaw.replace(/^#/, '').replace(/\s+/g, '').toUpperCase()) : null;
        const codice = codRaw ? '#' + (trovato ? trovato.cod : codRaw.replace(/^#/, '')) : '';
        let dettaglio = '';
        if (ritiro === 'In fiera') dettaglio = isVisible('campo-fiera') ? val('select-fiera') : '';
        else if (ritiro === 'Trasporto') dettaglio = '(trasporto)';
        else if (ritiro === 'In allevamento') dettaglio = '(ritiro in allevamento)';
        oggettoMail = ['Richiesta prenotazione' + (codice ? ' ' + codice : ''), dettaglio, nomeCompleto].filter(Boolean).join(' - ');
    } else {
        oggettoMail = ['Richiesta informazioni', nomeCompleto].filter(Boolean).join(' - ');
    }
    const payload = {
        _subject: oggettoMail,
        _template: 'table',
        _captcha: 'false',
        Nome: nome,
        Cognome: cognome,
        email: val('input-email'),
        Telefono: getFullPhone() || '-',
        Oggetto: oggetto
    };
    if (val('form-ritiro')) payload['Modalità di ritiro'] = val('form-ritiro');
    if (isVisible('campo-codice') && val('input-codice')) payload['Codice esemplare'] = val('input-codice');
    if (isVisible('campo-codice') && val('input-codice')) Object.assign(payload, buildSpecimenRows(val('input-codice')));
    if (isVisible('campo-fiera') && val('select-fiera')) payload['Fiera'] = val('select-fiera');
    if (isVisible('campo-trasporto') && val('select-provincia')) payload['Provincia'] = val('select-provincia');
    // Presa visione dei termini di servizio (in tabella nella mail che ricevi)
    payload['Presa visione termini di servizio'] = (isVisible('terms-box') && document.getElementById('input-termini').checked)
        ? 'Confermata il ' + new Date().toLocaleString('it-IT')
        : 'Non richiesta (messaggio senza prenotazione)';
    payload['Messaggio'] = val('input-messaggio');
    payload['Lingua del sito'] = it ? 'Italiano' : 'English';

    // E-mail di conferma automatica al cliente
    payload['_autoresponse'] = buildAutoresponse({
        nome, oggetto,
        codice: payload['Codice esemplare'],
        ritiro: payload['Modalità di ritiro'],
        fiera: payload['Fiera'],
        provincia: payload['Provincia'],
        messaggio: payload['Messaggio']
    }, it);

    const originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = it ? 'Invio in corso...' : 'Sending...';

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);
    try {
        const res = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === 'false' || data.success === false) {
            const e = new Error(data.message || ('HTTP ' + res.status));
            e.serverMessage = data.message || '';
            throw e;
        }

        showNotification(it ? 'Messaggio inviato con successo! Ti risponderemo al più presto.' : 'Message sent successfully! We will reply as soon as possible.');
        form.reset();
        resetPrefix();
        gestisciOggetto();
        discardDraft();
    } catch (err) {
        console.error('Invio messaggio fallito:', err);
        let msg;
        if (err.name === 'AbortError') {
            msg = it ? 'Il server non ha risposto in tempo. Riprova tra poco oppure scrivici a ' + CONTACT_EMAIL
                     : 'The server did not respond in time. Please try again shortly or write to us at ' + CONTACT_EMAIL;
        } else if (/activat/i.test(err.serverMessage || '')) {
            msg = it ? 'Servizio e-mail non ancora attivato: conferma il link di attivazione ricevuto da FormSubmit su ' + CONTACT_EMAIL + ', poi riprova.'
                     : 'Email service not activated yet: confirm the activation link sent by FormSubmit to ' + CONTACT_EMAIL + ', then try again.';
        } else {
            msg = it ? 'Invio non riuscito. Riprova tra poco oppure scrivici a ' + CONTACT_EMAIL
                     : 'Sending failed. Please try again shortly or write to us at ' + CONTACT_EMAIL;
        }
        showNotification(msg);
    } finally {
        clearTimeout(timer);
        btn.disabled = false;
        btn.innerHTML = originalHtml;
    }
}

// ===== Bozza del modulo di contatto: solo per la visita ai termini di servizio =====
// I dati inseriti si conservano (localStorage) soltanto quando si clicca "Visualizza termini di servizio",
// così al ritorno dalla pagina dei termini il modulo si ritrova compilato. In ogni altro caso
// (cambio pagina, aggiornamento della pagina) il modulo riparte vuoto e la bozza viene scartata.
const DRAFT_KEY = 'cg_bozza_modulo';
const DRAFT_MAX_AGE_MS = 2 * 60 * 60 * 1000;
const DRAFT_FIELDS = ['input-nome', 'input-cognome', 'input-prefisso', 'input-telefono', 'input-email',
    'form-oggetto', 'form-ritiro', 'input-codice', 'select-fiera', 'select-provincia', 'input-messaggio'];
let draftFiera = null;      // fiera salvata, da selezionare quando l'elenco è caricato

function saveDraft() {
    if (!document.getElementById('form-oggetto')) return;
    try {
        const d = { ts: Date.now(), fromTerms: true };
        DRAFT_FIELDS.forEach(id => { const el = document.getElementById(id); if (el) d[id] = el.value; });
        const terms = document.getElementById('input-termini');
        d['input-termini'] = !!(terms && terms.checked);
        localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch (e) { /* storage non disponibile: il modulo funziona comunque */ }
}

function discardDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignora */ }
}

function readDraft() {
    try {
        const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
        return d && d.fromTerms && Date.now() - d.ts < DRAFT_MAX_AGE_MS ? d : null;
    } catch (e) { return null; }
}

function restoreDraft(d) {
    const set = (id, v) => { const el = document.getElementById(id); if (el && v != null && v !== '') el.value = v; };
    ['input-nome', 'input-cognome', 'input-email', 'input-messaggio'].forEach(id => set(id, d[id]));
    if (d['input-prefisso']) { set('input-prefisso', d['input-prefisso']); onPrefixInput(document.getElementById('input-prefisso')); }
    if (d['input-telefono']) { set('input-telefono', d['input-telefono']); onPhoneInput(document.getElementById('input-telefono')); }
    set('form-oggetto', d['form-oggetto']); gestisciOggetto();
    set('form-ritiro', d['form-ritiro']); gestisciRitiro();
    set('input-codice', d['input-codice']);
    // il codice compilato resta visibile anche se la modalità di ritiro non è ancora scelta
    gestisciRitiro();
    set('select-provincia', d['select-provincia']);
    const terms = document.getElementById('input-termini');
    if (terms && d['input-termini'] && d['form-oggetto'] === 'Prenotazione') terms.checked = true;
    draftFiera = d['select-fiera'] || null;
    applyDraftFiera();
}

// Seleziona la fiera salvata appena l'elenco è disponibile
function applyDraftFiera() {
    const select = document.getElementById('select-fiera');
    if (!draftFiera || !select || fiereData === null) return;
    if ([...select.options].some(o => o.value === draftFiera)) select.value = draftFiera;
    draftFiera = null;
}

function resetContactForm() {
    const form = document.getElementById('form-oggetto').closest('form');
    form.reset();
    resetPrefix();
    gestisciOggetto();
    setRitiroAlert(false);
}

function initDraft() {
    const oggetto = document.getElementById('form-oggetto');
    const form = oggetto && oggetto.closest('form');
    if (!form) return;
    form.setAttribute('autocomplete', 'off');   // il browser non deve ripristinare da solo i campi dopo un aggiornamento

    // Salva la bozza solo quando si va a leggere i termini di servizio
    document.addEventListener('click', e => {
        const a = e.target.closest && e.target.closest('a[href]');
        if (a && /termini\.html/.test(a.getAttribute('href'))) saveDraft();
    }, true);

    const nav = (performance.getEntriesByType('navigation')[0] || {}).type;
    const fromTerms = nav === 'back_forward' || /termini\.html/.test(document.referrer);
    const d = readDraft();
    if (d && fromTerms && nav !== 'reload') restoreDraft(d);
    discardDraft();   // la bozza vale una sola volta

    // Pagina ripresentata dalla memoria del browser (tasto "indietro"): resta com'è solo se si torna dai termini
    window.addEventListener('pageshow', e => {
        if (!e.persisted) return;
        if (readDraft()) discardDraft(); else resetContactForm();
    });
}

// ===== Avvio: ogni pagina carica solo ciò che le serve =====
(function init() {
    if (currentLang === 'en') setLanguage('en');
    if (document.getElementById('terms-frame')) loadTerms();
    const isContact = !!document.getElementById('form-oggetto');
    const isAvail = !!document.getElementById('avail-grid');
    if (isContact) { initDraft(); applyPendingBooking(); }
    if (document.getElementById('fiere-list') || isContact) loadFiere();
    if (isAvail || isContact) loadAnimali();   // il modulo usa i dati degli animali per l'e-mail di riepilogo
    if (isAvail) loadDizionario();
})();
    
