/// request to NEWS API
let url = 'http://localhost:3000/getNews';

function showNews(res) {
  let articles = res; // articles variable
  global_articles = articles;
  // console.log("global_articles is ", global_articles);
  for (i = 0; i < articles.length; i++) {
    let tone = articles[i].tone.document_tone.tone_categories[0].tones;
  //  console.log("tone is ", tone);
    categoryList.push(tone);
    let toneDescription = showTone(tone);
    console.log("toneDescription is ", toneDescription);
    let articleTitle = articles[i].title;
    let imgSrc = articles[i].urlToImage;
    let articleDescription = articles[i].description;

      let template = `<article class="article" data-id="${i}">
          <section class="featuredImage">
            <img src="${imgSrc}" alt="" />
          </section>
          <section class="articleContent">
              <a href="#" onclick="showArticle(${i})"><h3>${articleTitle}</h3></a>
              <h6>${articleDescription || ""}</h6>
          </section>
          <section class="impressions">
           <h6 class='tone'></h6>
          </section>
          <div class="clearfix"></div>
        </article>`
      $("#main").append(template);
  }

  $(".closePopUp").on('click', function () {
    $("#popUp").addClass("hidden");
  });

};

function showArticle(idx) {
  // extract the article index from the data attribute attached to the article
  // use it to locate the article in global "articles" variable
  const article = global_articles[idx];
  // show the popup
  $("#popUp h1").text(article.title);
  $("#popUp p").text(article.description || "");
  $("#popUp .popUpAction").attr("href", article.url);
  $("#popUp").removeClass("hidden");
  $("#popUp").removeClass("loader");
};
var global_articles = [];

$.ajax({
  url: url,
  type: 'GET',
  success: showNews
});

categoryList = [];
categoryList.sort(function(tone1,tone2) {return tone2.score - tone1.score} );

function showTone(categoryList){
  let maxScore = categoryList[0].score;
  let maxName = categoryList[0].tone_name;
  for(var i=0; i<categoryList.length; i++){
    // console.log("global articles titles", global_articles[i].title);
    let toneName = categoryList[i].tone_name;
    let toneScore = categoryList[i].score;
    // console.log(toneName + " score is " + toneScore);
    // console.log("is this happening?");
    if(toneScore >= maxScore){
      // console.log("is this happening?");
    //   console.log("toneScore is ", toneScore);
      maxName  = categoryList[i].tone_name;
      maxScore = categoryList[i].score;
      let maxScoreArr = [];
      maxScoreArr.push({"maxName": maxName, "maxScore": maxScore});
      // console.log("maxScoreArr is ", maxScoreArr);
      console.log(maxName + " - " + maxScore);
      // console.log("global articles is ", global_articles);
    } 
  };
  
  return ''
};

