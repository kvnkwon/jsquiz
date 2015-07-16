$(document).ready(function(){
  $('.sky').jQlouds({
    wind: true,
    minClouds: 5,
    maxClouds: 8
  });

  function Quiz() {

    this.questionCount = 1;
    var quiz = this;
    var questions = [];

    this.getQuestions = function() {
      return questions;
    };

    this.displayCount = function(length) {
      $('.question-number').html('<h3>Question ' + quiz.questionCount + ' of ' + length + ' questions</h3>');
    };

    this.addQuestion = function(question) {
      questions.push(question);
    };

    this.getCurrentQuestion = function() {
      return questions.shift();
    };

  }

  function Question(question_text, answers) {
    this.question_text = question_text;
    this.answers = answers;
    this.user_answer;

    this.getQuestionText = function() {
      return question_text;
    };

    function getCorrectAnswer() {
      var answer_to_return;

      // Look through answers and return the correct one
      for (var i = 0, j = answers.length; i < j; i++) {
        var answer = answers[i];

        if (answer.isCorrect()) {
          answer_to_return = answer.getAnswerText();
        }
      }

      return answer_to_return; // Correct answer
    }

    this.answerQuestion = function(answer) {
      // Store user answer
      user_answer = answer;
      isCorrect();
    };

    function isCorrect() {
      // Compare user answer to correct answer
      var correct_answer = getCorrectAnswer();
      if (user_answer === correct_answer) {
        success();
      } else {
        displayWrong();
      }
    }

    this.populateText = function() {
      $('.quiz-question').html('<h1>' + question_text + '</h1>');
      for (var i = 0, j = answers.length; i < j; i++) {
        var answer = answers[i];
        $('.answer-list').append('<li>' + answer.getAnswerText() + '</li>');
      }
    };

    function success() {
      $('.quiz-status').html('<h1>CORRECT!</h1>').fadeIn();
      $('.quiz-status').fadeOut(800, function () {
        clearText();
        var nextQuestion = quiz.getCurrentQuestion();
        nextQuestion.populateText();
        quiz.questionCount += 1;
        quiz.displayCount(5);
        $('.answer-list > li').on('click', function(event) {
          nextQuestion.answerQuestion(event.target.innerText);
        });
      });
    }

    function displayWrong() {
      $('.quiz-status').html('<h1>WRONG!</h1>').fadeIn();
      $('.quiz-status').fadeOut(800);
    }

    function clearText() {
      $('.answer-list').empty();
      $('.quiz-status').empty();
      $('.quiz-question').empty();
      $('.question-number').empty();
    }

  }

  function Answer(answer_text, is_correct) {
    this.answer_text = answer_text;
    this.is_correct = is_correct;

    this.getAnswerText = function() {
      return this.answer_text;
    };

    this.isCorrect = function() {
      return this.is_correct;
    };
  }

  var quiz = new Quiz();
  quiz.addQuestion(
    new Question(
      'Which president is on the dollar bill?',
      [
        new Answer('Bill Clinton', false),
        new Answer('Obama', false),
        new Answer('Lincoln', false),
        new Answer('Washington', true)
      ]
    )
  );
  quiz.addQuestion(
    new Question(
      'The color orange is named after the fruit',
      [
        new Answer('True', true),
        new Answer('False', false)
      ]
    )
  );
  quiz.addQuestion(
    new Question(
      'The Academy Awards are annually the most-watched, single telecast in the United States.',
      [
        new Answer('True', false),
        new Answer('False', true)
      ]
    )
  );
  quiz.addQuestion(
    new Question(
      'The funny bone is really a bone',
      [
        new Answer('True', false),
        new Answer('False', true)
      ]
    )
  );
  quiz.addQuestion(
    new Question(
      'Russia has the largest area of any country in the world.',
      [
        new Answer('True', true),
        new Answer('False', false)
      ]
    )
  );

  // var quiz_question_div_prefix = '#quiz-question-';

  // $(quiz_question_div_previx + this.id).show();

  // $('#quiz-parent-div').append('<div id="' + quiz_question_div_prefix + this.id +'"> ' + question.getQuestionText() + '</div>');

  // console.log(quiz.getQuestions);
  var currentQuestion = quiz.getCurrentQuestion();
  currentQuestion.populateText();
  quiz.displayCount(5);
  $('.answer-list > li').on('click', function(event) {
    currentQuestion.answerQuestion(event.target.innerText);
  });


});