//CONFIGURATION FOR TWITTER BOT !
var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);


// ACTUAL APP STARTS HERE !
function searchTweet(){                           // function to search tweets

  var query = {                                 //query to twitter
    q: 'Hello World',
    count: 4,
  };

  T.get('search/tweets', query , gotData);      //searching for tweets

function gotData(err, data, response){        //callback function
  if(err){
    console.log("Tweet Search Failed !");
  }

  else{
    console.log("Tweets Acquired !");
    tweets = data.statuses;                       /*formatted */
    for(var i=0 ;  i<tweets.length ; i++ ){       /*tweets from */
    console.log("\n"+tweets[i].text+"\n");        /*JSON request */
      }
    }
  }
}

function postTweet(){                            //function for posting tweets
  var post =  { status: 'I Love APis!' };

  function postData(err, data, response) {
    if(err){
      console.log("Tweeting Failed !");
    }
    else{
      console.log("Tweeting Sucess !");
      console.log(data);
    }
  }
  T.post('statuses/update',post, postData)
}

//searchTweet();                                 //function call for searching tweets
postTweet();                                   //function call for posting

console.log("The Botter is started !");
