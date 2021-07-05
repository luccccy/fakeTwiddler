$(document).ready(function() {
  //$(".timeago").timeago();
  jQuery.timeago.settings.allowFuture = true;
  //Select already existing elements with the ID #app
  var $app = $('#app');
  //the content of app will be emptied.
  $app.html('');

  //Create an h1 element with the text "Twiddler"
  var $title = $('<h1><i class="fab fa-twitter">Twiddler</i></h1>');
  //create a div can hold button.
  var $divButton = $('<div id="divButton"></div>');
  //Create a button with the ID "update-feed"
  var $button = $('<button id="update-feed"><i class="fas fa-sync-alt">Update Feed</i></button>)');
  //Create a new <div> with the ID "feed".
  var $container = $('<div id="feed"></div>')
  //$button.append('<i class="fas fa-sync-alt"></i>');

  //Apend the h1 element to the DOM, nested instead of the #app div
  $title.appendTo($app);
  //Apend the button to the DOM, nested instead of the #app div, hide the backButton initial.
  $button.appendTo($divButton);
  $divButton.appendTo($app);

  //Apend the container to the DOM, nested instead of the #app div
  $container.appendTo($app);

  //Register the click event when the document is ready.
  var registerUsernameClickEvent = function() {
    //Set event listeners;
    $('.username').on('click', function() {
      var uname = $(this).text();
      $("div").filter(function(index) {
        return $(this).attr('class') === 'tweet' && $(this).find('.username').text() !== uname;
      }).hide();
      $button.html('<i class="fas fa-chevron-left">Back</i>');
    })
  }

  //Return the rencently 20 tweets and eliminate the duplicates.
  var findDisplayHome = function() {
    var displayHome = [];
    var index = streams.home.length - 1;
    while (index >= 0 && displayHome.length < 20) {
      var isDuplicated = false;
      for (var i = 0; i < displayHome.length; i++) {
        if (streams.home[index].user === displayHome[i].user && streams.home[index].message === displayHome[i].message) {
          isDuplicated = true;
        }
      }
      if (!isDuplicated) {
        displayHome.push(streams.home[index]);
      }
      index -= 1;
    }
    return displayHome;
  }

  //Create event handler functions. This function will append the new tweet UI component to the DOM.
  var renderFeed = function(tweet) {
    //Creat variables which is part of the component.
    var username = tweet.user;
    var message = tweet.message;
    var profilePhotoUrl = tweet.profilePhotoURL;

    //Creat the new html element to store the component.
    var $tweet = $('<div class="tweet"></div>');
    //Creat the div hold username and timestamp.
    var $divUandT = $('<div class="usernameAndTimestamp"></div>');
    var $profile_photo = $('<img class="profile-photo" />')
    var $username = $('<div class="username"></div>');
    var $message = $('<div class="message"></div>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $icons = $('<div class="icon"></div>');

    //Set the content of each div of the html.
    $profile_photo.attr("src", profilePhotoUrl)
    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $timestamp.text(jQuery.timeago(tweet.created_at));

    //Append each icon to the $icons.
    $icons.append('<i class="comment fas fa-comment"></i>');
    $icons.append('<i class="retweet fas fa-retweet"></i>');
    $icons.append('<i class="like fas fa-heart"></i>');
    $icons.append('<i class="share fas fa-share"></i>');

    //Append each component to the $tweet.
    $username.appendTo($divUandT);
    $timestamp.appendTo($divUandT);
    $divUandT.appendTo($tweet);
    $message.appendTo($tweet);
    $tweet.prepend($profile_photo);
    $icons.appendTo($tweet);


    //Append new tweet to the $container.
    $tweet.appendTo($container);
  }

  //Set event listeners of the 'update feed' button. (renderFeed(tweet));
  $button.on("click", function(event) {
    $container.empty();
    var displayHome = findDisplayHome();
    displayHome.forEach(tweet => {
      renderFeed(tweet);
    })
    $button.html('<i class="fas fa-sync-alt">Update Feed</i>');
    registerUsernameClickEvent();
  });

  //Display the home page before click the 'update feed' button.
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    renderFeed(tweet);
    index -= 1;
  }
  registerUsernameClickEvent();
})




