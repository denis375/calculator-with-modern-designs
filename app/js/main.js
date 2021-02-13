const $input = document.querySelector(".input");

document.querySelectorAll(".num__key").forEach(
    element => {
        element.onclick = () => $input.innerText = $input.innerText
        !== "0" ? $input.innerText + element.innerText : element.innerText;
    }
);

const buffer = [];

const operatorCallback = operatorName => () => {
    let currentValue = parseFloat($input.innerText);

    if (operatorName == "percent") {
        currentValue *= 0.01;
        $input.innerText = currentValue;
    }
    else {
        if (buffer && buffer.length) {
            buffer.push({ value: currentValue });

            const result = evaluate(buffer);

            buffer.push({ value: result });
            buffer.push({ value: operatorName });
            $input.innerText = "";
        }
        else {
            buffer.push({ value: currentValue });
            buffer.push({ value: operatorName });
            $input.innerText = "";
        }
    }
}

const evaluate = (buffer) => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch (operator) {
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
        case "multiply":
            return firstOperand * secondOperand;
            break;
        case "divide":
            return firstOperand / secondOperand;
            break;
        default:
            return secondOperand;
    }
}

for (const operatorName of ["add", "subtract", "multiply", "divide", "percent"]) {
    document.querySelector(`.op__key[op=${operatorName}]`)
    .onclick = operatorCallback(operatorName);
}

document.querySelector(".eq__key").onclick = () => {
    if (buffer && buffer.length) {
        buffer.push({ value: parseFloat($input.innerText) });

        $input.innerText = evaluate(buffer);
    }
}

document.querySelector(".op__key[op=clear]").onclick = () => {
    $input.innerText = 0;
    buffer.length = 0;
}

document.querySelector(".op__key[op=negate]")
.onclick = () => $input.innerText = -parseFloat($input.innerText);

document.querySelector(".neumorphic_btn").onclick = () => {
    document.querySelector("#container").classList.add("neumorphic");
    document.querySelector("#container").classList.remove("frosted");
    document.querySelector("#container").classList.remove("flat");
}

document.querySelector(".frosted_btn").onclick = () => {
    document.querySelector("#container").classList.add("frosted");
    document.querySelector("#container").classList.remove("neumorphic");
    document.querySelector("#container").classList.remove("flat");
}