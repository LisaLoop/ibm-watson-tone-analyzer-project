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
    // for (let j=0; j<articles.length; j++){
    //   console.log(tone[i].score, tone[i].tone_name);
    //   // console.log();
    // }
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
  // extract the article index from the data attribute
  // attached to the article
  // console.log("idx is ", idx);
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

categoryList = []
// console.log("global_articles: ", global_articles);
// console.log("tone is ", tone);
// categoryList.push(global_articles);
console.log("categoryList is", categoryList);


// categoryList.push({"tone_name":"anger",  "score":0.98});
// categoryList.push({"tone_name":"disgust","score":0.99});
// categoryList.push({"tone_name":"emo2",   "score":0.198});
// categoryList.push({"tone_name":"emo3",   "score":0.598});
// categoryList.push({"tone_name":"emo4",   "score":0.8798});

// console.log(categoryList);
/*
var maxScore = categoryList[0].score;
var maxName = categoryList[0].tone_name;
for(var i=0;i<categoryList.length;i++){
    if(categoryList[i].score >= maxScore){
        maxName  = categoryList[i].tone_name;
        maxScore = categoryList[i].score;
    }
}
*/

// categoryList.sort(function(tone1,tone2) {return tone2.score - tone1.score} );
// maxName  = categoryList[0].tone_name
// maxScore = categoryList[0].score
// // console.log(maxScore + " - " + maxName);

function showTone(categoryList){
  let toneName = categoryList[0].tone_name;
  let toneScore = categoryList[0].score;
  // console.log("toneName is ", toneName);
  // console.log("toneScore is ", toneScore);
  return ''
}


/// get the name and score for each of the 5 tones. anger, disgust, etc. 
// put them in an array [angerScore, disgustScore]
// use the Math.max method on the array to return the biggest number




