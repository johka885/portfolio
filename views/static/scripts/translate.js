var languages = ["sv", "en"];
var wordlist = {
  "sv": {},
  "en": {}
};
var activeLanguage = "en";

function translate(){
  $("[data-string]").html( function(){
    return wordlist[activeLanguage][this.dataset.string];
  });
}

$(translate);