const { default: axios } = require("axios");
const cheerio = require("cheerio");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const content = null;
  axios("https://www.eenadu.net/").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const content = $(".thumb-content-taja", html);
    let items = [];
    content.each(function () {
      const anchorLink = $(this).find("a").attr("href");
      const figure = $(this).find("img").attr("src");
      const altText = $(this).find("img").attr("alt");

      var item = {
        anchorLink,
        figure,
        altText,
      };
      items.push(item);
    });
    // console.log($('.thumb-content-more',html))
    // $('.thumb-content-more',html).each(()=>{
    //   // const url = $(this).find("a")
    //   // console.log($(this).text())
    //   // $(this).text()
    res.status(200).json({ content: items });

    // })
  });
  // fetch("https://www.eenadu.net/latest-news").then(res=>{
  //   console.log(res.data)
  //   return res.json()
  // }).then((data)=>{
  //   // console.log(data)
  // })
});

router.get("/getEenaduMovieContent", async (req, res) => {
  var movieResult = await axios.get("https://www.eenadu.net/movies");
  var moreMovierResult = await axios.get("https://www.eenadu.net/movies/tv");
  let items = [];
  const html = movieResult.data;
  var $ = cheerio.load(html);
  var content = $(".thumb-content_mv", html);
  content.each(function () {
    const anchorLink = $(this).find("a").attr("href");
    const figure = $(this).find("img").attr("src");
    const altText = $(this).find("img").attr("alt");
    var item = {
      anchorLink,
      figure,
      altText,
    };
    items.push(item);
  });

  const html2 = moreMovierResult.data;
  var $ = cheerio.load(html2);
  var content = $(".thumb-content-more", html);
  content.each(function () {
    const anchorLink = $(this).find("a").attr("href");
    console.log(anchorLink)
    const figure = $(this).find("img").attr("src");
    const altText = $(this).find("img").attr("alt");
    var item = {
      anchorLink,
      figure,
      altText,
    };
    items.push(item);
  });
 
  res.status(200).json({ content: items });
});

function getContent(html, items) {
  const $ = cheerio.load(html);
  const content = $(".thumb-content_mv", html);
  content.each(() => {
    // const anchorLink = $(this)
    // console.log(anchorLink)
    // const figure = $(this).find("img").attr("src");
    // const altText = $(this).find("img").attr("alt");
    // var item = {
    //   anchorLink,
    //   figure,
    //   altText,
    // };
    // items.push(item);
  });
}

function getTajaArticles() {}
module.exports = router;
