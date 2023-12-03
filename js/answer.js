class Answer {
    static wrapperActiveClasses =
        "from-blue-500 to-blue-700 text-white bg-gradient-to-br";
    constructor(name, id, value, answerString) {
        if (!(typeof answerString === "string"))
            throw new Error(
                "Tried to construct Answer with incorrect parameter"
            );

        this.name = name;
        this.id = id;
        this.value = value;
        this.answerString = answerString;
    }

    getAlphaCharacter(index) {
        if (Number.isInteger(index) && index > -1 && index < 26) {
            return String.fromCharCode(65 + index);
        }

        throw new Error("Tried to get alpha character out of bounds!");
    }

    getLetterWithAnswer(index) {
        let letter = this.getAlphaCharacter(index) + ") ";

        return letter + this.answerString;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getInputWrapperDom() {
        let wrapperDom = document.createElement("div");
        wrapperDom.className = "field flex gap-3";

        const inputDom = this.getInputDom(this.name, this.id, this.value);
        const labelDom = this.getLabelDom(this.id, this.answerString);

        wrapperDom.appendChild(inputDom);
        wrapperDom.appendChild(labelDom);

        return wrapperDom;
    }

    getInputWrapperAsAlphaDom(index) {
        let wrapperDom = document.createElement("div");
        wrapperDom.className =
            "field flex gap-3 hover:from-blue-500 hover:to-blue-700 hover:text-white hover:bg-gradient-to-br rounded";

        const inputDom = this.getInputDom(this.name, this.id, this.value);
        const labelDom = this.getLabelDom(
            this.id,
            this.getLetterWithAnswer(index)
        );

        wrapperDom.appendChild(inputDom);
        wrapperDom.appendChild(labelDom);

        return wrapperDom;
    }

    getInputDom(name, id, value) {
        let inputDom = document.createElement("input");
        inputDom.type = "radio";
        inputDom.value = value;
        inputDom.id = id;
        inputDom.name = name;
        inputDom.className = "hidden";

        inputDom.addEventListener("click", function (event) {
            let clickedInputName = event.target.name;
            let sameNameDoms = document.querySelectorAll(
                `input[name="${clickedInputName}"]`
            );

            sameNameDoms.forEach(function (element, index) {
                removeContainedClasses(
                    Answer.wrapperActiveClasses.split(" "),
                    element.parentNode
                );
            });

            if (!inputDom.checked) {
                return;
            }

            addUncontainedClasses(
                Answer.wrapperActiveClasses.split(" "),
                inputDom.parentNode
            );
        });

        return inputDom;
    }

    getLabelDom(forName, text) {
        let labelDom = document.createElement("label");
        labelDom.htmlFor = forName;
        labelDom.textContent = text;
        labelDom.className = "w-full h-full p-2";

        return labelDom;
    }
}
