/// request to NEWS API
let url = 'http://localhost:3000/getNews';

function showNews(res) {
  let articles = res; // articles variable
  global_articles = articles;
  // console.log("global_articles is ", global_articles);
  for (i = 0; i < articles.length; i++) {
    let tone = articles[i].tone.document_tone.tone_categories[0].tones;
  //  console.log("tone is ", tone);
    // categoryList.push(tone);
    let toneDescription = showTone(tone);
    // console.log("toneDescription is ", toneDescription)
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
           <h6 class='tone'>${toneDescription}</h6>
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
  let categoryList = article.tone.document_tone.tone_categories[0].tones;
  let toneArray = tonesToArray(categoryList);
  let emojiArray = tonesToLabels(categoryList);
  init(toneArray, emojiArray);
};
var global_articles = [];

$.ajax({
  url: url,
  type: 'GET',
  success: showNews
});


function emotionToEmoji(emotion){
  let emotionMap = {};
  emotionMap['disgust'] = "😣";
  emotionMap['fear'] = "😨";
  emotionMap['joy'] = "😂";
  emotionMap['anger'] = "😠";
  emotionMap['sadness'] = "😢";
  emotion = emotion.toLowerCase();
  return emotionMap[emotion];
}

function showTone(categoryList){
  categoryList.sort(function(tone1,tone2) {return tone2.score - tone1.score} );
  let maxScore = categoryList[0].score;
  maxScore = Math.round(maxScore * 100);
  let maxName = categoryList[0].tone_name;
  let maxMax = maxName + " - " + maxScore + " " + emotionToEmoji(maxName);
  // console.log(maxMax);
  return maxMax;
};

function tonesToArray(categoryList){
  // console.log("categoryList ", categoryList);
  let scoresArray = [];
  for(let i=0; i<categoryList.length; i++){
    scoresArray.push(categoryList[i].score);
  }
  return scoresArray
}

function tonesToLabels(categoryList){
  let emojiArray = [];
  for(let i=0; i<categoryList.length; i++){
    emojiArray.push(emotionToEmoji(categoryList[i].tone_name));
  }
  return emojiArray
}