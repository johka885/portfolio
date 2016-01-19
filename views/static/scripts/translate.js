var languages = ["se", "en"];
var wordlist = {
  "se": {
    "contact-information": "Kontaktinformation",
    "full-name": "Johan Karlsson",
    "address": "Adress",
    "address-street": "Nyponstigen 6",
    "address-postal": "590 44 Rimforsa",
    "address-country": "",
    "phone": "Telefon",
    "phone-number": "073-650 90 83",
    "email": "E-post",
    "email-address": "E-postadress",
    "message": "Meddelande",
    "message-placeholder": "Skriv meddelande",
    "send": "Skicka",
    "name": "Namn",
    
    "home": "Hem",
    "about": "Om mig",
    "cv": "CV",
    "portfolio": "Portfolio",
    "contact": "Kontakt",
    
    "projects": "Projekt",    
    "skills": "Färdigheter",
    
    "languages": "Språk",
    "frameworks-libraries": "Ramverk & Bilbiotek",
    "methodologies": "Metodiker",
    "tools": "Verktyg",
    
    "jan": "jan",
    "june": "juni",
    "july": "juli",
    "aug": "aug",
    
    "work-experience": "Arbetslivserfarenhet",
    "education": "Utbildning",
    
    "edu-1-title": "Linköping Universitet, Linköping",
    "edu-1-desc": "Kandidatutbilding Innovativ programmering",
    
    "edu-2-title": "Berzeliusskolan, Linköping",
    "edu-2-desc": "Naturvetenskapliga programmet",
    
    "lang-skills": "Språk",
    "lang-1-title": "Svenska",
    "lang-1-desc": "Modersmål",
    "lang-2-title": "Engelska",
    "lang-2-desc": "Flytande",
    
    "adecco-title": "Konsult, Adecco Student AB, Linköping",
    "adecco-desc-1": "Produktionsarbete inom livsmedelindustrin",
    "adecco-desc-2": "Montering av webbkameror och annan elektronik",
    
    "venezia-title": "Telefonförsäljare, Venezia Personal AB, Linköping",
    "venezia-desc-1": "Försäljning av telfoniabonnemang per telefon",
    "venezia-desc-2": "Arbetat med kundservicen",
    "venezia-desc-3": "Utsedd till månadens bästa säljare flera gånger",
    
    "skills-list": ["AJAX", " Android", " AngularJS", " Bootstrap", " CORS", " C#", " C++", " CSS", " Django", " Express", " Git", " HTML", " HTTP", " Java", " JavaScript", " JQuery", " JSCoverage", " JSON", " Mocha", " MongoDB", " MySQL", " .NET", " Node.js", " PHP", " Python", " Ruby", " Selenium", " SSH", " WPF", " XML"],
     
    "other": "Övrigt",
   
    "langs" : "Programmeringsspråk",
    "frameworks": "Ramverk",
    "tools": "Verktyg:",
    "techniques": "Tekniker",
    "platforms": "Plattformar",
    "platforms-content": "Android, Linux, OS X, Windows", 
    "comp-skills": "Tekniska kunskaper"
  },
  "en": {
    "contact-information": "Contact information",
    "full-name": "Johan Karlsson",
    "address": "Address",
    "address-street": "Nyponstigen 6",
    "address-postal": "590 44 Rimforsa",
    "address-country": "Sweden",
    "phone": "Phone",
    "phone-number": "+46 736 509 083",
    "email": "Email",
    "email-address": "Email address",
    "message": "Message",
    "message-placeholder": "Enter message",
    "send": "Send",
    "my-email": "johan@jkarlsson.eu",
    "name": "Name",
    
    "home": "Home",
    "about": "About",
    "cv": "CV",
    "portfolio": "Portfolio",
    "contact": "Contact",
    
    "skills": "Skills",
    "projects": "Projects",
    
    "languages": "Languages",
    "frameworks-libraries": "Frameworks & Libraries",
    "methodologies": "Methodologies",
    "tools": "Tools",
    
    "work-experience": "Work experience",
    "jan": "Jan",
    "june": "June",
    "july": "July",
    "aug": "Aug",
    
    "education": "Education",
    
    "edu-1-title": "Linköping University, Linköping, Sweden",
    "edu-1-desc": "BSc in Computer Science",
    
    "edu-2-title": "Berzeliusskolan, Linköping, Sweden",
    "edu-2-desc": "The Natural Sciences Programme",
    
    "lang-skills": "Language skills",
    "lang-1-title": "Swedish",
    "lang-1-desc": "Native",
    "lang-2-title": "English",
    "lang-2-desc": "Fluent",
    
    "adecco-title": "Consultant, Adecco Student AB, Linköping, Sweden",
    "adecco-desc-1": "Working with daily production of confectionery",
    "adecco-desc-2": "Assembling web cameras and other electronics",
    
    "venezia-title": "Telemarketer, Venezia Personal AB, Linköping, Sweden",
    "venezia-desc-1": "Selling mobile cellular subscriptions by phone",
    "venezia-desc-2": "Providing professional customer service",
    "venezia-desc-3": "Appointed as monthly best seller several times",
    
    "langs" : "Languages:",
    "langs-content": "C#, C++, CSS, HTML, Java, JavaScript, MySQL, PHP, Python, Regexp, XML",
    "frameworks": "Frameworks:",
    "frameworks-content": "AngularJS, Bootstrap, jQuery, Mocha, .NET, Node.js",
    "tools": "Tools:",
    "tools-content": "Android studio, Git, Selenium, SVN, Visual studio",
    "techniques": "Techniques:",
    "techniques-content": "Agile, AJAX, Lean, Pair Programming , REST, SOAP, TDD",
    "platforms": "Platforms:",
    "platforms-content": "Android, Linux, OS X, Windows",  
    
    "comp-skills": "Technical Skills"
    }
};

var activeLanguage = "en";

function translate(lang){
  lang = lang && lang.toLowerCase();
  if(lang && languages.indexOf(lang) !== -1) activeLanguage = lang;
  
  activeLanguage = "en";
  $("[data-string]").each( function(){
    var translation = wordlist[activeLanguage][this.getAttribute("data-string")] || wordlist["en"][this.getAttribute("data-string")];
    if( /input/i.test(this.tagName) || /textarea/i.test(this.tagName )){
      $(this).attr("placeholder", translation);
    } else {
      $(this).text(translation);
    }
  });
}