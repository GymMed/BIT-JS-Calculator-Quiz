try {
    let question1 = new Question(
        "What is the capital of France?",
        [
            new Answer("question1", "berlin", "A", "Berlin"),
            new Answer("question1", "london", "B", "London"),
            new Answer("question1", "paris", "C", "Paris"),
        ],
        2
    );

    let question2 = new Question(
        "How many continents are there on Earth?",
        [
            new Answer("question2", "question2_5", "A", "5"),
            new Answer("question2", "question2_7", "B", "7"),
            new Answer("question2", "question2_6", "C", "6"),
        ],
        2
    );

    let question3 = new Question(
        "Which planet is known as the Red Planet?",
        [
            new Answer("question3", "mars", "A", "Mars"),
            new Answer("question3", "jupiter", "B", "Jupiter"),
            new Answer("question3", "saturn", "C", "Saturn"),
        ],
        0
    );

    let question4 = new Question(
        "What gas do plants breathe in that humans and animals breathe out?",
        [
            new Answer("question4", "oxygen", "A", "Oxygen"),
            new Answer("question4", "carbon-dioxide", "B", "Carbon Dioxide"),
            new Answer("question4", "nitrogen", "C", "Nitrogen"),
        ],
        1
    );

    let question5 = new Question(
        "What is the largest mammal in the world?",
        [
            new Answer("question5", "elephant", "A", "Elephant"),
            new Answer("question5", "blue-whale", "B", "Blue Whale"),
            new Answer("question5", "giraffe", "C", "Giraffe"),
        ],
        1
    );

    let formDom = document.querySelector("#quiz-form");
    let quizResultsDom = document.querySelector("#quiz-results");

    let quesitonManager = new QuestionManager(
        [question1, question2, question3, question4, question5],
        formDom,
        quizResultsDom
    );

    let quizBtnDom = document.querySelector("#quiz-submit");
    quizBtnDom.addEventListener("click", function () {
        quesitonManager.submitQuiz();
    });
} catch (e) {
    console.error(e);
}
