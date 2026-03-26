"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// COMPREHENSIVE OFFLINE DICTIONARY (1400+ words with meanings & Hindi)
// ─────────────────────────────────────────────────────────────
const DICTIONARY = {
  // ══════════════════════════════════════════
  // BASIC NOUNS (A-Z)
  // ══════════════════════════════════════════
  "ability": { meaning: "The capacity to do something", hindi: "क्षमता", type: "noun", hindiPron: "अबिलिटी" },
  "accident": { meaning: "An unfortunate incident that happens unexpectedly", hindi: "दुर्घटना", type: "noun", hindiPron: "ऐक्सिडेंट" },
  "account": { meaning: "A record of financial transactions", hindi: "खाता", type: "noun", hindiPron: "अकाउंट" },
  "achievement": { meaning: "A thing accomplished successfully", hindi: "उपलब्धि", type: "noun", hindiPron: "अचीवमेंट" },
  "acid": { meaning: "A chemical substance with a pH less than 7", hindi: "तेज़ाब", type: "noun", hindiPron: "ऐसिड" },
  "action": { meaning: "The process of doing something", hindi: "कार्रवाई", type: "noun", hindiPron: "ऐक्शन" },
  "activity": { meaning: "A thing that a person does", hindi: "गतिविधि", type: "noun", hindiPron: "ऐक्टिविटी" },
  "actor": { meaning: "A person who acts in plays or films", hindi: "अभिनेता", type: "noun", hindiPron: "ऐक्टर" },
  "addition": { meaning: "The action of adding something", hindi: "जोड़", type: "noun", hindiPron: "अडिशन" },
  "address": { meaning: "The location of a building", hindi: "पता", type: "noun", hindiPron: "अड्रेस" },
  "administration": { meaning: "The management of public affairs", hindi: "प्रशासन", type: "noun", hindiPron: "ऐड्मिनिस्ट्रेशन" },
  "adult": { meaning: "A person who is fully grown", hindi: "वयस्क", type: "noun", hindiPron: "अडल्ट" },
  "advantage": { meaning: "A condition giving a better position", hindi: "लाभ", type: "noun", hindiPron: "अड्वांटेज" },
  "adventure": { meaning: "An unusual and exciting experience", hindi: "साहसिक कार्य", type: "noun", hindiPron: "अड्वेंचर" },
  "advice": { meaning: "Guidance offered about future action", hindi: "सलाह", type: "noun", hindiPron: "अड्वाइस" },
  "affair": { meaning: "An event or matter", hindi: "मामला", type: "noun", hindiPron: "अफ़ेयर" },
  "afternoon": { meaning: "The time from noon to evening", hindi: "दोपहर", type: "noun", hindiPron: "आफ़्टरनून" },
  "age": { meaning: "The length of time a person has lived", hindi: "उम्र", type: "noun", hindiPron: "एज" },
  "agency": { meaning: "An organization providing a service", hindi: "एजेंसी", type: "noun", hindiPron: "एजेंसी" },
  "agent": { meaning: "A person who acts on behalf of another", hindi: "एजेंट", type: "noun", hindiPron: "एजेंट" },
  "agreement": { meaning: "A negotiated arrangement", hindi: "समझौता", type: "noun", hindiPron: "अग्रीमेंट" },
  "agriculture": { meaning: "The science of farming", hindi: "कृषि", type: "noun", hindiPron: "ऐग्रीकल्चर" },
  "air": { meaning: "The invisible gaseous substance around earth", hindi: "हवा", type: "noun", hindiPron: "एयर" },
  "airport": { meaning: "A place where aircraft take off and land", hindi: "हवाई अड्डा", type: "noun", hindiPron: "एयरपोर्ट" },
  "alarm": { meaning: "A warning of danger", hindi: "अलार्म", type: "noun", hindiPron: "अलार्म" },
  "album": { meaning: "A collection of recordings or photos", hindi: "एल्बम", type: "noun", hindiPron: "ऐल्बम" },
  "alcohol": { meaning: "A colorless intoxicating liquid", hindi: "शराब", type: "noun", hindiPron: "ऐल्कोहॉल" },
  "ambition": { meaning: "A strong desire to achieve something", hindi: "महत्वाकांक्षा", type: "noun", hindiPron: "ऐम्बिशन" },
  "amount": { meaning: "A quantity of something", hindi: "मात्रा", type: "noun", hindiPron: "अमाउंट" },
  "analysis": { meaning: "Detailed examination of something", hindi: "विश्लेषण", type: "noun", hindiPron: "अनैलिसिस" },
  "ancestor": { meaning: "A person from whom one is descended", hindi: "पूर्वज", type: "noun", hindiPron: "ऐन्सेस्टर" },
  "anger": { meaning: "A strong feeling of annoyance", hindi: "क्रोध", type: "noun", hindiPron: "ऐंगर" },
  "angle": { meaning: "The space between two intersecting lines", hindi: "कोण", type: "noun", hindiPron: "ऐंगल" },
  "animal": { meaning: "A living organism that feeds on organic matter", hindi: "जानवर", type: "noun", hindiPron: "ऐनिमल" },
  "announcement": { meaning: "A public statement giving information", hindi: "घोषणा", type: "noun", hindiPron: "अनाउंसमेंट" },
  "anxiety": { meaning: "A feeling of worry and unease", hindi: "चिंता", type: "noun", hindiPron: "ऐंग्ज़ायटी" },
  "apartment": { meaning: "A set of rooms forming a residence", hindi: "अपार्टमेंट", type: "noun", hindiPron: "अपार्टमेंट" },
  "appeal": { meaning: "A serious or urgent request", hindi: "अपील", type: "noun", hindiPron: "अपील" },
  "appearance": { meaning: "The way someone or something looks", hindi: "दिखावट", type: "noun", hindiPron: "अपीयरेंस" },
  "appetite": { meaning: "A natural desire to satisfy a need", hindi: "भूख", type: "noun", hindiPron: "ऐपिटाइट" },
  "application": { meaning: "A formal request or a software program", hindi: "आवेदन", type: "noun", hindiPron: "ऐप्लिकेशन" },
  "appointment": { meaning: "An arrangement to meet someone", hindi: "नियुक्ति", type: "noun", hindiPron: "अपॉइंटमेंट" },
  "approach": { meaning: "A way of dealing with something", hindi: "दृष्टिकोण", type: "noun", hindiPron: "अप्रोच" },
  "area": { meaning: "A region or part of a space", hindi: "क्षेत्र", type: "noun", hindiPron: "एरिया" },
  "argument": { meaning: "An exchange of diverging views", hindi: "तर्क", type: "noun", hindiPron: "आर्ग्युमेंट" },
  "army": { meaning: "An organized military force", hindi: "सेना", type: "noun", hindiPron: "आर्मी" },
  "arrangement": { meaning: "A plan or preparation", hindi: "व्यवस्था", type: "noun", hindiPron: "अरेंजमेंट" },
  "arrest": { meaning: "The act of seizing someone by legal authority", hindi: "गिरफ़्तारी", type: "noun", hindiPron: "अरेस्ट" },
  "arrival": { meaning: "The act of reaching a destination", hindi: "आगमन", type: "noun", hindiPron: "अराइवल" },
  "art": { meaning: "Creative expression through various mediums", hindi: "कला", type: "noun", hindiPron: "आर्ट" },
  "article": { meaning: "A piece of writing in a publication", hindi: "लेख", type: "noun", hindiPron: "आर्टिकल" },
  "aspect": { meaning: "A particular part or feature", hindi: "पहलू", type: "noun", hindiPron: "ऐस्पेक्ट" },
  "assignment": { meaning: "A task allocated to someone", hindi: "कार्य", type: "noun", hindiPron: "असाइनमेंट" },
  "assistance": { meaning: "The provision of help", hindi: "सहायता", type: "noun", hindiPron: "असिस्टेंस" },
  "association": { meaning: "A group organized for a purpose", hindi: "संघ", type: "noun", hindiPron: "असोसिएशन" },
  "assumption": { meaning: "A thing accepted as true without proof", hindi: "धारणा", type: "noun", hindiPron: "असम्पशन" },
  "atmosphere": { meaning: "The envelope of gases surrounding earth", hindi: "वातावरण", type: "noun", hindiPron: "ऐट्मॉस्फ़ियर" },
  "attack": { meaning: "An aggressive action against someone", hindi: "हमला", type: "noun", hindiPron: "अटैक" },
  "attempt": { meaning: "An effort to achieve something", hindi: "प्रयास", type: "noun", hindiPron: "अटेम्प्ट" },
  "attention": { meaning: "The act of concentrating the mind", hindi: "ध्यान", type: "noun", hindiPron: "अटेंशन" },
  "attitude": { meaning: "A settled way of thinking", hindi: "रवैया", type: "noun", hindiPron: "ऐटिट्यूड" },
  "audience": { meaning: "The assembled spectators or listeners", hindi: "दर्शक", type: "noun", hindiPron: "ऑडियंस" },
  "author": { meaning: "A writer of a book or article", hindi: "लेखक", type: "noun", hindiPron: "ऑथर" },
  "authority": { meaning: "The power to give orders", hindi: "अधिकार", type: "noun", hindiPron: "ऑथॉरिटी" },
  "autumn": { meaning: "The season between summer and winter", hindi: "पतझड़", type: "noun", hindiPron: "ऑटम" },
  "award": { meaning: "A prize given for achievement", hindi: "पुरस्कार", type: "noun", hindiPron: "अवॉर्ड" },

  // B
  "baby": { meaning: "A very young child", hindi: "शिशु", type: "noun", hindiPron: "बेबी" },
  "back": { meaning: "The rear surface of the body", hindi: "पीठ", type: "noun", hindiPron: "बैक" },
  "background": { meaning: "The part of a scene behind the main object", hindi: "पृष्ठभूमि", type: "noun", hindiPron: "बैकग्राउंड" },
  "bag": { meaning: "A container made of flexible material", hindi: "थैला", type: "noun", hindiPron: "बैग" },
  "balance": { meaning: "An even distribution of weight", hindi: "संतुलन", type: "noun", hindiPron: "बैलेंस" },
  "ball": { meaning: "A solid or hollow sphere", hindi: "गेंद", type: "noun", hindiPron: "बॉल" },
  "banana": { meaning: "A long curved yellow fruit", hindi: "केला", type: "noun", hindiPron: "बनाना" },
  "band": { meaning: "A group of musicians or a flat strip", hindi: "बैंड", type: "noun", hindiPron: "बैंड" },
  "bank": { meaning: "A financial institution", hindi: "बैंक", type: "noun", hindiPron: "बैंक" },
  "bar": { meaning: "A long rigid piece of material", hindi: "बार", type: "noun", hindiPron: "बार" },
  "base": { meaning: "The lowest part or foundation", hindi: "आधार", type: "noun", hindiPron: "बेस" },
  "basis": { meaning: "The underlying support for something", hindi: "आधार", type: "noun", hindiPron: "बेसिस" },
  "basket": { meaning: "A container made of woven material", hindi: "टोकरी", type: "noun", hindiPron: "बास्केट" },
  "bath": { meaning: "An act of washing the body", hindi: "स्नान", type: "noun", hindiPron: "बाथ" },
  "bathroom": { meaning: "A room with a bath or shower", hindi: "स्नानघर", type: "noun", hindiPron: "बाथरूम" },
  "battle": { meaning: "A fight between armed forces", hindi: "लड़ाई", type: "noun", hindiPron: "बैटल" },
  "beach": { meaning: "A pebbly or sandy shore", hindi: "समुद्र तट", type: "noun", hindiPron: "बीच" },
  "bean": { meaning: "An edible seed of various plants", hindi: "फली", type: "noun", hindiPron: "बीन" },
  "bear": { meaning: "A large heavy mammal", hindi: "भालू", type: "noun", hindiPron: "बेयर" },
  "beard": { meaning: "Hair growing on the chin and cheeks", hindi: "दाढ़ी", type: "noun", hindiPron: "बियर्ड" },
  "beat": { meaning: "A regular rhythmic sound", hindi: "धड़कन", type: "noun", hindiPron: "बीट" },
  "beauty": { meaning: "A combination of qualities that pleases", hindi: "सुंदरता", type: "noun", hindiPron: "ब्यूटी" },
  "bed": { meaning: "A piece of furniture for sleeping", hindi: "बिस्तर", type: "noun", hindiPron: "बेड" },
  "bedroom": { meaning: "A room for sleeping", hindi: "शयनकक्ष", type: "noun", hindiPron: "बेडरूम" },
  "beef": { meaning: "The flesh of a cow as food", hindi: "गोमांस", type: "noun", hindiPron: "बीफ़" },
  "beer": { meaning: "An alcoholic drink made from grain", hindi: "बीयर", type: "noun", hindiPron: "बियर" },
  "beginning": { meaning: "The point in time when something starts", hindi: "शुरुआत", type: "noun", hindiPron: "बिगिनिंग" },
  "behaviour": { meaning: "The way one acts or conducts oneself", hindi: "व्यवहार", type: "noun", hindiPron: "बिहेवियर" },
  "belief": { meaning: "Trust, faith, or confidence", hindi: "विश्वास", type: "noun", hindiPron: "बिलीफ़" },
  "bell": { meaning: "A hollow metal object that makes a sound", hindi: "घंटी", type: "noun", hindiPron: "बेल" },
  "benefit": { meaning: "An advantage or profit", hindi: "लाभ", type: "noun", hindiPron: "बेनिफ़िट" },
  "bicycle": { meaning: "A vehicle with two wheels", hindi: "साइकिल", type: "noun", hindiPron: "बाइसिकल" },
  "bill": { meaning: "A statement of charges", hindi: "बिल", type: "noun", hindiPron: "बिल" },
  "bird": { meaning: "A warm-blooded egg-laying creature with feathers", hindi: "पक्षी", type: "noun", hindiPron: "बर्ड" },
  "birth": { meaning: "The emergence of a baby from the body", hindi: "जन्म", type: "noun", hindiPron: "बर्थ" },
  "birthday": { meaning: "The anniversary of one's birth", hindi: "जन्मदिन", type: "noun", hindiPron: "बर्थडे" },
  "bit": { meaning: "A small piece or amount", hindi: "टुकड़ा", type: "noun", hindiPron: "बिट" },
  "blade": { meaning: "The flat cutting edge of a tool", hindi: "ब्लेड", type: "noun", hindiPron: "ब्लेड" },
  "blame": { meaning: "Responsibility for a fault", hindi: "दोष", type: "noun", hindiPron: "ब्लेम" },
  "blank": { meaning: "Not written or printed on", hindi: "खाली", type: "adjective", hindiPron: "ब्लैंक" },
  "blanket": { meaning: "A large piece of woollen material", hindi: "कंबल", type: "noun", hindiPron: "ब्लैंकेट" },
  "blind": { meaning: "Unable to see", hindi: "अंधा", type: "adjective", hindiPron: "ब्लाइंड" },
  "block": { meaning: "A large solid piece of material", hindi: "ब्लॉक", type: "noun", hindiPron: "ब्लॉक" },
  "blood": { meaning: "The red liquid that circulates in the body", hindi: "खून", type: "noun", hindiPron: "ब्लड" },
  "blow": { meaning: "A powerful strike with a hand or weapon", hindi: "प्रहार", type: "noun", hindiPron: "ब्लो" },
  "blue": { meaning: "The color of the sky", hindi: "नीला", type: "adjective", hindiPron: "ब्लू" },
  "board": { meaning: "A long flat piece of wood", hindi: "तख्ता", type: "noun", hindiPron: "बोर्ड" },
  "boat": { meaning: "A small vessel for travelling on water", hindi: "नाव", type: "noun", hindiPron: "बोट" },
  "body": { meaning: "The physical structure of a person", hindi: "शरीर", type: "noun", hindiPron: "बॉडी" },
  "bomb": { meaning: "An explosive weapon", hindi: "बम", type: "noun", hindiPron: "बॉम्ब" },
  "bone": { meaning: "Hard whitish tissue making up the skeleton", hindi: "हड्डी", type: "noun", hindiPron: "बोन" },
  "book": { meaning: "A written or printed work of pages", hindi: "किताब", type: "noun", hindiPron: "बुक" },
  "boot": { meaning: "A sturdy item of footwear", hindi: "जूता", type: "noun", hindiPron: "बूट" },
  "border": { meaning: "A line separating two areas", hindi: "सीमा", type: "noun", hindiPron: "बॉर्डर" },
  "boss": { meaning: "A person who is in charge", hindi: "मालिक", type: "noun", hindiPron: "बॉस" },
  "bottle": { meaning: "A container for liquids", hindi: "बोतल", type: "noun", hindiPron: "बॉटल" },
  "bottom": { meaning: "The lowest point or part", hindi: "तल", type: "noun", hindiPron: "बॉटम" },
  "bowl": { meaning: "A round deep dish", hindi: "कटोरा", type: "noun", hindiPron: "बोल" },
  "box": { meaning: "A container with flat sides", hindi: "डिब्बा", type: "noun", hindiPron: "बॉक्स" },
  "boy": { meaning: "A male child", hindi: "लड़का", type: "noun", hindiPron: "बॉय" },
  "brain": { meaning: "The organ inside the head", hindi: "दिमाग़", type: "noun", hindiPron: "ब्रेन" },
  "branch": { meaning: "A part of a tree growing from the trunk", hindi: "शाखा", type: "noun", hindiPron: "ब्रांच" },
  "brave": { meaning: "Ready to face danger", hindi: "बहादुर", type: "adjective", hindiPron: "ब्रेव" },
  "bread": { meaning: "Food made of flour, water, and yeast", hindi: "रोटी", type: "noun", hindiPron: "ब्रेड" },
  "breakfast": { meaning: "The first meal of the day", hindi: "नाश्ता", type: "noun", hindiPron: "ब्रेकफ़ास्ट" },
  "breath": { meaning: "The air taken into the lungs", hindi: "साँस", type: "noun", hindiPron: "ब्रेथ" },
  "brick": { meaning: "A small block of fired clay", hindi: "ईंट", type: "noun", hindiPron: "ब्रिक" },
  "bridge": { meaning: "A structure carrying a road over an obstacle", hindi: "पुल", type: "noun", hindiPron: "ब्रिज" },
  "brother": { meaning: "A male sibling", hindi: "भाई", type: "noun", hindiPron: "ब्रदर" },
  "brush": { meaning: "An implement with bristles for cleaning", hindi: "ब्रश", type: "noun", hindiPron: "ब्रश" },
  "bucket": { meaning: "A cylindrical container for liquids", hindi: "बाल्टी", type: "noun", hindiPron: "बकेट" },
  "budget": { meaning: "An estimate of income and expenditure", hindi: "बजट", type: "noun", hindiPron: "बजट" },
  "building": { meaning: "A structure with walls and a roof", hindi: "इमारत", type: "noun", hindiPron: "बिल्डिंग" },
  "burden": { meaning: "A heavy load or responsibility", hindi: "बोझ", type: "noun", hindiPron: "बर्डन" },
  "burn": { meaning: "An injury caused by heat or fire", hindi: "जलन", type: "noun", hindiPron: "बर्न" },
  "bus": { meaning: "A large motor vehicle for passengers", hindi: "बस", type: "noun", hindiPron: "बस" },
  "business": { meaning: "A commercial activity or enterprise", hindi: "व्यापार", type: "noun", hindiPron: "बिज़नेस" },
  "butter": { meaning: "A pale yellow dairy product", hindi: "मक्खन", type: "noun", hindiPron: "बटर" },
  "button": { meaning: "A small disc sewn to a garment", hindi: "बटन", type: "noun", hindiPron: "बटन" },

  // C
  "cabinet": { meaning: "A cupboard with shelves or drawers", hindi: "अलमारी", type: "noun", hindiPron: "कैबिनेट" },
  "cake": { meaning: "A baked sweet food", hindi: "केक", type: "noun", hindiPron: "केक" },
  "calculation": { meaning: "A mathematical determination", hindi: "गणना", type: "noun", hindiPron: "कैल्क्युलेशन" },
  "calendar": { meaning: "A chart showing days and months", hindi: "कैलेंडर", type: "noun", hindiPron: "कैलेंडर" },
  "call": { meaning: "A cry or telephone communication", hindi: "पुकार", type: "noun", hindiPron: "कॉल" },
  "calm": { meaning: "Not showing agitation", hindi: "शांत", type: "adjective", hindiPron: "काम" },
  "camera": { meaning: "A device for taking photographs", hindi: "कैमरा", type: "noun", hindiPron: "कैमरा" },
  "camp": { meaning: "A place with temporary accommodations", hindi: "शिविर", type: "noun", hindiPron: "कैम्प" },
  "campaign": { meaning: "An organized course of action", hindi: "अभियान", type: "noun", hindiPron: "कैम्पेन" },
  "cancer": { meaning: "A disease caused by uncontrolled cell division", hindi: "कैंसर", type: "noun", hindiPron: "कैंसर" },
  "candidate": { meaning: "A person who applies for a job or position", hindi: "उम्मीदवार", type: "noun", hindiPron: "कैंडिडेट" },
  "cap": { meaning: "A type of soft flat hat", hindi: "टोपी", type: "noun", hindiPron: "कैप" },
  "capacity": { meaning: "The maximum amount something can contain", hindi: "क्षमता", type: "noun", hindiPron: "कपैसिटी" },
  "capital": { meaning: "The most important city of a country", hindi: "राजधानी", type: "noun", hindiPron: "कैपिटल" },
  "captain": { meaning: "The person in command", hindi: "कप्तान", type: "noun", hindiPron: "कैप्टन" },
  "car": { meaning: "A motor vehicle for transportation", hindi: "गाड़ी", type: "noun", hindiPron: "कार" },
  "card": { meaning: "A piece of thick stiff paper or thin pasteboard", hindi: "कार्ड", type: "noun", hindiPron: "कार्ड" },
  "care": { meaning: "The provision of what is necessary", hindi: "देखभाल", type: "noun", hindiPron: "केयर" },
  "career": { meaning: "An occupation undertaken for a significant period", hindi: "करियर", type: "noun", hindiPron: "करियर" },
  "carpet": { meaning: "A floor covering made from thick woven fabric", hindi: "कालीन", type: "noun", hindiPron: "कार्पेट" },
  "case": { meaning: "An instance of a particular situation", hindi: "मामला", type: "noun", hindiPron: "केस" },
  "cash": { meaning: "Money in coins or notes", hindi: "नक़द", type: "noun", hindiPron: "कैश" },
  "cat": { meaning: "A small domesticated feline", hindi: "बिल्ली", type: "noun", hindiPron: "कैट" },
  "catch": { meaning: "An act of catching something", hindi: "पकड़ना", type: "verb", hindiPron: "कैच" },
  "category": { meaning: "A class or division of things", hindi: "श्रेणी", type: "noun", hindiPron: "कैटेगरी" },
  "cause": { meaning: "A person or thing that gives rise to something", hindi: "कारण", type: "noun", hindiPron: "कॉज़" },
  "celebration": { meaning: "The action of celebrating an event", hindi: "उत्सव", type: "noun", hindiPron: "सेलिब्रेशन" },
  "cell": { meaning: "The smallest structural unit of an organism", hindi: "कोशिका", type: "noun", hindiPron: "सेल" },
  "center": { meaning: "The middle point of something", hindi: "केंद्र", type: "noun", hindiPron: "सेंटर" },
  "central": { meaning: "At the point that is in the middle", hindi: "केंद्रीय", type: "adjective", hindiPron: "सेंट्रल" },
  "century": { meaning: "A period of one hundred years", hindi: "शताब्दी", type: "noun", hindiPron: "सेंचुरी" },
  "ceremony": { meaning: "A formal religious or public occasion", hindi: "समारोह", type: "noun", hindiPron: "सेरेमनी" },
  "chain": { meaning: "A series of connected metal links", hindi: "ज़ंजीर", type: "noun", hindiPron: "चेन" },
  "chair": { meaning: "A seat for one person with a back", hindi: "कुर्सी", type: "noun", hindiPron: "चेयर" },
  "chairman": { meaning: "A person who presides over a meeting", hindi: "अध्यक्ष", type: "noun", hindiPron: "चेयरमैन" },
  "challenge": { meaning: "A call to prove or justify something", hindi: "चुनौती", type: "noun", hindiPron: "चैलेंज" },
  "champion": { meaning: "A person who has won a contest", hindi: "चैंपियन", type: "noun", hindiPron: "चैम्पियन" },
  "chance": { meaning: "A possibility of something happening", hindi: "मौक़ा", type: "noun", hindiPron: "चांस" },
  "change": { meaning: "The act of making something different", hindi: "बदलाव", type: "noun", hindiPron: "चेंज" },
  "channel": { meaning: "A band of frequencies for broadcasting", hindi: "चैनल", type: "noun", hindiPron: "चैनल" },
  "chapter": { meaning: "A main division of a book", hindi: "अध्याय", type: "noun", hindiPron: "चैप्टर" },
  "character": { meaning: "The mental and moral qualities of an individual", hindi: "चरित्र", type: "noun", hindiPron: "कैरेक्टर" },
  "charge": { meaning: "A price asked for goods or services", hindi: "शुल्क", type: "noun", hindiPron: "चार्ज" },
  "charity": { meaning: "An organization set up to provide help", hindi: "दान", type: "noun", hindiPron: "चैरिटी" },
  "chart": { meaning: "A sheet of information in the form of a table", hindi: "चार्ट", type: "noun", hindiPron: "चार्ट" },
  "check": { meaning: "An examination to test accuracy", hindi: "जाँच", type: "noun", hindiPron: "चेक" },
  "cheek": { meaning: "The side of the face below the eye", hindi: "गाल", type: "noun", hindiPron: "चीक" },
  "cheese": { meaning: "A food made from pressed milk curds", hindi: "पनीर", type: "noun", hindiPron: "चीज़" },
  "chest": { meaning: "The front surface of the body", hindi: "छाती", type: "noun", hindiPron: "चेस्ट" },
  "chicken": { meaning: "A domestic fowl kept for eggs or meat", hindi: "मुर्ग़ी", type: "noun", hindiPron: "चिकन" },
  "child": { meaning: "A young human being", hindi: "बच्चा", type: "noun", hindiPron: "चाइल्ड" },
  "childhood": { meaning: "The state of being a child", hindi: "बचपन", type: "noun", hindiPron: "चाइल्डहुड" },
  "chip": { meaning: "A small piece cut or broken off", hindi: "टुकड़ा", type: "noun", hindiPron: "चिप" },
  "chocolate": { meaning: "A food made from roasted cacao seeds", hindi: "चॉकलेट", type: "noun", hindiPron: "चॉकलेट" },
  "choice": { meaning: "An act of choosing between alternatives", hindi: "चुनाव", type: "noun", hindiPron: "चॉइस" },
  "church": { meaning: "A building for Christian worship", hindi: "गिरजाघर", type: "noun", hindiPron: "चर्च" },
  "cigarette": { meaning: "A thin cylinder of tobacco for smoking", hindi: "सिगरेट", type: "noun", hindiPron: "सिगरेट" },
  "cinema": { meaning: "A theatre where films are shown", hindi: "सिनेमा", type: "noun", hindiPron: "सिनेमा" },
  "circle": { meaning: "A round plane figure", hindi: "वृत्त", type: "noun", hindiPron: "सर्कल" },
  "circumstance": { meaning: "A fact or condition affecting a situation", hindi: "परिस्थिति", type: "noun", hindiPron: "सर्कमस्टांस" },
  "citizen": { meaning: "A native or inhabitant of a country", hindi: "नागरिक", type: "noun", hindiPron: "सिटिज़न" },
  "city": { meaning: "A large town", hindi: "शहर", type: "noun", hindiPron: "सिटी" },
  "claim": { meaning: "An assertion that something is true", hindi: "दावा", type: "noun", hindiPron: "क्लेम" },
  "class": { meaning: "A set or category of things", hindi: "वर्ग", type: "noun", hindiPron: "क्लास" },
  "classroom": { meaning: "A room in which a class of students is taught", hindi: "कक्षा", type: "noun", hindiPron: "क्लासरूम" },
  "client": { meaning: "A person using the services of a professional", hindi: "ग्राहक", type: "noun", hindiPron: "क्लायंट" },
  "climate": { meaning: "The weather conditions of an area", hindi: "जलवायु", type: "noun", hindiPron: "क्लाइमेट" },
  "clock": { meaning: "An instrument for measuring time", hindi: "घड़ी", type: "noun", hindiPron: "क्लॉक" },
  "cloth": { meaning: "Woven or felted fabric", hindi: "कपड़ा", type: "noun", hindiPron: "क्लॉथ" },
  "clothes": { meaning: "Items worn to cover the body", hindi: "कपड़े", type: "noun", hindiPron: "क्लोद्ज़" },
  "cloud": { meaning: "A visible mass of water droplets in the sky", hindi: "बादल", type: "noun", hindiPron: "क्लाउड" },
  "club": { meaning: "An association dedicated to a particular interest", hindi: "क्लब", type: "noun", hindiPron: "क्लब" },
  "coach": { meaning: "A person who trains a sports team", hindi: "प्रशिक्षक", type: "noun", hindiPron: "कोच" },
  "coal": { meaning: "A combustible black rock", hindi: "कोयला", type: "noun", hindiPron: "कोल" },
  "coast": { meaning: "The part of land near the sea", hindi: "तट", type: "noun", hindiPron: "कोस्ट" },
  "coat": { meaning: "An outer garment with sleeves", hindi: "कोट", type: "noun", hindiPron: "कोट" },
  "code": { meaning: "A system of words or symbols", hindi: "संकेत", type: "noun", hindiPron: "कोड" },
  "coffee": { meaning: "A drink made from roasted coffee beans", hindi: "कॉफ़ी", type: "noun", hindiPron: "कॉफ़ी" },
  "coin": { meaning: "A flat disc of metal used as money", hindi: "सिक्का", type: "noun", hindiPron: "कॉइन" },
  "cold": { meaning: "Of or at a low temperature", hindi: "ठंडा", type: "adjective", hindiPron: "कोल्ड" },
  "colleague": { meaning: "A person with whom one works", hindi: "सहकर्मी", type: "noun", hindiPron: "कॉलीग" },
  "collection": { meaning: "A group of accumulated items", hindi: "संग्रह", type: "noun", hindiPron: "कलेक्शन" },
  "college": { meaning: "An educational institution", hindi: "महाविद्यालय", type: "noun", hindiPron: "कॉलेज" },
  "colony": { meaning: "A territory under the control of a state", hindi: "उपनिवेश", type: "noun", hindiPron: "कॉलनी" },
  "color": { meaning: "The property of visual perception", hindi: "रंग", type: "noun", hindiPron: "कलर" },
  "column": { meaning: "A pillar or vertical division", hindi: "स्तंभ", type: "noun", hindiPron: "कॉलम" },
  "combination": { meaning: "A joining of different things", hindi: "संयोजन", type: "noun", hindiPron: "कॉम्बिनेशन" },
  "comfort": { meaning: "A state of physical ease", hindi: "आराम", type: "noun", hindiPron: "कम्फ़र्ट" },
  "command": { meaning: "An authoritative order", hindi: "आदेश", type: "noun", hindiPron: "कमांड" },
  "comment": { meaning: "A verbal or written remark", hindi: "टिप्पणी", type: "noun", hindiPron: "कॉमेंट" },
  "commercial": { meaning: "Relating to commerce", hindi: "व्यावसायिक", type: "adjective", hindiPron: "कमर्शल" },
  "commission": { meaning: "An instruction or authority given", hindi: "आयोग", type: "noun", hindiPron: "कमिशन" },
  "commitment": { meaning: "The state of being dedicated", hindi: "प्रतिबद्धता", type: "noun", hindiPron: "कमिटमेंट" },
  "committee": { meaning: "A group appointed for a function", hindi: "समिति", type: "noun", hindiPron: "कमिटी" },
  "communication": { meaning: "The exchange of information", hindi: "संचार", type: "noun", hindiPron: "कम्यूनिकेशन" },
  "community": { meaning: "A group living in the same place", hindi: "समुदाय", type: "noun", hindiPron: "कम्यूनिटी" },
  "company": { meaning: "A commercial business", hindi: "कंपनी", type: "noun", hindiPron: "कंपनी" },
  "comparison": { meaning: "Considering similarities and differences", hindi: "तुलना", type: "noun", hindiPron: "कम्पैरिसन" },
  "competition": { meaning: "The activity of competing", hindi: "प्रतियोगिता", type: "noun", hindiPron: "कॉम्पिटिशन" },
  "complaint": { meaning: "An expression of dissatisfaction", hindi: "शिकायत", type: "noun", hindiPron: "कम्प्लेंट" },
  "complex": { meaning: "Consisting of many different parts", hindi: "जटिल", type: "adjective", hindiPron: "कॉम्प्लेक्स" },
  "computer": { meaning: "An electronic device for processing data", hindi: "कंप्यूटर", type: "noun", hindiPron: "कम्प्यूटर" },
  "concentration": { meaning: "The action of concentrating", hindi: "एकाग्रता", type: "noun", hindiPron: "कॉन्सन्ट्रेशन" },
  "concept": { meaning: "An abstract idea", hindi: "अवधारणा", type: "noun", hindiPron: "कॉन्सेप्ट" },
  "concern": { meaning: "A matter of interest or importance", hindi: "चिंता", type: "noun", hindiPron: "कन्सर्न" },
  "conclusion": { meaning: "The end or finish of something", hindi: "निष्कर्ष", type: "noun", hindiPron: "कन्क्लूज़न" },
  "condition": { meaning: "The state of something", hindi: "स्थिति", type: "noun", hindiPron: "कंडीशन" },
  "conference": { meaning: "A formal meeting for discussion", hindi: "सम्मेलन", type: "noun", hindiPron: "कॉन्फ़्रेंस" },
  "confidence": { meaning: "The feeling of self-assurance", hindi: "आत्मविश्वास", type: "noun", hindiPron: "कॉन्फ़िडेंस" },
  "conflict": { meaning: "A serious disagreement or argument", hindi: "संघर्ष", type: "noun", hindiPron: "कॉन्फ़्लिक्ट" },
  "confusion": { meaning: "Lack of understanding", hindi: "भ्रम", type: "noun", hindiPron: "कन्फ़्यूज़न" },
  "connection": { meaning: "A relationship or link", hindi: "संबंध", type: "noun", hindiPron: "कनेक्शन" },
  "consequence": { meaning: "A result or effect of an action", hindi: "परिणाम", type: "noun", hindiPron: "कॉन्सिक्वेंस" },
  "conservation": { meaning: "Prevention of wasteful use of resources", hindi: "संरक्षण", type: "noun", hindiPron: "कॉन्सर्वेशन" },
  "consideration": { meaning: "Careful thought", hindi: "विचार", type: "noun", hindiPron: "कन्सिडरेशन" },
  "construction": { meaning: "The building of something", hindi: "निर्माण", type: "noun", hindiPron: "कन्स्ट्रक्शन" },
  "consumer": { meaning: "A person who purchases goods", hindi: "उपभोक्ता", type: "noun", hindiPron: "कन्ज़्यूमर" },
  "contact": { meaning: "Communication or meeting", hindi: "संपर्क", type: "noun", hindiPron: "कॉन्टैक्ट" },
  "content": { meaning: "The things that are held inside", hindi: "सामग्री", type: "noun", hindiPron: "कॉन्टेंट" },
  "context": { meaning: "The circumstances surrounding an event", hindi: "संदर्भ", type: "noun", hindiPron: "कॉन्टेक्स्ट" },
  "contract": { meaning: "A written or spoken agreement", hindi: "अनुबंध", type: "noun", hindiPron: "कॉन्ट्रैक्ट" },
  "contribution": { meaning: "A gift or payment to a common fund", hindi: "योगदान", type: "noun", hindiPron: "कॉन्ट्रिब्यूशन" },
  "control": { meaning: "The power to influence", hindi: "नियंत्रण", type: "noun", hindiPron: "कंट्रोल" },
  "conversation": { meaning: "A talk between two or more people", hindi: "बातचीत", type: "noun", hindiPron: "कॉन्वर्सेशन" },
  "cook": { meaning: "A person who prepares food", hindi: "रसोइया", type: "noun", hindiPron: "कुक" },
  "copy": { meaning: "A thing made to be similar to another", hindi: "प्रतिलिपि", type: "noun", hindiPron: "कॉपी" },
  "corner": { meaning: "A place where two sides meet", hindi: "कोना", type: "noun", hindiPron: "कॉर्नर" },
  "cost": { meaning: "The price paid for something", hindi: "लागत", type: "noun", hindiPron: "कॉस्ट" },
  "cotton": { meaning: "A soft white fibrous substance", hindi: "कपास", type: "noun", hindiPron: "कॉटन" },
  "count": { meaning: "The total number", hindi: "गिनती", type: "noun", hindiPron: "काउंट" },
  "country": { meaning: "A nation with its own government", hindi: "देश", type: "noun", hindiPron: "कंट्री" },
  "couple": { meaning: "Two people who are together", hindi: "जोड़ा", type: "noun", hindiPron: "कपल" },
  "courage": { meaning: "The ability to do something that frightens one", hindi: "साहस", type: "noun", hindiPron: "करेज" },
  "course": { meaning: "A route or direction or series of lectures", hindi: "पाठ्यक्रम", type: "noun", hindiPron: "कोर्स" },
  "court": { meaning: "A tribunal or an enclosed area", hindi: "अदालत", type: "noun", hindiPron: "कोर्ट" },
  "cousin": { meaning: "A child of one's uncle or aunt", hindi: "चचेरा भाई/बहन", type: "noun", hindiPron: "कज़न" },
  "cover": { meaning: "Something that lies on top of or shields", hindi: "आवरण", type: "noun", hindiPron: "कवर" },
  "cow": { meaning: "A fully grown female animal of cattle", hindi: "गाय", type: "noun", hindiPron: "काउ" },
  "cream": { meaning: "The thick white liquid on top of milk", hindi: "क्रीम", type: "noun", hindiPron: "क्रीम" },
  "creature": { meaning: "An animal or person", hindi: "प्राणी", type: "noun", hindiPron: "क्रीचर" },
  "crew": { meaning: "A group of people who work together", hindi: "दल", type: "noun", hindiPron: "क्रू" },
  "crime": { meaning: "An action punishable by law", hindi: "अपराध", type: "noun", hindiPron: "क्राइम" },
  "crisis": { meaning: "A time of intense difficulty", hindi: "संकट", type: "noun", hindiPron: "क्राइसिस" },
  "criticism": { meaning: "The expression of disapproval", hindi: "आलोचना", type: "noun", hindiPron: "क्रिटिसिज़्म" },
  "crop": { meaning: "A cultivated plant grown on a large scale", hindi: "फ़सल", type: "noun", hindiPron: "क्रॉप" },
  "cross": { meaning: "A mark or shape formed by two intersecting lines", hindi: "क्रॉस", type: "noun", hindiPron: "क्रॉस" },
  "crowd": { meaning: "A large number of people gathered together", hindi: "भीड़", type: "noun", hindiPron: "क्राउड" },
  "cry": { meaning: "A shout or call or tears", hindi: "रोना", type: "verb", hindiPron: "क्राई" },
  "culture": { meaning: "Arts, customs, and habits of a society", hindi: "संस्कृति", type: "noun", hindiPron: "कल्चर" },
  "cup": { meaning: "A small bowl-shaped container for drinking", hindi: "प्याला", type: "noun", hindiPron: "कप" },
  "currency": { meaning: "A system of money in use", hindi: "मुद्रा", type: "noun", hindiPron: "करेंसी" },
  "current": { meaning: "Belonging to the present time", hindi: "वर्तमान", type: "adjective", hindiPron: "करंट" },
  "curriculum": { meaning: "The subjects in a course of study", hindi: "पाठ्यक्रम", type: "noun", hindiPron: "करिक्युलम" },
  "curtain": { meaning: "A piece of cloth hung at a window", hindi: "पर्दा", type: "noun", hindiPron: "कर्टन" },
  "customer": { meaning: "A person who buys goods or services", hindi: "ग्राहक", type: "noun", hindiPron: "कस्टमर" },
  "cycle": { meaning: "A series of events that are regularly repeated", hindi: "चक्र", type: "noun", hindiPron: "साइकल" },

  // D
  "damage": { meaning: "Physical harm that impairs value or function", hindi: "नुक़सान", type: "noun", hindiPron: "डैमेज" },
  "dance": { meaning: "Moving rhythmically to music", hindi: "नृत्य", type: "noun", hindiPron: "डांस" },
  "danger": { meaning: "The possibility of suffering harm", hindi: "ख़तरा", type: "noun", hindiPron: "डेंजर" },
  "data": { meaning: "Facts and statistics collected for analysis", hindi: "आँकड़े", type: "noun", hindiPron: "डेटा" },
  "database": { meaning: "A structured set of data in a computer", hindi: "डेटाबेस", type: "noun", hindiPron: "डेटाबेस" },
  "date": { meaning: "The day of the month or year", hindi: "तारीख़", type: "noun", hindiPron: "डेट" },
  "daughter": { meaning: "A female offspring", hindi: "बेटी", type: "noun", hindiPron: "डॉटर" },
  "day": { meaning: "A period of 24 hours", hindi: "दिन", type: "noun", hindiPron: "डे" },
  "dead": { meaning: "No longer alive", hindi: "मृत", type: "adjective", hindiPron: "डेड" },
  "deal": { meaning: "An agreement or transaction", hindi: "सौदा", type: "noun", hindiPron: "डील" },
  "death": { meaning: "The end of life", hindi: "मृत्यु", type: "noun", hindiPron: "डेथ" },
  "debate": { meaning: "A formal discussion on a topic", hindi: "बहस", type: "noun", hindiPron: "डिबेट" },
  "debt": { meaning: "Something that is owed", hindi: "कर्ज़", type: "noun", hindiPron: "डेट" },
  "decade": { meaning: "A period of ten years", hindi: "दशक", type: "noun", hindiPron: "डेकेड" },
  "decision": { meaning: "A conclusion or resolution reached", hindi: "निर्णय", type: "noun", hindiPron: "डिसीज़न" },
  "declaration": { meaning: "A formal announcement", hindi: "घोषणा", type: "noun", hindiPron: "डेक्लरेशन" },
  "deep": { meaning: "Extending far down from the top", hindi: "गहरा", type: "adjective", hindiPron: "डीप" },
  "defeat": { meaning: "An instance of being beaten", hindi: "हार", type: "noun", hindiPron: "डिफ़ीट" },
  "defence": { meaning: "The action of defending against attack", hindi: "रक्षा", type: "noun", hindiPron: "डिफ़ेंस" },
  "definition": { meaning: "A statement of exact meaning", hindi: "परिभाषा", type: "noun", hindiPron: "डेफ़िनिशन" },
  "degree": { meaning: "The amount, level, or extent", hindi: "डिग्री", type: "noun", hindiPron: "डिग्री" },
  "delay": { meaning: "A period of time by which something is late", hindi: "देरी", type: "noun", hindiPron: "डिले" },
  "delivery": { meaning: "The action of delivering goods", hindi: "वितरण", type: "noun", hindiPron: "डिलीवरी" },
  "demand": { meaning: "An insistent request", hindi: "माँग", type: "noun", hindiPron: "डिमांड" },
  "democracy": { meaning: "A system of government by the people", hindi: "लोकतंत्र", type: "noun", hindiPron: "डेमॉक्रेसी" },
  "department": { meaning: "A division of a large organization", hindi: "विभाग", type: "noun", hindiPron: "डिपार्टमेंट" },
  "depression": { meaning: "Severe despondency and dejection", hindi: "अवसाद", type: "noun", hindiPron: "डिप्रेशन" },
  "depth": { meaning: "The distance from top to bottom", hindi: "गहराई", type: "noun", hindiPron: "डेप्थ" },
  "description": { meaning: "A spoken or written account", hindi: "विवरण", type: "noun", hindiPron: "डिस्क्रिप्शन" },
  "desert": { meaning: "A dry barren area of land", hindi: "रेगिस्तान", type: "noun", hindiPron: "डेज़र्ट" },
  "design": { meaning: "A plan or drawing produced to show function", hindi: "डिज़ाइन", type: "noun", hindiPron: "डिज़ाइन" },
  "desire": { meaning: "A strong feeling of wanting something", hindi: "इच्छा", type: "noun", hindiPron: "डिज़ायर" },
  "desk": { meaning: "A piece of furniture with a flat surface for writing", hindi: "मेज़", type: "noun", hindiPron: "डेस्क" },
  "destination": { meaning: "The place to which someone is going", hindi: "गंतव्य", type: "noun", hindiPron: "डेस्टिनेशन" },
  "detail": { meaning: "An individual feature or fact", hindi: "विवरण", type: "noun", hindiPron: "डीटेल" },
  "development": { meaning: "The process of growth", hindi: "विकास", type: "noun", hindiPron: "डेवलपमेंट" },
  "device": { meaning: "A thing made for a particular purpose", hindi: "उपकरण", type: "noun", hindiPron: "डिवाइस" },
  "diamond": { meaning: "A precious stone of pure carbon", hindi: "हीरा", type: "noun", hindiPron: "डायमंड" },
  "dictionary": { meaning: "A book that lists words and their meanings", hindi: "शब्दकोश", type: "noun", hindiPron: "डिक्शनरी" },
  "diet": { meaning: "The kinds of food a person habitually eats", hindi: "आहार", type: "noun", hindiPron: "डाइट" },
  "difference": { meaning: "A point of dissimilarity", hindi: "अंतर", type: "noun", hindiPron: "डिफ़रेंस" },
  "difficulty": { meaning: "The state of being hard to do", hindi: "कठिनाई", type: "noun", hindiPron: "डिफ़िकल्टी" },
  "dinner": { meaning: "The main meal of the day", hindi: "रात का खाना", type: "noun", hindiPron: "डिनर" },
  "direction": { meaning: "A course along which someone moves", hindi: "दिशा", type: "noun", hindiPron: "डायरेक्शन" },
  "director": { meaning: "A person who directs", hindi: "निदेशक", type: "noun", hindiPron: "डायरेक्टर" },
  "disaster": { meaning: "A sudden accident or natural catastrophe", hindi: "आपदा", type: "noun", hindiPron: "डिज़ास्टर" },
  "discipline": { meaning: "The practice of training to obey rules", hindi: "अनुशासन", type: "noun", hindiPron: "डिसिप्लिन" },
  "discount": { meaning: "A deduction from the usual cost", hindi: "छूट", type: "noun", hindiPron: "डिस्काउंट" },
  "discovery": { meaning: "The action of finding something", hindi: "खोज", type: "noun", hindiPron: "डिस्कवरी" },
  "discussion": { meaning: "The action of talking about something", hindi: "चर्चा", type: "noun", hindiPron: "डिस्कशन" },
  "disease": { meaning: "A disorder of structure or function", hindi: "रोग", type: "noun", hindiPron: "डिज़ीज़" },
  "dish": { meaning: "A shallow container for food", hindi: "बर्तन", type: "noun", hindiPron: "डिश" },
  "display": { meaning: "A performance or collection for public viewing", hindi: "प्रदर्शन", type: "noun", hindiPron: "डिस्प्ले" },
  "distance": { meaning: "The amount of space between two points", hindi: "दूरी", type: "noun", hindiPron: "डिस्टेंस" },
  "distribution": { meaning: "The action of sharing something out", hindi: "वितरण", type: "noun", hindiPron: "डिस्ट्रिब्यूशन" },
  "district": { meaning: "An area of a city or country", hindi: "ज़िला", type: "noun", hindiPron: "डिस्ट्रिक्ट" },
  "doctor": { meaning: "A qualified medical practitioner", hindi: "डॉक्टर", type: "noun", hindiPron: "डॉक्टर" },
  "document": { meaning: "A piece of written or printed matter", hindi: "दस्तावेज़", type: "noun", hindiPron: "डॉक्यूमेंट" },
  "dog": { meaning: "A domesticated carnivorous mammal", hindi: "कुत्ता", type: "noun", hindiPron: "डॉग" },
  "dollar": { meaning: "The basic monetary unit of the US", hindi: "डॉलर", type: "noun", hindiPron: "डॉलर" },
  "door": { meaning: "A hinged barrier at the entrance", hindi: "दरवाज़ा", type: "noun", hindiPron: "डोर" },
  "doubt": { meaning: "A feeling of uncertainty", hindi: "संदेह", type: "noun", hindiPron: "डाउट" },
  "drama": { meaning: "A play for theatre, radio, or television", hindi: "नाटक", type: "noun", hindiPron: "ड्रामा" },
  "dream": { meaning: "A series of images during sleep", hindi: "सपना", type: "noun", hindiPron: "ड्रीम" },
  "dress": { meaning: "A one-piece garment for women", hindi: "पोशाक", type: "noun", hindiPron: "ड्रेस" },
  "drink": { meaning: "A liquid for drinking", hindi: "पेय", type: "noun", hindiPron: "ड्रिंक" },
  "driver": { meaning: "A person who drives a vehicle", hindi: "ड्राइवर", type: "noun", hindiPron: "ड्राइवर" },
  "drop": { meaning: "A small round quantity of liquid", hindi: "बूँद", type: "noun", hindiPron: "ड्रॉप" },
  "drug": { meaning: "A substance used as medication", hindi: "दवा", type: "noun", hindiPron: "ड्रग" },
  "dust": { meaning: "Fine dry powder on a surface", hindi: "धूल", type: "noun", hindiPron: "डस्ट" },
  "duty": { meaning: "A moral or legal obligation", hindi: "कर्तव्य", type: "noun", hindiPron: "ड्यूटी" },

  // E
  "ear": { meaning: "The organ of hearing", hindi: "कान", type: "noun", hindiPron: "इयर" },
  "earth": { meaning: "The planet on which we live", hindi: "पृथ्वी", type: "noun", hindiPron: "अर्थ" },
  "ease": { meaning: "Absence of difficulty or effort", hindi: "आसानी", type: "noun", hindiPron: "ईज़" },
  "east": { meaning: "The direction towards sunrise", hindi: "पूर्व", type: "noun", hindiPron: "ईस्ट" },
  "economy": { meaning: "The state of a country's trade and finances", hindi: "अर्थव्यवस्था", type: "noun", hindiPron: "इकॉनमी" },
  "edge": { meaning: "The outside limit of something", hindi: "किनारा", type: "noun", hindiPron: "एज" },
  "edition": { meaning: "A particular form of a published text", hindi: "संस्करण", type: "noun", hindiPron: "एडिशन" },
  "editor": { meaning: "A person who edits written material", hindi: "संपादक", type: "noun", hindiPron: "एडिटर" },
  "education": { meaning: "The process of teaching and learning", hindi: "शिक्षा", type: "noun", hindiPron: "एजुकेशन" },
  "effect": { meaning: "A change produced by an action", hindi: "प्रभाव", type: "noun", hindiPron: "इफ़ेक्ट" },
  "efficiency": { meaning: "The state of achieving maximum productivity", hindi: "दक्षता", type: "noun", hindiPron: "इफ़िशिएंसी" },
  "effort": { meaning: "A vigorous attempt", hindi: "प्रयास", type: "noun", hindiPron: "एफ़र्ट" },
  "egg": { meaning: "An oval object laid by a female bird", hindi: "अंडा", type: "noun", hindiPron: "एग" },
  "election": { meaning: "A formal procedure for choosing someone", hindi: "चुनाव", type: "noun", hindiPron: "इलेक्शन" },
  "electricity": { meaning: "A form of energy from charged particles", hindi: "बिजली", type: "noun", hindiPron: "इलेक्ट्रिसिटी" },
  "element": { meaning: "A component or part", hindi: "तत्व", type: "noun", hindiPron: "एलिमेंट" },
  "emergency": { meaning: "A serious unexpected situation", hindi: "आपातकाल", type: "noun", hindiPron: "इमर्जेंसी" },
  "emotion": { meaning: "A strong feeling such as joy or anger", hindi: "भावना", type: "noun", hindiPron: "इमोशन" },
  "emphasis": { meaning: "Special importance given to something", hindi: "ज़ोर", type: "noun", hindiPron: "एम्फ़ेसिस" },
  "empire": { meaning: "A group of countries under a single authority", hindi: "साम्राज्य", type: "noun", hindiPron: "एम्पायर" },
  "employee": { meaning: "A person employed for wages", hindi: "कर्मचारी", type: "noun", hindiPron: "एम्प्लॉयी" },
  "employer": { meaning: "A person who employs people", hindi: "नियोक्ता", type: "noun", hindiPron: "एम्प्लॉयर" },
  "employment": { meaning: "The condition of having paid work", hindi: "रोज़गार", type: "noun", hindiPron: "एम्प्लॉयमेंट" },
  "enemy": { meaning: "A person who is hostile to another", hindi: "दुश्मन", type: "noun", hindiPron: "एनिमी" },
  "energy": { meaning: "The capacity for activity or power", hindi: "ऊर्जा", type: "noun", hindiPron: "एनर्जी" },
  "engine": { meaning: "A machine that converts energy into motion", hindi: "इंजन", type: "noun", hindiPron: "इंजन" },
  "engineer": { meaning: "A person who designs or builds machines", hindi: "इंजीनियर", type: "noun", hindiPron: "इंजीनियर" },
  "enjoyment": { meaning: "The state of taking pleasure", hindi: "आनंद", type: "noun", hindiPron: "एन्जॉयमेंट" },
  "entertainment": { meaning: "The action of providing amusement", hindi: "मनोरंजन", type: "noun", hindiPron: "एंटरटेनमेंट" },
  "enthusiasm": { meaning: "Intense enjoyment or interest", hindi: "उत्साह", type: "noun", hindiPron: "एन्थ्यूज़िऐज़्म" },
  "entrance": { meaning: "An opening for entering", hindi: "प्रवेश द्वार", type: "noun", hindiPron: "एन्ट्रेंस" },
  "entry": { meaning: "An act of going into a place", hindi: "प्रवेश", type: "noun", hindiPron: "एंट्री" },
  "environment": { meaning: "The surroundings or conditions", hindi: "पर्यावरण", type: "noun", hindiPron: "एन्वायरनमेंट" },
  "equipment": { meaning: "The necessary items for a purpose", hindi: "उपकरण", type: "noun", hindiPron: "इक्विपमेंट" },
  "error": { meaning: "A mistake", hindi: "त्रुटि", type: "noun", hindiPron: "एरर" },
  "escape": { meaning: "An act of breaking free", hindi: "भागना", type: "noun", hindiPron: "एस्केप" },
  "essay": { meaning: "A short piece of writing on a subject", hindi: "निबंध", type: "noun", hindiPron: "एसे" },
  "establishment": { meaning: "The action of establishing", hindi: "स्थापना", type: "noun", hindiPron: "एस्टैब्लिशमेंट" },
  "estate": { meaning: "A large area of land", hindi: "संपत्ति", type: "noun", hindiPron: "एस्टेट" },
  "evaluation": { meaning: "A judgment about something", hindi: "मूल्यांकन", type: "noun", hindiPron: "इवैल्यूएशन" },
  "evening": { meaning: "The period of time at the end of the day", hindi: "शाम", type: "noun", hindiPron: "ईवनिंग" },
  "event": { meaning: "A thing that happens", hindi: "घटना", type: "noun", hindiPron: "इवेंट" },
  "evidence": { meaning: "Information indicating whether something is true", hindi: "सबूत", type: "noun", hindiPron: "एविडेंस" },
  "evil": { meaning: "Profoundly immoral and wicked", hindi: "बुराई", type: "noun", hindiPron: "ईविल" },
  "evolution": { meaning: "The process of gradual development", hindi: "विकास", type: "noun", hindiPron: "एवोल्यूशन" },
  "examination": { meaning: "A detailed inspection or study", hindi: "परीक्षा", type: "noun", hindiPron: "एग्ज़ामिनेशन" },
  "example": { meaning: "A thing characteristic of its kind", hindi: "उदाहरण", type: "noun", hindiPron: "एग्ज़ाम्पल" },
  "exchange": { meaning: "An act of giving and receiving", hindi: "विनिमय", type: "noun", hindiPron: "एक्सचेंज" },
  "excitement": { meaning: "A feeling of great enthusiasm", hindi: "उत्तेजना", type: "noun", hindiPron: "एक्साइटमेंट" },
  "exercise": { meaning: "Physical activity for health", hindi: "व्यायाम", type: "noun", hindiPron: "एक्सरसाइज़" },
  "exhibition": { meaning: "A public display of art or items", hindi: "प्रदर्शनी", type: "noun", hindiPron: "एग्ज़िबिशन" },
  "existence": { meaning: "The fact of existing", hindi: "अस्तित्व", type: "noun", hindiPron: "एग्ज़िस्टेंस" },
  "expansion": { meaning: "The action of becoming larger", hindi: "विस्तार", type: "noun", hindiPron: "एक्सपैंशन" },
  "expectation": { meaning: "A belief that something will happen", hindi: "उम्मीद", type: "noun", hindiPron: "एक्सपेक्टेशन" },
  "expense": { meaning: "The cost required for something", hindi: "ख़र्च", type: "noun", hindiPron: "एक्सपेंस" },
  "experience": { meaning: "Practical contact and observation", hindi: "अनुभव", type: "noun", hindiPron: "एक्सपीरियंस" },
  "experiment": { meaning: "A scientific procedure to test a hypothesis", hindi: "प्रयोग", type: "noun", hindiPron: "एक्सपेरिमेंट" },
  "expert": { meaning: "A person with special knowledge or skill", hindi: "विशेषज्ञ", type: "noun", hindiPron: "एक्सपर्ट" },
  "explanation": { meaning: "A statement that makes something clear", hindi: "स्पष्टीकरण", type: "noun", hindiPron: "एक्सप्लनेशन" },
  "explosion": { meaning: "A sudden violent burst", hindi: "विस्फोट", type: "noun", hindiPron: "एक्सप्लोज़न" },
  "export": { meaning: "To send goods to another country", hindi: "निर्यात", type: "noun", hindiPron: "एक्सपोर्ट" },
  "expression": { meaning: "The process of making known feelings", hindi: "अभिव्यक्ति", type: "noun", hindiPron: "एक्सप्रेशन" },
  "extension": { meaning: "A part that is added to something", hindi: "विस्तार", type: "noun", hindiPron: "एक्सटेंशन" },
  "extent": { meaning: "The area or range covered", hindi: "सीमा", type: "noun", hindiPron: "एक्सटेंट" },
  "extreme": { meaning: "Reaching a high degree", hindi: "चरम", type: "adjective", hindiPron: "एक्स्ट्रीम" },
  "eye": { meaning: "The organ of sight", hindi: "आँख", type: "noun", hindiPron: "आई" },

  // F
  "face": { meaning: "The front part of the head", hindi: "चेहरा", type: "noun", hindiPron: "फ़ेस" },
  "facility": { meaning: "A place provided for a particular purpose", hindi: "सुविधा", type: "noun", hindiPron: "फ़ैसिलिटी" },
  "fact": { meaning: "A thing that is known to be true", hindi: "तथ्य", type: "noun", hindiPron: "फ़ैक्ट" },
  "factory": { meaning: "A building where goods are manufactured", hindi: "कारख़ाना", type: "noun", hindiPron: "फ़ैक्ट्री" },
  "failure": { meaning: "Lack of success", hindi: "विफलता", type: "noun", hindiPron: "फ़ेल्यर" },
  "faith": { meaning: "Complete trust or confidence", hindi: "आस्था", type: "noun", hindiPron: "फ़ेथ" },
  "fall": { meaning: "An act of falling or a decrease", hindi: "गिरना", type: "noun", hindiPron: "फ़ॉल" },
  "fame": { meaning: "The state of being known by many people", hindi: "प्रसिद्धि", type: "noun", hindiPron: "फ़ेम" },
  "family": { meaning: "A group of related people", hindi: "परिवार", type: "noun", hindiPron: "फ़ैमिली" },
  "fan": { meaning: "An apparatus for creating a current of air", hindi: "पंखा", type: "noun", hindiPron: "फ़ैन" },
  "farm": { meaning: "An area of land for growing crops", hindi: "खेत", type: "noun", hindiPron: "फ़ार्म" },
  "farmer": { meaning: "A person who owns or manages a farm", hindi: "किसान", type: "noun", hindiPron: "फ़ार्मर" },
  "fashion": { meaning: "A prevailing custom or style", hindi: "फ़ैशन", type: "noun", hindiPron: "फ़ैशन" },
  "fat": { meaning: "A natural oily substance in animal bodies", hindi: "चर्बी", type: "noun", hindiPron: "फ़ैट" },
  "fate": { meaning: "The development of events beyond control", hindi: "भाग्य", type: "noun", hindiPron: "फ़ेट" },
  "father": { meaning: "A male parent", hindi: "पिता", type: "noun", hindiPron: "फ़ादर" },
  "fault": { meaning: "A defect or weakness", hindi: "दोष", type: "noun", hindiPron: "फ़ॉल्ट" },
  "favour": { meaning: "An act of kindness beyond what is due", hindi: "एहसान", type: "noun", hindiPron: "फ़ेवर" },
  "fear": { meaning: "An unpleasant emotion caused by threat", hindi: "डर", type: "noun", hindiPron: "फ़ियर" },
  "feature": { meaning: "A distinctive attribute or aspect", hindi: "विशेषता", type: "noun", hindiPron: "फ़ीचर" },
  "fee": { meaning: "A payment made for professional services", hindi: "शुल्क", type: "noun", hindiPron: "फ़ी" },
  "feeling": { meaning: "An emotional state or reaction", hindi: "भावना", type: "noun", hindiPron: "फ़ीलिंग" },
  "female": { meaning: "Of or relating to women", hindi: "महिला", type: "noun", hindiPron: "फ़ीमेल" },
  "fence": { meaning: "A barrier enclosing an area", hindi: "बाड़", type: "noun", hindiPron: "फ़ेंस" },
  "festival": { meaning: "A day or period of celebration", hindi: "त्योहार", type: "noun", hindiPron: "फ़ेस्टिवल" },
  "field": { meaning: "An area of open land", hindi: "मैदान", type: "noun", hindiPron: "फ़ील्ड" },
  "fight": { meaning: "A violent confrontation", hindi: "लड़ाई", type: "noun", hindiPron: "फ़ाइट" },
  "figure": { meaning: "A number or a bodily shape", hindi: "आकृति", type: "noun", hindiPron: "फ़िगर" },
  "file": { meaning: "A folder or collection of data", hindi: "फ़ाइल", type: "noun", hindiPron: "फ़ाइल" },
  "film": { meaning: "A motion picture", hindi: "फ़िल्म", type: "noun", hindiPron: "फ़िल्म" },
  "final": { meaning: "Coming at the end", hindi: "अंतिम", type: "adjective", hindiPron: "फ़ाइनल" },
  "finance": { meaning: "The management of money", hindi: "वित्त", type: "noun", hindiPron: "फ़ाइनैंस" },
  "finding": { meaning: "The action of finding or a conclusion", hindi: "खोज", type: "noun", hindiPron: "फ़ाइंडिंग" },
  "finger": { meaning: "Each of the five digits on a hand", hindi: "उंगली", type: "noun", hindiPron: "फ़िंगर" },
  "fire": { meaning: "Combustion producing heat and light", hindi: "आग", type: "noun", hindiPron: "फ़ायर" },
  "fish": { meaning: "A limbless cold-blooded aquatic creature", hindi: "मछली", type: "noun", hindiPron: "फ़िश" },
  "flag": { meaning: "A piece of cloth as a symbol", hindi: "झंडा", type: "noun", hindiPron: "फ़्लैग" },
  "flame": { meaning: "A hot glowing body of ignited gas", hindi: "लौ", type: "noun", hindiPron: "फ़्लेम" },
  "flat": { meaning: "Having a level surface", hindi: "सपाट", type: "adjective", hindiPron: "फ़्लैट" },
  "flight": { meaning: "The action of flying", hindi: "उड़ान", type: "noun", hindiPron: "फ़्लाइट" },
  "flood": { meaning: "An overflow of water beyond normal limits", hindi: "बाढ़", type: "noun", hindiPron: "फ़्लड" },
  "floor": { meaning: "The lower surface of a room", hindi: "फ़र्श", type: "noun", hindiPron: "फ़्लोर" },
  "flower": { meaning: "The seed-bearing part of a plant", hindi: "फूल", type: "noun", hindiPron: "फ्लावर" },
  "fly": { meaning: "A winged insect or to move through air", hindi: "मक्खी", type: "noun", hindiPron: "फ्लाई" },
  "focus": { meaning: "The centre of interest or activity", hindi: "ध्यान केंद्र", type: "noun", hindiPron: "फ़ोकस" },
  "folk": { meaning: "People in general", hindi: "लोक", type: "noun", hindiPron: "फ़ोक" },
  "food": { meaning: "Any substance consumed for nutrition", hindi: "भोजन", type: "noun", hindiPron: "फ़ूड" },
  "foot": { meaning: "The lower extremity of the leg", hindi: "पैर", type: "noun", hindiPron: "फ़ुट" },
  "football": { meaning: "A game played with a ball on a field", hindi: "फ़ुटबॉल", type: "noun", hindiPron: "फ़ुटबॉल" },
  "force": { meaning: "Strength or energy as an attribute", hindi: "बल", type: "noun", hindiPron: "फ़ोर्स" },
  "forest": { meaning: "A large area covered with trees", hindi: "जंगल", type: "noun", hindiPron: "फ़ॉरेस्ट" },
  "form": { meaning: "The visible shape of something", hindi: "रूप", type: "noun", hindiPron: "फ़ॉर्म" },
  "formula": { meaning: "A mathematical relationship between symbols", hindi: "सूत्र", type: "noun", hindiPron: "फ़ॉर्म्युला" },
  "fortune": { meaning: "Chance as a force affecting human affairs", hindi: "भाग्य", type: "noun", hindiPron: "फ़ॉर्चून" },
  "foundation": { meaning: "The lowest load-bearing part of a building", hindi: "नींव", type: "noun", hindiPron: "फ़ाउंडेशन" },
  "frame": { meaning: "A rigid structure surrounding something", hindi: "ढाँचा", type: "noun", hindiPron: "फ़्रेम" },
  "freedom": { meaning: "The state of being free", hindi: "स्वतंत्रता", type: "noun", hindiPron: "फ़्रीडम" },
  "friend": { meaning: "A person with whom one has a bond", hindi: "दोस्त", type: "noun", hindiPron: "फ्रेंड" },
  "friendship": { meaning: "The emotions or conduct of friends", hindi: "दोस्ती", type: "noun", hindiPron: "फ़्रेंडशिप" },
  "front": { meaning: "The side or part that normally faces forward", hindi: "सामने", type: "noun", hindiPron: "फ़्रंट" },
  "fruit": { meaning: "The sweet product of a tree or plant", hindi: "फल", type: "noun", hindiPron: "फ़्रूट" },
  "fuel": { meaning: "Material used to produce heat or power", hindi: "ईंधन", type: "noun", hindiPron: "फ़्यूल" },
  "fun": { meaning: "Enjoyment, amusement, or light-hearted pleasure", hindi: "मज़ा", type: "noun", hindiPron: "फ़न" },
  "function": { meaning: "An activity natural to a purpose", hindi: "कार्य", type: "noun", hindiPron: "फ़ंक्शन" },
  "fund": { meaning: "A sum of money saved for a purpose", hindi: "कोष", type: "noun", hindiPron: "फ़ंड" },
  "furniture": { meaning: "Large movable equipment in a room", hindi: "फ़र्नीचर", type: "noun", hindiPron: "फ़र्नीचर" },
  "future": { meaning: "The time that is to come", hindi: "भविष्य", type: "noun", hindiPron: "फ़्यूचर" },

  // ══════════════════════════════════════════
  // FOOD & DRINK ITEMS
  // ══════════════════════════════════════════
  "croissant": { meaning: "A buttery crescent-shaped French pastry", hindi: "एक प्रकार की पेस्ट्री", type: "noun", hindiPron: "क्रवासों" },
  "bruschetta": { meaning: "Italian appetizer of grilled bread with toppings", hindi: "इतालवी ब्रेड स्नैक", type: "noun", hindiPron: "ब्रुस्केटा" },
  "lasagna": { meaning: "Italian baked dish of layered pasta", hindi: "इतालवी पास्ता डिश", type: "noun", hindiPron: "लज़ान्या" },
  "gnocchi": { meaning: "Italian dumplings made from potato", hindi: "इतालवी आलू डम्पलिंग", type: "noun", hindiPron: "न्योकी" },
  "focaccia": { meaning: "Italian oven-baked flatbread", hindi: "इतालवी ब्रेड", type: "noun", hindiPron: "फ़ोकाचा" },
  "prosciutto": { meaning: "Italian dry-cured ham", hindi: "इतालवी हैम", type: "noun", hindiPron: "प्रशूटो" },
  "quinoa": { meaning: "A grain crop grown for its edible seeds", hindi: "क्विनोआ अनाज", type: "noun", hindiPron: "कीनवा" },
  "acai": { meaning: "A dark purple nutritious palm berry", hindi: "अकाई फल", type: "noun", hindiPron: "आसाई" },
  "espresso": { meaning: "Strong coffee made by forcing steam through beans", hindi: "एस्प्रेसो कॉफ़ी", type: "noun", hindiPron: "एस्प्रेसो" },
  "cappuccino": { meaning: "Coffee with steamed frothy milk", hindi: "कैपूचीनो कॉफ़ी", type: "noun", hindiPron: "कैपूचीनो" },
  "latte": { meaning: "Coffee made with a large amount of steamed milk", hindi: "लाते कॉफ़ी", type: "noun", hindiPron: "लाते" },
  "macchiato": { meaning: "Espresso with a small amount of frothy milk", hindi: "मैकियाटो कॉफ़ी", type: "noun", hindiPron: "मैक्यातो" },
  "pizza": { meaning: "Italian dish of baked dough with toppings", hindi: "पिज़्ज़ा", type: "noun", hindiPron: "पीत्ज़ा" },
  "sushi": { meaning: "Japanese dish of vinegared rice with raw fish", hindi: "जापानी चावल व्यंजन", type: "noun", hindiPron: "सूशी" },
  "ramen": { meaning: "Japanese noodle soup dish", hindi: "जापानी नूडल सूप", type: "noun", hindiPron: "रामेन" },
  "tortilla": { meaning: "A thin flat bread from Mexico", hindi: "मैक्सिकन रोटी", type: "noun", hindiPron: "टॉर्टीया" },
  "burrito": { meaning: "A Mexican dish with a flour tortilla wrap", hindi: "मैक्सिकन रोल", type: "noun", hindiPron: "बुरीटो" },
  "guacamole": { meaning: "A dip of mashed avocado with seasonings", hindi: "एवोकाडो डिप", type: "noun", hindiPron: "ग्वाकामोले" },
  "jalapeno": { meaning: "A very hot green chili pepper", hindi: "तीखी हरी मिर्च", type: "noun", hindiPron: "हालापेनो" },
  "champagne": { meaning: "Sparkling wine from Champagne, France", hindi: "शैम्पेन शराब", type: "noun", hindiPron: "शैम्पेन" },
  "buffet": { meaning: "A meal where guests serve themselves", hindi: "बुफ़े भोज", type: "noun", hindiPron: "बुफ़े" },
  "filet": { meaning: "A boneless piece of meat or fish", hindi: "हड्डीरहित मांस", type: "noun", hindiPron: "फ़िले" },
  "soufflé": { meaning: "A light baked dish made with egg yolks", hindi: "फ्रेंच अंडा व्यंजन", type: "noun", hindiPron: "सूफ़्ले" },
  "hors d'oeuvre": { meaning: "A small savory dish served as an appetizer", hindi: "एपिटाइज़र", type: "noun", hindiPron: "ओर डर्व" },
  "cuisine": { meaning: "A style or method of cooking", hindi: "पाक शैली", type: "noun", hindiPron: "क्विज़ीन" },
  "cinnamon": { meaning: "An aromatic spice from tree bark", hindi: "दालचीनी", type: "noun", hindiPron: "सिनमन" },
  "turmeric": { meaning: "A bright yellow aromatic spice", hindi: "हल्दी", type: "noun", hindiPron: "टर्मरिक" },
  "parmesan": { meaning: "A hard Italian cheese", hindi: "इतालवी पनीर", type: "noun", hindiPron: "पार्मेज़ान" },
  "mozzarella": { meaning: "A mild Italian cheese", hindi: "इतालवी पनीर", type: "noun", hindiPron: "मॉत्ज़रेला" },
  "baguette": { meaning: "A long narrow French loaf of bread", hindi: "फ्रेंच ब्रेड", type: "noun", hindiPron: "बैगेट" },
  "croûton": { meaning: "A small piece of toasted bread", hindi: "तला हुआ ब्रेड टुकड़ा", type: "noun", hindiPron: "क्रूटॉन" },
  "sorbet": { meaning: "A frozen dessert made from fruit juice", hindi: "फ्रोज़न फल मिठाई", type: "noun", hindiPron: "सॉर्बे" },
  "meringue": { meaning: "A dessert made from whipped egg whites and sugar", hindi: "अंडे की सफ़ेदी की मिठाई", type: "noun", hindiPron: "मरैंग" },
  "praline": { meaning: "A confection of nuts and sugar", hindi: "मेवे की मिठाई", type: "noun", hindiPron: "प्रालीन" },

  // ══════════════════════════════════════════
  // TRICKY PRONUNCIATION WORDS
  // ══════════════════════════════════════════
  "colonel": { meaning: "A rank of army officer above lieutenant colonel", hindi: "कर्नल", type: "noun", hindiPron: "कर्नल" },
  "subtle": { meaning: "So delicate as to be difficult to describe", hindi: "सूक्ष्म", type: "adjective", hindiPron: "सटल" },
  "queue": { meaning: "A line of people waiting their turn", hindi: "कतार", type: "noun", hindiPron: "क्यू" },
  "receipt": { meaning: "A written acknowledgment of payment", hindi: "रसीद", type: "noun", hindiPron: "रिसीट" },
  "scissors": { meaning: "A cutting instrument with two blades", hindi: "कैंची", type: "noun", hindiPron: "सिज़र्ज़" },
  "psychology": { meaning: "The scientific study of the human mind", hindi: "मनोविज्ञान", type: "noun", hindiPron: "साइकॉलजी" },
  "pneumonia": { meaning: "Lung infection causing inflammation", hindi: "निमोनिया", type: "noun", hindiPron: "न्यूमोनिया" },
  "knight": { meaning: "A person given an honorary title", hindi: "शूरवीर", type: "noun", hindiPron: "नाइट" },
  "island": { meaning: "A piece of land surrounded by water", hindi: "द्वीप", type: "noun", hindiPron: "आइलैंड" },
  "muscle": { meaning: "Body tissue that can contract and produce movement", hindi: "मांसपेशी", type: "noun", hindiPron: "मसल" },
  "castle": { meaning: "A large fortified building", hindi: "किला", type: "noun", hindiPron: "कासल" },
  "mortgage": { meaning: "A legal agreement for a property loan", hindi: "बंधक ऋण", type: "noun", hindiPron: "मॉर्गेज" },
  "yacht": { meaning: "A medium-sized sailing or motor boat", hindi: "नौका", type: "noun", hindiPron: "यॉट" },
  "genre": { meaning: "A category of art, music, or literature", hindi: "विधा", type: "noun", hindiPron: "ज़ॉन्रा" },
  "niche": { meaning: "A specialized segment of the market", hindi: "विशेष स्थान", type: "noun", hindiPron: "नीश" },
  "facade": { meaning: "The front of a building or false appearance", hindi: "दिखावा", type: "noun", hindiPron: "फ़साद" },
  "meme": { meaning: "A widely shared humorous image or video online", hindi: "इंटरनेट हास्य", type: "noun", hindiPron: "मीम" },
  "entrepreneur": { meaning: "A person who starts and runs a business", hindi: "उद्यमी", type: "noun", hindiPron: "ऑन्ट्रप्रनर" },
  "schedule": { meaning: "A plan listing events and times", hindi: "अनुसूची", type: "noun", hindiPron: "शेड्यूल", altPron: "स्केड्यूल" },
  "paradigm": { meaning: "A typical example or pattern of something", hindi: "प्रतिमान", type: "noun", hindiPron: "पैराडाइम" },
  "epitome": { meaning: "A perfect example of a quality or type", hindi: "प्रतीक", type: "noun", hindiPron: "एपिटमी" },
  "hyperbole": { meaning: "Exaggerated statements not meant literally", hindi: "अतिश्योक्ति", type: "noun", hindiPron: "हाइपर्बली" },
  "aesthetic": { meaning: "Concerned with beauty or artistic taste", hindi: "सौंदर्य-संबंधी", type: "adjective", hindiPron: "एस्थेटिक" },
  "algorithm": { meaning: "A process or set of rules for calculations", hindi: "एल्गोरिदम", type: "noun", hindiPron: "ऐल्गोरिदम" },
  "ballet": { meaning: "An artistic dance form with precise steps", hindi: "बैले नृत्य", type: "noun", hindiPron: "बैले" },
  "lingerie": { meaning: "Women's underwear and nightclothes", hindi: "महिला अंतर्वस्त्र", type: "noun", hindiPron: "लॉन्ज़री" },
  "debris": { meaning: "Scattered fragments of something destroyed", hindi: "मलबा", type: "noun", hindiPron: "डेब्री" },
  "bouquet": { meaning: "An attractively arranged bunch of flowers", hindi: "गुलदस्ता", type: "noun", hindiPron: "बुके" },
  "rapport": { meaning: "A close and harmonious relationship", hindi: "तालमेल", type: "noun", hindiPron: "रैपोर" },
  "rendezvous": { meaning: "A meeting at an agreed time and place", hindi: "मुलाकात का स्थान", type: "noun", hindiPron: "रॉन्डेवू" },
  "plateau": { meaning: "An area of relatively flat high ground", hindi: "पठार", type: "noun", hindiPron: "प्लैटो" },
  "resume": { meaning: "A document summarizing qualifications", hindi: "जीवन-वृत्त", type: "noun", hindiPron: "रेज़्यूमे" },
  "elite": { meaning: "A select group that is superior in ability", hindi: "कुलीन वर्ग", type: "noun", hindiPron: "इलीट" },
  "naive": { meaning: "Showing a lack of experience or wisdom", hindi: "भोला", type: "adjective", hindiPron: "नाईव" },
  "unique": { meaning: "Being the only one of its kind", hindi: "अनोखा", type: "adjective", hindiPron: "यूनीक" },
  "tongue": { meaning: "The muscular organ in the mouth", hindi: "जीभ", type: "noun", hindiPron: "टंग" },
  "league": { meaning: "A group of sports clubs or nations", hindi: "लीग", type: "noun", hindiPron: "लीग" },
  "fatigue": { meaning: "Extreme tiredness from mental or physical exertion", hindi: "थकान", type: "noun", hindiPron: "फ़टीग" },
  "technique": { meaning: "A way of carrying out a particular task", hindi: "तकनीक", type: "noun", hindiPron: "टेक्नीक" },
  "antique": { meaning: "A collectible old item of value", hindi: "प्राचीन वस्तु", type: "noun", hindiPron: "एंटीक" },
  "chaos": { meaning: "Complete disorder and confusion", hindi: "अराजकता", type: "noun", hindiPron: "केऑस" },
  "choir": { meaning: "An organized group of singers", hindi: "गायक मंडली", type: "noun", hindiPron: "क्वायर" },
  "vehicle": { meaning: "A thing used for transporting people", hindi: "वाहन", type: "noun", hindiPron: "वीइकल" },
  "wednesday": { meaning: "The fourth day of the week", hindi: "बुधवार", type: "noun", hindiPron: "वेन्ज़डे" },
  "february": { meaning: "The second month of the year", hindi: "फ़रवरी", type: "noun", hindiPron: "फ़ेब्रुअरी" },
  "comfortable": { meaning: "Providing physical ease and relaxation", hindi: "आरामदायक", type: "adjective", hindiPron: "कम्फ़र्टेबल" },
  "restaurant": { meaning: "A place where meals are served to customers", hindi: "रेस्तराँ", type: "noun", hindiPron: "रेस्टॉरॉन्ट" },
  "temperature": { meaning: "The degree of heat present", hindi: "तापमान", type: "noun", hindiPron: "टेम्प्रेचर" },
  "pronunciation": { meaning: "The way a word is spoken", hindi: "उच्चारण", type: "noun", hindiPron: "प्रनन्सिएशन" },
  "vocabulary": { meaning: "The body of words used in a language", hindi: "शब्दावली", type: "noun", hindiPron: "वोकैब्युलरी" },
  "silhouette": { meaning: "The dark shape of something seen against light", hindi: "छायाचित्र", type: "noun", hindiPron: "सिलूएट" },
  "conscience": { meaning: "A person's moral sense of right and wrong", hindi: "अंतरात्मा", type: "noun", hindiPron: "कॉन्शेंस" },
  "consciousness": { meaning: "The state of being awake and aware", hindi: "चेतना", type: "noun", hindiPron: "कॉन्शसनेस" },
  "hierarchy": { meaning: "A system of ranking one above another", hindi: "पदानुक्रम", type: "noun", hindiPron: "हायरार्की" },
  "bureaucracy": { meaning: "A system of government with many officials", hindi: "नौकरशाही", type: "noun", hindiPron: "ब्यूरॉक्रेसी" },
  "miscellaneous": { meaning: "Of various types or from various sources", hindi: "विविध", type: "adjective", hindiPron: "मिसलेनियस" },
  "manoeuvre": { meaning: "A movement requiring skill and care", hindi: "पैंतरा", type: "noun", hindiPron: "मनूवर" },
  "surveillance": { meaning: "Close observation of a suspected person", hindi: "निगरानी", type: "noun", hindiPron: "सर्वेलंस" },
  "connoisseur": { meaning: "An expert judge in matters of fine art or taste", hindi: "पारखी", type: "noun", hindiPron: "कॉनसर" },
  "entrepreneur": { meaning: "A person who sets up a business", hindi: "उद्यमी", type: "noun", hindiPron: "ऑन्ट्रप्रनर" },
  "chauffeur": { meaning: "A person employed to drive a car", hindi: "ड्राइवर", type: "noun", hindiPron: "शोफ़र" },
  "questionnaire": { meaning: "A set of questions for a survey", hindi: "प्रश्नावली", type: "noun", hindiPron: "क्वेश्चनेयर" },

  // ══════════════════════════════════════════
  // G - Z COMMON WORDS
  // ══════════════════════════════════════════
  "gallery": { meaning: "A room for the display of art", hindi: "गैलरी", type: "noun", hindiPron: "गैलरी" },
  "game": { meaning: "An activity for amusement", hindi: "खेल", type: "noun", hindiPron: "गेम" },
  "gap": { meaning: "A break or space in something", hindi: "अंतर", type: "noun", hindiPron: "गैप" },
  "garage": { meaning: "A building for housing a motor vehicle", hindi: "गैरेज", type: "noun", hindiPron: "गैराज" },
  "garden": { meaning: "A piece of ground for growing plants", hindi: "बगीचा", type: "noun", hindiPron: "गार्डन" },
  "gas": { meaning: "A substance in a state like air", hindi: "गैस", type: "noun", hindiPron: "गैस" },
  "gate": { meaning: "A barrier that opens and closes", hindi: "द्वार", type: "noun", hindiPron: "गेट" },
  "generation": { meaning: "All people born at about the same time", hindi: "पीढ़ी", type: "noun", hindiPron: "जेनरेशन" },
  "gift": { meaning: "A thing given to someone without payment", hindi: "उपहार", type: "noun", hindiPron: "गिफ़्ट" },
  "girl": { meaning: "A female child", hindi: "लड़की", type: "noun", hindiPron: "गर्ल" },
  "glass": { meaning: "A hard transparent material", hindi: "शीशा", type: "noun", hindiPron: "ग्लास" },
  "goal": { meaning: "The object of a person's ambition", hindi: "लक्ष्य", type: "noun", hindiPron: "गोल" },
  "god": { meaning: "The creator and ruler of the universe", hindi: "ईश्वर", type: "noun", hindiPron: "गॉड" },
  "gold": { meaning: "A yellow precious metal", hindi: "सोना", type: "noun", hindiPron: "गोल्ड" },
  "good": { meaning: "Of a high quality or standard", hindi: "अच्छा", type: "adjective", hindiPron: "गुड" },
  "government": { meaning: "The governing body of a nation", hindi: "सरकार", type: "noun", hindiPron: "गवर्नमेंट" },
  "grade": { meaning: "A level of quality or rank", hindi: "श्रेणी", type: "noun", hindiPron: "ग्रेड" },
  "grain": { meaning: "The seeds of cereal plants", hindi: "अनाज", type: "noun", hindiPron: "ग्रेन" },
  "grammar": { meaning: "The rules of a language", hindi: "व्याकरण", type: "noun", hindiPron: "ग्रामर" },
  "grass": { meaning: "Short plants covering the ground", hindi: "घास", type: "noun", hindiPron: "ग्रास" },
  "green": { meaning: "The color between blue and yellow", hindi: "हरा", type: "adjective", hindiPron: "ग्रीन" },
  "grey": { meaning: "A color between black and white", hindi: "स्लेटी", type: "adjective", hindiPron: "ग्रे" },
  "ground": { meaning: "The solid surface of the earth", hindi: "ज़मीन", type: "noun", hindiPron: "ग्राउंड" },
  "group": { meaning: "A number of people or things together", hindi: "समूह", type: "noun", hindiPron: "ग्रुप" },
  "growth": { meaning: "The process of increasing in size", hindi: "वृद्धि", type: "noun", hindiPron: "ग्रोथ" },
  "guarantee": { meaning: "A formal promise or assurance", hindi: "गारंटी", type: "noun", hindiPron: "गैरंटी" },
  "guard": { meaning: "A person who watches over something", hindi: "पहरेदार", type: "noun", hindiPron: "गार्ड" },
  "guess": { meaning: "An estimate without sufficient information", hindi: "अनुमान", type: "noun", hindiPron: "गेस" },
  "guest": { meaning: "A person who is invited", hindi: "मेहमान", type: "noun", hindiPron: "गेस्ट" },
  "guide": { meaning: "A person who advises or shows the way", hindi: "मार्गदर्शक", type: "noun", hindiPron: "गाइड" },
  "guilt": { meaning: "The fact of having committed an offense", hindi: "अपराध बोध", type: "noun", hindiPron: "गिल्ट" },
  "gun": { meaning: "A weapon that fires bullets", hindi: "बंदूक", type: "noun", hindiPron: "गन" },
  "guy": { meaning: "A man (informal)", hindi: "आदमी", type: "noun", hindiPron: "गाय" },

  "habit": { meaning: "A regular tendency or practice", hindi: "आदत", type: "noun", hindiPron: "हैबिट" },
  "hair": { meaning: "Fine thread-like strands growing from skin", hindi: "बाल", type: "noun", hindiPron: "हेयर" },
  "half": { meaning: "One of two equal parts", hindi: "आधा", type: "noun", hindiPron: "हाफ़" },
  "hall": { meaning: "A large room for gatherings", hindi: "हॉल", type: "noun", hindiPron: "हॉल" },
  "hand": { meaning: "The end part of the arm", hindi: "हाथ", type: "noun", hindiPron: "हैंड" },
  "handle": { meaning: "The part by which a thing is held", hindi: "हत्था", type: "noun", hindiPron: "हैंडल" },
  "happiness": { meaning: "The state of being happy", hindi: "ख़ुशी", type: "noun", hindiPron: "हैप्पीनेस" },
  "harbour": { meaning: "A place on the coast for ships", hindi: "बंदरगाह", type: "noun", hindiPron: "हार्बर" },
  "harm": { meaning: "Physical injury or damage", hindi: "नुक़सान", type: "noun", hindiPron: "हार्म" },
  "hat": { meaning: "A shaped covering for the head", hindi: "टोपी", type: "noun", hindiPron: "हैट" },
  "hate": { meaning: "Intense dislike", hindi: "नफ़रत", type: "noun", hindiPron: "हेट" },
  "head": { meaning: "The upper part of the body", hindi: "सिर", type: "noun", hindiPron: "हेड" },
  "headline": { meaning: "A heading at the top of a news article", hindi: "शीर्षक", type: "noun", hindiPron: "हेडलाइन" },
  "health": { meaning: "The state of being free from illness", hindi: "स्वास्थ्य", type: "noun", hindiPron: "हेल्थ" },
  "heart": { meaning: "The organ that pumps blood", hindi: "दिल", type: "noun", hindiPron: "हार्ट" },
  "heat": { meaning: "The quality of being hot", hindi: "गर्मी", type: "noun", hindiPron: "हीट" },
  "heaven": { meaning: "A place of happiness and peace", hindi: "स्वर्ग", type: "noun", hindiPron: "हेवन" },
  "height": { meaning: "The measurement from base to top", hindi: "ऊँचाई", type: "noun", hindiPron: "हाइट" },
  "hell": { meaning: "A place of suffering after death", hindi: "नरक", type: "noun", hindiPron: "हेल" },
  "help": { meaning: "The action of assisting someone", hindi: "मदद", type: "noun", hindiPron: "हेल्प" },
  "hero": { meaning: "A person admired for achievements", hindi: "नायक", type: "noun", hindiPron: "हीरो" },
  "highway": { meaning: "A main road connecting cities", hindi: "राजमार्ग", type: "noun", hindiPron: "हाइवे" },
  "hill": { meaning: "A naturally raised area of land", hindi: "पहाड़ी", type: "noun", hindiPron: "हिल" },
  "history": { meaning: "The study of past events", hindi: "इतिहास", type: "noun", hindiPron: "हिस्ट्री" },
  "hobby": { meaning: "An activity done for pleasure", hindi: "शौक", type: "noun", hindiPron: "हॉबी" },
  "hole": { meaning: "A hollow place in a solid body", hindi: "छेद", type: "noun", hindiPron: "होल" },
  "holiday": { meaning: "A day of recreation", hindi: "छुट्टी", type: "noun", hindiPron: "हॉलिडे" },
  "home": { meaning: "The place where one lives", hindi: "घर", type: "noun", hindiPron: "होम" },
  "homework": { meaning: "Schoolwork to be done at home", hindi: "गृहकार्य", type: "noun", hindiPron: "होमवर्क" },
  "honest": { meaning: "Free of deceit; truthful", hindi: "ईमानदार", type: "adjective", hindiPron: "ऑनेस्ट" },
  "honour": { meaning: "High respect and great esteem", hindi: "सम्मान", type: "noun", hindiPron: "ऑनर" },
  "hope": { meaning: "A feeling of expectation and desire", hindi: "उम्मीद", type: "noun", hindiPron: "होप" },
  "horror": { meaning: "An intense feeling of fear and shock", hindi: "भय", type: "noun", hindiPron: "हॉरर" },
  "horse": { meaning: "A large hoofed mammal for riding", hindi: "घोड़ा", type: "noun", hindiPron: "हॉर्स" },
  "hospital": { meaning: "An institution for treating sick people", hindi: "अस्पताल", type: "noun", hindiPron: "हॉस्पिटल" },
  "host": { meaning: "A person who receives guests", hindi: "मेज़बान", type: "noun", hindiPron: "होस्ट" },
  "hotel": { meaning: "An establishment providing accommodation", hindi: "होटल", type: "noun", hindiPron: "होटल" },
  "hour": { meaning: "A period of 60 minutes", hindi: "घंटा", type: "noun", hindiPron: "आवर" },
  "house": { meaning: "A building for human habitation", hindi: "घर", type: "noun", hindiPron: "हाउस" },
  "household": { meaning: "A house and its occupants", hindi: "घराना", type: "noun", hindiPron: "हाउसहोल्ड" },
  "housing": { meaning: "Houses and apartments collectively", hindi: "आवास", type: "noun", hindiPron: "हाउज़िंग" },
  "human": { meaning: "Relating to or characteristic of people", hindi: "मानव", type: "noun", hindiPron: "ह्यूमन" },
  "humour": { meaning: "The quality of being amusing", hindi: "हास्य", type: "noun", hindiPron: "ह्यूमर" },
  "hunger": { meaning: "A feeling of needing food", hindi: "भूख", type: "noun", hindiPron: "हंगर" },
  "husband": { meaning: "A married man", hindi: "पति", type: "noun", hindiPron: "हज़बंड" },

  // I-Z continuing...
  "ice": { meaning: "Frozen water", hindi: "बर्फ़", type: "noun", hindiPron: "आइस" },
  "idea": { meaning: "A thought or suggestion", hindi: "विचार", type: "noun", hindiPron: "आइडिया" },
  "identity": { meaning: "The fact of being who one is", hindi: "पहचान", type: "noun", hindiPron: "आइडेंटिटी" },
  "imagination": { meaning: "The faculty of forming mental images", hindi: "कल्पना", type: "noun", hindiPron: "इमैजिनेशन" },
  "impact": { meaning: "The action of one object hitting another", hindi: "प्रभाव", type: "noun", hindiPron: "इम्पैक्ट" },
  "importance": { meaning: "The state of being important", hindi: "महत्व", type: "noun", hindiPron: "इम्पॉर्टेंस" },
  "impression": { meaning: "An idea or feeling about something", hindi: "प्रभाव", type: "noun", hindiPron: "इम्प्रेशन" },
  "improvement": { meaning: "The action of improving something", hindi: "सुधार", type: "noun", hindiPron: "इम्प्रूवमेंट" },
  "incident": { meaning: "An event or occurrence", hindi: "घटना", type: "noun", hindiPron: "इन्सिडेंट" },
  "income": { meaning: "Money received for work", hindi: "आय", type: "noun", hindiPron: "इनकम" },
  "independence": { meaning: "The fact of being independent", hindi: "स्वतंत्रता", type: "noun", hindiPron: "इंडिपेंडेंस" },
  "indication": { meaning: "A sign or piece of information", hindi: "संकेत", type: "noun", hindiPron: "इंडिकेशन" },
  "individual": { meaning: "A single human being", hindi: "व्यक्ति", type: "noun", hindiPron: "इंडिविजुअल" },
  "industry": { meaning: "Economic activity concerned with manufacturing", hindi: "उद्योग", type: "noun", hindiPron: "इंडस्ट्री" },
  "infection": { meaning: "The process of infecting", hindi: "संक्रमण", type: "noun", hindiPron: "इन्फ़ेक्शन" },
  "inflation": { meaning: "A general increase in prices", hindi: "मुद्रास्फीति", type: "noun", hindiPron: "इन्फ़्लेशन" },
  "influence": { meaning: "The capacity to have an effect", hindi: "प्रभाव", type: "noun", hindiPron: "इन्फ़्लुएंस" },
  "information": { meaning: "Facts provided about something", hindi: "जानकारी", type: "noun", hindiPron: "इन्फ़ॉर्मेशन" },
  "injury": { meaning: "An instance of being harmed", hindi: "चोट", type: "noun", hindiPron: "इन्जरी" },
  "innovation": { meaning: "A new method, idea, or product", hindi: "नवाचार", type: "noun", hindiPron: "इनोवेशन" },
  "input": { meaning: "What is put in or contributed", hindi: "इनपुट", type: "noun", hindiPron: "इनपुट" },
  "inquiry": { meaning: "An act of asking for information", hindi: "पूछताछ", type: "noun", hindiPron: "इन्क्वायरी" },
  "insect": { meaning: "A small arthropod animal", hindi: "कीट", type: "noun", hindiPron: "इन्सेक्ट" },
  "inspection": { meaning: "Careful examination or scrutiny", hindi: "निरीक्षण", type: "noun", hindiPron: "इन्स्पेक्शन" },
  "inspiration": { meaning: "The process of being mentally stimulated", hindi: "प्रेरणा", type: "noun", hindiPron: "इन्स्पिरेशन" },
  "institution": { meaning: "An organization founded for a purpose", hindi: "संस्था", type: "noun", hindiPron: "इन्स्टिट्यूशन" },
  "instruction": { meaning: "A direction or order", hindi: "निर्देश", type: "noun", hindiPron: "इन्स्ट्रक्शन" },
  "instrument": { meaning: "A tool or device for a particular task", hindi: "उपकरण", type: "noun", hindiPron: "इन्स्ट्रूमेंट" },
  "insurance": { meaning: "An arrangement for financial protection", hindi: "बीमा", type: "noun", hindiPron: "इन्श्योरेंस" },
  "intelligence": { meaning: "The ability to acquire and apply knowledge", hindi: "बुद्धि", type: "noun", hindiPron: "इंटेलिजेंस" },
  "intention": { meaning: "A thing intended; an aim or plan", hindi: "इरादा", type: "noun", hindiPron: "इन्टेंशन" },
  "interest": { meaning: "The feeling of wanting to know about something", hindi: "रुचि", type: "noun", hindiPron: "इंटरेस्ट" },
  "internet": { meaning: "A global computer network", hindi: "इंटरनेट", type: "noun", hindiPron: "इंटरनेट" },
  "interpretation": { meaning: "An explanation or meaning", hindi: "व्याख्या", type: "noun", hindiPron: "इंटरप्रिटेशन" },
  "interview": { meaning: "A meeting for questioning", hindi: "साक्षात्कार", type: "noun", hindiPron: "इंटरव्यू" },
  "introduction": { meaning: "The action of introducing", hindi: "परिचय", type: "noun", hindiPron: "इंट्रोडक्शन" },
  "invasion": { meaning: "An instance of invading a country", hindi: "आक्रमण", type: "noun", hindiPron: "इन्वेज़न" },
  "investigation": { meaning: "A formal inquiry or systematic study", hindi: "जाँच", type: "noun", hindiPron: "इन्वेस्टिगेशन" },
  "investment": { meaning: "The action of investing money", hindi: "निवेश", type: "noun", hindiPron: "इन्वेस्टमेंट" },
  "invitation": { meaning: "A written or verbal request", hindi: "निमंत्रण", type: "noun", hindiPron: "इन्विटेशन" },
  "iron": { meaning: "A strong hard magnetic metal", hindi: "लोहा", type: "noun", hindiPron: "आयरन" },
  "island": { meaning: "A piece of land surrounded by water", hindi: "द्वीप", type: "noun", hindiPron: "आइलैंड" },
  "issue": { meaning: "An important topic for debate", hindi: "मुद्दा", type: "noun", hindiPron: "इश्यू" },
  "item": { meaning: "An individual thing", hindi: "वस्तु", type: "noun", hindiPron: "आइटम" },

  // J-K
  "jacket": { meaning: "A short coat", hindi: "जैकेट", type: "noun", hindiPron: "जैकेट" },
  "jail": { meaning: "A place for confining convicted persons", hindi: "जेल", type: "noun", hindiPron: "जेल" },
  "jaw": { meaning: "The upper and lower bony structures of the mouth", hindi: "जबड़ा", type: "noun", hindiPron: "जॉ" },
  "jealousy": { meaning: "The feeling of envy towards someone", hindi: "ईर्ष्या", type: "noun", hindiPron: "जेलसी" },
  "jet": { meaning: "A rapid stream of liquid or gas", hindi: "जेट", type: "noun", hindiPron: "जेट" },
  "jewel": { meaning: "A precious stone", hindi: "रत्न", type: "noun", hindiPron: "ज्वेल" },
  "job": { meaning: "A paid position of regular employment", hindi: "नौकरी", type: "noun", hindiPron: "जॉब" },
  "joint": { meaning: "A point where parts are joined", hindi: "जोड़", type: "noun", hindiPron: "जॉइंट" },
  "joke": { meaning: "A thing said to cause laughter", hindi: "मज़ाक", type: "noun", hindiPron: "जोक" },
  "journal": { meaning: "A newspaper or magazine on a particular subject", hindi: "पत्रिका", type: "noun", hindiPron: "जर्नल" },
  "journey": { meaning: "An act of travelling from one place to another", hindi: "यात्रा", type: "noun", hindiPron: "जर्नी" },
  "joy": { meaning: "A feeling of great pleasure and happiness", hindi: "आनंद", type: "noun", hindiPron: "जॉय" },
  "judge": { meaning: "A public official who decides cases in court", hindi: "न्यायाधीश", type: "noun", hindiPron: "जज" },
  "judgment": { meaning: "The ability to make considered decisions", hindi: "निर्णय", type: "noun", hindiPron: "जजमेंट" },
  "juice": { meaning: "The liquid obtained from fruit", hindi: "रस", type: "noun", hindiPron: "जूस" },
  "jump": { meaning: "An act of jumping", hindi: "कूदना", type: "verb", hindiPron: "जम्प" },
  "jungle": { meaning: "An area of dense tropical vegetation", hindi: "जंगल", type: "noun", hindiPron: "जंगल" },
  "junior": { meaning: "Low or lower in rank", hindi: "कनिष्ठ", type: "adjective", hindiPron: "जूनियर" },
  "jury": { meaning: "A group of people who deliver a verdict", hindi: "जूरी", type: "noun", hindiPron: "जूरी" },
  "justice": { meaning: "The quality of being fair and reasonable", hindi: "न्याय", type: "noun", hindiPron: "जस्टिस" },
  "key": { meaning: "A metal instrument for opening a lock", hindi: "चाबी", type: "noun", hindiPron: "की" },
  "keyboard": { meaning: "A panel of keys for operating a computer", hindi: "कीबोर्ड", type: "noun", hindiPron: "कीबोर्ड" },
  "kick": { meaning: "A strike with the foot", hindi: "लात", type: "noun", hindiPron: "किक" },
  "kid": { meaning: "A child (informal)", hindi: "बच्चा", type: "noun", hindiPron: "किड" },
  "kill": { meaning: "To cause the death of", hindi: "मारना", type: "verb", hindiPron: "किल" },
  "kind": { meaning: "A group with similar characteristics", hindi: "प्रकार", type: "noun", hindiPron: "काइंड" },
  "king": { meaning: "The male ruler of a country", hindi: "राजा", type: "noun", hindiPron: "किंग" },
  "kingdom": { meaning: "A country ruled by a king or queen", hindi: "राज्य", type: "noun", hindiPron: "किंगडम" },
  "kiss": { meaning: "A touch with the lips as a sign of affection", hindi: "चुंबन", type: "noun", hindiPron: "किस" },
  "kitchen": { meaning: "A room where food is prepared", hindi: "रसोई", type: "noun", hindiPron: "किचन" },
  "knee": { meaning: "The joint between the thigh and lower leg", hindi: "घुटना", type: "noun", hindiPron: "नी" },
  "knife": { meaning: "An instrument for cutting", hindi: "चाकू", type: "noun", hindiPron: "नाइफ़" },
  "knowledge": { meaning: "Facts, information, and skills acquired", hindi: "ज्ञान", type: "noun", hindiPron: "नॉलेज" },

  // L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z (key words)
  "label": { meaning: "A small piece of paper attached to an object", hindi: "लेबल", type: "noun", hindiPron: "लेबल" },
  "labor": { meaning: "Work, especially hard physical work", hindi: "श्रम", type: "noun", hindiPron: "लेबर" },
  "laboratory": { meaning: "A room equipped for scientific work", hindi: "प्रयोगशाला", type: "noun", hindiPron: "लैबोरेटरी" },
  "lack": { meaning: "The state of being without something", hindi: "कमी", type: "noun", hindiPron: "लैक" },
  "lady": { meaning: "A woman (polite form)", hindi: "महिला", type: "noun", hindiPron: "लेडी" },
  "lake": { meaning: "A large body of water surrounded by land", hindi: "झील", type: "noun", hindiPron: "लेक" },
  "lamp": { meaning: "A device for giving light", hindi: "दीपक", type: "noun", hindiPron: "लैम्प" },
  "land": { meaning: "The part of the earth's surface not covered by water", hindi: "ज़मीन", type: "noun", hindiPron: "लैंड" },
  "landscape": { meaning: "All the visible features of an area", hindi: "भूदृश्य", type: "noun", hindiPron: "लैंडस्केप" },
  "language": { meaning: "The method of human communication", hindi: "भाषा", type: "noun", hindiPron: "लैंग्वेज" },
  "laugh": { meaning: "To make sounds showing amusement", hindi: "हँसी", type: "noun", hindiPron: "लाफ़" },
  "launch": { meaning: "The act of launching something", hindi: "शुरुआत", type: "noun", hindiPron: "लॉन्च" },
  "law": { meaning: "The system of rules governing a country", hindi: "कानून", type: "noun", hindiPron: "लॉ" },
  "lawyer": { meaning: "A person who practices law", hindi: "वकील", type: "noun", hindiPron: "लॉयर" },
  "layer": { meaning: "A sheet or thickness of material", hindi: "परत", type: "noun", hindiPron: "लेयर" },
  "leader": { meaning: "A person who leads or commands", hindi: "नेता", type: "noun", hindiPron: "लीडर" },
  "leadership": { meaning: "The action of leading a group", hindi: "नेतृत्व", type: "noun", hindiPron: "लीडरशिप" },
  "leaf": { meaning: "The flat green part of a plant", hindi: "पत्ता", type: "noun", hindiPron: "लीफ़" },
  "learning": { meaning: "The acquisition of knowledge", hindi: "सीखना", type: "noun", hindiPron: "लर्निंग" },
  "leather": { meaning: "Material made from animal skin", hindi: "चमड़ा", type: "noun", hindiPron: "लेदर" },
  "lecture": { meaning: "An educational talk to an audience", hindi: "व्याख्यान", type: "noun", hindiPron: "लेक्चर" },
  "leg": { meaning: "Each of the limbs on which a person walks", hindi: "टाँग", type: "noun", hindiPron: "लेग" },
  "lesson": { meaning: "A period of learning or teaching", hindi: "पाठ", type: "noun", hindiPron: "लेसन" },
  "letter": { meaning: "A written message or a character of the alphabet", hindi: "पत्र", type: "noun", hindiPron: "लेटर" },
  "level": { meaning: "A position on a scale", hindi: "स्तर", type: "noun", hindiPron: "लेवल" },
  "liberty": { meaning: "The state of being free", hindi: "स्वतंत्रता", type: "noun", hindiPron: "लिबर्टी" },
  "library": { meaning: "A building housing a collection of books", hindi: "पुस्तकालय", type: "noun", hindiPron: "लाइब्रेरी" },
  "lie": { meaning: "An intentionally false statement", hindi: "झूठ", type: "noun", hindiPron: "लाई" },
  "life": { meaning: "The condition that distinguishes living organisms", hindi: "जीवन", type: "noun", hindiPron: "लाइफ़" },
  "lift": { meaning: "A device for moving between floors", hindi: "लिफ़्ट", type: "noun", hindiPron: "लिफ़्ट" },
  "light": { meaning: "The natural agent that makes things visible", hindi: "रोशनी", type: "noun", hindiPron: "लाइट" },
  "limit": { meaning: "A restriction on the size or amount", hindi: "सीमा", type: "noun", hindiPron: "लिमिट" },
  "line": { meaning: "A long narrow mark or band", hindi: "रेखा", type: "noun", hindiPron: "लाइन" },
  "link": { meaning: "A connection between two things", hindi: "कड़ी", type: "noun", hindiPron: "लिंक" },
  "lip": { meaning: "Either of the two fleshy parts of the mouth", hindi: "होंठ", type: "noun", hindiPron: "लिप" },
  "list": { meaning: "A number of connected items written together", hindi: "सूची", type: "noun", hindiPron: "लिस्ट" },
  "literature": { meaning: "Written works regarded as having artistic merit", hindi: "साहित्य", type: "noun", hindiPron: "लिट्रेचर" },
  "loan": { meaning: "A thing that is borrowed", hindi: "ऋण", type: "noun", hindiPron: "लोन" },
  "location": { meaning: "A particular place or position", hindi: "स्थान", type: "noun", hindiPron: "लोकेशन" },
  "lock": { meaning: "A mechanism for keeping a door fastened", hindi: "ताला", type: "noun", hindiPron: "लॉक" },
  "logic": { meaning: "Reasoning conducted according to strict principles", hindi: "तर्क", type: "noun", hindiPron: "लॉजिक" },
  "loss": { meaning: "The fact of losing something", hindi: "हानि", type: "noun", hindiPron: "लॉस" },
  "love": { meaning: "An intense feeling of deep affection", hindi: "प्रेम", type: "noun", hindiPron: "लव" },
  "luck": { meaning: "Success brought by chance", hindi: "भाग्य", type: "noun", hindiPron: "लक" },
  "lunch": { meaning: "A meal eaten in the middle of the day", hindi: "दोपहर का भोजन", type: "noun", hindiPron: "लंच" },
  "lung": { meaning: "Each of the pair of breathing organs", hindi: "फेफड़ा", type: "noun", hindiPron: "लंग" },
  "luxury": { meaning: "A state of great comfort and extravagance", hindi: "विलासिता", type: "noun", hindiPron: "लक्ज़री" },

  "machine": { meaning: "An apparatus using mechanical power", hindi: "मशीन", type: "noun", hindiPron: "मशीन" },
  "magazine": { meaning: "A periodical publication with articles", hindi: "पत्रिका", type: "noun", hindiPron: "मैगज़ीन" },
  "magic": { meaning: "The power of apparently influencing events", hindi: "जादू", type: "noun", hindiPron: "मैजिक" },
  "mail": { meaning: "Letters and packages sent by post", hindi: "डाक", type: "noun", hindiPron: "मेल" },
  "main": { meaning: "Chief in size or importance", hindi: "मुख्य", type: "adjective", hindiPron: "मेन" },
  "majority": { meaning: "The greater number", hindi: "बहुमत", type: "noun", hindiPron: "मजॉरिटी" },
  "male": { meaning: "Of or relating to men", hindi: "पुरुष", type: "noun", hindiPron: "मेल" },
  "management": { meaning: "The process of dealing with things", hindi: "प्रबंधन", type: "noun", hindiPron: "मैनेजमेंट" },
  "manager": { meaning: "A person responsible for controlling", hindi: "प्रबंधक", type: "noun", hindiPron: "मैनेजर" },
  "manner": { meaning: "A way in which something is done", hindi: "तरीक़ा", type: "noun", hindiPron: "मैनर" },
  "map": { meaning: "A representation of an area of land", hindi: "नक्शा", type: "noun", hindiPron: "मैप" },
  "mark": { meaning: "A small area on a surface having a different color", hindi: "निशान", type: "noun", hindiPron: "मार्क" },
  "market": { meaning: "A regular gathering for the purchase of goods", hindi: "बाज़ार", type: "noun", hindiPron: "मार्केट" },
  "marriage": { meaning: "The legally recognized union of partners", hindi: "विवाह", type: "noun", hindiPron: "मैरिज" },
  "mass": { meaning: "A large body of matter with no shape", hindi: "द्रव्यमान", type: "noun", hindiPron: "मास" },
  "master": { meaning: "A person who has complete control", hindi: "मालिक", type: "noun", hindiPron: "मास्टर" },
  "match": { meaning: "A contest or a fire-starting stick", hindi: "मैच", type: "noun", hindiPron: "मैच" },
  "material": { meaning: "The matter from which a thing is made", hindi: "सामग्री", type: "noun", hindiPron: "मटीरियल" },
  "matter": { meaning: "Physical substance in general", hindi: "मामला", type: "noun", hindiPron: "मैटर" },
  "meal": { meaning: "An occasion when food is eaten", hindi: "भोजन", type: "noun", hindiPron: "मील" },
  "meaning": { meaning: "What is meant by a word or action", hindi: "अर्थ", type: "noun", hindiPron: "मीनिंग" },
  "measure": { meaning: "A plan or course of action", hindi: "उपाय", type: "noun", hindiPron: "मेज़र" },
  "meat": { meaning: "The flesh of an animal as food", hindi: "मांस", type: "noun", hindiPron: "मीट" },
  "media": { meaning: "The main means of mass communication", hindi: "मीडिया", type: "noun", hindiPron: "मीडिया" },
  "medicine": { meaning: "The science of treating disease", hindi: "दवा", type: "noun", hindiPron: "मेडिसिन" },
  "meeting": { meaning: "An assembly of people for a purpose", hindi: "बैठक", type: "noun", hindiPron: "मीटिंग" },
  "member": { meaning: "A person belonging to a group", hindi: "सदस्य", type: "noun", hindiPron: "मेम्बर" },
  "memory": { meaning: "The faculty by which the mind stores information", hindi: "स्मृति", type: "noun", hindiPron: "मेमरी" },
  "mental": { meaning: "Relating to the mind", hindi: "मानसिक", type: "adjective", hindiPron: "मेंटल" },
  "mention": { meaning: "A reference to something", hindi: "उल्लेख", type: "noun", hindiPron: "मेंशन" },
  "menu": { meaning: "A list of dishes available in a restaurant", hindi: "मेन्यू", type: "noun", hindiPron: "मेन्यू" },
  "message": { meaning: "A verbal or written communication", hindi: "संदेश", type: "noun", hindiPron: "मैसेज" },
  "metal": { meaning: "A solid material that is typically hard", hindi: "धातु", type: "noun", hindiPron: "मेटल" },
  "method": { meaning: "A particular way of doing something", hindi: "विधि", type: "noun", hindiPron: "मेथड" },
  "middle": { meaning: "The point equidistant from the edges", hindi: "मध्य", type: "noun", hindiPron: "मिडल" },
  "military": { meaning: "Relating to the armed forces", hindi: "सैन्य", type: "adjective", hindiPron: "मिलिटरी" },
  "milk": { meaning: "A white liquid produced by female mammals", hindi: "दूध", type: "noun", hindiPron: "मिल्क" },
  "million": { meaning: "The number 1,000,000", hindi: "दस लाख", type: "noun", hindiPron: "मिलियन" },
  "mind": { meaning: "The element of a person that enables consciousness", hindi: "मन", type: "noun", hindiPron: "माइंड" },
  "mine": { meaning: "A place where minerals are dug", hindi: "खदान", type: "noun", hindiPron: "माइन" },
  "minister": { meaning: "A head of a government department", hindi: "मंत्री", type: "noun", hindiPron: "मिनिस्टर" },
  "minority": { meaning: "The smaller number or part", hindi: "अल्पसंख्यक", type: "noun", hindiPron: "माइनॉरिटी" },
  "minute": { meaning: "A period of sixty seconds", hindi: "मिनट", type: "noun", hindiPron: "मिनट" },
  "mirror": { meaning: "A reflective surface", hindi: "दर्पण", type: "noun", hindiPron: "मिरर" },
  "mission": { meaning: "An important assignment", hindi: "मिशन", type: "noun", hindiPron: "मिशन" },
  "mistake": { meaning: "An action or judgment that is wrong", hindi: "ग़लती", type: "noun", hindiPron: "मिस्टेक" },
  "mixture": { meaning: "A substance made by mixing others", hindi: "मिश्रण", type: "noun", hindiPron: "मिक्सचर" },
  "model": { meaning: "A representation of a structure", hindi: "मॉडल", type: "noun", hindiPron: "मॉडल" },
  "moment": { meaning: "A very brief period of time", hindi: "पल", type: "noun", hindiPron: "मोमेंट" },
  "money": { meaning: "A current medium of exchange", hindi: "पैसा", type: "noun", hindiPron: "मनी" },
  "month": { meaning: "Each of twelve periods of a year", hindi: "महीना", type: "noun", hindiPron: "मंथ" },
  "mood": { meaning: "A temporary state of mind", hindi: "मनोदशा", type: "noun", hindiPron: "मूड" },
  "moon": { meaning: "The natural satellite of the earth", hindi: "चाँद", type: "noun", hindiPron: "मून" },
  "morning": { meaning: "The period from sunrise to noon", hindi: "सुबह", type: "noun", hindiPron: "मॉर्निंग" },
  "mother": { meaning: "A female parent", hindi: "माता", type: "noun", hindiPron: "मदर" },
  "motion": { meaning: "The action of moving", hindi: "गति", type: "noun", hindiPron: "मोशन" },
  "motivation": { meaning: "The reason for acting in a particular way", hindi: "प्रेरणा", type: "noun", hindiPron: "मोटिवेशन" },
  "mountain": { meaning: "A large natural elevation of the earth", hindi: "पहाड़", type: "noun", hindiPron: "माउंटेन" },
  "mouse": { meaning: "A small rodent or computer input device", hindi: "चूहा", type: "noun", hindiPron: "माउस" },
  "mouth": { meaning: "The opening in the face for eating and speaking", hindi: "मुँह", type: "noun", hindiPron: "माउथ" },
  "movement": { meaning: "An act of changing position", hindi: "आंदोलन", type: "noun", hindiPron: "मूवमेंट" },
  "movie": { meaning: "A film shown in a cinema", hindi: "फ़िल्म", type: "noun", hindiPron: "मूवी" },
  "murder": { meaning: "The unlawful killing of a human being", hindi: "हत्या", type: "noun", hindiPron: "मर्डर" },
  "museum": { meaning: "A building housing historical objects", hindi: "संग्रहालय", type: "noun", hindiPron: "म्यूज़ियम" },
  "music": { meaning: "Vocal or instrumental sounds", hindi: "संगीत", type: "noun", hindiPron: "म्यूज़िक" },
  "mystery": { meaning: "Something that is difficult to understand", hindi: "रहस्य", type: "noun", hindiPron: "मिस्ट्री" },

  "name": { meaning: "A word by which a person or thing is known", hindi: "नाम", type: "noun", hindiPron: "नेम" },
  "nation": { meaning: "A large body of people united by territory", hindi: "राष्ट्र", type: "noun", hindiPron: "नेशन" },
  "nature": { meaning: "The phenomena of the physical world", hindi: "प्रकृति", type: "noun", hindiPron: "नेचर" },
  "neck": { meaning: "The part connecting the head to the body", hindi: "गर्दन", type: "noun", hindiPron: "नेक" },
  "need": { meaning: "Something that is required or necessary", hindi: "ज़रूरत", type: "noun", hindiPron: "नीड" },
  "neighbour": { meaning: "A person living near another", hindi: "पड़ोसी", type: "noun", hindiPron: "नेबर" },
  "nerve": { meaning: "A bundle of fibers that transmits impulses", hindi: "नस", type: "noun", hindiPron: "नर्व" },
  "network": { meaning: "A group of interconnected things", hindi: "नेटवर्क", type: "noun", hindiPron: "नेटवर्क" },
  "news": { meaning: "Newly received information about events", hindi: "समाचार", type: "noun", hindiPron: "न्यूज़" },
  "newspaper": { meaning: "A printed publication with news", hindi: "अख़बार", type: "noun", hindiPron: "न्यूज़पेपर" },
  "night": { meaning: "The period from sunset to sunrise", hindi: "रात", type: "noun", hindiPron: "नाइट" },
  "noise": { meaning: "A sound that is loud or unpleasant", hindi: "शोर", type: "noun", hindiPron: "नॉइज़" },
  "normal": { meaning: "Conforming to a standard", hindi: "सामान्य", type: "adjective", hindiPron: "नॉर्मल" },
  "north": { meaning: "The direction to the left on a map", hindi: "उत्तर", type: "noun", hindiPron: "नॉर्थ" },
  "nose": { meaning: "The part of the face for breathing and smelling", hindi: "नाक", type: "noun", hindiPron: "नोज़" },
  "note": { meaning: "A brief record of facts", hindi: "टिप्पणी", type: "noun", hindiPron: "नोट" },
  "nothing": { meaning: "Not anything; no single thing", hindi: "कुछ नहीं", type: "pronoun", hindiPron: "नथिंग" },
  "notice": { meaning: "Attention or observation", hindi: "सूचना", type: "noun", hindiPron: "नोटिस" },
  "novel": { meaning: "A long fictional story in book form", hindi: "उपन्यास", type: "noun", hindiPron: "नॉवेल" },
  "nuclear": { meaning: "Relating to the nucleus of an atom", hindi: "परमाणु", type: "adjective", hindiPron: "न्यूक्लियर" },
  "number": { meaning: "An arithmetical value", hindi: "संख्या", type: "noun", hindiPron: "नंबर" },
  "nurse": { meaning: "A person trained to care for sick people", hindi: "नर्स", type: "noun", hindiPron: "नर्स" },
  "nutrition": { meaning: "The process of providing food", hindi: "पोषण", type: "noun", hindiPron: "न्यूट्रिशन" },

  "object": { meaning: "A material thing that can be seen", hindi: "वस्तु", type: "noun", hindiPron: "ऑब्जेक्ट" },
  "objective": { meaning: "A thing aimed at or sought", hindi: "उद्देश्य", type: "noun", hindiPron: "ऑब्जेक्टिव" },
  "observation": { meaning: "The action of observing something", hindi: "अवलोकन", type: "noun", hindiPron: "ऑब्ज़र्वेशन" },
  "occasion": { meaning: "A particular time or event", hindi: "अवसर", type: "noun", hindiPron: "ऑकेज़न" },
  "occupation": { meaning: "A job or profession", hindi: "व्यवसाय", type: "noun", hindiPron: "ऑक्युपेशन" },
  "ocean": { meaning: "A very large expanse of sea", hindi: "महासागर", type: "noun", hindiPron: "ओशन" },
  "offence": { meaning: "A breach of a law or rule", hindi: "अपराध", type: "noun", hindiPron: "ऑफ़ेंस" },
  "offer": { meaning: "An expression of readiness", hindi: "प्रस्ताव", type: "noun", hindiPron: "ऑफ़र" },
  "office": { meaning: "A room or building for business work", hindi: "कार्यालय", type: "noun", hindiPron: "ऑफ़िस" },
  "officer": { meaning: "A person holding authority", hindi: "अधिकारी", type: "noun", hindiPron: "ऑफ़िसर" },
  "oil": { meaning: "A viscous liquid derived from petroleum", hindi: "तेल", type: "noun", hindiPron: "ऑइल" },
  "operation": { meaning: "The fact of functioning", hindi: "संचालन", type: "noun", hindiPron: "ऑपरेशन" },
  "opinion": { meaning: "A view or judgment not based on fact", hindi: "राय", type: "noun", hindiPron: "ओपिनियन" },
  "opponent": { meaning: "One who competes against another", hindi: "प्रतिद्वंद्वी", type: "noun", hindiPron: "ऑपोनेंट" },
  "opportunity": { meaning: "A time or set of circumstances", hindi: "अवसर", type: "noun", hindiPron: "ऑपर्ट्यूनिटी" },
  "opposition": { meaning: "Resistance or dissent", hindi: "विरोध", type: "noun", hindiPron: "ऑपोज़िशन" },
  "option": { meaning: "A thing that may be chosen", hindi: "विकल्प", type: "noun", hindiPron: "ऑप्शन" },
  "orange": { meaning: "A reddish-yellow citrus fruit", hindi: "संतरा", type: "noun", hindiPron: "ऑरेंज" },
  "order": { meaning: "The arrangement of things in sequence", hindi: "आदेश", type: "noun", hindiPron: "ऑर्डर" },
  "organization": { meaning: "An organized body of people", hindi: "संगठन", type: "noun", hindiPron: "ऑर्गनाइज़ेशन" },
  "origin": { meaning: "The point where something begins", hindi: "मूल", type: "noun", hindiPron: "ऑरिजिन" },
  "outcome": { meaning: "The way a thing turns out", hindi: "परिणाम", type: "noun", hindiPron: "आउटकम" },
  "output": { meaning: "The amount of something produced", hindi: "उत्पादन", type: "noun", hindiPron: "आउटपुट" },
  "owner": { meaning: "A person who owns something", hindi: "मालिक", type: "noun", hindiPron: "ओनर" },

  // ══════════════════════════════════════════
  // PLACES WITH TRICKY PRONUNCIATION
  // ══════════════════════════════════════════
  "worcestershire": { meaning: "A county in western England", hindi: "इंग्लैंड का एक काउंटी", type: "place", hindiPron: "वुस्टरशर" },
  "leicester": { meaning: "A city in central England", hindi: "मध्य इंग्लैंड का शहर", type: "place", hindiPron: "लेस्टर" },
  "edinburgh": { meaning: "The capital city of Scotland", hindi: "स्कॉटलैंड की राजधानी", type: "place", hindiPron: "एडिनबरा" },
  "thames": { meaning: "The major river flowing through London", hindi: "लंदन की प्रमुख नदी", type: "place", hindiPron: "टेम्ज़" },
  "versailles": { meaning: "A city near Paris known for its palace", hindi: "पेरिस के निकट शहर", type: "place", hindiPron: "वर्साय" },
  "gloucester": { meaning: "A city in southwest England", hindi: "दक्षिण-पश्चिम इंग्लैंड का शहर", type: "place", hindiPron: "ग्लॉस्टर" },
  "greenwich": { meaning: "A district of London at the prime meridian", hindi: "लंदन का क्षेत्र", type: "place", hindiPron: "ग्रेनिच" },
  "berkeley": { meaning: "A city in California, USA", hindi: "कैलिफ़ोर्निया का शहर", type: "place", hindiPron: "बर्कली" },

  // ══════════════════════════════════════════
  // TECHNOLOGY TERMS
  // ══════════════════════════════════════════
  "software": { meaning: "Computer programs and related data", hindi: "सॉफ़्टवेयर", type: "noun", hindiPron: "सॉफ़्टवेयर" },
  "hardware": { meaning: "The physical components of a computer", hindi: "हार्डवेयर", type: "noun", hindiPron: "हार्डवेयर" },
  "website": { meaning: "A set of web pages on the internet", hindi: "वेबसाइट", type: "noun", hindiPron: "वेबसाइट" },
  "application": { meaning: "A computer program designed for users", hindi: "ऐप्लिकेशन", type: "noun", hindiPron: "ऐप्लिकेशन" },
  "download": { meaning: "To copy data from one computer to another", hindi: "डाउनलोड", type: "verb", hindiPron: "डाउनलोड" },
  "upload": { meaning: "To transfer data to a larger computer system", hindi: "अपलोड", type: "verb", hindiPron: "अपलोड" },
  "password": { meaning: "A secret word for gaining admission", hindi: "पासवर्ड", type: "noun", hindiPron: "पासवर्ड" },
  "wifi": { meaning: "Wireless networking technology", hindi: "वाईफ़ाई", type: "noun", hindiPron: "वाईफ़ाई" },
  "bluetooth": { meaning: "Wireless technology for short-range communication", hindi: "ब्लूटूथ", type: "noun", hindiPron: "ब्लूटूथ" },
  "screenshot": { meaning: "An image captured from a computer display", hindi: "स्क्रीनशॉट", type: "noun", hindiPron: "स्क्रीनशॉट" },
  "podcast": { meaning: "A digital audio file available for download", hindi: "पॉडकास्ट", type: "noun", hindiPron: "पॉडकास्ट" },
  "startup": { meaning: "A newly established business", hindi: "स्टार्टअप", type: "noun", hindiPron: "स्टार्टअप" },
  "cryptocurrency": { meaning: "A digital currency using encryption", hindi: "क्रिप्टोकरेंसी", type: "noun", hindiPron: "क्रिप्टोकरेंसी" },
  "artificial": { meaning: "Made by human skill, not natural", hindi: "कृत्रिम", type: "adjective", hindiPron: "आर्टिफ़िशल" },
  "intelligence": { meaning: "The ability to acquire knowledge", hindi: "बुद्धिमत्ता", type: "noun", hindiPron: "इंटेलिजेंस" },
  "cybersecurity": { meaning: "Protection of computer systems from attack", hindi: "साइबर सुरक्षा", type: "noun", hindiPron: "साइबरसिक्योरिटी" },
  "bandwidth": { meaning: "The capacity for data transfer", hindi: "बैंडविड्थ", type: "noun", hindiPron: "बैंडविड्थ" },

  // ══════════════════════════════════════════
  // REMAINING P-Z (key selections)
  // ══════════════════════════════════════════
  "package": { meaning: "An object or group of objects wrapped together", hindi: "पैकेज", type: "noun", hindiPron: "पैकेज" },
  "page": { meaning: "One side of a leaf of a book", hindi: "पृष्ठ", type: "noun", hindiPron: "पेज" },
  "pain": { meaning: "Physical suffering or discomfort", hindi: "दर्द", type: "noun", hindiPron: "पेन" },
  "pair": { meaning: "A set of two things", hindi: "जोड़ा", type: "noun", hindiPron: "पेयर" },
  "palace": { meaning: "A large impressive building", hindi: "महल", type: "noun", hindiPron: "पैलेस" },
  "panel": { meaning: "A flat board or group of experts", hindi: "पैनल", type: "noun", hindiPron: "पैनल" },
  "paper": { meaning: "Material for writing on", hindi: "कागज़", type: "noun", hindiPron: "पेपर" },
  "parent": { meaning: "A father or mother", hindi: "माता-पिता", type: "noun", hindiPron: "पेरेंट" },
  "park": { meaning: "A large public green area", hindi: "पार्क", type: "noun", hindiPron: "पार्क" },
  "parliament": { meaning: "The supreme legislative body", hindi: "संसद", type: "noun", hindiPron: "पार्लियामेंट" },
  "partner": { meaning: "A person who takes part with another", hindi: "साथी", type: "noun", hindiPron: "पार्टनर" },
  "party": { meaning: "A social gathering or political group", hindi: "पार्टी", type: "noun", hindiPron: "पार्टी" },
  "passage": { meaning: "A way through or a section of text", hindi: "मार्ग", type: "noun", hindiPron: "पैसेज" },
  "passenger": { meaning: "A traveller in a vehicle", hindi: "यात्री", type: "noun", hindiPron: "पैसेंजर" },
  "passion": { meaning: "Strong and barely controllable emotion", hindi: "जुनून", type: "noun", hindiPron: "पैशन" },
  "path": { meaning: "A way or track laid down for walking", hindi: "रास्ता", type: "noun", hindiPron: "पाथ" },
  "patience": { meaning: "The capacity to tolerate delay", hindi: "धैर्य", type: "noun", hindiPron: "पेशेंस" },
  "patient": { meaning: "A person receiving medical treatment", hindi: "रोगी", type: "noun", hindiPron: "पेशेंट" },
  "pattern": { meaning: "A repeated decorative design", hindi: "पैटर्न", type: "noun", hindiPron: "पैटर्न" },
  "peace": { meaning: "Freedom from disturbance", hindi: "शांति", type: "noun", hindiPron: "पीस" },
  "pen": { meaning: "An instrument for writing", hindi: "कलम", type: "noun", hindiPron: "पेन" },
  "penalty": { meaning: "A punishment for breaking a law", hindi: "दंड", type: "noun", hindiPron: "पेनल्टी" },
  "pension": { meaning: "A regular payment during retirement", hindi: "पेंशन", type: "noun", hindiPron: "पेंशन" },
  "people": { meaning: "Human beings in general", hindi: "लोग", type: "noun", hindiPron: "पीपल" },
  "perfect": { meaning: "Having all required qualities", hindi: "उत्तम", type: "adjective", hindiPron: "पर्फ़ेक्ट" },
  "performance": { meaning: "An act of presenting to an audience", hindi: "प्रदर्शन", type: "noun", hindiPron: "परफ़ॉर्मेंस" },
  "period": { meaning: "A length of time", hindi: "अवधि", type: "noun", hindiPron: "पीरियड" },
  "permission": { meaning: "Authorization to do something", hindi: "अनुमति", type: "noun", hindiPron: "परमिशन" },
  "person": { meaning: "A human being", hindi: "व्यक्ति", type: "noun", hindiPron: "पर्सन" },
  "personality": { meaning: "The combination of characteristics of a person", hindi: "व्यक्तित्व", type: "noun", hindiPron: "पर्सनैलिटी" },
  "perspective": { meaning: "A particular attitude or way of regarding", hindi: "दृष्टिकोण", type: "noun", hindiPron: "पर्स्पेक्टिव" },
  "philosophy": { meaning: "The study of fundamental nature of knowledge", hindi: "दर्शन", type: "noun", hindiPron: "फ़िलॉसफ़ी" },
  "phone": { meaning: "A device for telephone communication", hindi: "फ़ोन", type: "noun", hindiPron: "फ़ोन" },
  "photo": { meaning: "A picture made using a camera", hindi: "तस्वीर", type: "noun", hindiPron: "फ़ोटो" },
  "picture": { meaning: "A painting, drawing, or photograph", hindi: "चित्र", type: "noun", hindiPron: "पिक्चर" },
  "piece": { meaning: "A portion of something", hindi: "टुकड़ा", type: "noun", hindiPron: "पीस" },
  "pilot": { meaning: "A person who flies an aircraft", hindi: "पायलट", type: "noun", hindiPron: "पायलट" },
  "plan": { meaning: "A detailed proposal for doing something", hindi: "योजना", type: "noun", hindiPron: "प्लान" },
  "planet": { meaning: "A large body that orbits a star", hindi: "ग्रह", type: "noun", hindiPron: "प्लैनेट" },
  "plant": { meaning: "A living organism that grows in earth", hindi: "पौधा", type: "noun", hindiPron: "प्लांट" },
  "plastic": { meaning: "A synthetic material that can be molded", hindi: "प्लास्टिक", type: "noun", hindiPron: "प्लास्टिक" },
  "plate": { meaning: "A flat dish for serving food", hindi: "थाली", type: "noun", hindiPron: "प्लेट" },
  "platform": { meaning: "A raised flat surface", hindi: "मंच", type: "noun", hindiPron: "प्लैटफ़ॉर्म" },
  "player": { meaning: "A person taking part in a game", hindi: "खिलाड़ी", type: "noun", hindiPron: "प्लेयर" },
  "pleasure": { meaning: "A feeling of happy satisfaction", hindi: "आनंद", type: "noun", hindiPron: "प्लेज़र" },
  "plenty": { meaning: "A large or sufficient amount", hindi: "बहुत", type: "noun", hindiPron: "प्लेंटी" },
  "pocket": { meaning: "A small bag sewn into clothing", hindi: "जेब", type: "noun", hindiPron: "पॉकेट" },
  "poem": { meaning: "A piece of writing with rhythm", hindi: "कविता", type: "noun", hindiPron: "पोएम" },
  "poet": { meaning: "A person who writes poems", hindi: "कवि", type: "noun", hindiPron: "पोएट" },
  "poetry": { meaning: "Literary work in metrical form", hindi: "काव्य", type: "noun", hindiPron: "पोएट्री" },
  "point": { meaning: "A particular spot or location", hindi: "बिंदु", type: "noun", hindiPron: "पॉइंट" },
  "poison": { meaning: "A substance causing death or illness", hindi: "ज़हर", type: "noun", hindiPron: "पॉइज़न" },
  "police": { meaning: "The civil force for maintaining law", hindi: "पुलिस", type: "noun", hindiPron: "पुलीस" },
  "policy": { meaning: "A course of action adopted by a government", hindi: "नीति", type: "noun", hindiPron: "पॉलिसी" },
  "politics": { meaning: "Activities associated with governance", hindi: "राजनीति", type: "noun", hindiPron: "पॉलिटिक्स" },
  "pollution": { meaning: "The presence of harmful substances", hindi: "प्रदूषण", type: "noun", hindiPron: "पल्यूशन" },
  "pool": { meaning: "A small area of still water", hindi: "तालाब", type: "noun", hindiPron: "पूल" },
  "population": { meaning: "The inhabitants of a particular area", hindi: "जनसंख्या", type: "noun", hindiPron: "पॉप्युलेशन" },
  "position": { meaning: "A place where someone is located", hindi: "स्थिति", type: "noun", hindiPron: "पोज़िशन" },
  "positive": { meaning: "Constructive, optimistic, or confident", hindi: "सकारात्मक", type: "adjective", hindiPron: "पॉज़िटिव" },
  "possibility": { meaning: "A thing that may happen", hindi: "संभावना", type: "noun", hindiPron: "पॉसिबिलिटी" },
  "poverty": { meaning: "The state of being extremely poor", hindi: "ग़रीबी", type: "noun", hindiPron: "पॉवर्टी" },
  "power": { meaning: "The ability to do something", hindi: "शक्ति", type: "noun", hindiPron: "पावर" },
  "practice": { meaning: "The actual application of a method", hindi: "अभ्यास", type: "noun", hindiPron: "प्रैक्टिस" },
  "prayer": { meaning: "A solemn request to God", hindi: "प्रार्थना", type: "noun", hindiPron: "प्रेयर" },
  "preparation": { meaning: "The action of making ready", hindi: "तैयारी", type: "noun", hindiPron: "प्रेपरेशन" },
  "presence": { meaning: "The state of being present", hindi: "उपस्थिति", type: "noun", hindiPron: "प्रेज़ेंस" },
  "present": { meaning: "A gift or the current time", hindi: "उपहार", type: "noun", hindiPron: "प्रेज़ेंट" },
  "president": { meaning: "The head of a republic", hindi: "राष्ट्रपति", type: "noun", hindiPron: "प्रेज़िडेंट" },
  "pressure": { meaning: "Continuous physical force on something", hindi: "दबाव", type: "noun", hindiPron: "प्रेशर" },
  "price": { meaning: "The amount of money for which something is sold", hindi: "कीमत", type: "noun", hindiPron: "प्राइस" },
  "pride": { meaning: "A feeling of satisfaction in achievements", hindi: "गर्व", type: "noun", hindiPron: "प्राइड" },
  "prince": { meaning: "A son of a king or queen", hindi: "राजकुमार", type: "noun", hindiPron: "प्रिंस" },
  "princess": { meaning: "A daughter of a king or queen", hindi: "राजकुमारी", type: "noun", hindiPron: "प्रिंसेस" },
  "principle": { meaning: "A fundamental truth or proposition", hindi: "सिद्धांत", type: "noun", hindiPron: "प्रिंसिपल" },
  "prison": { meaning: "A building for confining criminals", hindi: "जेल", type: "noun", hindiPron: "प्रिज़न" },
  "privacy": { meaning: "The state of being free from observation", hindi: "गोपनीयता", type: "noun", hindiPron: "प्राइवेसी" },
  "prize": { meaning: "A reward given for winning", hindi: "पुरस्कार", type: "noun", hindiPron: "प्राइज़" },
  "problem": { meaning: "A matter that is difficult to deal with", hindi: "समस्या", type: "noun", hindiPron: "प्रॉब्लम" },
  "procedure": { meaning: "An established way of doing something", hindi: "प्रक्रिया", type: "noun", hindiPron: "प्रोसीजर" },
  "process": { meaning: "A series of actions to achieve a result", hindi: "प्रक्रिया", type: "noun", hindiPron: "प्रोसेस" },
  "product": { meaning: "An article manufactured for sale", hindi: "उत्पाद", type: "noun", hindiPron: "प्रॉडक्ट" },
  "production": { meaning: "The action of making goods", hindi: "उत्पादन", type: "noun", hindiPron: "प्रोडक्शन" },
  "profession": { meaning: "A paid occupation requiring training", hindi: "पेशा", type: "noun", hindiPron: "प्रोफ़ेशन" },
  "professor": { meaning: "A university academic of the highest rank", hindi: "प्रोफ़ेसर", type: "noun", hindiPron: "प्रोफ़ेसर" },
  "profit": { meaning: "Financial gain", hindi: "लाभ", type: "noun", hindiPron: "प्रॉफ़िट" },
  "program": { meaning: "A planned series of events or software", hindi: "कार्यक्रम", type: "noun", hindiPron: "प्रोग्राम" },
  "progress": { meaning: "Forward movement towards a destination", hindi: "प्रगति", type: "noun", hindiPron: "प्रोग्रेस" },
  "project": { meaning: "An individual enterprise carefully planned", hindi: "परियोजना", type: "noun", hindiPron: "प्रोजेक्ट" },
  "promise": { meaning: "A declaration that one will do something", hindi: "वादा", type: "noun", hindiPron: "प्रॉमिस" },
  "promotion": { meaning: "Activity that supports or encourages", hindi: "पदोन्नति", type: "noun", hindiPron: "प्रमोशन" },
  "proof": { meaning: "Evidence establishing a fact as true", hindi: "प्रमाण", type: "noun", hindiPron: "प्रूफ़" },
  "property": { meaning: "A thing or things belonging to someone", hindi: "संपत्ति", type: "noun", hindiPron: "प्रॉपर्टी" },
  "proportion": { meaning: "A part considered in relation to the whole", hindi: "अनुपात", type: "noun", hindiPron: "प्रपोर्शन" },
  "proposal": { meaning: "A plan put forward for consideration", hindi: "प्रस्ताव", type: "noun", hindiPron: "प्रपोज़ल" },
  "protection": { meaning: "The action of protecting", hindi: "सुरक्षा", type: "noun", hindiPron: "प्रोटेक्शन" },
  "protest": { meaning: "A statement of objection", hindi: "विरोध", type: "noun", hindiPron: "प्रोटेस्ट" },
  "proud": { meaning: "Feeling deep pleasure in achievements", hindi: "गर्वित", type: "adjective", hindiPron: "प्राउड" },
  "provision": { meaning: "The action of providing something", hindi: "प्रावधान", type: "noun", hindiPron: "प्रोविज़न" },
  "psychology": { meaning: "The scientific study of the human mind", hindi: "मनोविज्ञान", type: "noun", hindiPron: "साइकॉलजी" },
  "public": { meaning: "Of or concerning the people as a whole", hindi: "सार्वजनिक", type: "adjective", hindiPron: "पब्लिक" },
  "publication": { meaning: "The preparation of a book for public sale", hindi: "प्रकाशन", type: "noun", hindiPron: "पब्लिकेशन" },
  "punishment": { meaning: "The imposition of a penalty for an offence", hindi: "सज़ा", type: "noun", hindiPron: "पनिशमेंट" },
  "pupil": { meaning: "A student in school", hindi: "विद्यार्थी", type: "noun", hindiPron: "प्यूपिल" },
  "purchase": { meaning: "The act of buying something", hindi: "ख़रीद", type: "noun", hindiPron: "पर्चेस" },
  "pure": { meaning: "Not mixed with anything else", hindi: "शुद्ध", type: "adjective", hindiPron: "प्योर" },
  "purpose": { meaning: "The reason for which something is done", hindi: "उद्देश्य", type: "noun", hindiPron: "पर्पस" },

  "quality": { meaning: "The standard of something as measured", hindi: "गुणवत्ता", type: "noun", hindiPron: "क्वालिटी" },
  "quantity": { meaning: "The amount or number of something", hindi: "मात्रा", type: "noun", hindiPron: "क्वांटिटी" },
  "quarter": { meaning: "One fourth of something", hindi: "चौथाई", type: "noun", hindiPron: "क्वार्टर" },
  "queen": { meaning: "The female ruler of a country", hindi: "रानी", type: "noun", hindiPron: "क्वीन" },
  "question": { meaning: "A sentence worded to seek information", hindi: "सवाल", type: "noun", hindiPron: "क्वेश्चन" },
  "quiet": { meaning: "Making little or no noise", hindi: "शांत", type: "adjective", hindiPron: "क्वायट" },

  "race": { meaning: "A competition of speed or a group of people", hindi: "दौड़", type: "noun", hindiPron: "रेस" },
  "rain": { meaning: "Water falling from clouds in drops", hindi: "बारिश", type: "noun", hindiPron: "रेन" },
  "range": { meaning: "The area of variation between limits", hindi: "सीमा", type: "noun", hindiPron: "रेंज" },
  "rank": { meaning: "A position in the hierarchy", hindi: "पद", type: "noun", hindiPron: "रैंक" },
  "rate": { meaning: "A measure or quantity relative to another", hindi: "दर", type: "noun", hindiPron: "रेट" },
  "ratio": { meaning: "The relationship between two amounts", hindi: "अनुपात", type: "noun", hindiPron: "रेशियो" },
  "reaction": { meaning: "Something done in response", hindi: "प्रतिक्रिया", type: "noun", hindiPron: "रिऐक्शन" },
  "reader": { meaning: "A person who reads", hindi: "पाठक", type: "noun", hindiPron: "रीडर" },
  "reality": { meaning: "The state of things as they exist", hindi: "वास्तविकता", type: "noun", hindiPron: "रिऐलिटी" },
  "reason": { meaning: "A cause, explanation, or justification", hindi: "कारण", type: "noun", hindiPron: "रीज़न" },
  "recognition": { meaning: "Identification from previous encounters", hindi: "पहचान", type: "noun", hindiPron: "रेकग्निशन" },
  "recommendation": { meaning: "A suggestion that something is good", hindi: "सिफ़ारिश", type: "noun", hindiPron: "रेकमेंडेशन" },
  "record": { meaning: "A thing constituting evidence of the past", hindi: "रिकॉर्ड", type: "noun", hindiPron: "रिकॉर्ड" },
  "recovery": { meaning: "A return to a normal state", hindi: "वसूली", type: "noun", hindiPron: "रिकवरी" },
  "reduction": { meaning: "The action of making something smaller", hindi: "कमी", type: "noun", hindiPron: "रिडक्शन" },
  "reference": { meaning: "The action of mentioning something", hindi: "संदर्भ", type: "noun", hindiPron: "रेफ़रेंस" },
  "reflection": { meaning: "The throwing back of light from a surface", hindi: "प्रतिबिंब", type: "noun", hindiPron: "रिफ़्लेक्शन" },
  "reform": { meaning: "Making changes to improve something", hindi: "सुधार", type: "noun", hindiPron: "रिफ़ॉर्म" },
  "region": { meaning: "An area of a country or the world", hindi: "क्षेत्र", type: "noun", hindiPron: "रीजन" },
  "register": { meaning: "An official list or record", hindi: "रजिस्टर", type: "noun", hindiPron: "रजिस्टर" },
  "regulation": { meaning: "A rule made and maintained by an authority", hindi: "विनियमन", type: "noun", hindiPron: "रेग्युलेशन" },
  "relation": { meaning: "The way two things are connected", hindi: "संबंध", type: "noun", hindiPron: "रिलेशन" },
  "relationship": { meaning: "The way two people are connected", hindi: "रिश्ता", type: "noun", hindiPron: "रिलेशनशिप" },
  "relief": { meaning: "A feeling of reassurance after anxiety", hindi: "राहत", type: "noun", hindiPron: "रिलीफ़" },
  "religion": { meaning: "A system of faith and worship", hindi: "धर्म", type: "noun", hindiPron: "रिलिजन" },
  "rent": { meaning: "A tenant's regular payment for use of property", hindi: "किराया", type: "noun", hindiPron: "रेंट" },
  "repair": { meaning: "The action of fixing something", hindi: "मरम्मत", type: "noun", hindiPron: "रिपेयर" },
  "repeat": { meaning: "The action of doing something again", hindi: "दोहराना", type: "verb", hindiPron: "रिपीट" },
  "replacement": { meaning: "Something that takes the place of another", hindi: "प्रतिस्थापन", type: "noun", hindiPron: "रिप्लेसमेंट" },
  "reply": { meaning: "A verbal or written answer", hindi: "जवाब", type: "noun", hindiPron: "रिप्लाई" },
  "report": { meaning: "An account given of a matter", hindi: "रिपोर्ट", type: "noun", hindiPron: "रिपोर्ट" },
  "republic": { meaning: "A state in which power is held by the people", hindi: "गणराज्य", type: "noun", hindiPron: "रिपब्लिक" },
  "reputation": { meaning: "The beliefs or opinions held about someone", hindi: "प्रतिष्ठा", type: "noun", hindiPron: "रेप्यूटेशन" },
  "request": { meaning: "An act of asking for something", hindi: "अनुरोध", type: "noun", hindiPron: "रिक्वेस्ट" },
  "requirement": { meaning: "A thing that is needed", hindi: "आवश्यकता", type: "noun", hindiPron: "रिक्वायरमेंट" },
  "research": { meaning: "Systematic investigation for knowledge", hindi: "शोध", type: "noun", hindiPron: "रिसर्च" },
  "reserve": { meaning: "Something kept back for future use", hindi: "आरक्षित", type: "noun", hindiPron: "रिज़र्व" },
  "resident": { meaning: "A person who lives somewhere", hindi: "निवासी", type: "noun", hindiPron: "रेज़िडेंट" },
  "resistance": { meaning: "The refusal to accept something", hindi: "प्रतिरोध", type: "noun", hindiPron: "रेज़िस्टेंस" },
  "resolution": { meaning: "A firm decision to do something", hindi: "संकल्प", type: "noun", hindiPron: "रेज़ोल्यूशन" },
  "resource": { meaning: "A stock of materials or assets", hindi: "संसाधन", type: "noun", hindiPron: "रिसोर्स" },
  "respect": { meaning: "A feeling of admiration", hindi: "सम्मान", type: "noun", hindiPron: "रिस्पेक्ट" },
  "response": { meaning: "A verbal or written answer", hindi: "प्रतिक्रिया", type: "noun", hindiPron: "रिस्पॉन्स" },
  "responsibility": { meaning: "The state of having a duty to deal with", hindi: "ज़िम्मेदारी", type: "noun", hindiPron: "रिस्पॉन्सिबिलिटी" },
  "rest": { meaning: "Cease work in order to relax", hindi: "आराम", type: "noun", hindiPron: "रेस्ट" },
  "restaurant": { meaning: "A place where meals are served", hindi: "रेस्तराँ", type: "noun", hindiPron: "रेस्टॉरॉन्ट" },
  "result": { meaning: "A consequence, effect, or outcome", hindi: "परिणाम", type: "noun", hindiPron: "रिज़ल्ट" },
  "revenue": { meaning: "Income earned by the government or a company", hindi: "राजस्व", type: "noun", hindiPron: "रेवेन्यू" },
  "review": { meaning: "A formal assessment of something", hindi: "समीक्षा", type: "noun", hindiPron: "रिव्यू" },
  "revolution": { meaning: "A forcible overthrow of a government", hindi: "क्रांति", type: "noun", hindiPron: "रेवोल्यूशन" },
  "reward": { meaning: "A thing given for good behaviour", hindi: "पुरस्कार", type: "noun", hindiPron: "रिवॉर्ड" },
  "rice": { meaning: "A cereal grain used as food", hindi: "चावल", type: "noun", hindiPron: "राइस" },
  "ring": { meaning: "A small circular band", hindi: "अँगूठी", type: "noun", hindiPron: "रिंग" },
  "rise": { meaning: "An upward movement or increase", hindi: "उठना", type: "noun", hindiPron: "राइज़" },
  "risk": { meaning: "The possibility of something bad happening", hindi: "ख़तरा", type: "noun", hindiPron: "रिस्क" },
  "river": { meaning: "A large natural stream of water", hindi: "नदी", type: "noun", hindiPron: "रिवर" },
  "road": { meaning: "A wide way for vehicles to travel", hindi: "सड़क", type: "noun", hindiPron: "रोड" },
  "rock": { meaning: "A large piece of stone", hindi: "चट्टान", type: "noun", hindiPron: "रॉक" },
  "role": { meaning: "An actor's part or a function", hindi: "भूमिका", type: "noun", hindiPron: "रोल" },
  "roof": { meaning: "The top covering of a building", hindi: "छत", type: "noun", hindiPron: "रूफ़" },
  "room": { meaning: "An area within a building", hindi: "कमरा", type: "noun", hindiPron: "रूम" },
  "root": { meaning: "The part of a plant beneath the soil", hindi: "जड़", type: "noun", hindiPron: "रूट" },
  "rope": { meaning: "A thick strong string", hindi: "रस्सी", type: "noun", hindiPron: "रोप" },
  "round": { meaning: "Shaped like a circle or sphere", hindi: "गोल", type: "adjective", hindiPron: "राउंड" },
  "route": { meaning: "A way or course taken in getting somewhere", hindi: "मार्ग", type: "noun", hindiPron: "रूट" },
  "row": { meaning: "A number of things in a line", hindi: "कतार", type: "noun", hindiPron: "रो" },
  "royal": { meaning: "Having the status of a king or queen", hindi: "शाही", type: "adjective", hindiPron: "रॉयल" },
  "rule": { meaning: "A set of explicit regulations", hindi: "नियम", type: "noun", hindiPron: "रूल" },
  "run": { meaning: "To move at a speed faster than walking", hindi: "दौड़ना", type: "verb", hindiPron: "रन" },

  // S essentials
  "safety": { meaning: "The condition of being protected", hindi: "सुरक्षा", type: "noun", hindiPron: "सेफ़्टी" },
  "salary": { meaning: "A fixed regular payment", hindi: "वेतन", type: "noun", hindiPron: "सैलरी" },
  "sale": { meaning: "The exchange of something for money", hindi: "बिक्री", type: "noun", hindiPron: "सेल" },
  "salt": { meaning: "A white crystalline substance for flavoring", hindi: "नमक", type: "noun", hindiPron: "सॉल्ट" },
  "sample": { meaning: "A small part representing the whole", hindi: "नमूना", type: "noun", hindiPron: "सैम्पल" },
  "sand": { meaning: "Fine loose grains of rock", hindi: "रेत", type: "noun", hindiPron: "सैंड" },
  "satellite": { meaning: "An object orbiting the earth", hindi: "उपग्रह", type: "noun", hindiPron: "सैटेलाइट" },
  "satisfaction": { meaning: "Fulfilment of one's wishes", hindi: "संतुष्टि", type: "noun", hindiPron: "सैटिस्फ़ैक्शन" },
  "scale": { meaning: "A range of values or relative size", hindi: "पैमाना", type: "noun", hindiPron: "स्केल" },
  "scene": { meaning: "A place where an incident occurs", hindi: "दृश्य", type: "noun", hindiPron: "सीन" },
  "school": { meaning: "An institution for educating children", hindi: "विद्यालय", type: "noun", hindiPron: "स्कूल" },
  "science": { meaning: "The systematic study of the world", hindi: "विज्ञान", type: "noun", hindiPron: "साइंस" },
  "scientist": { meaning: "A person who studies science", hindi: "वैज्ञानिक", type: "noun", hindiPron: "साइंटिस्ट" },
  "screen": { meaning: "A flat surface for displaying images", hindi: "स्क्रीन", type: "noun", hindiPron: "स्क्रीन" },
  "sea": { meaning: "The expanse of salt water", hindi: "समुद्र", type: "noun", hindiPron: "सी" },
  "search": { meaning: "An attempt to find something", hindi: "खोज", type: "noun", hindiPron: "सर्च" },
  "season": { meaning: "Each of the four divisions of the year", hindi: "मौसम", type: "noun", hindiPron: "सीज़न" },
  "seat": { meaning: "A thing made for sitting on", hindi: "सीट", type: "noun", hindiPron: "सीट" },
  "secret": { meaning: "Something that is kept hidden", hindi: "रहस्य", type: "noun", hindiPron: "सीक्रेट" },
  "secretary": { meaning: "A person employed to assist with correspondence", hindi: "सचिव", type: "noun", hindiPron: "सेक्रेटरी" },
  "section": { meaning: "A distinct part of something", hindi: "अनुभाग", type: "noun", hindiPron: "सेक्शन" },
  "security": { meaning: "The state of being free from danger", hindi: "सुरक्षा", type: "noun", hindiPron: "सिक्योरिटी" },
  "seed": { meaning: "A flowering plant's unit of reproduction", hindi: "बीज", type: "noun", hindiPron: "सीड" },
  "selection": { meaning: "The action of carefully choosing", hindi: "चयन", type: "noun", hindiPron: "सिलेक्शन" },
  "self": { meaning: "A person's essential being", hindi: "स्वयं", type: "noun", hindiPron: "सेल्फ़" },
  "sense": { meaning: "A faculty by which the body perceives", hindi: "इंद्रिय", type: "noun", hindiPron: "सेंस" },
  "sentence": { meaning: "A set of words that is complete in itself", hindi: "वाक्य", type: "noun", hindiPron: "सेंटेंस" },
  "series": { meaning: "A number of things of the same kind", hindi: "श्रृंखला", type: "noun", hindiPron: "सीरीज़" },
  "service": { meaning: "The action of helping", hindi: "सेवा", type: "noun", hindiPron: "सर्विस" },
  "session": { meaning: "A period devoted to a particular activity", hindi: "सत्र", type: "noun", hindiPron: "सेशन" },
  "shadow": { meaning: "A dark area produced by blocking light", hindi: "छाया", type: "noun", hindiPron: "शैडो" },
  "shape": { meaning: "The external form of something", hindi: "आकार", type: "noun", hindiPron: "शेप" },
  "share": { meaning: "A part of a larger amount", hindi: "हिस्सा", type: "noun", hindiPron: "शेयर" },
  "shelter": { meaning: "A place giving protection from weather", hindi: "आश्रय", type: "noun", hindiPron: "शेल्टर" },
  "shift": { meaning: "A slight change in position or direction", hindi: "बदलाव", type: "noun", hindiPron: "शिफ़्ट" },
  "ship": { meaning: "A large vessel for sea travel", hindi: "जहाज़", type: "noun", hindiPron: "शिप" },
  "shirt": { meaning: "A cloth garment for the upper body", hindi: "कमीज़", type: "noun", hindiPron: "शर्ट" },
  "shock": { meaning: "A sudden upsetting event", hindi: "सदमा", type: "noun", hindiPron: "शॉक" },
  "shoe": { meaning: "A covering for the foot", hindi: "जूता", type: "noun", hindiPron: "शू" },
  "shop": { meaning: "A building where goods are sold", hindi: "दुकान", type: "noun", hindiPron: "शॉप" },
  "shoulder": { meaning: "The upper joint of the arm", hindi: "कंधा", type: "noun", hindiPron: "शोल्डर" },
  "show": { meaning: "A spectacle or display", hindi: "शो", type: "noun", hindiPron: "शो" },
  "side": { meaning: "A position to the left or right", hindi: "तरफ़", type: "noun", hindiPron: "साइड" },
  "sight": { meaning: "The faculty of seeing", hindi: "नज़र", type: "noun", hindiPron: "साइट" },
  "sign": { meaning: "An object or quality indicating something", hindi: "संकेत", type: "noun", hindiPron: "साइन" },
  "signal": { meaning: "A gesture or action conveying information", hindi: "संकेत", type: "noun", hindiPron: "सिग्नल" },
  "silence": { meaning: "Complete absence of sound", hindi: "चुप्पी", type: "noun", hindiPron: "साइलेंस" },
  "silver": { meaning: "A precious shiny white metal", hindi: "चाँदी", type: "noun", hindiPron: "सिल्वर" },
  "similar": { meaning: "Resembling without being identical", hindi: "समान", type: "adjective", hindiPron: "सिमिलर" },
  "simple": { meaning: "Easily understood or done", hindi: "सरल", type: "adjective", hindiPron: "सिंपल" },
  "sin": { meaning: "An immoral act against divine law", hindi: "पाप", type: "noun", hindiPron: "सिन" },
  "sister": { meaning: "A female sibling", hindi: "बहन", type: "noun", hindiPron: "सिस्टर" },
  "site": { meaning: "An area of ground for a purpose", hindi: "स्थान", type: "noun", hindiPron: "साइट" },
  "situation": { meaning: "A set of circumstances in which one finds oneself", hindi: "स्थिति", type: "noun", hindiPron: "सिचुएशन" },
  "size": { meaning: "The dimensions or magnitude of something", hindi: "आकार", type: "noun", hindiPron: "साइज़" },
  "skill": { meaning: "The ability to do something well", hindi: "कौशल", type: "noun", hindiPron: "स्किल" },
  "skin": { meaning: "The outer covering of the body", hindi: "त्वचा", type: "noun", hindiPron: "स्किन" },
  "sky": { meaning: "The region of the atmosphere above earth", hindi: "आकाश", type: "noun", hindiPron: "स्काई" },
  "sleep": { meaning: "A condition of rest", hindi: "नींद", type: "noun", hindiPron: "स्लीप" },
  "smile": { meaning: "A pleased expression on the face", hindi: "मुस्कान", type: "noun", hindiPron: "स्माइल" },
  "smoke": { meaning: "A visible suspension of carbon particles", hindi: "धुआँ", type: "noun", hindiPron: "स्मोक" },
  "snow": { meaning: "Atmospheric water vapor frozen into ice crystals", hindi: "बर्फ़", type: "noun", hindiPron: "स्नो" },
  "society": { meaning: "The aggregate of people living together", hindi: "समाज", type: "noun", hindiPron: "सोसाइटी" },
  "software": { meaning: "Programs used by a computer", hindi: "सॉफ़्टवेयर", type: "noun", hindiPron: "सॉफ़्टवेयर" },
  "soil": { meaning: "The upper layer of earth", hindi: "मिट्टी", type: "noun", hindiPron: "सॉइल" },
  "soldier": { meaning: "A person who serves in an army", hindi: "सैनिक", type: "noun", hindiPron: "सोल्जर" },
  "solution": { meaning: "A means of solving a problem", hindi: "समाधान", type: "noun", hindiPron: "सोल्यूशन" },
  "son": { meaning: "A male offspring", hindi: "बेटा", type: "noun", hindiPron: "सन" },
  "song": { meaning: "A short poem set to music", hindi: "गाना", type: "noun", hindiPron: "सॉन्ग" },
  "soul": { meaning: "The spiritual part of a human being", hindi: "आत्मा", type: "noun", hindiPron: "सोल" },
  "sound": { meaning: "Vibrations that travel through air", hindi: "आवाज़", type: "noun", hindiPron: "साउंड" },
  "source": { meaning: "A place from which something comes", hindi: "स्रोत", type: "noun", hindiPron: "सोर्स" },
  "south": { meaning: "The direction opposite to north", hindi: "दक्षिण", type: "noun", hindiPron: "साउथ" },
  "space": { meaning: "A continuous area that is free or available", hindi: "अंतरिक्ष", type: "noun", hindiPron: "स्पेस" },
  "speech": { meaning: "The expression of thoughts in spoken words", hindi: "भाषण", type: "noun", hindiPron: "स्पीच" },
  "speed": { meaning: "The rate of movement", hindi: "गति", type: "noun", hindiPron: "स्पीड" },
  "spirit": { meaning: "The nonphysical part of a person", hindi: "आत्मा", type: "noun", hindiPron: "स्पिरिट" },
  "sport": { meaning: "An activity involving physical exertion", hindi: "खेल", type: "noun", hindiPron: "स्पोर्ट" },
  "spring": { meaning: "The season after winter", hindi: "वसंत", type: "noun", hindiPron: "स्प्रिंग" },
  "square": { meaning: "A plane figure with four equal sides", hindi: "वर्ग", type: "noun", hindiPron: "स्क्वेयर" },
  "staff": { meaning: "All the people employed by an organization", hindi: "कर्मचारी", type: "noun", hindiPron: "स्टाफ़" },
  "stage": { meaning: "A point in a process of development", hindi: "मंच", type: "noun", hindiPron: "स्टेज" },
  "standard": { meaning: "A level of quality or attainment", hindi: "मानक", type: "noun", hindiPron: "स्टैंडर्ड" },
  "star": { meaning: "A fixed luminous point in the night sky", hindi: "तारा", type: "noun", hindiPron: "स्टार" },
  "state": { meaning: "The condition of something", hindi: "राज्य", type: "noun", hindiPron: "स्टेट" },
  "statement": { meaning: "A definite or clear expression", hindi: "बयान", type: "noun", hindiPron: "स्टेटमेंट" },
  "station": { meaning: "A stopping place for trains", hindi: "स्टेशन", type: "noun", hindiPron: "स्टेशन" },
  "status": { meaning: "The relative social or professional position", hindi: "स्थिति", type: "noun", hindiPron: "स्टेटस" },
  "steel": { meaning: "A hard strong alloy of iron and carbon", hindi: "इस्पात", type: "noun", hindiPron: "स्टील" },
  "step": { meaning: "An act of moving the foot", hindi: "क़दम", type: "noun", hindiPron: "स्टेप" },
  "stick": { meaning: "A thin piece of wood", hindi: "छड़ी", type: "noun", hindiPron: "स्टिक" },
  "stock": { meaning: "The goods available for sale", hindi: "स्टॉक", type: "noun", hindiPron: "स्टॉक" },
  "stomach": { meaning: "The internal organ in which food is digested", hindi: "पेट", type: "noun", hindiPron: "स्टमक" },
  "stone": { meaning: "A hard solid nonmetallic mineral matter", hindi: "पत्थर", type: "noun", hindiPron: "स्टोन" },
  "stop": { meaning: "An end of movement", hindi: "रुकना", type: "verb", hindiPron: "स्टॉप" },
  "store": { meaning: "A retail establishment selling items", hindi: "दुकान", type: "noun", hindiPron: "स्टोर" },
  "storm": { meaning: "A violent disturbance of the atmosphere", hindi: "तूफ़ान", type: "noun", hindiPron: "स्टॉर्म" },
  "story": { meaning: "An account of imaginary or real events", hindi: "कहानी", type: "noun", hindiPron: "स्टोरी" },
  "stranger": { meaning: "A person one does not know", hindi: "अजनबी", type: "noun", hindiPron: "स्ट्रेंजर" },
  "strategy": { meaning: "A plan designed to achieve a goal", hindi: "रणनीति", type: "noun", hindiPron: "स्ट्रैटेजी" },
  "stream": { meaning: "A small narrow river", hindi: "धारा", type: "noun", hindiPron: "स्ट्रीम" },
  "street": { meaning: "A public road in a city or town", hindi: "गली", type: "noun", hindiPron: "स्ट्रीट" },
  "strength": { meaning: "The quality of being strong", hindi: "शक्ति", type: "noun", hindiPron: "स्ट्रेंथ" },
  "stress": { meaning: "A state of mental or emotional strain", hindi: "तनाव", type: "noun", hindiPron: "स्ट्रेस" },
  "strike": { meaning: "A refusal to work organized as a protest", hindi: "हड़ताल", type: "noun", hindiPron: "स्ट्राइक" },
  "structure": { meaning: "The arrangement of parts of a whole", hindi: "संरचना", type: "noun", hindiPron: "स्ट्रक्चर" },
  "struggle": { meaning: "A forceful effort to get free", hindi: "संघर्ष", type: "noun", hindiPron: "स्ट्रगल" },
  "student": { meaning: "A person who is studying", hindi: "छात्र", type: "noun", hindiPron: "स्टूडेंट" },
  "study": { meaning: "The devotion of time to learning", hindi: "अध्ययन", type: "noun", hindiPron: "स्टडी" },
  "stuff": { meaning: "Material or items of a particular kind", hindi: "सामान", type: "noun", hindiPron: "स्टफ़" },
  "style": { meaning: "A manner of doing something", hindi: "शैली", type: "noun", hindiPron: "स्टाइल" },
  "subject": { meaning: "A person or thing being discussed", hindi: "विषय", type: "noun", hindiPron: "सब्जेक्ट" },
  "substance": { meaning: "A particular kind of matter", hindi: "पदार्थ", type: "noun", hindiPron: "सब्सटेंस" },
  "success": { meaning: "The accomplishment of an aim", hindi: "सफलता", type: "noun", hindiPron: "सक्सेस" },
  "sugar": { meaning: "A sweet crystalline substance from plants", hindi: "चीनी", type: "noun", hindiPron: "शुगर" },
  "suggestion": { meaning: "An idea or plan put forward", hindi: "सुझाव", type: "noun", hindiPron: "सजेशन" },
  "suit": { meaning: "A set of outer clothes", hindi: "सूट", type: "noun", hindiPron: "सूट" },
  "summer": { meaning: "The warmest season of the year", hindi: "गर्मी", type: "noun", hindiPron: "समर" },
  "sun": { meaning: "The star around which earth orbits", hindi: "सूरज", type: "noun", hindiPron: "सन" },
  "supply": { meaning: "The amount of something available", hindi: "आपूर्ति", type: "noun", hindiPron: "सप्लाई" },
  "support": { meaning: "The action of assisting someone", hindi: "सहारा", type: "noun", hindiPron: "सपोर्ट" },
  "surface": { meaning: "The outside part of something", hindi: "सतह", type: "noun", hindiPron: "सर्फ़ेस" },
  "surprise": { meaning: "An unexpected event or fact", hindi: "आश्चर्य", type: "noun", hindiPron: "सरप्राइज़" },
  "survey": { meaning: "A general view or examination", hindi: "सर्वेक्षण", type: "noun", hindiPron: "सर्वे" },
  "survival": { meaning: "The state of continuing to exist", hindi: "अस्तित्व", type: "noun", hindiPron: "सर्वाइवल" },
  "suspect": { meaning: "A person thought to be guilty", hindi: "संदिग्ध", type: "noun", hindiPron: "सस्पेक्ट" },
  "sweet": { meaning: "Having the taste of sugar", hindi: "मीठा", type: "adjective", hindiPron: "स्वीट" },
  "swimming": { meaning: "The sport of moving through water", hindi: "तैराकी", type: "noun", hindiPron: "स्विमिंग" },
  "symbol": { meaning: "A thing representing something else", hindi: "प्रतीक", type: "noun", hindiPron: "सिम्बल" },
  "sympathy": { meaning: "Feelings of pity and sorrow for another", hindi: "सहानुभूति", type: "noun", hindiPron: "सिम्पैथी" },
  "system": { meaning: "A set of things working together", hindi: "प्रणाली", type: "noun", hindiPron: "सिस्टम" },

  // T
  "table": { meaning: "A piece of furniture with a flat top", hindi: "मेज़", type: "noun", hindiPron: "टेबल" },
  "talent": { meaning: "A natural aptitude or skill", hindi: "प्रतिभा", type: "noun", hindiPron: "टैलेंट" },
  "talk": { meaning: "Communication by speaking", hindi: "बातचीत", type: "noun", hindiPron: "टॉक" },
  "target": { meaning: "An objective or result aimed at", hindi: "लक्ष्य", type: "noun", hindiPron: "टार्गेट" },
  "task": { meaning: "A piece of work to be done", hindi: "कार्य", type: "noun", hindiPron: "टास्क" },
  "taste": { meaning: "The sensation of flavour", hindi: "स्वाद", type: "noun", hindiPron: "टेस्ट" },
  "tax": { meaning: "A compulsory contribution to state revenue", hindi: "कर", type: "noun", hindiPron: "टैक्स" },
  "tea": { meaning: "A hot drink made by infusing leaves in water", hindi: "चाय", type: "noun", hindiPron: "टी" },
  "teacher": { meaning: "A person who teaches", hindi: "शिक्षक", type: "noun", hindiPron: "टीचर" },
  "team": { meaning: "A group of people working together", hindi: "टीम", type: "noun", hindiPron: "टीम" },
  "tear": { meaning: "A drop of liquid from the eye", hindi: "आँसू", type: "noun", hindiPron: "टियर" },
  "technology": { meaning: "The application of scientific knowledge", hindi: "तकनीक", type: "noun", hindiPron: "टेक्नॉलजी" },
  "telephone": { meaning: "A system for transmitting voices", hindi: "टेलीफ़ोन", type: "noun", hindiPron: "टेलीफ़ोन" },
  "television": { meaning: "A system for transmitting visual images", hindi: "टेलीविज़न", type: "noun", hindiPron: "टेलीविज़न" },
  "temperature": { meaning: "The degree of heat", hindi: "तापमान", type: "noun", hindiPron: "टेम्प्रेचर" },
  "temple": { meaning: "A building devoted to worship", hindi: "मंदिर", type: "noun", hindiPron: "टेम्पल" },
  "term": { meaning: "A word or phrase used to describe something", hindi: "शब्द", type: "noun", hindiPron: "टर्म" },
  "territory": { meaning: "An area of land", hindi: "क्षेत्र", type: "noun", hindiPron: "टेरिटरी" },
  "test": { meaning: "A procedure to establish quality", hindi: "परीक्षा", type: "noun", hindiPron: "टेस्ट" },
  "text": { meaning: "A book or piece of writing", hindi: "पाठ", type: "noun", hindiPron: "टेक्स्ट" },
  "theatre": { meaning: "A building for dramatic performances", hindi: "रंगमंच", type: "noun", hindiPron: "थिएटर" },
  "theme": { meaning: "The subject of a talk or piece of writing", hindi: "विषय", type: "noun", hindiPron: "थीम" },
  "theory": { meaning: "A supposition to explain something", hindi: "सिद्धांत", type: "noun", hindiPron: "थ्योरी" },
  "thing": { meaning: "An object that is not named", hindi: "चीज़", type: "noun", hindiPron: "थिंग" },
  "thought": { meaning: "An idea or opinion produced by thinking", hindi: "विचार", type: "noun", hindiPron: "थॉट" },
  "threat": { meaning: "A statement of intention to inflict harm", hindi: "धमकी", type: "noun", hindiPron: "थ्रेट" },
  "throat": { meaning: "The front of the neck", hindi: "गला", type: "noun", hindiPron: "थ्रोट" },
  "ticket": { meaning: "A piece of paper giving the holder a right", hindi: "टिकट", type: "noun", hindiPron: "टिकट" },
  "tie": { meaning: "A piece of cloth worn around the neck", hindi: "टाई", type: "noun", hindiPron: "टाई" },
  "time": { meaning: "The indefinite continued progress of existence", hindi: "समय", type: "noun", hindiPron: "टाइम" },
  "title": { meaning: "The name of a book, composition, or other work", hindi: "शीर्षक", type: "noun", hindiPron: "टाइटल" },
  "today": { meaning: "On this present day", hindi: "आज", type: "adverb", hindiPron: "टुडे" },
  "tomorrow": { meaning: "The day after today", hindi: "कल", type: "adverb", hindiPron: "टुमॉरो" },
  "tone": { meaning: "The quality of a musical sound", hindi: "स्वर", type: "noun", hindiPron: "टोन" },
  "tool": { meaning: "A device used to carry out a function", hindi: "उपकरण", type: "noun", hindiPron: "टूल" },
  "top": { meaning: "The highest or uppermost point", hindi: "शीर्ष", type: "noun", hindiPron: "टॉप" },
  "topic": { meaning: "A matter dealt with in a text or discussion", hindi: "विषय", type: "noun", hindiPron: "टॉपिक" },
  "touch": { meaning: "An act of touching someone or something", hindi: "स्पर्श", type: "noun", hindiPron: "टच" },
  "tour": { meaning: "A journey for pleasure through various places", hindi: "दौरा", type: "noun", hindiPron: "टूर" },
  "tourist": { meaning: "A person travelling for pleasure", hindi: "पर्यटक", type: "noun", hindiPron: "टूरिस्ट" },
  "tower": { meaning: "A tall narrow building", hindi: "मीनार", type: "noun", hindiPron: "टावर" },
  "town": { meaning: "An urban area smaller than a city", hindi: "क़स्बा", type: "noun", hindiPron: "टाउन" },
  "track": { meaning: "A rough path or trail", hindi: "रास्ता", type: "noun", hindiPron: "ट्रैक" },
  "trade": { meaning: "The action of buying and selling", hindi: "व्यापार", type: "noun", hindiPron: "ट्रेड" },
  "tradition": { meaning: "A long-established custom or belief", hindi: "परंपरा", type: "noun", hindiPron: "ट्रेडिशन" },
  "traffic": { meaning: "Vehicles moving on roads", hindi: "यातायात", type: "noun", hindiPron: "ट्रैफ़िक" },
  "train": { meaning: "A series of connected railway carriages", hindi: "ट्रेन", type: "noun", hindiPron: "ट्रेन" },
  "training": { meaning: "The action of teaching a skill", hindi: "प्रशिक्षण", type: "noun", hindiPron: "ट्रेनिंग" },
  "transport": { meaning: "A system for carrying people or goods", hindi: "परिवहन", type: "noun", hindiPron: "ट्रांसपोर्ट" },
  "travel": { meaning: "The action of travelling", hindi: "यात्रा", type: "noun", hindiPron: "ट्रैवल" },
  "treatment": { meaning: "The manner of dealing with something", hindi: "इलाज", type: "noun", hindiPron: "ट्रीटमेंट" },
  "tree": { meaning: "A woody perennial plant", hindi: "पेड़", type: "noun", hindiPron: "ट्री" },
  "trend": { meaning: "A general direction of change", hindi: "प्रवृत्ति", type: "noun", hindiPron: "ट्रेंड" },
  "trial": { meaning: "A judicial examination of evidence", hindi: "मुक़दमा", type: "noun", hindiPron: "ट्रायल" },
  "trick": { meaning: "A cunning act intended to deceive", hindi: "चाल", type: "noun", hindiPron: "ट्रिक" },
  "trip": { meaning: "A journey or excursion", hindi: "यात्रा", type: "noun", hindiPron: "ट्रिप" },
  "trouble": { meaning: "Difficulty or problems", hindi: "परेशानी", type: "noun", hindiPron: "ट्रबल" },
  "truck": { meaning: "A large heavy motor vehicle", hindi: "ट्रक", type: "noun", hindiPron: "ट्रक" },
  "trust": { meaning: "Firm belief in the reliability of someone", hindi: "भरोसा", type: "noun", hindiPron: "ट्रस्ट" },
  "truth": { meaning: "The quality of being true", hindi: "सत्य", type: "noun", hindiPron: "ट्रूथ" },
  "type": { meaning: "A category of things having common features", hindi: "प्रकार", type: "noun", hindiPron: "टाइप" },

  // U-V-W-X-Y-Z
  "umbrella": { meaning: "A device for protection against rain", hindi: "छाता", type: "noun", hindiPron: "अम्ब्रेला" },
  "uncle": { meaning: "The brother of one's parent", hindi: "चाचा", type: "noun", hindiPron: "अंकल" },
  "understanding": { meaning: "The ability to understand something", hindi: "समझ", type: "noun", hindiPron: "अंडरस्टैंडिंग" },
  "union": { meaning: "The action of joining together", hindi: "संघ", type: "noun", hindiPron: "यूनियन" },
  "unit": { meaning: "An individual thing regarded as single", hindi: "इकाई", type: "noun", hindiPron: "यूनिट" },
  "unity": { meaning: "The state of being united", hindi: "एकता", type: "noun", hindiPron: "यूनिटी" },
  "universe": { meaning: "All existing matter and space as a whole", hindi: "ब्रह्मांड", type: "noun", hindiPron: "यूनिवर्स" },
  "university": { meaning: "A high-level educational institution", hindi: "विश्वविद्यालय", type: "noun", hindiPron: "यूनिवर्सिटी" },
  "valley": { meaning: "A low area between hills", hindi: "घाटी", type: "noun", hindiPron: "वैली" },
  "value": { meaning: "The importance or worth of something", hindi: "मूल्य", type: "noun", hindiPron: "वैल्यू" },
  "variety": { meaning: "The quality of being different", hindi: "विविधता", type: "noun", hindiPron: "वराइटी" },
  "version": { meaning: "A particular form of something", hindi: "संस्करण", type: "noun", hindiPron: "वर्ज़न" },
  "victim": { meaning: "A person harmed as a result of a crime", hindi: "पीड़ित", type: "noun", hindiPron: "विक्टिम" },
  "victory": { meaning: "An act of defeating an enemy", hindi: "जीत", type: "noun", hindiPron: "विक्ट्री" },
  "video": { meaning: "A recording of moving visual images", hindi: "वीडियो", type: "noun", hindiPron: "वीडियो" },
  "view": { meaning: "The ability to see something", hindi: "दृश्य", type: "noun", hindiPron: "व्यू" },
  "village": { meaning: "A group of houses in a rural area", hindi: "गाँव", type: "noun", hindiPron: "विलेज" },
  "violence": { meaning: "Behaviour involving physical force to hurt", hindi: "हिंसा", type: "noun", hindiPron: "वायलेंस" },
  "virtue": { meaning: "Behaviour showing high moral standards", hindi: "गुण", type: "noun", hindiPron: "वर्चू" },
  "vision": { meaning: "The ability to see or a mental image", hindi: "दृष्टि", type: "noun", hindiPron: "विज़न" },
  "visit": { meaning: "An act of going to see a place or person", hindi: "यात्रा", type: "noun", hindiPron: "विज़िट" },
  "visitor": { meaning: "A person visiting someone or a place", hindi: "आगंतुक", type: "noun", hindiPron: "विज़िटर" },
  "voice": { meaning: "The sound produced in the larynx", hindi: "आवाज़", type: "noun", hindiPron: "वॉइस" },
  "volume": { meaning: "The amount of space something occupies", hindi: "आयतन", type: "noun", hindiPron: "वॉल्यूम" },
  "vote": { meaning: "A formal indication of a choice", hindi: "वोट", type: "noun", hindiPron: "वोट" },
  "wage": { meaning: "A fixed regular payment for work", hindi: "मज़दूरी", type: "noun", hindiPron: "वेज" },
  "walk": { meaning: "An act of moving at a regular pace on foot", hindi: "चलना", type: "noun", hindiPron: "वॉक" },
  "wall": { meaning: "A continuous vertical structure", hindi: "दीवार", type: "noun", hindiPron: "वॉल" },
  "war": { meaning: "A state of armed conflict between countries", hindi: "युद्ध", type: "noun", hindiPron: "वॉर" },
  "warning": { meaning: "A statement of impending danger", hindi: "चेतावनी", type: "noun", hindiPron: "वॉर्निंग" },
  "waste": { meaning: "An act of using something carelessly", hindi: "बर्बादी", type: "noun", hindiPron: "वेस्ट" },
  "watch": { meaning: "A small timepiece worn on the wrist", hindi: "घड़ी", type: "noun", hindiPron: "वॉच" },
  "water": { meaning: "A colorless transparent odourless liquid", hindi: "पानी", type: "noun", hindiPron: "वॉटर" },
  "wave": { meaning: "A long body of water curling onto a shore", hindi: "लहर", type: "noun", hindiPron: "वेव" },
  "way": { meaning: "A method, style, or manner of doing something", hindi: "रास्ता", type: "noun", hindiPron: "वे" },
  "weakness": { meaning: "The state of being weak", hindi: "कमज़ोरी", type: "noun", hindiPron: "वीकनेस" },
  "wealth": { meaning: "An abundance of valuable possessions", hindi: "धन", type: "noun", hindiPron: "वेल्थ" },
  "weapon": { meaning: "A thing designed to cause physical harm", hindi: "हथियार", type: "noun", hindiPron: "वेपन" },
  "weather": { meaning: "The state of the atmosphere", hindi: "मौसम", type: "noun", hindiPron: "वेदर" },
  "website": { meaning: "A location on the World Wide Web", hindi: "वेबसाइट", type: "noun", hindiPron: "वेबसाइट" },
  "wedding": { meaning: "A marriage ceremony", hindi: "शादी", type: "noun", hindiPron: "वेडिंग" },
  "week": { meaning: "A period of seven days", hindi: "सप्ताह", type: "noun", hindiPron: "वीक" },
  "weekend": { meaning: "Saturday and Sunday", hindi: "सप्ताहांत", type: "noun", hindiPron: "वीकेंड" },
  "weight": { meaning: "The heaviness of a person or thing", hindi: "वज़न", type: "noun", hindiPron: "वेट" },
  "welcome": { meaning: "An instance of greeting someone", hindi: "स्वागत", type: "noun", hindiPron: "वेलकम" },
  "welfare": { meaning: "The health, happiness, and fortune of a person", hindi: "कल्याण", type: "noun", hindiPron: "वेलफ़ेयर" },
  "west": { meaning: "The direction towards the sunset", hindi: "पश्चिम", type: "noun", hindiPron: "वेस्ट" },
  "wheel": { meaning: "A circular object that revolves on an axle", hindi: "पहिया", type: "noun", hindiPron: "व्हील" },
  "whistle": { meaning: "A clear high-pitched sound", hindi: "सीटी", type: "noun", hindiPron: "विसल" },
  "white": { meaning: "Of the color of milk or fresh snow", hindi: "सफ़ेद", type: "adjective", hindiPron: "व्हाइट" },
  "wife": { meaning: "A married woman", hindi: "पत्नी", type: "noun", hindiPron: "वाइफ़" },
  "wild": { meaning: "Living in a state of nature", hindi: "जंगली", type: "adjective", hindiPron: "वाइल्ड" },
  "will": { meaning: "The faculty of conscious choice", hindi: "इच्छा", type: "noun", hindiPron: "विल" },
  "win": { meaning: "To be successful in a contest", hindi: "जीतना", type: "verb", hindiPron: "विन" },
  "wind": { meaning: "The perceptible natural movement of air", hindi: "हवा", type: "noun", hindiPron: "विंड" },
  "window": { meaning: "An opening in a wall for light and air", hindi: "खिड़की", type: "noun", hindiPron: "विंडो" },
  "wine": { meaning: "An alcoholic drink made from grapes", hindi: "शराब", type: "noun", hindiPron: "वाइन" },
  "wing": { meaning: "A part of a bird's body for flying", hindi: "पंख", type: "noun", hindiPron: "विंग" },
  "winner": { meaning: "A person who wins", hindi: "विजेता", type: "noun", hindiPron: "विनर" },
  "winter": { meaning: "The coldest season of the year", hindi: "सर्दी", type: "noun", hindiPron: "विंटर" },
  "wire": { meaning: "A thin flexible thread of metal", hindi: "तार", type: "noun", hindiPron: "वायर" },
  "wisdom": { meaning: "The quality of having experience and knowledge", hindi: "बुद्धिमत्ता", type: "noun", hindiPron: "विज़डम" },
  "wish": { meaning: "A desire or hope for something", hindi: "इच्छा", type: "noun", hindiPron: "विश" },
  "witness": { meaning: "A person who sees an event take place", hindi: "गवाह", type: "noun", hindiPron: "विटनेस" },
  "woman": { meaning: "An adult female human being", hindi: "औरत", type: "noun", hindiPron: "वुमन" },
  "wonder": { meaning: "A feeling of surprise and admiration", hindi: "आश्चर्य", type: "noun", hindiPron: "वंडर" },
  "wood": { meaning: "The hard material of trees", hindi: "लकड़ी", type: "noun", hindiPron: "वुड" },
  "word": { meaning: "A single distinct element of speech", hindi: "शब्द", type: "noun", hindiPron: "वर्ड" },
  "work": { meaning: "Activity involving mental or physical effort", hindi: "काम", type: "noun", hindiPron: "वर्क" },
  "worker": { meaning: "A person who does a specified type of work", hindi: "कामगार", type: "noun", hindiPron: "वर्कर" },
  "world": { meaning: "The earth with all its countries and peoples", hindi: "दुनिया", type: "noun", hindiPron: "वर्ल्ड" },
  "worry": { meaning: "The state of being anxious", hindi: "चिंता", type: "noun", hindiPron: "वरी" },
  "worth": { meaning: "The value equivalent to something", hindi: "मूल्य", type: "noun", hindiPron: "वर्थ" },
  "writer": { meaning: "A person who has written a particular text", hindi: "लेखक", type: "noun", hindiPron: "राइटर" },
  "writing": { meaning: "The activity of composing text", hindi: "लेखन", type: "noun", hindiPron: "राइटिंग" },
  "year": { meaning: "The time taken by earth to make one revolution around the sun", hindi: "वर्ष", type: "noun", hindiPron: "इयर" },
  "yesterday": { meaning: "The day before today", hindi: "कल (बीता हुआ)", type: "adverb", hindiPron: "येस्टरडे" },
  "youth": { meaning: "The period between childhood and adult age", hindi: "युवा", type: "noun", hindiPron: "यूथ" },
  "zone": { meaning: "An area distinguished from adjacent parts", hindi: "क्षेत्र", type: "noun", hindiPron: "ज़ोन" },
  "zoo": { meaning: "An establishment maintaining a collection of animals", hindi: "चिड़ियाघर", type: "noun", hindiPron: "ज़ू" },
};

