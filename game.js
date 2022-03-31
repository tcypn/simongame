var userClickedPattern=[];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var isStarted = 0;
var level = 0;

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio('sounds/'+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColour).removeClass('pressed');
}, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  isStarted=0;
}

$('.btn').click(function(){
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(!isStarted){
    $('#level-title').text("Level "+level);
    setTimeout(function(){
      nextSequence()
    }, 1000);
    isStarted=1;
  }

});
