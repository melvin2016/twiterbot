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
    postTweet(reply);

  }
  stream.on('follow', beingFollowed);

}



function postTweet(reply){                            //function for posting tweets

  //  setInterval(postTweet , 1000*20);          //setting interval to post tweets   ~~ uncomment to work
  var num = Math.floor(Math.random()*100);     // declaring num for fun ! :/    ~~ uncomment to work

  var params = {encoding: 'base64'};
  var fileName = './thanks.png';                     //path to image
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

//searchTweet();             //function call for searching tweets  ~~ uncomment function to work
//postTweet();               //function call for posting           ~~ uncomment function to work
startStream();             //function call for streaming         ~~ uncomment function to work

console.log("The Botter is started !");
