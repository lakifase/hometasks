var checked = false;
var form = document.getElementById("UserEnter"); /*индификатор формы*/
var result = document.getElementById("result"); /*статус*/

// Сегодняшняя дата в поле "Дата отправки"
document.getElementById("date").value = new Date().toISOString().slice(0, 10); /*2026-11-10*/

function setResult(text, ok) {
    result.value = text;
    checked = ok; /*рез*/
}

function validateForm() { /*чекаем форму*/
    var phone = document.getElementById("phone").value.trim(); /*удаление пробелов в начале и в конце*/
    var email = document.getElementById("email").value.trim();

    if (document.getElementById("lastname").value.trim() === "") { /*фамилия не пустая*/
        setResult("Ошибка: заполните фамилию", false);
    } else if (document.getElementById("firstname").value.trim() === "") { /*имя не пустая*/
        setResult("Ошибка: заполните имя", false);
    } else if (document.getElementById("group").value.trim() === "") { /*группа не пустая*/
        setResult("Ошибка: заполните группу", false);
    } else if (!/^\d{10,15}$/.test(phone)) { /*0-9 10-15*/ 
        setResult("Ошибка: телефон — только цифры, от 10 до 15", false);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setResult("Ошибка: некорректный e-mail", false);
    } else if (document.getElementById("date").value === "") { /*дата не пустая*/
        setResult("Ошибка: укажите дату", false);
    } else {
        setResult("Данные корректны! Можно отправлять.", true);
    }
}

function sendData() { /*отправляем данные*/
    if (checked) {
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