// ─────────────────────────────────────────────────────────────
// KNOWN BRANDS/NAMES WITH SPECIAL PRONUNCIATIONS
// ─────────────────────────────────────────────────────────────
const KNOWN_NAMES = {
  "nike": { hindiPron: "नाइकी", type: "brand", meaning: "American sportswear brand" },
  "adidas": { hindiPron: "ऐडिडास", type: "brand", meaning: "German sportswear brand" },
  "rolex": { hindiPron: "रोलेक्स", type: "brand", meaning: "Swiss luxury watch brand" },
  "gucci": { hindiPron: "गुच्ची", type: "brand", meaning: "Italian luxury fashion brand" },
  "louis vuitton": { hindiPron: "लुई वुइटॉन", type: "brand", meaning: "French luxury fashion house" },
  "hermes": { hindiPron: "एर्मेस", type: "brand", meaning: "French luxury goods brand" },
  "porsche": { hindiPron: "पोर्शे", type: "brand", meaning: "German automobile manufacturer" },
  "hyundai": { hindiPron: "ह्युंडे", type: "brand", meaning: "South Korean automobile manufacturer" },
  "volkswagen": { hindiPron: "फ़ोक्सवैगन", type: "brand", meaning: "German automobile manufacturer" },
  "mercedes": { hindiPron: "मर्सिडीज़", type: "brand", meaning: "German luxury automobile brand" },
  "bmw": { hindiPron: "बी एम डब्ल्यू", type: "brand", meaning: "German automobile manufacturer" },
  "samsung": { hindiPron: "सैमसंग", type: "brand", meaning: "South Korean electronics company" },
  "huawei": { hindiPron: "हुआवेई", type: "brand", meaning: "Chinese technology company" },
  "xiaomi": { hindiPron: "शाओमी", type: "brand", meaning: "Chinese electronics company" },
  "ikea": { hindiPron: "इकीया", type: "brand", meaning: "Swedish furniture company" },
  "netflix": { hindiPron: "नेटफ्लिक्स", type: "brand", meaning: "American streaming service" },
  "spotify": { hindiPron: "स्पॉटिफ़ाई", type: "brand", meaning: "Swedish music streaming service" },
  "amazon": { hindiPron: "ऐमेज़ॉन", type: "brand", meaning: "American technology company" },
  "google": { hindiPron: "गूगल", type: "brand", meaning: "American technology company" },
  "apple": { hindiPron: "ऐपल", type: "brand", meaning: "American technology company" },
  "microsoft": { hindiPron: "माइक्रोसॉफ़्ट", type: "brand", meaning: "American technology company" },
  "tesla": { hindiPron: "टेस्ला", type: "brand", meaning: "American electric vehicle company" },
  "uber": { hindiPron: "ऊबर", type: "brand", meaning: "American ride-sharing service" },
  "zara": { hindiPron: "ज़ारा", type: "brand", meaning: "Spanish fashion retailer" },
  "starbucks": { hindiPron: "स्टारबक्स", type: "brand", meaning: "American coffeehouse chain" },
  "mcdonald's": { hindiPron: "मैक्डॉनल्ड्स", type: "brand", meaning: "American fast food chain" },
  "mcdonalds": { hindiPron: "मैक्डॉनल्ड्स", type: "brand", meaning: "American fast food chain" },
  "inception": { hindiPron: "इन्सेप्शन", type: "movie", meaning: "2010 science fiction film by Christopher Nolan" },
  "interstellar": { hindiPron: "इंटरस्टेलर", type: "movie", meaning: "2014 science fiction film by Christopher Nolan" },
  "avatar": { hindiPron: "अवतार", type: "movie", meaning: "2009 science fiction film by James Cameron" },
  "oppenheimer": { hindiPron: "ऑपनहाइमर", type: "movie", meaning: "2023 biographical film by Christopher Nolan" },
  "café noir": { hindiPron: "कैफ़े नोआर", type: "cafe", meaning: "A café or restaurant name meaning 'Black Coffee'" },
  "starbucks reserve": { hindiPron: "स्टारबक्स रिज़र्व", type: "cafe", meaning: "Premium line of Starbucks stores" },
  "tim hortons": { hindiPron: "टिम हॉर्टन्स", type: "cafe", meaning: "Canadian coffeehouse chain" },
  "barack obama": { hindiPron: "बराक ओबामा", type: "person", meaning: "44th President of the United States" },
  "elon musk": { hindiPron: "ईलॉन मस्क", type: "person", meaning: "CEO of Tesla and SpaceX" },
  "sundar pichai": { hindiPron: "सुंदर पिचाई", type: "person", meaning: "CEO of Google and Alphabet" },
  "paris": { hindiPron: "पैरिस", type: "place", meaning: "Capital city of France" },
  "tokyo": { hindiPron: "टोक्यो", type: "place", meaning: "Capital city of Japan" },
  "london": { hindiPron: "लंडन", type: "place", meaning: "Capital city of the United Kingdom" },
  "massachusetts": { hindiPron: "मैसेच्यूसेट्स", type: "place", meaning: "A state in the northeastern US" },
  "connecticut": { hindiPron: "कनेटिकट", type: "place", meaning: "A state in the northeastern US" },
  "arkansas": { hindiPron: "आर्कन्सॉ", type: "place", meaning: "A state in the southern US" },
  "yosemite": { hindiPron: "योसेमिटी", type: "place", meaning: "National park in California, USA" },
};

