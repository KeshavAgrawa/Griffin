var know = {
 
    "hello" : "Hi there!",
    "who are you" : "Well, I am Your's well wisher and about my name we are still deciding",
    "how are you" : "I am Fine, what about you?",
    "what is your name" : "I am Your's Assistant",
    "how old are you" : "🤣🤣🤣can't dtermine, but definitely not gonna die",
    "what is your age" : "🤣🤣🤣can't dtermine, but definitely not gonna die",
    "what can you do for me" : "Don't you feel alone, I can be your bestie👬👬",
    "what can you do" : "Don't you feel alone, I can be your bestie👬👬",
    "what you can do" : "Don't you feel alone, I can be your bestie👬👬",
    "what is special" : "I bet that you don't have a AI friend till the date, So I can be.....",
    "what is special in you" : "I bet that you don't have a AI friend till the date, So I can be....."
     
     
     
     
     
     
     
    };
    function talk() {
      var commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www','do','you','know','meaning',' ' ];
      var spaces = "";
      var owl = document.querySelector("#input").value;
     
      //getting noun or subject
      var doc = window.nlp(owl)
      var noun = doc.nouns().text()
      var subject = ["I", "you","we"]
      var noun_result = noun.split(' ');
    noun_result = noun_result.filter(function (word){
        return subject.indexOf(word) === -1;
    });

    //correcting the spell of the word
    var dicto

    var result = owl.split(' ');
    //console.log(result)
    owl = owl.toLowerCase();
    owl = owl.replace(/\W+/g , ' ');
    result = result.filter(function (word) {
        return commonWords.indexOf(word) === -1;
    });
    document.getElementById("input").value= "";

    const user_div = document.createElement("div")
    document.querySelector(".inner").appendChild(user_div);
    //here
   
    const reply_div = document.createElement("div");
    document.querySelector(".inner").appendChild(reply_div);
    
    //getting images
    const ai_profile = document.createElement("img")
    ai_profile.src = "assets/img/durlin.jpeg"
    reply_div.appendChild(ai_profile)

    const user_profile = document.createElement("img")
    user_profile.src = "assets/img/user.jpg"
    user_div.appendChild(user_profile)

    //adding class to created DIVs & images
    user_div.setAttribute("class", "user_div")
    reply_div.setAttribute("class", "reply_div")
    ai_profile.setAttribute("class", "ai_profile")   
    user_profile.setAttribute("class", "user_profile") 

    user_div.innerHTML += owl+"<br>";

    if (owl in know) {
     reply_div.innerHTML += know[owl] + "<br>";    
    } // first success full proto
   
    else if (owl.includes('your' && 'name')){
       reply_div.innerHTML += spaces + "Robert <br>" ;
       
    }else if (typeof owl == "string" && owl.includes('what are') || owl.includes('what is') || owl.includes('do you know')) 
    {
      var api = "https://en.wikipedia.org/w/api.php?&format=json&action=query&origin=*&prop=extracts&exsentences=2&exintro&explaintext&redirects=1&titles=" + result;
      fetch(api)
      .then(response => response.json() )
      .then(response =>{
          response = response.query.pages;
          var pageid = Object.keys(response)[0];
          var extract = response[pageid].extract;

          if (typeof extract == "string" && extract.includes('may refer to:')){
            reply_div.innerHTML += spaces + "I don't understand <br>" ;
          }
          else{
            reply_div.innerHTML += spaces + extract + "<br>";
          }                  
      })
    }else{
      reply_div.innerHTML += spaces +"I don't understand <br>";
    }
    }
    window.setInterval(function() {
  var elem = document.querySelector('.inner');
  elem.scrollTop = elem.scrollHeight;
  }, 2100);
    