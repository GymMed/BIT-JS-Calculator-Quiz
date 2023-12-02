class Answer {
    constructor(name, id, value, answerString) {
        if (typeof answerString === "string")
            throw new Error(
                "Tried to construct Answer with incorrect parameter"
            );

        this.name = name;
        this.id = id;
        this.value = value;
        this.answerString = answerString;
    }

    getInputWrapperDom() {
        let wrapperDom = document.createElement("div");
        wrapperDom.className = "field flex flex-col gap-3";

        const inputDom = this.getInputDom(this.name, this.id, this.value);
        const labelDom = this.getLabelDom(this.name, this.answerString);

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

        return inputDom;
    }

    getLabelDom(forName, text) {
        let labelDom = document.createElement("label");
        labelDom.htmlFor = forName;

        return labelDom;
    }
}
