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
    "my-email": "johan@j-karlsson.com",
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
    
    "adecco-title": "Konsult, Adecco Student AB, Linköping",
    "adecco-desc-1": "Produktionsarbete inom livsmedelindustrin",
    "adecco-desc-2": "Montering av webbkameror och annan elektronik",
    
    "venezia-title": "Telefonförsäljare, Venezia Personal AB, Linköping",
    "venezia-desc-1": "Försäljning av telfoniabonnemang per telefon",
    "venezia-desc-2": "Arbetat med kundservicen",
    "venezia-desc-3": "Utsedd till månadens bästa säljare flera gånger"
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
    "my-email": "johan@j-karlsson.com",
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
    
    "adecco-title": "Consultant, Adecco Student AB, Linköping, Sweden",
    "adecco-desc-1": "Working with daily production of confectionery",
    "adecco-desc-2": "Assembling web cameras and other electronics",
    
    "venezia-title": "Telemarketer, Venezia Personal AB, Linköping, Sweden",
    "venezia-desc-1": "Selling mobile cellular subscriptions by phone",
    "venezia-desc-2": "Providing professional customer service",
    "venezia-desc-3": "Appointed as monthly best seller several times"
    
  }
};

var activeLanguage = "en";

function translate(lang){
  lang = lang && lang.toLowerCase();
  if(lang && languages.indexOf(lang) !== -1) activeLanguage = lang;
  
  activeLanguage = "en";
  $("[data-string]").each( function(){
    if( /input/i.test(this.tagName) ){
      $(this).val(wordlist[activeLanguage][this.dataset.string]);
    } else {
      $(this).text(wordlist[activeLanguage][this.dataset.string]);
    }
  });
}