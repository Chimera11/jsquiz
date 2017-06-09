(function(){
  var questions = [{
    question: "If you were taken prisoner what would you do?",
    choices: ["Burn my Enemies",
              "I am never taken prisoner",
              "I would kill the framer, given the chance",
              "Bid my time until I can pay my debt",
  ]
}];

var questionCounter = 0; //supposed to track question number
var selections = []; // array containing the users response
var quiz = $('#quiz'); //Quiz div objects aka what will be the quiz

//Displays initial question
displayNext();

//click handler for the 'next' question/button
$('#next').on('click', function (e) {
  e.preventDefault();

// suspends click listener during fade animation
  if(quiz.is(':animated')){
    return false;
  }
  choose();

  //If a user does not make a selection, progress if stopped
  if(isNaN(selections[questionCounter])){
    alert('My Lord, please make a selection');
  }else{
    questionCounter++;
    displayNext();
  }
});

 //click handler for the 'prev' button
 $('#prev').on("click", function (e) {
   e.preventDefault();

   if(quiz.is(':animated')) {
     return false;

   choose();
   questionCounter--;
   displayNext();
});

//click handler for "start over/results button"
  $("#start").on("click", function (e){
    e.preventDefault();

    if(quiz.is(':animated')){
      return false:
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });

  // animates buttons on hover
  $(".button").on("mouseenter", function(){
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function(){
    $(this).removeClass('active');
  });

  //Main area,  creates and returns the div that contains the questions and the answer selection
  function createQuestionElement(index){
    var qElement = $('<div>', {
      id: 'question'
    });
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question =  $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
    }

    //creates a list of the answer choise as radio inputs
    function createRadios(index){
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++)
      {
        item = $('<li>');
        input = questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }

    // reads the user selection and pushes the value to an array
function choose(){
  selections[questionCounter] =
  +$('input[name='answer']: checked').val();
}

  //displays next requested element
  function displayNext() {
    quiz.fadeOut(function(){
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion =
        createQuestionElement(questionCounter);
         quiz.append(nextquestion).fadeIn();
         if (!(isNaN(selections[questionCounter]))){

           $('input[value='+selections[questionCounter]+']').prop('checked', true);
         }
         // controls display of 'prev' buttons
         if(questionCounter === 1){
           $('$prev').show
         } else if (questionCounter === 0){

           $('#prev').hide();
           $('#next').show();
         } }else{
           var scoreElm = displayScore();
           quiz.append(scoreElm).fadeIn();
           $('#next').hide();
           $('#prev').hide();
           $('#start').show();

         }
    });
  }

  //computes score and return a paragraph element to be displayed

  function displayScore(){
    var score = $('<p>', {id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnwer) {
        numCorrect++;
      }
    }
  }

});
