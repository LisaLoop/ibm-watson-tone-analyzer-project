

// IBM WATSON TONE ANALYZER API CODE
let text = "It is tough to believe that any President other than Donald Trump would hold a summit with Russia days after special counsel Robert Mueller delivered a sensational indictment that accuses the Kremlin of a deeply penetrating attack on American democracy." ;
let request = "text="+ encodeURIComponent(text); //changes spaces between words to %20
var fetchRes = fetch('http://localhost:3000/analyzeNewsItem', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: request, // body data type must match "Content-Type" header
    })
    .then(function(response) {
      // console.log(response);
      return response.json();
    })
    .then(function(myJson) {
      // console.log(myJson);
    });

    /// request to NEWS API
let url = 'http://localhost:3000/getNews';


    $.ajax({
      url: url,
      type: 'GET',
      success: function(res) {
          let articles = res.articles;
          for (i = 0; i < articles.length; i ++) {
            let articleTitle = articles[i].title;
            let imgSrc = articles[i].urlToImage;
            let articleDescription = articles[i].description;
    
            let articleHTMLString = `<article class="article">
            <section class="featuredImage">
              <img src="${imgSrc}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${articleTitle}</h3></a>
                <h6>${articleDescription}</h6>
            </section>
            <section class="impressions">
              
            </section>
            <div class="clearfix"></div>
          </article>`
    
    
            $("#main").append(articleHTMLString);
        
          }
    
    
          // When the user selects an article's title, the app should show the #popUp overlay. 

          // The content of the article must be inserted in the .container class inside #popUp. Make sure you remove the 
          // .loader class when toggling the article information in the pop up.
          $("h3").on('click', function(){
            $("#popUp").removeClass("loader");
            $("#popUp").removeClass("hidden");

          })

          $(".closePopUp").on('click', function(){
            $("#popUp").addClass("hidden");
          })
 
         
          
      }
    });
    

