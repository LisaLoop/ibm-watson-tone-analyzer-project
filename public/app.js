

/// request to NEWS API
let url = 'http://localhost:3000/getNews';


$.ajax({
  url: url,
  type: 'GET',
  success: function (res) {
    let articles = res.articles; // global articles variable
    for (i = 0; i < articles.length; i++) {
      // console.log("Article: ", articles[i]);
      let articleTitle = articles[i].title;
      let imgSrc = articles[i].urlToImage;
      let articleDescription = articles[i].description;
      ///fetch request below
      // IBM WATSON TONE ANALYZER API CODE
      let request = "text=" + encodeURIComponent(articleTitle + '. Hello.'); //changes spaces between words to %20
      // console.log("request is ", request);
      var fetchRes = fetch('http://localhost:3000/analyzeNewsItem', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: request, // body data type must match "Content-Type" header
      })
      .then(function (response) {
        // console.log("response is ", response);
        return response.json();
      })
      .then(function (myJson) {
        // console.log("myJson emotion_tone is ", myJson.document_tone.tone_categories[0].tones);
        // let emoTone = myJson.document_tone.tone_categories[0].tones;
        // console.log(myJson);
        let emoTone = myJson.document_tone.tone_categories;
        console.log("emoTone is ", emoTone);
        let disgust = emoTone[0].tones[1].score;

        // console.log("disgust is ", disgust);
        // let fear = emoTone[2].score;
        // let joy = emoTone[3].score;
        // let sadness = emoTone[4].score;
        // let anger = emoTone[0].score;


        // console.log("tone score: joy ", joy, " anger ", anger + " disgust ", disgust, " fear ", fear, "sadness ", sadness);
        return disgust;

        // console.log("language_tone ", myJson.document_tone.tone_categories[1].tones);
        // console.log("social_tone ", myJson.document_tone.tone_categories[2].tones);
      })
      .then(function (disgust) {
        // console.log("response is ", response);
        let template = `<article class="article" data-id="${i}">
            <section class="featuredImage">
              <img src="${imgSrc}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${articleTitle}</h3></a>
                <h6>${articleDescription || ""}</h6>
            </section>
            <section class="impressions">
             <h6 class='tone'>disgust: ${disgust} </h6>
            </section>
            <div class="clearfix"></div>
          </article>`
        $("#main").append(template);
      });
    }


    $("#main").on("click", ".article", function () {
      // extract the article index from the data attribute
      // attached to the article
      const idx = $(this).data("id");
      // use it to locate the article in global "articles" variable
      const article = articles[idx];
      // show the popup
      $("#popUp h1").text(article.title);
      $("#popUp p").text(article.description || "");
      $("#popUp .popUpAction").attr("href", article.url);
      $("#popUp").removeClass("hidden");
      $("#popUp").removeClass("loader");
    });

    $(".closePopUp").on('click', function () {
      $("#popUp").addClass("hidden");
    });
  }
});


