class QuestionManager {
    constructor(questionsArray, formDom, quizResultsDom) {
        if (
            !this.hasQuestionInstance(questionsArray) ||
            !(formDom instanceof HTMLFormElement)
        )
            throw new Error(
                "Tried to construct QuestionManager with incorrect parameters"
            );

        this.minimumScore = 4;
        this.formDom = formDom;
        this.quizResultsDom = quizResultsDom;
        this.questionsArray = questionsArray;
        this.constructQuiz(formDom);
    }

    constructQuiz(formDom) {
        if (!(formDom instanceof HTMLFormElement))
            throw new Error("Tried to construct quiz with incorrect form dom!");

        formDom.prepend(this.getConstructedQuestionsDom());
    }

    submitQuiz() {
        let questionsLength = this.questionsArray.length;
        let correctAnswers = 0;

        for (
            let currentQuestion = 0;
            currentQuestion < questionsLength;
            currentQuestion++
        ) {
            this.questionsArray[currentQuestion].showResult();
            if (
                this.questionsArray[
                    currentQuestion
                ].isQuestionAnsweredCorrectly()
            ) {
                correctAnswers++;
            }

            this.questionsArray[currentQuestion].disableAllAnswers();
        }

        this.showQuizResults(correctAnswers);
    }

    showQuizResults(score) {
        let successArray = successClasses.split(" ");
        let failiureArray = failiureClasses.split(" ");
        let passString = "";

        if (score > this.minimumScore - 1) {
            removeContainedClasses(failiureArray, this.quizResultsDom);
            addUncontainedClasses(successArray, this.quizResultsDom);
            passString = "You passed!";
        } else {
            removeContainedClasses(successArray, this.quizResultsDom);
            addUncontainedClasses(failiureArray, this.quizResultsDom);
            passString = "You failed!";
        }

        this.quizResultsDom.innerHTML =
            passString +
            `<br>Your score: ${score} / ${this.questionsArray.length} ` +
            `<br>Minimum required score: ${this.minimumScore}`;

        if (this.quizResultsDom.classList.contains("hidden"))
            this.quizResultsDom.classList.remove("hidden");
    }

    getConstructedQuestionsDom() {
        let questionsLength = this.questionsArray.length;

        if (questionsLength < 1)
            throw new Error(
                "QuestionManager doesn't have any questions to construct!"
            );

        let questionsWrapperDom = this.getQuestionsWrapperDom();

        for (
            let currentQuestion = 0;
            currentQuestion < questionsLength;
            currentQuestion++
        ) {
            questionsWrapperDom.appendChild(
                this.questionsArray[currentQuestion].getQuestionDom()
            );
        }

        return questionsWrapperDom;
    }

    getQuestionsWrapperDom() {
        let questionsWrapperDom = document.createElement("div");
        questionsWrapperDom.className = "questions flex flex-col gap-5";

        return questionsWrapperDom;
    }

    hasQuestionInstance(array) {
        if (!Array.isArray(array) || array.length < 1) return false;

        let arrayLength = array.length;

        for (
            let currentQuestion = 0;
            currentQuestion < arrayLength;
            currentQuestion++
        ) {
            if (!(array[currentQuestion] instanceof Question)) return false;
        }

        return true;
    }
}
