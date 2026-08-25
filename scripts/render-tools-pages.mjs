import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://loekluijbregts.com";
const planner = "https://zcal.co/i/vcLERywI";

const common = {
  nl: {
    lang: "nl", locale: "nl_NL", prefix: "/tools", home: "/", scan: "/mkb-scan/",
    toolsLabel: "Tools", articles: "Artikelen", scanLabel: "Gratis MKB-scan",
    allTools: "Alle tools", breadcrumbHome: "Home", guide: "Bekijk de gids",
    source: "Bekijk de openbare bron", affiliate: "Affiliatevermelding",
    plan: "Plan een kennismaking", scanCta: "Doe de gratis MKB-scan",
    finalTitle: "Wat verdient nu werkelijk aandacht?",
    finalBody: "Kies de volgende stap die past bij je situatie. Plan een gesprek als je al weet waar het knelt, of gebruik de MKB-scan als korte Outside-In spiegel.",
    related: "Bekijk ook de andere toolgidsen",
    footer: "Strategisch groeipartner · Tilburg · Nederland · 2026",
    footerLink: "Terug naar loekluijbregts.com",
    caseTitle: "Twee openbare praktijkvoorbeelden",
    caseHeading: "Bespaar tijd. Maak een commerciële vervolgstap mogelijk.",
    caseNote: "Deze resultaten of werkwijzen zijn door de leverancier gepubliceerd. Ze laten zien wat het mechanisme kan opleveren, maar zijn geen voorspelling of garantie.",
    workflowLabel: "Praktische werkwijze", workflowTitle: "Houd het systeem kleiner dan het resultaat.",
    fit: "Goede keuze wanneer", notFit: "Geen goede keuze wanneer",
    offerLabel: "Partneraanbod", offerTitle: "Gebruik het voordeel. Beoordeel de tool op de werkwijze.",
    offerBody: "De aanmeldpagina toont altijd de actuele voorwaarden. Kies alleen een betaald plan als de werkwijze zich eerst in de praktijk heeft bewezen.",
    affiliateText: name => `Ik kan een commissie ontvangen als je via deze links een betaald abonnement kiest. Ik adviseer ${name} omdat ik de tool zelf of met klanten gebruik, niet omdat er een partnerlink bestaat.`,
    cases: { time: "Tijdbesparing", money: "Omzet of pipeline", story: "Klantverhaal", workflow: "Officieel praktijkvoorbeeld", benchmark: "Cijfer van leverancier" },
    answer: { for: "Voor wie", saves: "Tijdbesparing", value: "Commerciële waarde" },
  },
  en: {
    lang: "en", locale: "en_GB", prefix: "/en/tools", home: "/en/", scan: "/en/smb-scan/",
    toolsLabel: "Tools", articles: "Articles", scanLabel: "Free SMB scan",
    allTools: "All tools", breadcrumbHome: "Home", guide: "View the guide",
    source: "Read the public source", affiliate: "Affiliate disclosure",
    plan: "Book an introduction", scanCta: "Take the free SMB scan",
    finalTitle: "What genuinely deserves attention now?",
    finalBody: "Choose the next step that fits your situation. Book a conversation if the bottleneck is already clear, or use the SMB scan as a short Outside-In mirror.",
    related: "Explore the other tool guides",
    footer: "Strategic growth partner · Tilburg · The Netherlands · 2026",
    footerLink: "Back to loekluijbregts.com",
    caseTitle: "Two public examples",
    caseHeading: "Save time. Create a commercial next step.",
    caseNote: "These results or workflows were published by the vendor. They show what the mechanism can produce, but they are not a forecast or a guarantee.",
    workflowLabel: "Practical workflow", workflowTitle: "Keep the system smaller than the result.",
    fit: "Good fit when", notFit: "Not a good fit when",
    offerLabel: "Partner offer", offerTitle: "Use the saving. Judge the tool on the workflow.",
    offerBody: "The signup page always shows the current terms. Choose a paid plan only after the workflow proves useful in practice.",
    affiliateText: name => `I may receive a commission if you choose a paid plan through these links. I recommend ${name} because I use it myself or with clients, not because a partner link exists.`,
    cases: { time: "Time saved", money: "Money or pipeline", story: "Customer story", workflow: "Official workflow example", benchmark: "Vendor reported benchmark" },
    answer: { for: "Best for", saves: "Time saved", value: "Commercial value" },
  },
};

const toolBase = {
  vidonary: {
    name: "Vidonary", accent: "coral", source: "https://vidonary.com/", affiliate: "https://get.vidonary.com/q6u2niq0p6qt",
    offers: [{ url: "https://get.vidonary.com/q6u2niq0p6qt" }],
    process: ["Idea", "Script", "Record", "Edit", "Publish"],
  },
  manychat: {
    name: "ManyChat", accent: "violet", source: "https://manychat.com/", affiliate: "https://manychat.partnerlinks.io/mzf2x66x80z0-ogcg6e",
    offers: [{ url: "https://manychat.partnerlinks.io/mzf2x66x80z0-ogcg6e" }, { url: "https://manychat.partnerlinks.io/84216pc24o1h-wki14" }],
    process: ["Trigger", "DM", "Question", "Route", "Follow-up"],
  },
  scoreapp: {
    name: "ScoreApp", accent: "blue", source: "https://www.scoreapp.com/", affiliate: "https://share.scoreapp.com/89af2cbb",
    offers: [{ url: "https://share.scoreapp.com/89af2cbb" }], image: "/assets/tools/scoreapp-why.webp", imageAlt: "ScoreApp scorecard workflow",
  },
  zcal: {
    name: "zcal", accent: "gold", source: "https://zcal.co/", affiliate: "https://zcal.co?via=improve-your-scheduling-tool",
    offers: [{ url: "https://zcal.co?via=improve-your-scheduling-tool" }], image: "/assets/tools/zcal-booking-page.webp", imageAlt: "Branded zcal booking page by Loek Luijbregts",
  },
  phantombuster: {
    name: "PhantomBuster", accent: "periwinkle", source: "https://phantombuster.com/", affiliate: "https://phantombuster.com?deal=loek15",
    offers: [{ url: "https://phantombuster.com?deal=loek15" }], image: "/assets/tools/phantombuster-lead-lists.webp", imageAlt: "PhantomBuster lead list workflow with live data",
  },
};