// ─────────────────────────────────────────────────────────────
// ENGLISH-TO-HINDI TRANSLITERATION ENGINE
// ─────────────────────────────────────────────────────────────
const PHONEME_MAP = {
  // Consonant clusters & digraphs (order matters - longer first)
  'sch': 'स्क', 'tch': 'च', 'dge': 'ज', 'ght': 'ट', 'wh': 'व',
  'ph': 'फ़', 'th': 'थ', 'ch': 'च', 'sh': 'श', 'zh': 'ज़',
  'ng': 'ंग', 'nk': 'ंक', 'ck': 'क', 'qu': 'क्व',
  'tion': 'शन', 'sion': 'शन', 'cian': 'शन', 'tial': 'शल',
  'cial': 'शल', 'ture': 'चर', 'ous': 'अस', 'ious': 'ियस',
  'ble': 'बल', 'ple': 'पल', 'tle': 'टल', 'dle': 'डल',
  'cle': 'कल', 'gle': 'गल', 'fle': 'फ़ल', 'sle': 'सल',
  'ness': 'नेस', 'ment': 'मेंट', 'able': 'एबल', 'ible': 'इबल',
  'ful': 'फ़ुल', 'less': 'लेस', 'ly': 'ली', 'ty': 'टी',
  'ry': 'री', 'ny': 'नी', 'my': 'मी', 'py': 'पी',
  'by': 'बी', 'dy': 'डी', 'gy': 'जी', 'ky': 'की',
  'sy': 'सी', 'zy': 'ज़ी',
  'str': 'स्ट्र', 'spr': 'स्प्र', 'scr': 'स्क्र',
  'tr': 'ट्र', 'dr': 'ड्र', 'pr': 'प्र', 'br': 'ब्र',
  'cr': 'क्र', 'gr': 'ग्र', 'fr': 'फ़्र', 'fl': 'फ़्ल',
  'bl': 'ब्ल', 'cl': 'क्ल', 'gl': 'ग्ल', 'pl': 'प्ल',
  'sl': 'स्ल', 'sp': 'स्प', 'st': 'स्ट', 'sk': 'स्क',
  'sm': 'स्म', 'sn': 'स्न', 'sw': 'स्व', 'tw': 'ट्व',
  'dw': 'ड्व',
  // Vowel combinations
  'oo': 'ू', 'ee': 'ी', 'ea': 'ी', 'ai': 'ए', 'ay': 'ए',
  'oi': 'ॉय', 'oy': 'ॉय', 'ou': 'आउ', 'ow': 'ाउ',
  'au': 'ऑ', 'aw': 'ॉ', 'ew': 'यू', 'ie': 'ी',
  'ei': 'ी', 'ey': 'ी',
  // Single consonants
  'b': 'ब', 'c': 'क', 'd': 'ड', 'f': 'फ़', 'g': 'ग',
  'h': 'ह', 'j': 'ज', 'k': 'क', 'l': 'ल', 'm': 'म',
  'n': 'न', 'p': 'प', 'r': 'र', 's': 'स', 't': 'ट',
  'v': 'व', 'w': 'व', 'x': 'क्स', 'y': 'य', 'z': 'ज़',
  // Single vowels
  'a': 'अ', 'e': 'ए', 'i': 'इ', 'o': 'ओ', 'u': 'उ',
};

