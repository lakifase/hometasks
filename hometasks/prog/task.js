const elementD = document.getElementById("d");
const elementA = document.getElementById("a");
const elementResult = document.getElementById("result");
const elementDetails = document.getElementById("details");
const elementForm = document.getElementById("UserEnter");

// Считает ответ. Возвращает true, если данные корректны
function solve() {
    const D = parseFloat(elementD.value);
    const A = parseFloat(elementA.value);

    if (!(D > 0) || !(A > 0)) {
        elementResult.value = "Ошибка: введите положительные числа";
        elementDetails.innerText = "Диаметр бревна и ширина бруса должны быть больше нуля.";
        return false;
    }

    const maxWidth = D / Math.SQRT2;
    const fits = A * Math.SQRT2 <= D + 1e-9;

    elementResult.value = (fits ? "Брус " + A + " поместится" : "Брус " + A + " не поместится") +
        ". Максимальная ширина: " + maxWidth.toFixed(2);

    elementDetails.innerText =
        "Диаметр бревна D: " + D +
        "\nШирина бруса A: " + A +
        "\nДиагональ бруса A·√2: " + (A * Math.SQRT2).toFixed(4) +
        "\nМаксимальная ширина D / √2: " + maxWidth.toFixed(4) +
        "\n\n" + (fits
            ? "Брус можно выпилить из данного бревна."
            : "Нужно уменьшить ширину бруса до " + maxWidth.toFixed(4) + " или меньше.");

    return true;
}

// Отправляет форму на сервер, только если задача решена без ошибок
function send() {
    if (solve()) {
        elementForm.submit();
    } else {
        alert("Сначала введите корректные данные.");
    }
}

document.getElementById("calc").addEventListener("click", solve);
document.getElementById("send").addEventListener("click", send);