const copy = {
  nl: {
    vidonary: {
      stage: "Word zichtbaar", headline: "Maak van je expertise video’s die mensen onthouden.",
      intro: "Vidonary brengt plannen, scripten, opnemen, monteren en publiceren samen. Daardoor wordt video geen tweede baan, maar een herhaalbare manier om je expertise begrijpelijk en zichtbaar te maken.",
      point: "Consistentie is meestal een werkprocesprobleem, geen gebrek aan zelfvertrouwen.",
      pointBody: "De meeste experts hebben genoeg te vertellen. Het proces valt stil door alle wissels tussen idee, tekst, camera, montage en publicatie. Eén eenvoudige route verkleint die frictie.",
      answers: ["Ondernemers, adviseurs en specialisten die op hun kennis en oordeel worden gekozen.", "Eén werkproces vervangt losse overdrachten tussen meerdere apps.", "Meer relevante zichtbaarheid en vaker een gesprek vanuit herkenning."],
      steps: [["Kies één kopersvraag", "Start bij een vraag, misverstand of klantmoment dat je ideale klant al bezighoudt."], ["Maak het script herkenbaar", "Gebruik structuur, maar vervang generieke taal door woorden die je zelf in een gesprek gebruikt."], ["Neem op en publiceer", "Gebruik de teleprompter, knip omwegen weg en publiceer terwijl het onderwerp nog relevant is."]],
      best: "Je ideeën, oordeel of aanwezigheid zijn onderdeel van wat een klant koopt.", not: "Je zoekt filmproductie of verwacht dat AI een eigen standpunt voor je bedenkt.",
      offers: [["Ontdek Vidonary", "Bekijk de actuele plannen en toegang via mijn partnerlink."]],
      cases: [
        ["time","workflow","60 sec","Van lege pagina naar een bruikbaar videoplan","Vidonary zegt dat een eerste videoplan in 60 seconden kan staan. Script, teleprompter, montage en publicatie blijven daarna in dezelfde werkwijze.","https://vidonary.com/"],
        ["money","benchmark","$10M+","Herhaalbare video als bron van commerciële vraag","Vidonary meldt dat het oprichtersteam meer dan 50 miljoen views en ruim 10 miljoen dollar omzet met video realiseerde. De tool vertaalt die ervaring naar een eenvoudiger proces voor kleine teams.","https://vidonary.com/"]
      ],
    },
    manychat: {
      stage: "Start gesprekken", headline: "Maak van reacties gesprekken die je kunt voortzetten.",
      intro: "Een Reel kan aandacht krijgen zonder zakelijke waarde te creëren. ManyChat verbindt een reactie, Story of DM met een snelle en nuttige vervolgstap, waarna jij het menselijke gesprek kunt overnemen.",
      point: "Automatiseer de overdracht. Houd de relatie menselijk.",
      pointBody: "Goede automatisering doet niet alsof zij jou is. Ze haalt herhaalwerk weg tussen ‘dat wil ik’ en ‘hier is het’, en geeft je voldoende context voor persoonlijke opvolging.",
      answers: ["Bedrijven en makers die al reacties krijgen via Instagram, WhatsApp, TikTok of Messenger.", "Veel herhaalde DM’s en resourceverzoeken worden direct afgehandeld.", "Meer toestemming, context en concrete vervolgstappen uit bestaande aandacht."],
      steps: [["Beloof één concreet resultaat", "Vraag mensen bij een relevante post om één duidelijk trefwoord te reageren."], ["Lever direct in DM", "Stuur de beloofde resource terwijl de interesse nog hoog is."], ["Routeer op intentie", "Stel één bruikbare vraag en stuur hoge intentie naar een scan of gesprek."]],
      best: "Je krijgt al betrokkenheid en wilt die aandacht sneller omzetten in een bruikbaar gesprek.", not: "Je wilt koude bulkberichten versturen of echte ondersteuning vervangen door eindeloze vragen.",
      offers: [["Eerste maand gratis ManyChat Pro", "Bouw en test eerst een volledige Pro-flow."], ["Twee maanden 50% korting", "Spreid hetzelfde voordeel over de eerste twee maanden."]],
      cases: [
        ["time","story","15 uur p/m","Candace Junée stopte met elke Instagram-DM handmatig beantwoorden","ManyChat meldt dat trefwoorden en Story-triggers haar reactietijd met 99% verkortten, 15 uur per maand bespaarden en 118% meer leads opleverden.","https://manychat.com/blog/candace-junee/"],
        ["money","story","$550K","Matze Brandmüller automatiseerde webinar en winkelwagenopvolging","ManyChat meldt ruim 550.000 dollar omzet in zes maanden, plus hogere webinarinschrijvingen en herstel van verlaten winkelwagens.","https://manychat.com/blog/chatbot-creator-bootcamp-case-study/"]
      ],
    },
    scoreapp: {
      stage: "Kwalificeer intentie", headline: "Geef mensen een antwoord en ontdek wie klaar is om te kopen.",
      intro: "Een afgeschermde PDF geeft meestal alleen een e-mailadres. Een scorecard geeft de deelnemer inzicht in de eigen situatie en laat jou tegelijk zien waar behoefte, fit en urgentie zitten.",
      point: "Lead magnets verzamelen. Scorecards kwalificeren en converteren.",
      pointBody: "Een persoonlijke uitslag is relevanter dan algemene content. Elke voltooide scorecard levert bovendien veel meer context op dan een gewoon contactformulier.",
      answers: ["Expertbedrijven met een duidelijke ideale klant en een aankoop die afweging vraagt.", "Een eerste diagnose en segmentatie werken dag en nacht zonder handmatige intake.", "Betere gesprekken met mensen van wie fit, behoefte en timing al zichtbaar zijn."],
      steps: [["Beloof een bruikbare diagnose", "Koppel de score aan een beslissing die de deelnemer al wil nemen."], ["Stel vragen die opvolging veranderen", "Meet fit, knelpunt en timing. Verwijder vragen die alleen nieuwsgierigheid bevredigen."], ["Maak drie routes", "Nodig hoge intentie uit voor een gesprek, help warme leads verder en laat slechte fit netjes los."]],
      best: "Fit en koopbereidheid verschillen sterk en een juiste diagnose verbetert het verkoopgesprek.", not: "Je bouwt een verkapt formulier of een leuke quiz zonder betekenisvolle uitslag.",
      offers: [["50% korting op je eerste maand", "Bouw en valideer je eerste scorecard via mijn partnerlink."]],
      cases: [
        ["time","story","24/7","Nell Mead geeft patiënten direct bruikbare richting","ScoreApp beschrijft twee vragenlijsten die vrijwel direct gestructureerde begeleiding geven, onderzoek verzamelen en meer mensen helpen dan één behandelaar handmatig kan.","https://www.scoreapp.com/physiotherapist-patient-bookings-market-research/"],
        ["money","story","$12M","Jason Graystone kwalificeerde intentie vóór opvolging","ScoreApp meldt 12 miljoen dollar in tien maanden zonder advertenties of salesteam, met 36% conversie uit een assessment-gedreven funnel.","https://www.scoreapp.com/steal-jason-graystones-12-million-lead-qualification-strategy/"]
      ],
      proof: ["€3M+","Potentiële klantpipeline in acht weken","Ik gebruikte een ScoreApp-campagne om zonder advertenties ruim drie miljoen euro aan potentiële klantpipeline te creëren. Dit is pipelinewaarde, geen ontvangen omzet en geen garantie voor een ander."],
    },
    zcal: {
      stage: "Boek het juiste gesprek", headline: "Maak de boekingspagina onderdeel van vertrouwen, niet van administratie.",
      intro: "Iemand die je kalender opent, beslist of het gesprek de tijd waard is. zcal laat je merk, uitleg, vragen en beschikbaarheid samenkomen in één duidelijke boekingservaring.",
      point: "De boekingspagina is de eerste minuut van het gesprek.",
      pointBody: "Een generieke planner kan vertrouwen onderbreken op het moment dat iemand juist wil doorpakken. Een goede pagina bevestigt voor wie het gesprek is, wat er gebeurt en waarom voorbereiding helpt.",
      answers: ["Oprichters, adviseurs en teams waarbij de kwaliteit van het gesprek deel van de dienstverlening is.", "Minder heen en weer mailen, herinneren en corrigeren van tijdzones.", "Meer van bestaande interesse bereikt zonder extra frictie een echte afspraak."],
      steps: [["Benoem het resultaat", "Leg naast de duur uit wat iemand na het gesprek moet begrijpen of kunnen besluiten."], ["Laat zien met wie men spreekt", "Gebruik een echte foto, korte uitleg en herkenbare huisstijl."], ["Vraag alleen wat helpt", "Twee goede vragen zijn waardevoller dan een lange intake. Stel buffers en herinneringen vooraf in."]],
      best: "Je wilt dat de boeking dezelfde kwaliteit en herkenning heeft als de rest van je klantreis.", not: "Je gebruikt vrije kalenderkeuze als vervanging voor kwalificatie.",
      offers: [["Maak je gratis zcal-pagina", "Gebruik mijn verwijzingslink en bekijk het actuele gratis of betaalde aanbod."]],
      cases: [
        ["time","workflow","1 link","Vervang planningsmailtjes en losse herinneringen","Met zcal meeting polls stemmen meerdere gasten op beschikbare tijden. Kalenderafspraken, bevestigingen en herinneringen worden daarna automatisch geregeld.","https://zcal.co/"],
        ["money","benchmark","+13%","Laat meer kalenderbezoekers een gesprek boeken","zcal meldt een 13% hogere boekingsratio dan het branchegemiddelde. Zo bereikt meer van de al opgebouwde interesse daadwerkelijk een gesprek.","https://zcal.co/"]
      ],
    },
    phantombuster: {
      stage: "Creëer gerichte vraag", headline: "Bouw kleinere, warmere leadlijsten die je relevant kunt benaderen.",
      intro: "Een grote spreadsheet is geen pipeline. PhantomBuster vindt en verrijkt prospects vanuit actuele platformdata. De waarde ontstaat wanneer die context je helpt om relevanter te zijn, niet om meer standaardberichten te sturen.",
      point: "Gebruik automatisering om de aanleiding te vinden. Gebruik oordeel om het gesprek te starten.",
      pointBody: "De beste lijst is niet de grootste. Ze bevat mensen die echt passen én een zichtbare reden waarom juist nu een gesprek relevant kan zijn.",
      answers: ["B2B-bedrijven die hun ideale klant en een actueel koopsignaal scherp kunnen omschrijven.", "Minder handmatig zoeken, kopiëren en verrijken van profielen.", "Meer gerichte gesprekken uit lijsten met fit en een actuele aanleiding."],
      steps: [["Begin met een smalle zoekopdracht", "Definieer rol, bedrijfstype, markt en één zichtbaar signaal."], ["Verzamel en verrijk openbare data", "Gebruik een passende Phantom en orden alleen informatie die de benadering helpt."], ["Controleer vóór contact", "Verifieer fit en aanleiding handmatig. Respecteer platformregels, privacywetgeving en menselijke aandacht."]],
      best: "Openbare profiel-, bedrijfs- of betrokkenheidssignalen maken een persoonlijk B2B-bericht relevanter.", not: "Je wilt massaal scrapen, gegevens opslaan zonder doel of vertrouwen automatiseren.",
      offers: [["Bekijk mijn PhantomBuster-deal", "Open PhantomBuster via mijn partnerlink en controleer het actuele voordeel."]],
      cases: [
        ["time","story","<5 min","Rocket School startte een prospectiewerkwijze vanaf nul","PhantomBuster noemt voor Rocket School een insteltijd onder vijf minuten en vervolgens gemiddeld één lead per vijf minuten.","https://phantombuster.com/"],
        ["money","story","$150K","Een gerichte werkwijze leverde een commercieel bruikbare lijst op","PhantomBuster publiceert een klantresultaat van 2.000 leads, 150.000 dollar omzet en 170 bespaarde uren. Dat toont hefboom, maar is geen belofte voor elke lijst.","https://phantombuster.com/"]
      ],
    },
  },
  en: {
    vidonary: {
      stage:"Be seen", headline:"Turn your expertise into videos people remember.", intro:"Vidonary brings planning, scripting, recording, editing and publishing together. Video becomes a repeatable way to make your expertise visible instead of a second job.", point:"Consistency is usually a workflow problem, not a confidence problem.", pointBody:"Most experts have enough to say. The process stalls because every video switches between ideas, writing, camera, editing and publishing. One route removes that friction.", answers:["Founders, advisers and specialists who are chosen for their knowledge and judgement.","One workflow replaces handoffs between several separate apps.","More relevant visibility and more conversations that start with recognition."], steps:[["Choose one buyer question","Start with a question, misconception or client moment your ideal customer already cares about."],["Make the script sound like you","Use structure, then replace generic language with words you actually use in conversation."],["Record and publish","Use the teleprompter, remove detours and publish while the subject is still relevant."]], best:"Your ideas, judgement or presence are part of what a client buys.", not:"You need cinematic production or expect AI to invent a useful point of view.", offers:[["Explore Vidonary","See current plans and access through my partner link."]], cases:[["time","workflow","60 sec","Move from a blank page to a usable video plan","Vidonary says an initial video plan can be ready in 60 seconds, with script, teleprompter, editing and publishing kept in one workflow.","https://vidonary.com/"],["money","benchmark","$10M+","Use repeatable video to create commercial demand","Vidonary reports that its founding team generated more than 50 million views and over 10 million dollars in revenue from video.","https://vidonary.com/"]]},
    manychat: {
      stage:"Start conversations", headline:"Turn responses into conversations you can continue.", intro:"A Reel can earn attention without creating business value. ManyChat connects a comment, Story or DM to a fast, useful next step before you continue the human conversation.", point:"Automate the handoff. Keep the relationship human.", pointBody:"Good automation does not pretend to be you. It removes repetition between ‘I want that’ and ‘here it is’, then gives you context for personal follow-up.", answers:["Businesses and creators already getting engagement on Instagram, WhatsApp, TikTok or Messenger.","Repeated DMs and resource requests are handled immediately.","More permission, context and useful next steps from attention you already earned."], steps:[["Promise one specific result","Ask people to comment one clear keyword on a relevant post."],["Deliver immediately in DM","Send the promised resource while interest is still high."],["Route by intent","Ask one useful question and send high intent to a scan or conversation."]], best:"You already receive engagement and want to turn it into useful conversations faster.", not:"You want cold bulk messaging or to replace support with endless automated questions.", offers:[["Get month one free","Build and test a complete Pro flow first."],["Get 50% off for two months","Spread the same benefit across your first two months."]], cases:[["time","story","15 hrs/mo","Candace Junée stopped answering every Instagram DM by hand","ManyChat reports that keywords and Story triggers cut response time by 99%, saved 15 hours per month and increased leads by 118%.","https://manychat.com/blog/candace-junee/"],["money","story","$550K","Matze Brandmüller automated webinar and cart recovery","ManyChat reports more than 550,000 dollars in six months, plus higher webinar signups and cart recovery.","https://manychat.com/blog/chatbot-creator-bootcamp-case-study/"]]},
    scoreapp: {
      stage:"Qualify intent", headline:"Give people an answer and learn who is ready to buy.", intro:"A gated PDF usually gives you only an email address. A scorecard gives participants insight into their own situation while showing you their need, fit and urgency.", point:"Lead magnets collect. Scorecards qualify and convert.", pointBody:"A personal result is more relevant than generic content. Every completed scorecard also carries far more context than a contact form.", answers:["Expert businesses with a clear ideal customer and a considered purchase.","A first diagnosis and segmentation work around the clock without manual intake.","Better conversations with people whose fit, need and timing are already visible."], steps:[["Promise a useful diagnosis","Connect the score to a decision the participant already wants to make."],["Ask questions that change follow-up","Measure fit, friction and timing. Remove questions that only satisfy curiosity."],["Create three routes","Invite high intent to talk, help warm leads further and release poor fit politely."]], best:"Fit and readiness vary significantly and a diagnosis improves the sales conversation.", not:"You are building a disguised form or a fun quiz without a meaningful result.", offers:[["Get 50% off your first month","Build and validate your first scorecard through my partner link."]], cases:[["time","story","24/7","Nell Mead gives patients useful direction immediately","ScoreApp describes two questionnaires that provide structured guidance, collect research and help more people than one practitioner could manually.","https://www.scoreapp.com/physiotherapist-patient-bookings-market-research/"],["money","story","$12M","Jason Graystone qualified intent before follow-up","ScoreApp reports 12 million dollars in ten months with no ads or sales team and a 36% conversion rate.","https://www.scoreapp.com/steal-jason-graystones-12-million-lead-qualification-strategy/"]], proof:["€3M+","Potential client pipeline in eight weeks","I used a ScoreApp-led campaign to create more than three million euros in potential client pipeline without ads. This is pipeline value, not collected revenue or a guarantee."]},
    zcal: {
      stage:"Book the right call", headline:"Make the booking page part of trust, not administration.", intro:"Someone opening your calendar is deciding whether the conversation is worth their time. zcal combines brand, context, questions and availability in one clear booking experience.", point:"The booking page is the first minute of the meeting.", pointBody:"A generic scheduler can interrupt confidence when someone is ready to act. A good page confirms who the call is for, what happens and why preparation helps.", answers:["Founders, advisers and teams where conversation quality is part of the service.","Less scheduling email, reminder work and timezone correction.","More existing intent reaches a real appointment without extra friction."], steps:[["Name the outcome","Explain what someone should understand or decide after the meeting, not only its duration."],["Show who they will meet","Use a real image, short explanation and recognisable brand cues."],["Ask only what helps","Two good questions beat a long intake. Set buffers and reminders in advance."]], best:"You want booking to carry the same quality and recognition as the rest of the journey.", not:"You use open calendar access as a replacement for qualification.", offers:[["Build your free zcal page","Use my referral link and review the current free or paid offer."]], cases:[["time","workflow","1 link","Replace scheduling ping-pong and manual reminders","zcal meeting polls let several guests vote on times. Calendar events, confirmations and reminders are then handled automatically.","https://zcal.co/"],["money","benchmark","+13%","Turn more calendar visits into conversations","zcal reports a 13% higher booking rate than the industry average, helping more existing intent reach a real call.","https://zcal.co/"]]},
    phantombuster: {
      stage:"Create focused demand", headline:"Build smaller, warmer lead lists you can approach with relevance.", intro:"A large spreadsheet is not pipeline. PhantomBuster finds and enriches prospects from live platform data. The value appears when that context makes you more relevant, not when it sends more copied messages.", point:"Use automation to find the reason. Use judgement to start the conversation.", pointBody:"The best list is not the biggest. It contains people who fit and a visible reason why a conversation may be relevant now.", answers:["B2B businesses that can define their ideal customer and a current buying signal.","Less manual profile research, copying and enrichment.","More focused conversations from lists with fit and a timely reason."], steps:[["Start with a narrow search","Define role, company type, market and one visible signal."],["Extract and enrich public data","Use the right Phantom and organise only information that improves the approach."],["Review before contact","Verify fit and timing manually. Respect platform rules, privacy law and human attention."]], best:"Public profile, company or engagement signals make a personal B2B message more relevant.", not:"You want mass scraping, purposeless data storage or to automate trust itself.", offers:[["Explore my PhantomBuster deal","Open PhantomBuster through my partner link and check the current benefit."]], cases:[["time","story","<5 min","Rocket School started a prospecting workflow from scratch","PhantomBuster cites a setup time under five minutes for Rocket School and an average output of one lead every five minutes.","https://phantombuster.com/"],["money","story","$150K","A focused workflow produced a commercially useful list","PhantomBuster publishes a customer result of 2,000 leads, 150,000 dollars in revenue and 170 hours saved. It shows leverage, not a promise for every list.","https://phantombuster.com/"]]},
  },
};

