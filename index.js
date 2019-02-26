$(function () {
  startQuiz();
  handlePopUp();
  handleAnswerClick();
  handleAnswerSubmits();
  renderQuestionCard();
});

var questions = [
  {
  question: "What is Homer's middle name?",
  answers: ["James", 
            "Jay", 
            "Jerold", 
            "Jackson"], 
  correctAnswer: "Jay",
  image: "imgs/Question1.jpg"
  }, 
  {
  question: "What is the name of Springfield's rival town?",
  answers: ["Shelbyville", 
            "Martinsville", 
            "Detroit", 
            "West Springfield"], 
  correctAnswer: "Shelbyville",
  image: "imgs/Question2.jpg"
  }, 
  {
  question: "What is the name of Bart's dog?",
  answers: ["Spot", 
            "Santa's Little Helper", 
            "Snowball", 
            "Turbo"], 
  correctAnswer: "Santa's Little Helper",
  image: "imgs/Question3.gif"
  }, 
  {
  question: "What is the Simpson's address?",
  answers: ["31 Spooner Street", 
            "724 Evergreen Terrace", 
            "742 Evergreen Terrace", 
            "Nobody Knows!"], 
  correctAnswer: "742 Evergreen Terrace",
  image: "imgs/Question4.jpg"
  }, 
  {
  question: "The character Robert Underdunk Terwilliger is better known by which name?",
  answers: ["Krusty The Clown", 
            "Comicbook Guy", 
            "Radioactive Man", 
            "Sideshow Bob"], 
  correctAnswer: "Sideshow Bob",
  image: "imgs/Question5.png"
  }, 
  {
  question: "What is the name of the fictional holiday celebrated by Springfield every May 10th?",
  answers: ["Quahog Clam Day", 
            "Whacking Day", 
            "Spring Cleaning", 
            "Bart's Birthday"], 
  correctAnswer: "Whacking Day",
  image: "imgs/Question6.gif"
  },
  {
  question: "What is the name of the dog who Homer once voiced on Itchy & Scratchy?",
  answers: ["Sir Barkington", 
            "Rubbie", 
            "Doggio", 
            "Poochie"], 
  correctAnswer: "Poochie",
  image: "imgs/Question7.gif"
  }, 
  {
  question: "What is the name of Springfield's founder",
  answers: ["Jebediah Springfield", 
            "Zechariah Springfield", 
            "Abrham Springfield", 
            "Krusty The Clown"], 
  correctAnswer: "Jebediah Springfield",
  image: "img/Question8.jpg"
  }, 
  {
  question: "Who shot Mr.Burns?",
  answers: ["Homer", 
            "Flanders", 
            "Maggie", 
            "Smithers"], 
  correctAnswer: "Maggie",
  image: "imgs/Question9.jpg"
  },
  {
  question: "How many siblings does Homer have?",
  answers: ["None", 
            "One - a brother", 
            "Two - a brother and sister", 
            "Three - two brothers and a sister"], 
  correctAnswer: "Two - a brother and sister",
  image: "imgs/Question10.jpg"
  },
  {
  question: "The Simpsons was originally a short on which show?",
  answers: ["Family Guy", 
            "Married With Children", 
            "The Tracy Ullman Show", 
            "David Letterman"], 
  correctAnswer: "The Tracy Ullman Show",
  image: "imgs/Question11.jpg"
  },
  {
  question: "Where did Mr.Burns attend university?",
  answers: ["Harvard", 
            "Yale", 
            "Springfield", 
            "He didn't attend one"], 
  correctAnswer: "Yale",
  image: "imgs/Question12.gif"
  },  
  {
  question: "What is the name of the store Ned Flanders opens in Springfield Mall?",
  answers: ["Flanders Bibles", 
            "The Leftorium", 
            "Indeedily-Do Mart", 
            "Hi-Di-Ho Faitharooni!"], 
  correctAnswer: "The Leftorium",
  image: "imgs/Question13.gif"
  },
  {
  question: "Who was the Plow King?",
  answers: ["Lenny", 
            "Barney", 
            "Homer", 
            "Bart"], 
  correctAnswer: "Barney",
  image: "imgs/Question14.jpg"
  },
  {
  question: "Who did Marge go to her high school prom with?",
  answers: ["Homer Simpson", 
            "Waylon Smithers", 
            "Artie Ziff", 
            "Ned Flanders"], 
  correctAnswer: "Artie Ziff",
  image: "imgs/Question15.jpg"
  },
];

