//CONFIGURATION FOR TWITTER BOT !
var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

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

function startStream(){                          //stream function

  var stream = T.stream('user');

  function beingFollowed(msg){
   var name = msg.source.name ;
   var screenName = msg.source.screen_name;
   var reply = 'Hai , '+name+', @'+screenName+' for following me ! :)'; //add message here !
   postTweetWithImage(reply);

  }

  function tweetEvent(msg){
  var screenName = msg.in_reply_to_screen_name;
  var uScreenName = msg.user.screen_name;
  if( screenName === "melvin17_007"){
    var reply = "Thank You @"+uScreenName+" for tweeting me ! "
    postTweetOnly(reply);
  }
}

  stream.on('follow', beingFollowed)              //stream for follow event
  stream.on('tweet',tweetEvent);                  //stream for tweet event

}



function postTweetWithImage(reply){                            //function for posting tweet with images

  //  setInterval(postTweet , 1000*20);          //setting interval to post tweets   ~~ uncomment to work
  var num = Math.floor(Math.random()*100);     // declaring num for fun ! :/    ~~ uncomment to work
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;           // getting random number for picture . {Default min value - 1 , max value - 5}
}

  var params = {encoding: 'base64'};
  var fileName = './followpics/'+getRandomInt(1, 5)+'.png';                     //path to image
  var b64 = fs.readFileSync(fileName, params);
  T.post('media/upload', { media_data: b64 }, uploaded);

  function uploaded(err, data, response){
    if(err){
      console.log("Not Uploaded !");
    }

    var id = data.media_id_string;

    var post =  { status:reply+num , media_ids: [id] };

    function postData(err, data, response) {
      if(err){
        console.log("Tweeting Failed !");
      }
      else{
        console.log("Tweeting Success !");
        console.log(data);
      }
    }
    T.post('statuses/update',post, postData);

  }

}

function postTweetOnly(reply){
  var post =  { status:reply };

  function postData(err, data, response) {
    if(err){
      console.log("Tweeting Failed !");
    }
    else{
      console.log("Tweeting Success !");
      console.log(data);
    }
  }
  T.post('statuses/update',post, postData);

}       //function for posting tweet without images

//searchTweet();             //function call for searching tweets  ~~ uncomment function to work
//postTweetOnly();               //function call for posting           ~~ uncomment function to work
startStream();             //function call for streaming         ~~ uncomment function to work

console.log("The Botter is started !");