const homeCopy = {
  nl: {
    title:"Vijf tools die ik echt gebruik voor zichtbaarheid en klantgroei", description:"Praktische gidsen over Vidonary, ManyChat, ScoreApp, zcal en PhantomBuster, met openbare voorbeelden, werkwijzen en partneraanbiedingen van Loek Luijbregts.",
    eyebrow:"Een praktische groeistack voor Nederlandse expertisebedrijven", hero:"Vijf tools. Eén doel: <em>maak goed werk makkelijker te kopen.</em>",
    intro:"Ik gebruik deze tools zelf en met klanten om expertise zichtbaar te maken, betere gesprekken te starten, intentie te herkennen en de juiste vervolgstap logisch te maken.",
    heroButton:"Vind je knelpunt", trusts:["Gebruikt in echt klantwerk","Kleine stack, helder doel","Automatisering met menselijke opvolging"],
    leak:"Start bij het knelpunt, niet bij de software", need:"Je hebt waarschijnlijk geen vijf tools nodig.", lead:"Je hebt de tool nodig die het knelpunt van vandaag wegneemt. Een tool moet bewezen gedrag makkelijker herhaalbaar maken, zonder een extra dashboard te worden.",
    choices:[["Ik weet wat ik doe, maar publiceer te weinig","vidonary"],["Mensen reageren, maar verdwijnen na mijn bericht","manychat"],["Mijn gesprekken hebben nieuwsgierigheid, maar weinig koopintentie","scoreapp"],["Mijn boekingslink voelt generiek of geeft wrijving","zcal"],["Ik heb nieuwe gesprekken nodig voordat inbound aantrekt","phantombuster"]],
    jobs:"De vijf nuttige taken", route:"Bouw een route, geen stapel abonnementen.",
    simple:"De eenvoudige inboundroute", attention:"Nuttige aandacht moet ergens naartoe leiden.", system:"Vidonary helpt je publiceren. ManyChat maakt van reacties gesprekken. ScoreApp laat fit en urgentie zien. zcal haalt de laatste wrijving vóór een echt gesprek weg.",
    steps:[["Publiceer","Vidonary"],["Reageer","ManyChat"],["Kwalificeer","ScoreApp"],["Ontmoet","zcal"]], outbound:"Wanneer inbound te langzaam is", outboundBody:"PhantomBuster voegt een gerichte outboundlaag toe. Vind de juiste mensen op basis van actuele signalen en benader ze met een reden die nu relevant is.",
    proofLabel:"Waarom ik adviseer in plaats van review", proofTitle:"Ik gebruik deze stack wanneer een volgend kwartaal nieuwe klanten nodig heeft.", proofBody:"potentiële klantpipeline gecreëerd met een ScoreApp-campagne in acht weken, zonder advertenties.", proofNote:"Pipelinewaarde, geen ontvangen omzet en geen belofte van toekomstig resultaat.",
    rule:"De regel achter alle vijf", quote:"Automatiseer de overdracht.<br><em>Houd de relatie menselijk.</em>", disclosure:"Deze pagina’s bevatten partnerlinks. Als je via zo’n link een betaald plan kiest, kan ik een commissie ontvangen. Jij betaalt niet extra, tenzij een specifiek aanbod juist korting geeft. Ik toon alleen tools die ik zelf of met klanten gebruik.",
  },
  en: {
    title:"Five tools I actually use for visibility and client growth", description:"Practical guides to Vidonary, ManyChat, ScoreApp, zcal and PhantomBuster, with public examples, workflows and partner offers from Loek Luijbregts.",
    eyebrow:"A practical growth stack for expertise businesses", hero:"Five tools. One job: <em>make good work easier to buy.</em>", intro:"I use these tools myself and with clients to make expertise visible, start better conversations, recognise intent and make the right next step obvious.", heroButton:"Find your bottleneck", trusts:["Used in real client work","Small stack, clear purpose","Automation with human follow-up"],
    leak:"Start with the bottleneck, not the software", need:"You probably do not need five tools.", lead:"You need the tool that removes today’s bottleneck. A tool should make proven behaviour easier to repeat without becoming another dashboard.",
    choices:[["I know what I do, but rarely publish it","vidonary"],["People engage, but disappear after the post","manychat"],["My calls have curiosity, but little buying intent","scoreapp"],["My booking link feels generic or creates friction","zcal"],["I need new conversations before inbound catches up","phantombuster"]],
    jobs:"The five useful jobs", route:"Build a route, not a pile of subscriptions.", simple:"The simple inbound route", attention:"Useful attention should lead somewhere.", system:"Vidonary helps you publish. ManyChat turns responses into conversations. ScoreApp reveals fit and urgency. zcal removes the final friction before a real call.",
    steps:[["Publish","Vidonary"],["Respond","ManyChat"],["Qualify","ScoreApp"],["Meet","zcal"]], outbound:"When inbound is too slow", outboundBody:"PhantomBuster adds a focused outbound layer. Find the right people from live signals and approach them with a reason that is relevant now.",
    proofLabel:"Why I recommend instead of review", proofTitle:"I use this stack when the next quarter needs new clients.", proofBody:"potential client pipeline created with a ScoreApp-led campaign in eight weeks, without ads.", proofNote:"Pipeline value, not collected revenue or a promise of future results.",
    rule:"The rule behind all five", quote:"Automate the handoff.<br><em>Keep the relationship human.</em>", disclosure:"These pages contain partner links. If you choose a paid plan through one of them, I may receive a commission. You pay no extra unless a specific offer gives you a discount. I only feature tools I use myself or with clients.",
  },
};

