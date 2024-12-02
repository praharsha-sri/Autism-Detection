// translations.js
const translations = {
    en: {
        identification: "Identification Data",
        parental: "Parental History",
        prenatal: "Prenatal History",
        perinatal: "Perinatal History",
        postnatal: "Postnatal History",
        medical: "Treatment and Medical History",
        educational: "Educational History",
        family: "Family History",
        play: "Play and Developmental History",
        behavioral: "Behavioral History and Higher Function",
        selfhelp: "Self Help Skills",
        recommendations: "Previous Diagnosis & Therapy Details/Recommendation",
        // Form fields for identification.html
        date: "Date",
        name: "Name",
        age: "Age",
        gender: "Gender",
        dob: "Date of Birth",
        informant: "Informant",
        parentOccupation: "Parent's Occupation",
        referral: "Referral",
        communication: "Communication",
        complaints: "Presenting Chief Complaints",
        selectGender: "Select gender",
        male: "Male",
        female: "Female",
        other: "Other",
        selectCommunication: "Select communication",
        verbal: "Verbal",
        nonverbal: "Nonverbal",
        differentialCrying: "Differential Crying",
        next: "Next"
    },
    te: {
        identification: "గుర్తింపు డేటా",
        parental: "తల్లిదండ్రుల చరిత్ర",
        prenatal: "గర్భధారణ చరిత్ర",
        perinatal: "ప్రసవ చరిత్ర",
        postnatal: "ప్రసవానంతర చరిత్ర",
        medical: "చికిత్స మరియు వైద్య చరిత్ర",
        educational: "విద్యా చరిత్ర",
        family: "కుటుంబ చరిత్ర",
        play: "ఆట మరియు అభివృద్ధి చరిత్ర",
        behavioral: "ప్రవర్తన చరిత్ర మరియు ఉన్నత విధులు",
        selfhelp: "స్వయం సహాయ నైపుణ్యాలు",
        recommendations: "మునుపటి రోగనిర్ధారణ & థెరపీ వివరాలు/సిఫార్సు",
        // Form fields for identification.html
        date: "తేదీ",
        name: "పేరు",
        age: "వయస్సు",
        gender: "లింగం",
        dob: "పుట్టిన తేదీ",
        informant: "సమాచారం ఇచ్చేవారు",
        parentOccupation: "తల్లిదండ్రుల వృత్తి",
        referral: "రెఫరల్",
        communication: "కమ్యూనికేషన్",
        complaints: "ప్రధాన ఫిర్యాదులు",
        selectGender: "లింగాన్ని ఎంచుకోండి",
        male: "పురుషుడు",
        female: "స్త్రీ",
        other: "ఇతర",
        selectCommunication: "కమ్యూనికేషన్ ఎంచుకోండి",
        verbal: "మౌఖిక",
        nonverbal: "మౌఖికేతర",
        differentialCrying: "వ్యత్యాస ఏడుపు",
        next: "తదుపరి"
    },
    hi: {
        identification: "पहचान डेटा",
        parental: "पैतृक इतिहास",
        prenatal: "प्रसव पूर्व इतिहास",
        perinatal: "प्रसव काल इतिहास",
        postnatal: "प्रसवोत्तर इतिहास",
        medical: "उपचार और चिकित्सा इतिहास",
        educational: "शैक्षिक इतिहास",
        family: "पारिवारिक इतिहास",
        play: "खेल और विकास इतिहास",
        behavioral: "व्यवहार इतिहास और उच्च कार्य",
        selfhelp: "स्वयं सहायता कौशल",
        recommendations: "पिछला निदान और थेरेपी विवरण/सिफारिश",
        // Form fields for identification.html
        date: "दिनांक",
        name: "नाम",
        age: "आयु",
        gender: "लिंग",
        dob: "जन्म तिथि",
        informant: "सूचनादाता",
        parentOccupation: "माता-पिता का व्यवसाय",
        referral: "रेफ़रल",
        communication: "संचार",
        complaints: "मुख्य शिकायतें",
        selectGender: "लिंग चुनें",
        male: "पुरुष",
        female: "महिला",
        other: "अन्य",
        selectCommunication: "संचार चुनें",
        verbal: "मौखिक",
        nonverbal: "गैर-मौखिक",
        differentialCrying: "विभेदक रोना",
        next: "अगला"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    // Update sidebar items
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
    });

    // If we're in an iframe, translate the current page
    if (window.self !== window.top) {
        translatePage(lang);
    }

    // Notify the iframe content to change language
    const iframe = document.querySelector('iframe[name="content-frame"]');
    if (iframe) {
        iframe.contentWindow.postMessage({ type: 'languageChange', language: lang }, '*');
    }
}

function translatePage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (element.tagName === 'OPTION') {
                element.text = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Listen for language change messages from parent
window.addEventListener('message', (event) => {
    if (event.data.type === 'languageChange') {
        translatePage(event.data.language);
    }
});