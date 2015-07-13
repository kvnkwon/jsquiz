$(document).ready(function(){
  $('.sky').jQlouds({
    wind: true,
    minClouds: 5,
    maxClouds: 8
  });

  function Quiz() {

    this.questionCount = 0;
    var quiz = this;

    this.displayCount = function() {
      $('.question-number').html('<h3>Question ' + quiz.questionCount + '</h3>');
    };

    function Question(question_text, answers) {
      this.question_text = question_text;
      this.answers = answers;
      this.user_answer;
      quiz.questionCount += 1;
      quiz.displayCount();

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
        });
      }

      function displayWrong() {
        $('.quiz-status').html('<h1>WRONG!</h1>').fadeIn();
        $('.quiz-status').fadeOut(800);
      }

      function clearText() {
        $('.answer-list').empty();
        $('.quiz-status').empty();
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

    var question_one = new Question(
      'Which president is on the dollar bill?',
      [
          new Answer('Bill Clinton', false),
          new Answer('Obama', false),
          new Answer('Lincoln', false),
          new Answer('Washington', true)
      ]
    );

    question_one.populateText();
    $('.answer-list > li').on('click', function(event) {
      question_one.answerQuestion(event.target.innerText);
    });

    // var question_two = new Question(
    //   'The color orange is named after the fruit',
    //   [
    //       new Answer('True', true),
    //       new Answer('False', false)
    //   ]
    // );

    // question_two.populateText();
    // $('.answer-list > li').on('click', function(event) {
    //   question_two.answerQuestion(event.target.innerText);
    // });

  }

  var quiz = new Quiz();

});