/// request to NEWS API
let url = 'http://localhost:3000/getNews';

function showNews(res) {
  let articles = res; // articles variable
  global_articles = articles;
  $("#main").html(''); // set innerHTML
  for (i = 0; i < articles.length; i++) {
    let tone = articles[i].tone.document_tone.tone_categories[0].tones;
    let showNewsItem = newsItemShouldBeVisible(tone, global_current_tone);
  //  console.log("showNewsItem is ", showNewsItem);
    if (!showNewsItem){
      continue 
    let toneDescription = showTone(tone);
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
let global_articles = [];

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
  return maxMax;
};

function tonesToArray(categoryList){
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


let global_current_tone = null;

function filterNewsByTone(tone){
  global_current_tone = tone;
  renderNews();
} 

function newsItemShouldBeVisible(categoryList, tone){
  categoryList.sort(function(tone1,tone2) {return tone2.score - tone1.score} );
  let maxName = categoryList[0].tone_name.toLowerCase();
  if(tone === null ){
    return true // show everything, default
  }
  if (tone == maxName){
    return true;
  } 
  return false;
};


function renderNews(){
  $.ajax({
    url: url,
    type: 'GET',
    success: showNews
  });
}

window.onload = renderNews;