let check = false;

const form = document.getElementById("UserEnter");
const result = document.getElementById("result");

// Подставляем сегодняшнюю дату в поле "Дата отправки"
document.getElementById("date").value = new Date().toISOString().slice(0, 10);

function setResult(text, ok) {
    result.value = text;
    check = ok;
}

function validateForm() {
    const lastname = document.getElementById("lastname").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const group = document.getElementById("group").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;

    if (lastname === "") {
        setResult("Ошибка: заполните фамилию", false);
    } else if (firstname === "") {
        setResult("Ошибка: заполните имя", false);
    } else if (group === "") {
        setResult("Ошибка: заполните группу", false);
    } else if (!/^\d{10,15}$/.test(phone)) {
        setResult("Ошибка: телефон — только цифры, от 10 до 15", false);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setResult("Ошибка: некорректный e-mail", false);
    } else if (date === "") {
        setResult("Ошибка: укажите дату", false);
    } else {
        setResult("Данные корректны! Можно отправлять.", true);
    }
}

function sendData() {
    if (check) {
        form.submit();
    } else {
        alert("Данные не проверены или содержат ошибку. Нажмите «Проверить данные».");
    }
}

// Любое изменение полей сбрасывает проверку
form.addEventListener("input", function (e) {
    if (e.target.id !== "result") {
        setResult("не проверено", false);
    }
});

document.getElementById("checkForm").addEventListener("click", validateForm);
document.getElementById("sendForm").addEventListener("click", sendData);