const esc = value => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const json = value => JSON.stringify(value).replaceAll("<","\\u003c");
const route = (lang, slug="") => `${common[lang].prefix}/${slug ? slug + "/" : ""}`;

function header(lang, slug="") {
  const c=common[lang], other=lang==="nl"?"en":"nl", otherRoute=route(other,slug);
  return `<header class="tools-site-header"><nav class="wrap tools-header-inner" aria-label="${lang==="nl"?"Hoofdnavigatie":"Main navigation"}"><a class="site-brand-logo" href="${c.home}" aria-label="Loek Luijbregts"><img class="site-logo-full" src="/images/logo-primary-horizontal.png" alt="Loek Luijbregts"><img class="site-logo-mark" src="/images/logo-mark.svg" alt=""></a><div class="tools-header-right"><div class="tools-header-links mono"><a href="${route(lang)}">${c.toolsLabel}</a><a href="/writing/">${c.articles}</a><a href="/earned-media/">Earned media</a></div><div class="lang-switch mono"><a href="${route("nl",slug)}" lang="nl"${lang==="nl"?' aria-current="page"':""}>NL</a><a href="${route("en",slug)}" lang="en"${lang==="en"?' aria-current="page"':""}>EN</a></div><a class="button button-primary scan-button" href="${c.scan}">${c.scanLabel}</a></div></nav></header>`;
}

