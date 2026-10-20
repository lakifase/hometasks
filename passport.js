// Замена кириллицы на латиницу по клику (и обратно).

// таблица соответствия букв
const table = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
};

// переводит строку, сохраняя заглавные буквы
function transliterate(text) {
  let result = "";
  for (const char of text) {
    const lower = char.toLowerCase();
    const latin = table[lower];

    if (latin === undefined) {
      result += char;                       // не кириллица: оставляем как есть
    } else if (char === lower) {
      result += latin;                      // строчная буква
    } else {
      result += latin.charAt(0).toUpperCase() + latin.slice(1);  // заглавная
    }
  }
  return result;
}

// переводит число в римские цифры (год рождения латинскими символами)
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

const button = document.getElementById("lat");
const year = document.getElementById("by");
const fields = document.querySelectorAll(".translit");

// запоминаем исходные значения, чтобы вернуть кириллицу
const originalYear = year.textContent;
const originalFields = [];
for (const element of fields) {
  originalFields.push(element.textContent);
}

let isLatin = false;

button.onclick = function () {
  if (!isLatin) {
    // кириллица -> латиница
    for (const element of fields) {
      element.textContent = transliterate(element.textContent);
    }
    year.textContent = toRoman(parseInt(originalYear));
    button.textContent = "Вернуть кириллицу";
  } else {
    // обратно
    fields.forEach((element, i) => {
      element.textContent = originalFields[i];
    });
    year.textContent = originalYear;
    button.textContent = "Показать латиницей";
  }
  isLatin = !isLatin;
};