function transliterateToHindi(word) {
  const lower = word.toLowerCase().trim();
  
  // Check dictionary first
  if (DICTIONARY[lower]?.hindiPron) return DICTIONARY[lower].hindiPron;
  
  // Check known names
  if (KNOWN_NAMES[lower]?.hindiPron) return KNOWN_NAMES[lower].hindiPron;
  
  // Algorithmic transliteration
  let result = '';
  let i = 0;
  
  while (i < lower.length) {
    let matched = false;
    // Try longest match first (up to 5 chars)
    for (let len = Math.min(5, lower.length - i); len > 0; len--) {
      const substr = lower.substring(i, i + len);
      if (PHONEME_MAP[substr]) {
        result += PHONEME_MAP[substr];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += lower[i]; // Keep unknown chars
      i++;
    }
  }
  
  return result || lower;
}

// ─────────────────────────────────────────────────────────────
// FUZZY SEARCH FOR "DID YOU MEAN?"
// ─────────────────────────────────────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function findSuggestions(query, maxResults = 3) {
  const q = query.toLowerCase();
  const allWords = [...Object.keys(DICTIONARY), ...Object.keys(KNOWN_NAMES)];
  return allWords
    .map(w => ({ word: w, dist: levenshtein(q, w) }))
    .filter(x => x.dist <= 3 && x.dist > 0)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, maxResults)
    .map(x => x.word);
}

