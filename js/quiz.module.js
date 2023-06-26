export class Quiz {
  constructor(response) {
    // property
    this.response = response;
    this.questionLength = response.length;
    this.currentIndex = 0;
    this.score = 0;
    this.correctAns;
    this.from = document.getElementById("from");
    // When Start
    this.showQuestion();
    // Start Events
    console.log(this.response);
    document.getElementById("to").innerHTML = this.questionLength;
    document
      .getElementById("nextQuestion")
      .addEventListener("click", this.nextQuestion.bind(this));
    document
      .getElementById("end")
      .addEventListener("click",()=>{
         this.tryAgain()
      });
  }

  showQuestion() {
    this.from.innerHTML = this.currentIndex + 1;
    const curentQuestion = this.response[this.currentIndex]; // {}

    document.getElementById("questionTitle").innerHTML =
      curentQuestion.question;

    const randomNumber = Math.ceil(Math.random() * this.response.length); // random number to shufle array

    this.correctAns = curentQuestion.correct_answer;
    const answers = [...curentQuestion.incorrect_answers];

    answers.splice(randomNumber, 0, this.correctAns);

    let question = ``;

    answers.forEach((answer) => {
      question += `
         
         <li class="my-3 animate__animated">
         <div class="pretty p-icon p-round p-jelly">
                    <input type="radio" name="answer" value="${answer}"/>
                    <div class="state p-primary">
                      <i class="icon mdi mdi-check"></i>
                      <label>${answer} </label>
                    </div>
                  </div>
      </li>
         
         `;
    });

    $("#questionContent").html(question);
  }

  nextQuestion() {
    const currentAns = document.querySelector('[name="answer"]:checked')?.value;

    if (currentAns != null) {
      $("#alertAns").fadeOut(500);

      if (currentAns === this.correctAns) {
        this.score++;
        $("#correct").fadeIn(100);
        setTimeout(() => {
          $("#correct").fadeOut(100);
        }, 500);
      } else {
        $("#inCorrect").fadeIn(100);
        setTimeout(() => {
          $("#inCorrect").fadeOut(100);
        }, 500);
      }

      this.currentIndex++;

      if (this.currentIndex > this.response.length - 1) {
        $("#quiz").removeClass("show");
        $("#finsish").addClass("show");
        $("#score").html(this.score);
      } else {
        this.showQuestion();
      }
    } else {
      $("#alertAns").fadeIn(500);
    }
  }

  tryAgain() {
    location.reload()
  }
}
