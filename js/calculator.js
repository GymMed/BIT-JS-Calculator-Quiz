let firstNumberDom = document.querySelector("#first-number");
let secondNumberDom = document.querySelector("#second-number");
let actionDom = document.querySelector("#action");

let calculateButtonDom = document.querySelector("#calculate-btn");
let calculateResultsDom = document.querySelector("#calculate-results");

const ACTIONS_ENUM = {
    Add: 0,
    Subtract: 1,
    Multiply: 2,
    Divide: 3,
    Square: 4,
};

const actionsNames = ["Add", "Subtract", "Multiply", "Divide", "Square"];

calculateButtonDom.addEventListener("click", function () {
    let firstNumber = parseFloat(firstNumberDom.value);
    let secondNumber = parseFloat(secondNumberDom.value);

    if (calculateResultsDom.classList.contains("hidden"))
        calculateResultsDom.classList.remove("hidden");

    let successArray = successClasses.split(" ");
    let failiureArray = failiureClasses.split(" ");

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        removeContainedClasses(successArray, calculateResultsDom);
        addUncontainedClasses(failiureArray, calculateResultsDom);
        calculateResultsDom.innerHTML = "Provided not numbers in input!";
        return;
    }

    let action = actionDom.selectedIndex;
    let calculatedValue = getCalculatedValue(action, firstNumber, secondNumber);

    calculateResultsDom.innerHTML =
        `First number: ${firstNumber}<br>` +
        `Second number: ${secondNumber}<br>` +
        `Action selected: ${actionsNames[action]}<br>` +
        `Result: ${calculatedValue}`;

    removeContainedClasses(failiureArray, calculateResultsDom);
    addUncontainedClasses(successArray, calculateResultsDom);
});

function getCalculatedValue(action, firstNumber, secondNumber) {
    switch (action) {
        case ACTIONS_ENUM.Add: {
            return firstNumber + secondNumber;
        }
        case ACTIONS_ENUM.Subtract: {
            return firstNumber - secondNumber;
        }
        case ACTIONS_ENUM.Multiply: {
            return firstNumber * secondNumber;
        }
        case ACTIONS_ENUM.Divide: {
            return firstNumber / secondNumber;
        }
        case ACTIONS_ENUM.Square: {
            return firstNumber ** secondNumber;
        }
        default:
            return "Provided incorrect action!";
    }
}