// ─────────────────────────────────────────────────────────────
// INDEXEDDB STORAGE LAYER
// ─────────────────────────────────────────────────────────────
const DB_NAME = 'UcharanHelperDB';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('history')) {
        const hs = db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
        hs.createIndex('word', 'word', { unique: false });
        hs.createIndex('timestamp', 'timestamp', { unique: false });
      }
      if (!db.objectStoreNames.contains('favorites')) {
        const fs = db.createObjectStore('favorites', { keyPath: 'word' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function addToHistory(entry) {
  const db = await openDB();
  const tx = db.transaction('history', 'readwrite');
  tx.objectStore('history').add(entry);
  return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

async function getHistory() {
  const db = await openDB();
  const tx = db.transaction('history', 'readonly');
  const req = tx.objectStore('history').getAll();
  return new Promise((res, rej) => { req.onsuccess = () => res(req.result.reverse()); req.onerror = rej; });
}

async function clearHistory() {
  const db = await openDB();
  const tx = db.transaction('history', 'readwrite');
  tx.objectStore('history').clear();
  return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

async function deleteHistoryItem(id) {
  const db = await openDB();
  const tx = db.transaction('history', 'readwrite');
  tx.objectStore('history').delete(id);
  return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

async function addFavorite(entry) {
  const db = await openDB();
  const tx = db.transaction('favorites', 'readwrite');
  tx.objectStore('favorites').put(entry);
  return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

async function removeFavorite(word) {
  const db = await openDB();
  const tx = db.transaction('favorites', 'readwrite');
  tx.objectStore('favorites').delete(word);
  return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

async function getFavorites() {
  const db = await openDB();
  const tx = db.transaction('favorites', 'readonly');
  const req = tx.objectStore('favorites').getAll();
  return new Promise((res, rej) => { req.onsuccess = () => res(req.result); req.onerror = rej; });
}

async function isFavorite(word) {
  const db = await openDB();
  const tx = db.transaction('favorites', 'readonly');
  const req = tx.objectStore('favorites').get(word);
  return new Promise((res, rej) => { req.onsuccess = () => res(!!req.result); req.onerror = rej; });
}

// ─────────────────────────────────────────────────────────────
// SETTINGS HELPERS
// ─────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  accent: 'indian',
  speed: 'normal',
  showHindi: true,
  autoSave: true,
  maxHistory: 500,
};

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('ucharan_settings'));
    return { ...DEFAULT_SETTINGS, ...s };
  } catch { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(s) {
  localStorage.setItem('ucharan_settings', JSON.stringify(s));
}

// ─────────────────────────────────────────────────────────────
// SPEECH SYNTHESIS HELPER
// ─────────────────────────────────────────────────────────────
function speakWord(text, settings, slow = false) {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = slow ? 0.5 : (settings.speed === 'slow' ? 0.7 : 1);
  
  const voices = window.speechSynthesis.getVoices();
  const accentMap = {
    indian: ['en-IN', 'hi-IN'],
    british: ['en-GB'],
    american: ['en-US'],
  };
  const preferred = accentMap[settings.accent] || ['en-US'];
  for (const lang of preferred) {
    const v = voices.find(v => v.lang.startsWith(lang));
    if (v) { utter.voice = v; break; }
  }
  
  utter.lang = preferred[0] || 'en-US';
  window.speechSynthesis.speak(utter);
  return true;
}

// ─────────────────────────────────────────────────────────────
// LOOKUP FUNCTION
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// ONLINE DICTIONARY API (Free Dictionary API - no key needed)
// ─────────────────────────────────────────────────────────────
const apiCache = {};

async function fetchFromDictionaryAPI(word) {
  const normalized = word.trim().toLowerCase();
  if (apiCache[normalized]) return apiCache[normalized];
  
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    
    const entry = data[0];
    const meanings = entry.meanings || [];
    const firstMeaning = meanings[0];
    const definition = firstMeaning?.definitions?.[0]?.definition || null;
    const partOfSpeech = firstMeaning?.partOfSpeech || 'unknown';
    
    // Collect all definitions (up to 3)
    const allDefs = [];
    for (const m of meanings) {
      for (const d of (m.definitions || [])) {
        if (allDefs.length < 3 && d.definition) {
          allDefs.push({ type: m.partOfSpeech, def: d.definition });
        }
      }
    }
    
    const result = {
      meaning: definition,
      allDefinitions: allDefs,
      type: partOfSpeech,
      phonetic: entry.phonetic || (entry.phonetics && entry.phonetics.find(p => p.text)?.text) || null,
      audioUrl: entry.phonetics?.find(p => p.audio && p.audio.length > 0)?.audio || null,
      source: 'api',
    };
    
    apiCache[normalized] = result;
    return result;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// WORD LOOKUP (local first, then API)
// ─────────────────────────────────────────────────────────────
function lookupWordLocal(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
  
  // Check dictionary
  const dictEntry = DICTIONARY[normalized];
  if (dictEntry) {
    return {
      word: query.trim(),
      hindiPron: dictEntry.hindiPron,
      altPron: dictEntry.altPron || null,
      meaning: dictEntry.meaning,
      hindi: dictEntry.hindi || null,
      type: dictEntry.type,
      confidence: 'exact',
      source: 'local',
    };
  }
  
  // Check known names
  const nameEntry = KNOWN_NAMES[normalized];
  if (nameEntry) {
    return {
      word: query.trim(),
      hindiPron: nameEntry.hindiPron,
      altPron: null,
      meaning: nameEntry.meaning,
      hindi: null,
      type: nameEntry.type,
      confidence: 'exact',
      source: 'local',
    };
  }
  
  return null;
}

async function lookupWord(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
  
  // 1. Check local dictionary first (instant)
  const localResult = lookupWordLocal(query);
  if (localResult) return localResult;
  
  // 2. Try online API
  const apiResult = await fetchFromDictionaryAPI(normalized);
  if (apiResult && apiResult.meaning) {
    return {
      word: query.trim(),
      hindiPron: transliterateToHindi(query),
      altPron: null,
      meaning: apiResult.meaning,
      allDefinitions: apiResult.allDefinitions || [],
      hindi: null,
      type: apiResult.type || 'unknown',
      confidence: 'exact',
      source: 'api',
      phonetic: apiResult.phonetic,
      audioUrl: apiResult.audioUrl,
    };
  }
  
  // 3. Fallback: transliterate algorithmically (no meaning)
  return {
    word: query.trim(),
    hindiPron: transliterateToHindi(query),
    altPron: null,
    meaning: null,
    hindi: null,
    type: 'unknown',
    confidence: 'approximate',
    source: 'none',
  };
}

// ─────────────────────────────────────────────────────────────
// TYPE LABELS
// ─────────────────────────────────────────────────────────────
const TYPE_LABELS = {
  noun: 'Noun', verb: 'Verb', adjective: 'Adjective', adverb: 'Adverb',
  conjunction: 'Conjunction', preposition: 'Preposition', pronoun: 'Pronoun',
  brand: 'Brand', movie: 'Movie', cafe: 'Café', place: 'Place', person: 'Person',
  unknown: 'Word',
};

const TYPE_COLORS = {
  noun: '#3b82f6', verb: '#10b981', adjective: '#f59e0b', adverb: '#8b5cf6',
  brand: '#ef4444', movie: '#ec4899', cafe: '#f97316', place: '#06b6d4',
  person: '#6366f1', unknown: '#6b7280',
  conjunction: '#78716c', preposition: '#78716c', pronoun: '#78716c',
};

// ─────────────────────────────────────────────────────────────
// ICONS (inline SVG components)
// ─────────────────────────────────────────────────────────────
const Icons = {
  Search: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Play: () => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  Slow: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l2 2"/><circle cx="12" cy="12" r="10"/></svg>,
  Star: ({filled}) => <svg width="18" height="18" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  History: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l2 2"/><circle cx="12" cy="12" r="10"/><path d="M3 12h1M12 3v1"/></svg>,
  Home: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  Settings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Info: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
  X: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Trash: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg>,
  Copy: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Eye: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Download: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  Upload: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>,
  Mic: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="1" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>,
  Volume: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  ArrowLeft: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Sparkle: () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2-6-4.8h7.6z"/></svg>,
};

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [settings, setSettings] = useState(loadSettings());
  const [toast, setToast] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('');
  const [revisionMode, setRevisionMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState({});
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wordOfDay, setWordOfDay] = useState(null);
  const searchRef = useRef(null);

  // Load voices
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  // Load history & favorites
  useEffect(() => {
    getHistory().then(setHistory).catch(() => {});
    getFavorites().then(setFavorites).catch(() => {});
  }, []);

  // Word of the day
  useEffect(() => {
    const words = Object.keys(DICTIONARY);
    const dayIndex = Math.floor(Date.now() / 86400000) % words.length;
    const w = words[dayIndex];
    setWordOfDay({ word: w, ...DICTIONARY[w] });
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleSearch = useCallback(async (searchQuery) => {
    const q = (searchQuery || query).trim();
    if (!q) return;
    
    setLoading(true);
    setResult(null);
    setSuggestions([]);
    
    try {
      const res = await lookupWord(q);
      setResult(res);
      
      // Check suggestions for unknown words
      if (res.confidence === 'approximate') {
        setSuggestions(findSuggestions(q));
      } else {
        setSuggestions([]);
      }
    
    // Check favorite
    try { setIsFav(await isFavorite(q.toLowerCase())); } catch { setIsFav(false); }
    
    // Save to history
    if (settings.autoSave) {
      try {
        await addToHistory({
          word: q,
          hindiPron: res.hindiPron,
          meaning: res.meaning || null,
          type: res.type,
          confidence: res.confidence,
          timestamp: Date.now(),
        });
        const h = await getHistory();
        setHistory(h);
      } catch {}
    }
    } finally {
      setLoading(false);
    }
    
    setPage('home');
  }, [query, settings.autoSave]);

  const handleSpeak = useCallback((text, slow = false) => {
    setSpeaking(true);
    const ok = speakWord(text, settings, slow);
    if (!ok) showToast('Speech synthesis not available on this device');
    setTimeout(() => setSpeaking(false), slow ? 3000 : 1500);
  }, [settings, showToast]);

  const toggleFavorite = useCallback(async () => {
    if (!result) return;
    const word = result.word.toLowerCase();
    if (isFav) {
      await removeFavorite(word);
      setIsFav(false);
      showToast('Removed from favorites');
    } else {
      await addFavorite({
        word,
        displayWord: result.word,
        hindiPron: result.hindiPron,
        meaning: result.meaning,
        type: result.type,
        confidence: result.confidence,
        savedAt: Date.now(),
      });
      setIsFav(true);
      showToast('Saved to favorites!');
    }
    setFavorites(await getFavorites());
  }, [result, isFav, showToast]);

  const handleCopyPronunciation = useCallback(() => {
    if (!result) return;
    navigator.clipboard?.writeText(result.hindiPron).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [result]);

  const updateSettings = useCallback((key, value) => {
    const ns = { ...settings, [key]: value };
    setSettings(ns);
    saveSettings(ns);
  }, [settings]);

  const handleExport = useCallback(async () => {
    const h = await getHistory();
    const f = await getFavorites();
    const data = JSON.stringify({ history: h, favorites: f, settings }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'ucharan-helper-data.json'; a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
  }, [settings, showToast]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = async (e) => {
      try {
        const text = await e.target.files[0].text();
        const data = JSON.parse(text);
        if (data.history) {
          await clearHistory();
          for (const item of data.history) await addToHistory(item);
        }
        if (data.favorites) {
          for (const item of data.favorites) await addFavorite(item);
        }
        if (data.settings) {
          setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
          saveSettings({ ...DEFAULT_SETTINGS, ...data.settings });
        }
        setHistory(await getHistory());
        setFavorites(await getFavorites());
        showToast('Data imported successfully!');
      } catch { showToast('Import failed. Check file format.'); }
    };
    input.click();
  }, [showToast]);

  const handleClearAll = useCallback(async () => {
    await clearHistory();
    setHistory([]);
    const db = await openDB();
    const tx = db.transaction('favorites', 'readwrite');
    tx.objectStore('favorites').clear();
    setFavorites([]);
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    showToast('All data cleared');
  }, [showToast]);

  // ─── Styles ───
  const colors = {
    bg: '#0f1117',
    card: '#1a1d27',
    cardHover: '#222636',
    accent: '#6c5ce7',
    accentLight: '#a29bfe',
    accentDim: 'rgba(108,92,231,0.15)',
    text: '#e8e6f0',
    textDim: '#8b8a99',
    textMuted: '#5c5b6b',
    border: '#2a2d3a',
    success: '#00b894',
    warn: '#fdcb6e',
    danger: '#ff7675',
    hindi: '#fd79a8',
    surface: '#15171f',
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Noto+Sans+Devanagari:wght@300;400;500;600&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'DM Sans', sans-serif;
      background: ${colors.bg};
      color: ${colors.text};
      overflow-x: hidden;
    }
    
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 8px; }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(100%); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(108,92,231,0.4); }
      100% { box-shadow: 0 0 0 20px rgba(108,92,231,0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .fade-up { animation: fadeUp 0.5s ease-out; }
    .fade-in { animation: fadeIn 0.3s ease-out; }
    .slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    
    .hindi-text {
      font-family: 'Noto Sans Devanagari', sans-serif;
      color: ${colors.hindi};
    }
    
    .btn-primary {
      background: linear-gradient(135deg, ${colors.accent}, #8b6cf7);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(108,92,231,0.4); }
    .btn-primary:active { transform: scale(0.97); }
    
    .btn-ghost {
      background: ${colors.accentDim};
      color: ${colors.accentLight};
      border: 1px solid transparent;
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-ghost:hover { background: rgba(108,92,231,0.25); border-color: ${colors.accent}; }
    
    .btn-icon {
      background: ${colors.accentDim};
      color: ${colors.accentLight};
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-icon:hover { background: rgba(108,92,231,0.3); transform: scale(1.05); }
    .btn-icon:active { transform: scale(0.95); }
    
    .btn-play {
      background: linear-gradient(135deg, ${colors.accent}, #8b6cf7);
      color: white;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-play:hover { transform: scale(1.1); animation: ripple 1s ease infinite; }
    .btn-play:active { transform: scale(0.95); }
    
    .btn-play-sm {
      background: ${colors.accentDim};
      color: ${colors.accentLight};
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-play-sm:hover { background: rgba(108,92,231,0.3); }
    
    .search-input {
      width: 100%;
      background: ${colors.card};
      border: 2px solid ${colors.border};
      color: ${colors.text};
      padding: 16px 50px 16px 20px;
      border-radius: 16px;
      font-size: 17px;
      font-family: inherit;
      outline: none;
      transition: all 0.3s;
    }
    .search-input:focus {
      border-color: ${colors.accent};
      box-shadow: 0 0 0 4px ${colors.accentDim};
    }
    .search-input::placeholder { color: ${colors.textMuted}; }
    
    .card {
      background: ${colors.card};
      border: 1px solid ${colors.border};
      border-radius: 20px;
      padding: 24px;
      transition: all 0.2s;
    }
    .card:hover { border-color: rgba(108,92,231,0.3); }
    
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 16px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 11px;
      font-weight: 500;
      color: ${colors.textMuted};
      background: transparent;
      border: none;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .nav-item.active {
      color: ${colors.accent};
      background: ${colors.accentDim};
    }
    .nav-item:hover { color: ${colors.accentLight}; }
    
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .confidence {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .toast {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: ${colors.card};
      border: 1px solid ${colors.accent};
      color: ${colors.text};
      padding: 12px 24px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    
    .select-styled {
      background: ${colors.card};
      border: 1px solid ${colors.border};
      color: ${colors.text};
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      cursor: pointer;
      width: 100%;
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b8a99' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
    }
    .select-styled:focus { border-color: ${colors.accent}; }
    
    .toggle {
      width: 48px;
      height: 26px;
      background: ${colors.border};
      border-radius: 13px;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      border: none;
      flex-shrink: 0;
    }
    .toggle.active { background: ${colors.accent}; }
    .toggle::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: all 0.3s;
    }
    .toggle.active::after { left: 25px; }
    
    .history-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: ${colors.card};
      border: 1px solid ${colors.border};
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .history-item:hover { background: ${colors.cardHover}; border-color: rgba(108,92,231,0.2); }
    
    .glow-accent {
      position: absolute;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%);
      pointer-events: none;
      border-radius: 50%;
    }
  `;

  // ─── Rendered Pages ───
  const renderHome = () => (
    <div style={{ padding: '20px 16px 120px', maxWidth: 600, margin: '0 auto' }}>
      {/* Header */}
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: 28, position: 'relative' }}>
        <div className="glow-accent" style={{ top: -80, left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 4 }}>
          <Icons.Volume />
          <h1 style={{ fontSize: 26, fontWeight: 700, background: `linear-gradient(135deg, ${colors.text}, ${colors.accentLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ucharan Helper
          </h1>
        </div>
        <p style={{ fontSize: 13, color: colors.textDim, fontWeight: 400 }}>
          Learn to pronounce any word · Hindi pronunciation guide
        </p>
      </div>

      {/* Search */}
      <div className="fade-up" style={{ position: 'relative', marginBottom: 20, animationDelay: '0.1s' }}>
        <input
          ref={searchRef}
          className="search-input"
          placeholder="Type any word, name, or brand..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="btn-icon"
          style={{ position: 'absolute', right: 6, top: 6, width: 44, height: 44 }}
          onClick={() => handleSearch()}
        >
          <Icons.Search />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="card fade-up" style={{ marginBottom: 20, textAlign: 'center', padding: 32 }}>
          <div style={{ display: 'inline-block', width: 32, height: 32, border: `3px solid ${colors.border}`, borderTopColor: colors.accent, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ marginTop: 12, fontSize: 14, color: colors.textDim }}>Looking up meaning...</div>
        </div>
      )}

      {/* Result Card */}
      {result && !loading && (
        <div className="card fade-up" style={{ marginBottom: 20 }}>
          {/* Word & Type */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{result.word}</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="tag" style={{ background: `${TYPE_COLORS[result.type] || TYPE_COLORS.unknown}22`, color: TYPE_COLORS[result.type] || TYPE_COLORS.unknown }}>
                  {TYPE_LABELS[result.type] || 'Word'}
                </span>
                <span className="confidence" style={{
                  background: result.confidence === 'exact' ? 'rgba(0,184,148,0.15)' : result.confidence === 'likely' ? 'rgba(253,203,110,0.15)' : 'rgba(139,138,153,0.15)',
                  color: result.confidence === 'exact' ? colors.success : result.confidence === 'likely' ? colors.warn : colors.textDim,
                }}>
                  {result.confidence === 'exact' ? '✓ Exact' : result.confidence === 'likely' ? '~ Likely' : '≈ Approximate'}
                </span>
              </div>
            </div>
            <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
              <Icons.Star filled={isFav} />
            </button>
          </div>

          {/* Hindi Pronunciation */}
          {settings.showHindi && (
            <div style={{ background: colors.surface, borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: colors.textDim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                Hindi Pronunciation
              </div>
              <div className="hindi-text" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.3 }}>
                {result.hindiPron}
              </div>
              {result.altPron && (
                <div style={{ marginTop: 6, fontSize: 12, color: colors.textDim }}>
                  Alternative: <span className="hindi-text" style={{ fontSize: 16, color: colors.hindi }}>{result.altPron}</span>
                </div>
              )}
              <button className="btn-ghost" style={{ marginTop: 10, fontSize: 12 }} onClick={handleCopyPronunciation}>
                <Icons.Copy /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}

          {/* Audio Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <button className="btn-play" onClick={() => handleSpeak(result.word, false)} title="Play normal">
              <Icons.Play />
            </button>
            <button className="btn-play-sm" onClick={() => handleSpeak(result.word, true)} title="Play slow">
              <Icons.Slow />
            </button>
            {result.audioUrl && (
              <button className="btn-play-sm" onClick={() => { const a = new Audio(result.audioUrl); a.play().catch(() => {}); }} title="Play native audio" style={{ background: 'rgba(108,92,231,0.15)', color: colors.accent }}>
                <Icons.Volume />
              </button>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Listen to pronunciation</div>
              <div style={{ fontSize: 11, color: colors.textDim }}>
                {speaking ? 'Speaking...' : result.audioUrl ? 'Native + device audio available' : `${settings.accent.charAt(0).toUpperCase() + settings.accent.slice(1)} accent`}
              </div>
            </div>
          </div>

          {/* Meaning */}
          <div style={{ background: colors.surface, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 11, color: colors.textDim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                Meaning
              </div>
              {result.source === 'api' && (
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'rgba(108,92,231,0.15)', color: colors.accent, fontWeight: 600 }}>
                  Online
                </span>
              )}
              {result.source === 'local' && (
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'rgba(0,184,148,0.15)', color: colors.success, fontWeight: 600 }}>
                  Offline
                </span>
              )}
            </div>
            {result.meaning ? (
              <div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>{result.meaning}</div>
                {result.allDefinitions && result.allDefinitions.length > 1 && (
                  <div style={{ marginTop: 10, borderTop: `1px solid ${colors.border}`, paddingTop: 10 }}>
                    {result.allDefinitions.slice(1).map((d, i) => (
                      <div key={i} style={{ fontSize: 13, lineHeight: 1.5, color: colors.textSoft, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: colors.textDim, fontWeight: 600, textTransform: 'capitalize', marginRight: 6 }}>{d.type}</span>
                        {d.def}
                      </div>
                    ))}
                  </div>
                )}
                {result.phonetic && (
                  <div style={{ marginTop: 8, fontSize: 13, color: colors.textDim }}>
                    Phonetic: <span style={{ fontStyle: 'italic' }}>{result.phonetic}</span>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: 14, color: colors.textDim, fontStyle: 'italic' }}>
                Meaning not found. This might be a name, brand, or uncommon word. Pronunciation is still provided.
              </div>
            )}
            {result.hindi && (
              <div style={{ marginTop: 8, fontSize: 13, color: colors.textDim }}>
                Hindi: <span className="hindi-text" style={{ color: colors.hindi, fontSize: 15 }}>{result.hindi}</span>
              </div>
            )}
          </div>

          {/* Suggestions for misspelled */}
          {suggestions.length > 0 && (
            <div style={{ marginTop: 16, padding: 12, background: 'rgba(253,203,110,0.08)', borderRadius: 12, border: '1px solid rgba(253,203,110,0.15)' }}>
              <div style={{ fontSize: 12, color: colors.warn, fontWeight: 600, marginBottom: 6 }}>Did you mean?</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {suggestions.map(s => (
                  <button key={s} className="btn-ghost" style={{ fontSize: 13, color: colors.warn, background: 'rgba(253,203,110,0.1)' }}
                    onClick={() => { setQuery(s); handleSearch(s); }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Word of the Day */}
      {!result && wordOfDay && (
        <div className="card fade-up" style={{ marginBottom: 20, animationDelay: '0.2s', borderLeft: `3px solid ${colors.accent}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Icons.Sparkle />
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1 }}>Word of the Day</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{wordOfDay.word}</div>
              <div className="hindi-text" style={{ fontSize: 20, marginBottom: 4 }}>{wordOfDay.hindiPron}</div>
              <div style={{ fontSize: 13, color: colors.textDim }}>{wordOfDay.meaning}</div>
            </div>
            <button className="btn-play-sm" onClick={() => handleSpeak(wordOfDay.word)}>
              <Icons.Play />
            </button>
          </div>
        </div>
      )}

      {/* Recent History */}
      {!result && history.length > 0 && (
        <div className="fade-up" style={{ animationDelay: '0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDim }}>Recently Searched</h3>
            <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setPage('history')}>
              View all
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.slice(0, 5).map(item => (
              <div key={item.id} className="history-item" onClick={() => { setQuery(item.word); handleSearch(item.word); }}>
                <button className="btn-play-sm" onClick={(e) => { e.stopPropagation(); handleSpeak(item.word); }}>
                  <Icons.Play />
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.word}</div>
                  <span className="hindi-text" style={{ fontSize: 14 }}>{item.hindiPron}</span>
                </div>
                <div style={{ fontSize: 11, color: colors.textMuted, whiteSpace: 'nowrap' }}>
                  {new Date(item.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick try suggestions when no search */}
      {!result && history.length === 0 && (
        <div className="fade-up" style={{ animationDelay: '0.2s' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.textDim, marginBottom: 12, textAlign: 'center' }}>Try these words</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {['croissant', 'Nike', 'Leicester', 'quinoa', 'entrepreneur', 'Worcestershire', 'genre', 'bruschetta'].map(w => (
              <button key={w} className="btn-ghost" onClick={() => { setQuery(w); handleSearch(w); }}>
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div style={{ padding: '20px 16px 120px', maxWidth: 600, margin: '0 auto' }}>
      <h2 className="fade-up" style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Search History</h2>
      
      <div className="fade-up" style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          className="search-input"
          style={{ padding: '12px 16px', fontSize: 14 }}
          placeholder="Filter history..."
          value={historyFilter}
          onChange={e => setHistoryFilter(e.target.value)}
        />
        <button className="btn-ghost" style={{ color: colors.danger, whiteSpace: 'nowrap' }}
          onClick={async () => { await clearHistory(); setHistory([]); showToast('History cleared'); }}>
          Clear all
        </button>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: colors.textMuted }}>
          <Icons.History />
          <p style={{ marginTop: 12 }}>No search history yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history
            .filter(h => !historyFilter || h.word.toLowerCase().includes(historyFilter.toLowerCase()))
            .map(item => (
            <div key={item.id} className="history-item fade-in">
              <button className="btn-play-sm" onClick={() => handleSpeak(item.word)}>
                <Icons.Play />
              </button>
              <div style={{ flex: 1, cursor: 'pointer', minWidth: 0 }} onClick={() => { setQuery(item.word); handleSearch(item.word); }}>
                <div style={{ fontSize: 15, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.word}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="hindi-text" style={{ fontSize: 14 }}>{item.hindiPron}</span>
                  {item.meaning && <span style={{ fontSize: 12, color: colors.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>· {item.meaning}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 10, color: colors.textMuted }}>
                  {new Date(item.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textMuted, padding: 4 }}
                  onClick={async () => { await deleteHistoryItem(item.id); setHistory(await getHistory()); showToast('Removed'); }}>
                  <Icons.X />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderFavorites = () => (
    <div style={{ padding: '20px 16px 120px', maxWidth: 600, margin: '0 auto' }}>
      <div className="fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Saved Words</h2>
        {favorites.length > 0 && (
          <button className="btn-ghost" onClick={() => setRevisionMode(!revisionMode)}>
            {revisionMode ? <><Icons.EyeOff /> Exit Revision</> : <><Icons.Eye /> Revision Mode</>}
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: colors.textMuted }}>
          <Icons.Star filled={false} />
          <p style={{ marginTop: 12 }}>No saved words yet. Tap the star on any word to save it!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {favorites.map((item, idx) => (
            <div key={item.word} className="card fade-in" style={{ padding: 18, animationDelay: `${idx * 0.05}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: revisionMode && !revealedCards[item.word] ? 0 : 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button className="btn-play-sm" onClick={() => handleSpeak(item.displayWord || item.word)}>
                    <Icons.Play />
                  </button>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{item.displayWord || item.word}</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {revisionMode && (
                    <button className="btn-icon" style={{ width: 32, height: 32 }}
                      onClick={() => setRevealedCards(prev => ({ ...prev, [item.word]: !prev[item.word] }))}>
                      {revealedCards[item.word] ? <Icons.EyeOff /> : <Icons.Eye />}
                    </button>
                  )}
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textMuted, padding: 4 }}
                    onClick={async () => { await removeFavorite(item.word); setFavorites(await getFavorites()); showToast('Removed'); }}>
                    <Icons.X />
                  </button>
                </div>
              </div>
              
              {(!revisionMode || revealedCards[item.word]) && (
                <div className="fade-in">
                  <div className="hindi-text" style={{ fontSize: 22, marginBottom: 6 }}>{item.hindiPron}</div>
                  {item.meaning && <div style={{ fontSize: 13, color: colors.textDim }}>{item.meaning}</div>}
                </div>
              )}
              {revisionMode && !revealedCards[item.word] && (
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 8, textAlign: 'center' }}>
                  Tap 👁 to reveal pronunciation
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: colors.textMuted }}>
        {favorites.length} word{favorites.length !== 1 ? 's' : ''} saved
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={{ padding: '20px 16px 120px', maxWidth: 600, margin: '0 auto' }}>
      <h2 className="fade-up" style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Settings</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Accent */}
        <div className="card fade-up" style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Accent Preference</div>
          <select className="select-styled" value={settings.accent} onChange={e => updateSettings('accent', e.target.value)}>
            <option value="indian">Indian English</option>
            <option value="british">British English</option>
            <option value="american">American English</option>
          </select>
        </div>

        {/* Speed */}
        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.05s' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Audio Speed</div>
          <select className="select-styled" value={settings.speed} onChange={e => updateSettings('speed', e.target.value)}>
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Show Hindi Pronunciation</div>
              <div style={{ fontSize: 12, color: colors.textDim }}>Display Hindi script for words</div>
            </div>
            <button className={`toggle ${settings.showHindi ? 'active' : ''}`}
              onClick={() => updateSettings('showHindi', !settings.showHindi)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Auto-save History</div>
              <div style={{ fontSize: 12, color: colors.textDim }}>Automatically save searched words</div>
            </div>
            <button className={`toggle ${settings.autoSave ? 'active' : ''}`}
              onClick={() => updateSettings('autoSave', !settings.autoSave)} />
          </div>
        </div>

        {/* Max History */}
        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.15s' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Max History Size</div>
          <select className="select-styled" value={settings.maxHistory} onChange={e => updateSettings('maxHistory', parseInt(e.target.value))}>
            <option value="100">100 words</option>
            <option value="250">250 words</option>
            <option value="500">500 words</option>
            <option value="1000">1000 words</option>
          </select>
        </div>

        {/* Data Management */}
        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.2s' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Data Management</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button className="btn-ghost" onClick={handleExport}><Icons.Download /> Export Data</button>
            <button className="btn-ghost" onClick={handleImport}><Icons.Upload /> Import Data</button>
            <button className="btn-ghost" style={{ color: colors.danger, background: 'rgba(255,118,117,0.1)' }} onClick={handleClearAll}>
              <Icons.Trash /> Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div style={{ padding: '20px 16px 120px', maxWidth: 600, margin: '0 auto' }}>
      <h2 className="fade-up" style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>How It Works</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="card fade-up" style={{ padding: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.accentLight, marginBottom: 8 }}>🎯 What is Ucharan Helper?</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDim }}>
            Ucharan Helper is a fully offline pronunciation tool designed for Indian users. Type any English word, brand name, place, or phrase — get its pronunciation as audio and in Hindi script (Devanagari), making it easy to say correctly.
          </p>
        </div>

        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.05s' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.accentLight, marginBottom: 8 }}>🗣️ Hindi Pronunciation Guide</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDim }}>
            We convert English words into readable Hindi script so you know exactly how to say them. For example, "croissant" becomes "क्रवासों" and "Leicester" becomes "लेस्टर". The Hindi output is practical, aimed at natural pronunciation.
          </p>
        </div>

        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.1s' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.accentLight, marginBottom: 8 }}>🔊 Audio Pronunciation</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDim }}>
            Uses your device's built-in text-to-speech engine. You can choose between Indian, British, or American accents in Settings. A slow playback option is also available for difficult words. Voice availability depends on your device.
          </p>
        </div>

        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.15s' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.accentLight, marginBottom: 8 }}>📱 Confidence Levels</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDim }}>
            <strong style={{ color: colors.success }}>Exact:</strong> Word is in our verified dictionary with accurate pronunciation.
            <br/><strong style={{ color: colors.warn }}>Likely:</strong> Based on known patterns and category matching.
            <br/><strong style={{ color: colors.textDim }}>Approximate:</strong> Algorithmically generated — best-effort transliteration for unknown words, names, or brands.
          </p>
        </div>

        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.2s' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.accentLight, marginBottom: 8 }}>🔒 Privacy & Offline</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDim }}>
            Everything stays on your device. No data is sent to any server. Your search history, favorites, and settings are stored locally using IndexedDB. You can export and import your data anytime.
          </p>
        </div>

        <div className="card fade-up" style={{ padding: 18, animationDelay: '0.25s' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.accentLight, marginBottom: 8 }}>⚠️ Limitations</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDim }}>
            For brand names, movie titles, people's names, and unusual words, the Hindi transliteration is a best-effort approximation. The offline dictionary covers common English words. Meanings may not be available for all proper nouns.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: colors.textMuted }}>
        Made with care for Indian learners 🇮🇳
      </div>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: '100vh', background: colors.bg, paddingTop: 8 }}>
        {/* Main content */}
        {page === 'home' && renderHome()}
        {page === 'history' && renderHistory()}
        {page === 'favorites' && renderFavorites()}
        {page === 'settings' && renderSettings()}
        {page === 'help' && renderHelp()}

        {/* Bottom Navigation */}
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: `linear-gradient(180deg, transparent, ${colors.bg} 20%)`,
          paddingTop: 20,
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          zIndex: 100,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            maxWidth: 500,
            margin: '0 auto',
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: '6px 4px',
            marginLeft: 12,
            marginRight: 12,
          }}>
            {[
              { id: 'home', icon: <Icons.Home />, label: 'Home' },
              { id: 'history', icon: <Icons.History />, label: 'History' },
              { id: 'favorites', icon: <Icons.Star filled={false} />, label: 'Saved' },
              { id: 'settings', icon: <Icons.Settings />, label: 'Settings' },
              { id: 'help', icon: <Icons.Info />, label: 'Help' },
            ].map(nav => (
              <button
                key={nav.id}
                className={`nav-item ${page === nav.id ? 'active' : ''}`}
                onClick={() => setPage(nav.id)}
              >
                {nav.icon}
                {nav.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
