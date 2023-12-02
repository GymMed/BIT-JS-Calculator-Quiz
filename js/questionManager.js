class QuestionManager {
    constructor(questionsArray, formDom) {
        if (
            !this.hasQuestionInstance(questionsArray) ||
            !(formDom instanceof HTMLFormElement)
        )
            throw new Error(
                "Tried to construct QuestionManager with incorrect parameters"
            );

        this.formDom = formDom;
    }

    constructQuiz() {}

    getConstructedQuestions() {
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
        questionsWrapperDom.className = "questions flex flex-col gap-3";

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
