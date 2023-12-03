class Question {
    //is alpha characters ordered list A) B) C) ...
    static isAlphaOl = true;

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

        this.questionNameDom = null;
        this.fieldsWrapperDom = null;
        this.resultDom = null;
    }

    getQuestionDom() {
        this.questionNameDom = this.getQuestionNameDom(this.questionString);

        let questionWrapperDom = this.getQuestionWrapperDom();
        questionWrapperDom.appendChild(this.questionNameDom);

        this.fieldsWrapperDom = this.getAnswerWrapperDom();
        questionWrapperDom.appendChild(this.fieldsWrapperDom);

        this.resultDom = this.getResultDom();
        questionWrapperDom.appendChild(this.resultDom);

        return questionWrapperDom;
    }

    getQuestionWrapperDom() {
        let questionWrapperDom = document.createElement("div");
        questionWrapperDom.className =
            "flex flex-col gap-3 font-semibold text-blue-500";

        return questionWrapperDom;
    }

    getQuestionNameDom(name) {
        let nameDom = document.createElement("div");
        nameDom.className = "text-center text-lg font-bold text-blue-500";
        nameDom.textContent = name;

        return nameDom;
    }

    getAnswerWrapperDom() {
        let answersLength = this.answersArray.length;
        let fieldsWrapperDom = document.createElement("div");
        fieldsWrapperDom.className = "fields flex flex-col gap-1";

        for (
            let currentAnswer = 0;
            currentAnswer < answersLength;
            currentAnswer++
        ) {
            fieldsWrapperDom.appendChild(
                this.answersArray[currentAnswer].getInputWrapperAsAlphaDom(
                    currentAnswer
                )
            );
        }

        return fieldsWrapperDom;
    }

    showResult() {
        if (!(this.resultDom instanceof Element))
            throw new Error(
                "Questions resultDom is not actually a dom element!"
            );

        this.resultDom.textContent = `Correct Answer: ${this.answersArray[
            this.correctAnswerIndex
        ].getLetterWithAnswer(this.correctAnswerIndex)}`;

        let isSuccess = this.isQuestionAnsweredCorrectly();

        let successArray = successClasses.split(" ");
        let failiureArray = failiureClasses.split(" ");

        if (isSuccess) {
            removeContainedClasses(failiureArray, this.resultDom);
            addUncontainedClasses(successArray, this.resultDom);
        } else {
            removeContainedClasses(successArray, this.resultDom);
            addUncontainedClasses(failiureArray, this.resultDom);
        }

        if (this.resultDom.classList.contains("hidden"))
            this.resultDom.classList.remove("hidden");
    }

    disableAllAnswers() {
        let questionName = this.answersArray[0].getName();
        let sameNameDoms = document.querySelectorAll(
            `input[name="${questionName}"]`
        );

        sameNameDoms.forEach(function (element, index) {
            element.disabled = true;
        });
    }

    isQuestionAnsweredCorrectly() {
        let questionName = this.answersArray[0].getName();
        let sameNameDoms = document.querySelectorAll(
            `input[name="${questionName}"]:checked`
        );

        if (
            sameNameDoms === null ||
            sameNameDoms.length !== 1 ||
            this.answersArray[this.correctAnswerIndex].getId() !=
                sameNameDoms[0].id
        )
            return false;
        // sameNameDoms.
        return true;
    }

    getResultDom() {
        let resultDom = document.createElement("div");
        resultDom.className = "text-white p-2 bg-gradient-to-br rounded hidden";

        return resultDom;
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
