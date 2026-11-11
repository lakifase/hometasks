// ---------- Транслитерация по клику ----------

var table = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
};

// ИВАНОВ -> IVANOV, Иван -> Ivan
function transliterate(text) {
    var allUpper = text === text.toUpperCase();
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        var lower = char.toLowerCase();
        var latin = table[lower];
        if (latin === undefined) {
            result += char;
        } else if (char === lower) {
            result += latin;
        } else if (allUpper) {
            result += latin.toUpperCase();
        } else {
            result += latin.charAt(0).toUpperCase() + latin.slice(1);
        }
    }
    return result;
}

// Год рождения латинскими символами — римскими цифрами
function toRoman(number) {
    var parts = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
                 [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    var result = "";
    for (var i = 0; i < parts.length; i++) {
        while (number >= parts[i][0]) {
            result += parts[i][1];
            number -= parts[i][0];
        }
    }
    return result;
}

var latButton = document.getElementById("lat");
var birthYear = document.getElementById("birthYear");
var fields = document.querySelectorAll(".translit");

// Запоминаем исходные значения, чтобы вернуть кириллицу
var originalYear = birthYear.textContent;
var originalFields = [];
for (var i = 0; i < fields.length; i++) {
    originalFields.push(fields[i].textContent);
}

var isLatin = false;

latButton.addEventListener("click", function () {
    for (var i = 0; i < fields.length; i++) {
        fields[i].textContent = isLatin ? originalFields[i] : transliterate(originalFields[i]);
    }
    birthYear.textContent = isLatin ? originalYear : toRoman(parseInt(originalYear, 10));
    latButton.textContent = isLatin ? "Показать латиницей" : "Вернуть кириллицу";
    isLatin = !isLatin;
});

// ---------- Считывание данных из DOM ----------

document.getElementById("readData").addEventListener("click", function () {
    // Абзацы по порядку: [0] вводная, [1] фамилия, [2] имя, [3] год рождения
    var p = document.getElementsByTagName("p");

    var surname = p[1].getElementsByTagName("span")[0].innerText;
    var firstName = p[2].getElementsByTagName("span")[0].innerText;
    var year = p[3].getElementsByTagName("span")[0].innerText;

    console.log("Фамилия:", surname);
    console.log("Имя:", firstName);
    console.log("Год рождения:", year);

    document.getElementById("output").innerText =
        "Фамилия: " + surname + " | Имя: " + firstName + " | Год рождения: " + year;
});