var totalQuestions = questions.length;
var currentQuestion = 0;
var score = 0;
var jsQuestion = document.getElementById('js-question');
var jsResults = document.getElementById('js-results');

function startQuiz() {
  $('#startQuiz').click(function (e) {
    $('#quiz').removeClass('hidden');
    $('#startBox').addClass('hidden');
  });
}

function renderQuestionCard() {
  var currentQuestionObj = questions[currentQuestion];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
  renderQuestionPicture();
  $(".progress").text("Question: " + (currentQuestion + 1) + " / " + totalQuestions);
  $(".score").text("Score: " + score);
  $(".answer").removeClass('selected');
}

function renderQuestionPrompt() {
  var q = questions[currentQuestion];
  jsQuestion.textContent = (currentQuestion + 1) + ' .  '+ q.question;
}

function renderQuestionChoices(answers) {
  $('#answer-form label').each(function (index, label) {
    $(this).find('input').attr('value', answers[index]);
    $(this).find('input').prop('checked', false);
    $(this).find('span').text(answers[index]);
  });
}

function renderQuestionPicture() {
  $('.questionPicture').each(function (index, image) {
	$(this).find('img').attr('src', questions[currentQuestion].image);
  });
}

function handleAnswerClick(){
  $('.answer').click(function(event) {
    $('.answer').removeClass("selected");
    $(this).addClass("selected");
    $('#submit-answer').addClass("answerSelected");
  });
}

function handleAnswerSubmits() {
  $('#submit-answer').click(function (event) {
    event.preventDefault();
    var selectedOption = $('input[name="answerChoice"]:checked').val();
    checkAnswer(selectedOption);
  });
}

function checkAnswer(selectedOption) {
  var correctChoice = questions[currentQuestion].correctAnswer;
  if (selectedOption == correctChoice) { 
    answerFeedback(true);
    currentQuestion +=1;
    score += 1;
  } else if (selectedOption == undefined) {
    answerFeedback(undefined);
  } else {
    answerFeedback(false);
    currentQuestion +=1;
  }
}

function answerFeedback(boolean) {
  var innerPop = $('.popup-inner');
  if (boolean === true){
    innerPop.find('h3').text('WHOO-HOO, that was correct!');
    innerPop.find('img').attr('src', 'imgs/correct.gif');
  } else if (boolean === false){
    innerPop.find('h3').text('D\'OH, the correct answer was ' + questions[currentQuestion].correctAnswer + '!');
    innerPop.find('img').attr('src', 'imgs/wrong.gif');
  } else {
    innerPop.find('h3').text('Press any answer to proceed!');
    innerPop.find('img').attr('src', 'imgs/anykey.gif');
  }
}

function renderResults(){
  $('#quiz').addClass('hidden');
  $('#resultsSection').removeClass('hidden');
  var newResult = $('<h2>' + 'You got  ' + score + '  out of  ' + totalQuestions + '  right!' + '</h2>');
  $('.js-results').append(newResult);
  quizRestart();
}

function handlePopUp() {
  $('#submit-answer').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(250);
    e.preventDefault();
  });

  $('.close-feedback').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(250);
    $('#submit-answer').removeClass("answerSelected");
    e.preventDefault();
    if (currentQuestion == (totalQuestions)) {
    renderResults();
    } else {
    renderQuestionCard();
  	}
  });
}

function quizValueReset() {
  score = 0;
  currentQuestion = 0;
}

function quizRestart() {
  $('#startOver').on('click', function (e) {
    $('#quiz').removeClass('hidden');
    $('#resultsSection').addClass('hidden');
    $('.js-results').empty();
    quizValueReset();
    renderQuestionCard();
  });
}
