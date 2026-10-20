// ---------- Транслитерация по клику ----------

const table = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
};

// Переводит строку. Если слово написано ЗАГЛАВНЫМИ, результат тоже заглавный
function transliterate(text) {
    const allUpper = text === text.toUpperCase();
    let result = "";

    for (const char of text) {
        const lower = char.toLowerCase();
        const latin = table[lower];

        if (latin === undefined) {
            result += char;                              // не кириллица: оставляем
        } else if (char === lower) {
            result += latin;                             // строчная буква
        } else if (allUpper) {
            result += latin.toUpperCase();               // ИВАНОВ -> IVANOV
        } else {
            result += latin.charAt(0).toUpperCase() + latin.slice(1); // Иван -> Ivan
        }
    }
    return result;
}

// Год рождения латинскими символами — римскими цифрами
function toRoman(number) {
    const parts = [
        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
        [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    let result = "";
    for (const [value, symbol] of parts) {
        while (number >= value) {
            result += symbol;
            number -= value;
        }
    }
    return result;
}

const latButton = document.getElementById("lat");
const birthYearElement = document.getElementById("birthYear");
const fields = document.querySelectorAll(".translit");

// Запоминаем исходные значения, чтобы вернуть кириллицу
const originalYear = birthYearElement.textContent;
const originalFields = [];
for (const element of fields) {
    originalFields.push(element.textContent);
}

let isLatin = false;

latButton.addEventListener("click", function () {
    if (!isLatin) {
        // кириллица -> латиница (всегда из исходных значений)
        fields.forEach(function (element, i) {
            element.textContent = transliterate(originalFields[i]);
        });
        birthYearElement.textContent = toRoman(parseInt(originalYear, 10));
        latButton.textContent = "Вернуть кириллицу";
    } else {
        // обратно
        fields.forEach(function (element, i) {
            element.textContent = originalFields[i];
        });
        birthYearElement.textContent = originalYear;
        latButton.textContent = "Показать латиницей";
    }
    isLatin = !isLatin;
});

// ---------- Считывание данных из DOM ----------

const readButton = document.getElementById("readData");
const output = document.getElementById("output");

// Берёт текст из span.value внутри абзаца
function getValue(paragraph) {
    return paragraph.querySelector(".value").innerText.trim();
}

readButton.addEventListener("click", function () {
    // Абзацы по порядку: [0] вводная заметка, [1] фамилия, [2] имя, [3] год рождения
    const paragraphs = document.getElementsByTagName("p");

    const surname = getValue(paragraphs[1]);
    const firstName = getValue(paragraphs[2]);
    const birthYear = getValue(paragraphs[3]);

    console.log("Фамилия:", surname);
    console.log("Имя:", firstName);
    console.log("Год рождения:", birthYear);

    output.innerText =
        "Фамилия: " + surname +
        " | Имя: " + firstName +
        " | Год рождения: " + birthYear;
});