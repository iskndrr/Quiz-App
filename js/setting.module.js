import { Quiz } from "./quiz.module.js";

export class Setting {
   constructor() {
      // ----------- Start Events
      document.getElementById("start").addEventListener("click", this.startQuestion.bind(this));
   }

   async startQuestion() {
      const category = document.getElementById("category").value;
      const difficulty = document.querySelector('[name="difficulty"]').value;
      const numOfQuestion = document.getElementById("amount").value;

      // console.log(category, difficulty, numberOfQ);

      const response = await this.getQuestions(numOfQuestion, category, difficulty);

      if (numOfQuestion > 0) {
         $("#setting").removeClass("show");
         $("#quiz").addClass("show");
         const quiz = new Quiz(response);
      } else {
         $("#alertNumber").addClass("show");
      }
   }

   async getQuestions(amount, cat, diff) {
      const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${diff}`);
      const response = await apiResponse.json();
      return response.results;
   }
}