function head({lang,title,description,url,otherUrl,schema,image="/assets/tools/og.jpg"}) {
  const c=common[lang], other=lang==="nl"?"en":"nl";
  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="author" content="Loek Luijbregts"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="${c.lang}" href="${url}"><link rel="alternate" hreflang="${common[other].lang}" href="${otherUrl}"><link rel="alternate" hreflang="x-default" href="${lang==="nl"?url:otherUrl}"><link rel="icon" href="/images/logo-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/tools.css"><meta property="og:type" content="website"><meta property="og:locale" content="${c.locale}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}${image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${site}${image}"><script type="application/ld+json">${json(schema)}</script></head>`;
}

function footer(lang) {
  const c=common[lang];
  return `<footer><a href="${c.home}">Loek Luijbregts</a><p>${c.footer}</p><a href="${c.home}">${c.footerLink}</a></footer>`;
}

function homePage(lang) {
  const c=common[lang], h=homeCopy[lang], url=site+route(lang), other=site+route(lang==="nl"?"en":"nl");
  const tools=Object.entries(toolBase);
  const schema={"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":url,"url":url,"name":h.title,"description":h.description,"inLanguage":c.lang,"author":{"@id":site+"/#loek"}},{"@type":"Person","@id":site+"/#loek","name":"Loek Luijbregts","url":site+"/","jobTitle":lang==="nl"?"Strategisch groeipartner":"Strategic growth partner","address":{"@type":"PostalAddress","addressLocality":"Tilburg","addressCountry":"NL"},"knowsAbout":["B2B growth strategy","expert positioning","client pipeline","marketing automation"]},{"@type":"ItemList","name":lang==="nl"?"Toolgidsen van Loek Luijbregts":"Tool guides by Loek Luijbregts","itemListElement":tools.map(([slug,t],i)=>({"@type":"ListItem","position":i+1,"name":t.name,"url":site+route(lang,slug)}))}]};
  const cards=tools.map(([slug,t],i)=>{const d=copy[lang][slug];return `<a class="tool-card tool-${t.accent}" href="${route(lang,slug)}"><div class="tool-card-top"><span>0${i+1}</span><span>${d.stage}</span></div><h3>${d.headline}</h3><p>${d.intro}</p><span class="tool-card-button">${c.guide}</span></a>`;}).join("");
  const choices=h.choices.map(([problem,slug])=>`<a class="choice-row" href="${route(lang,slug)}"><p>${problem}</p><strong>${toolBase[slug].name}</strong></a>`).join("");
  const steps=h.steps.map(([a,b],i)=>`<li><span>0${i+1}</span><strong>${a}</strong><small>${b}</small></li>`).join("");
  return head({lang,title:h.title+" | Loek Luijbregts",description:h.description,url,otherUrl:other,schema})+`<body>${header(lang)}<main><section class="hero"><div class="hero-orbit"></div><div class="hero-orbit hero-orbit-two"></div><div class="wrap hero-inner"><p class="eyebrow light">${h.eyebrow}</p><h1>${h.hero}</h1><div class="hero-bottom"><p class="hero-intro">${h.intro}</p><a class="button button-primary" href="#choose">${h.heroButton}</a></div></div></section><section class="trust-strip" aria-label="Principes">${h.trusts.map(x=>`<span>${x}</span>`).join("")}</section><section class="section section-intro" id="choose"><div class="section-heading"><p class="eyebrow">${h.leak}</p><h2>${h.need}</h2></div><p class="lead-copy">${h.lead}</p><div class="choice-list">${choices}</div></section><section class="tools-section"><div class="section-heading tools-heading"><p class="eyebrow light">${h.jobs}</p><h2>${h.route}</h2></div><div class="tool-grid">${cards}</div></section><section class="system-section"><div class="system-copy"><p class="eyebrow">${h.simple}</p><h2>${h.attention}</h2><p>${h.system}</p></div><ol class="system-steps">${steps}</ol><div class="outbound-note"><span>${h.outbound}</span><p>${h.outboundBody}</p></div></section><section class="proof-section"><div><p class="eyebrow light">${h.proofLabel}</p><h2>${h.proofTitle}</h2></div><div class="proof-stat"><strong>€3M+</strong><p>${h.proofBody}</p><small>${h.proofNote}</small></div></section><section class="section principle-section"><p class="eyebrow">${h.rule}</p><blockquote>${h.quote}</blockquote><p class="principle-copy">${h.disclosure}</p></section></main>${footer(lang)}</body></html>`;
}

function detailPage(lang,slug) {
  const c=common[lang], t=toolBase[slug], d=copy[lang][slug], url=site+route(lang,slug), other=site+route(lang==="nl"?"en":"nl",slug);
  const title=lang==="nl"?`${t.name} gids voor Nederlandse expertisebedrijven`:`${t.name} guide for expertise businesses`;
  const description=d.intro;
  const schema={"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":url,"url":url,"name":title,"description":description,"inLanguage":c.lang,"author":{"@id":site+"/#loek"},"about":{"@id":url+"#software"}},{"@type":"SoftwareApplication","@id":url+"#software","name":t.name,"applicationCategory":"BusinessApplication","url":t.source},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":c.breadcrumbHome,"item":site+c.home},{"@type":"ListItem","position":2,"name":c.allTools,"item":site+route(lang)},{"@type":"ListItem","position":3,"name":t.name,"item":url}]}]};
  const media=t.image?`<div class="detail-hero-media"><img src="${t.image}" alt="${esc(lang==="nl"?t.imageAlt.replace("workflow","werkwijze"):t.imageAlt)}" width="1200" height="630"></div>`:`<div class="process-card" aria-label="${t.name} workflow">${t.process.map(x=>`<span>${x}</span>`).join("")}</div>`;
  const cases=d.cases.map(x=>`<article><div class="public-case-meta"><span>${c.cases[x[0]]}</span><small>${c.cases[x[1]]}</small></div><strong>${x[2]}</strong><h3>${x[3]}</h3><p>${x[4]}</p><a class="source-link" href="${x[5]}" target="_blank" rel="noopener noreferrer">${c.source}</a></article>`).join("");
  const steps=d.steps.map((x,i)=>`<li><span>0${i+1}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div></li>`).join("");
  const offers=d.offers.map((x,i)=>`<a href="${t.offers[i].url}" target="_blank" rel="sponsored noopener noreferrer"><strong>${x[0]}</strong><span>${x[1]}</span></a>`).join("");
  const related=Object.entries(toolBase).filter(([s])=>s!==slug).map(([s,x])=>`<a href="${route(lang,s)}">${x.name}</a>`).join("");
  const proof=d.proof?`<section class="case-proof"><strong>${d.proof[0]}</strong><div><p class="eyebrow">${lang==="nl"?"Mijn eigen campagneresultaat":"My own campaign result"}</p><h2>${d.proof[1]}</h2><p>${d.proof[2]}</p></div></section>`:"";
  return head({lang,title:title+" | Loek Luijbregts",description,url,otherUrl:other,schema,image:t.image||"/assets/tools/og.jpg"})+`<body class="detail-page accent-${t.accent}">${header(lang,slug)}<nav class="wrap breadcrumbs" aria-label="Breadcrumb"><a href="${c.home}">${c.breadcrumbHome}</a> / <a href="${route(lang)}">${c.allTools}</a> / <span aria-current="page">${t.name}</span></nav><main><section class="detail-hero"><div class="detail-hero-copy"><p class="eyebrow light">${d.stage} · ${t.name}</p><h1>${d.headline}</h1><p class="detail-intro">${d.intro}</p><a class="button button-primary" href="${t.affiliate}" target="_blank" rel="sponsored noopener noreferrer">${d.offers[0][0]}</a></div>${media}</section><section class="answer-strip" aria-label="${lang==="nl"?"Kort antwoord":"Quick answer"}"><article><span>${c.answer.for}</span><p>${d.answers[0]}</p></article><article><span>${c.answer.saves}</span><p>${d.answers[1]}</p></article><article><span>${c.answer.value}</span><p>${d.answers[2]}</p></article></section><section class="detail-point"><p class="eyebrow">${lang==="nl"?"De bruikbare waarheid":"The useful truth"}</p><h2>${d.point}</h2><p>${d.pointBody}</p></section>${proof}<section class="public-cases-section"><div class="public-cases-heading"><p class="eyebrow light">${c.caseTitle}</p><h2>${c.caseHeading}</h2><p>${c.caseNote}</p></div><div class="public-case-grid">${cases}</div></section><section class="workflow-section"><div class="workflow-heading"><p class="eyebrow">${c.workflowLabel}</p><h2>${c.workflowTitle}</h2></div><ol class="workflow-list">${steps}</ol></section><section class="fit-section"><article><p class="eyebrow">${c.fit}</p><h2>${c.fit}</h2><p>${d.best}</p></article><article><p class="eyebrow">${c.notFit}</p><h2>${c.notFit}</h2><p>${d.not}</p></article></section><section class="offer-section"><div class="offer-heading"><p class="eyebrow light">${c.offerLabel}</p><h2>${c.offerTitle}</h2><p>${c.offerBody}</p></div><div class="offer-list">${offers}</div><p class="affiliate-note"><strong>${c.affiliate}:</strong> ${c.affiliateText(t.name)} <a href="${t.source}" target="_blank" rel="noopener noreferrer">${lang==="nl"?"Officiële productsite":"Official product site"}</a>.</p></section><section class="loek-cta"><div class="loek-cta-copy"><p class="eyebrow">Loek Luijbregts</p><h2>${c.finalTitle}</h2><p>${c.finalBody}</p></div><div class="loek-cta-actions"><a class="button button-primary" href="${planner}">${c.plan}</a><a class="button button-secondary" href="${c.scan}">${c.scanCta}</a></div></section><nav class="tool-nav" aria-label="${c.related}"><p>${c.related}</p><div>${related}</div></nav></main>${footer(lang)}</body></html>`;
}

for (const lang of ["nl","en"]) {
  const base=path.join(root,common[lang].prefix.replace(/^\//,""));
  fs.mkdirSync(base,{recursive:true});
  fs.writeFileSync(path.join(base,"index.html"),homePage(lang));
  for (const slug of Object.keys(toolBase)) {
    const dir=path.join(base,slug); fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,"index.html"),detailPage(lang,slug));
  }
}

console.log("Rendered 12 bilingual tool pages.");
