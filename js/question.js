class Question {
    constructor(questionString, answersArray, correctAnswerIndex) {
        if (
            typeof questionString !== "string" ||
            !this.hasOnlyAnswersInstances(answersArray) ||
            correctAnswerIndex < 0 ||
            answersArray.length - 1 < correctAnswerIndex
        ) {
            throw new Error(
                "Tried to construct question with passed incorrect parameters!"
            );
        }

        this.questionString = questionString;
        this.answersArray = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }

    getQuestionDom() {
        let answersLength = this.answersArray.length;
        let questionNameDom = this.getQuestionNameDom(this.questionString);

        for (
            let currentAnswer = 0;
            currentAnswer < answersLength;
            currentAnswer++
        ) {
            questionNameDom.appendChild(
                this.answersArray[currentAnswer].getInputWrapperDom()
            );
        }

        return questionNameDom;
    }

    getQuestionNameDom(name) {
        let nameDom = document.createElement("div");
        nameDom.className = "text-center text-lg font-bold text-blue-500";
        nameDom.textContent = name;

        return nameDom;
    }

    isPassedAnswerIndexCorrect(index) {
        if (this.correctAnswerIndex === index) return true;
        return false;
    }

    hasOnlyAnswersInstances(array) {
        if (!Array.isArray(array) || array.length < 1) return false;

        let arrayLength = array.length;
        for (
            let currentInstance = 0;
            currentInstance < arrayLength;
            currentInstance++
        ) {
            if (!(array[currentInstance] instanceof Answer)) return false;
        }

        return true;
    }
}
