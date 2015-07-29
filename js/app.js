$(document).ready(function(){
  $('.sky').jQlouds({
    wind: true,
    minClouds: 5,
    maxClouds: 8
  });

  function Quiz() {

    var quiz = this;
    var quiz_question_div_prefix = 'quiz-question-';
    var parentDiv = $('.quiz-area');

    this.questions = [];
    this.questionCount = 1;
    this.currentIndex;

    this.getPrefix = function() {
      return quiz_question_div_prefix;
    };

    this.upQuestionCount = function() {
      this.questionCount += 1;
    };

    this.getQuestions = function() {
      return quiz.questions;
    };

    this.displayCount = function() {
      parentDiv.append('<h3 class="question-number">Question ' + quiz.questionCount + ' of ' + quiz.questions.length + ' questions</h3>');
    };

    this.addQuestion = function(question) {
      quiz.questions.push(question);
    };

    this.getCurrentIndex = function() {
      return quiz.currentIndex;
    };

    this.upCurrentIndex = function() {
      quiz.currentIndex += 1;
    };

    this.getCurrentQuestion = function() {
      return quiz.questions[quiz.currentIndex];
    };

    this.addQuestionsToList = function() {
      for (var i=0, j=quiz.questions.length; i < j; i++) {
        var this_div_id = quiz_question_div_prefix + i;
        parentDiv.append('<div id="' + this_div_id + '"></div>');

        var question = quiz.questions[i];

        $('#' + this_div_id).append('<h1>' + question.getQuestionText() + '</h1>');

        var answers = question.getAnswers();
        var answers_html = '';
        for (var n=0, l=answers.length; n < l; n++) {
          var answer = answers[n];
          answers_html += '<li>' + answer.getAnswerText() + '</li>';
        }

        $('#' + this_div_id).addClass("hidden").append(answers_html);

      }
    };

    this.render = function(question_index) {
      quiz.currentIndex = question_index;
      var current = quiz_question_div_prefix + quiz.currentIndex;
      $('#' + current).removeClass("hidden");
    };

  }

  function Question(question_text, answers) {
    this.question_text = question_text;
    this.answers = answers;
    this.user_answer;
    var question = this;
    var parentDiv = $('.quiz-area');

    this.getQuestionText = function() {
      return question_text;
    };

    this.getAnswers = function() {
      return answers;
    };

    this.answerQuestion = function(answer) {
      // Store user answer
      user_answer = answer;
      isCorrect();
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

    function isCorrect() {
      // Compare user answer to correct answer
      var correct_answer = getCorrectAnswer();
      if (user_answer === correct_answer) {
        success();
      } else {
        displayWrong();
      }
    }

    this.clickCallback = function(event, nextQues) {
      nextQues.answerQuestion(event.target.innerText);
    };

    function success() {
      parentDiv.append('<h1 class="quiz-status">CORRECT!</h1>').fadeIn();
      $('.quiz-status').fadeOut(800, function () {
        clearText(quiz.getPrefix() + quiz.getCurrentIndex());
        quiz.upQuestionCount();
        quiz.upCurrentIndex();
        quiz.render(quiz.getCurrentIndex());
        quiz.displayCount();
        var nextQuestionDiv = quiz.getPrefix() + quiz.getCurrentIndex();
        $('#' + nextQuestionDiv + '> li').on('click', function(event) {
          question.clickCallback(event, quiz.getCurrentQuestion());
          $('#' + nextQuestionDiv + '> li').unbind('click', question.clickCallback);
        });
      });
    }

    function displayWrong() {
      parentDiv.append('<h1 class="quiz-status">WRONG!</h1>').fadeIn();
      $('.quiz-status').fadeOut(800, function() {
        $('.quiz-status').remove();
      });
    }

    function clearText(questionDiv) {
      $('#' + questionDiv).addClass('hidden');
      $('.quiz-status').remove();
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



  quiz.addQuestionsToList();
  quiz.render(0);
  quiz.displayCount();
  var currentQuestionDiv = quiz.getPrefix() + quiz.getCurrentIndex();
  var currentQues = quiz.getCurrentQuestion();
  $('#' + currentQuestionDiv + '> li').on('click', function(event) {
    currentQues.answerQuestion(event.target.innerText);
  });


});